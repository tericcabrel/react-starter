import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import * as config from '../core/config';
import mailer from '../core/mailer';
import { Locale }from '../core/locale';
import { logger } from '../core/logger';
import { RedisManager } from '../core/storage/redis-manager';
import { TokenInfo } from '../core/types';
import { decodeJwtToken } from '../core/middleware/auth';

import { internalError } from '../utils/helpers';

import { UserModel } from '../models/user.model';

const {
	JWT_SECRET, JWT_EXPIRE, JWT_EMAIL_SECRET, JWT_EMAIL_EXPIRE, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE,
	WEB_APP_URL, CONFIRM_ACCOUNT_PATH, RESET_PASSWORD_PATH,
}: any = config;

/**
 * Controller for authentication
 *
 * @class
 */
class AuthController {
	/**
   * register()
   *
   * Create a new user and save to the database
   * After registered, a confirmation's email is sent
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async register(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const { name, username, email }: any = req.body;

			const password: string = bcrypt.hashSync(req.body.password, 10);

			const emailToken: string = bcrypt.hashSync(email, 8);
			const userParam: any = { name, username, email, password, email_token: emailToken };
			const user: any  = new UserModel(userParam);

			await user.save();

			const data: Object = {
				to: user.email,
				subject: 'mail.subject.confirm.account',
				template: 'confirm-account-email',
				context: {
					url: `${WEB_APP_URL}/${CONFIRM_ACCOUNT_PATH}?token=${emailToken}`,
					name: user.name,
					email: user.email,
				},
			};

			mailer.sendMail(data);

			return res.json({ message: Locale.trans('register.success') });
		} catch (err) {
			logger.error(err);

			return res.status(500).json(internalError());
		}
	}

	/**
   * login()
   *
   * Login user with email address and password
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { email, password }: any = req.body;

		try {
			const user: any = await UserModel.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: Locale.trans('login.failed') });
			}

			const isMatch: boolean = bcrypt.compareSync(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: Locale.trans('login.failed') });
			}

			if (!user.confirmed) {
				return res.status(400).json({ message: Locale.trans('account.unconfirmed') });
			}

			const { _id }: any = user;
			const tokenInfo: TokenInfo = { id: _id };
			const token: string = jwt.sign(tokenInfo, JWT_SECRET, { expiresIn: JWT_EXPIRE });
			const refreshToken: string = jwt.sign(tokenInfo, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRE });

			await RedisManager.set(_id.toString(), refreshToken, JWT_EXPIRE);

			return res.json({ refreshToken, token, expiresIn: JWT_EXPIRE });
		} catch (err) {
			logger.error(err);

			return res.status(500).json(internalError());
		}
	}

	/**
   * confirmAccount()
   *
   * Confirm user account with the token sent to his
   * email address after registered
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async confirmAccount(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const token: string = req.body.token;

			const user: any = await UserModel.findOne({ email_token: token });

			if (!user) {
				return res.status(400).json({ message: Locale.trans('bad.token') });
			}

			const { _id }: any = user;

			await UserModel.findOneAndUpdate({ _id }, { confirmed: true, email_token: null });

			return res.json({ message: Locale.trans('account.confirmed') });
		} catch (err) {
			logger.error(err);

			return res.status(500).json(internalError());
		}
	}

	/**
   * forgotPassword()
   *
   * Sent an email with a token to reset user password
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { email }: any = req.body;

		try {
			const user: any = await UserModel.findOne({ email });

			if (!user) {
				return res.status(404).json({ message: Locale.trans('no.user.test.ts') });
			}

			const { _id }: any = user;
			const tokenInfo: TokenInfo = { id: _id };
			const token: string = jwt.sign(tokenInfo, JWT_EMAIL_SECRET, { expiresIn: JWT_EMAIL_EXPIRE });

			const data: any = {
				to: user.email,
				subject: 'mail.subject.forgot.password',
				template: 'forgot-password-email',
				context: {
					url: `${WEB_APP_URL}/${RESET_PASSWORD_PATH}?token=${token}`,
					name: user.name,
				},
			};

			mailer.sendMail(data);

			return res.json({ message: Locale.trans('email.success') });
		} catch (err) {
			logger.error(err);

			return res.status(500).json(internalError());
		}
	}

	/**
   * resetPassword()
   *
   * Reset the password of an user
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async resetPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
		const resetToken: string = req.body.reset_token;
		let decoded: any;

		try {
			decoded = await decodeJwtToken(resetToken, JWT_EMAIL_SECRET);
		} catch (err) {
			logger.error(err);

			return res.status(400).json({ message: Locale.trans('bad.token') });
		}

		try {
			const user: any = await UserModel.findOne({ _id: decoded.id });

			if (!user) {
				return res.status(404).json({ message: Locale.trans('no.user.test.ts') });
			}

			const password: string = bcrypt.hashSync(req.body.password, 10);

			const { _id }: any = user;

			await UserModel.findOneAndUpdate({ _id }, { password });

			return res.json({ message: Locale.trans('password.reset') });
		} catch (err) {
			logger.error(err);

			return res.status(500).json(internalError());
		}
	}

	/**
   * refreshToken()
   *
   * Generate a new access token for the user
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async refreshToken(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { token, uid }: any = req.body;

		try {
			const tokenStorage: string|null = await RedisManager.get(uid);

			if (tokenStorage !== token) {
				return res.status(400).json({ message: Locale.trans('auth.token.failed') });
			}

			const tokenInfo: TokenInfo = { id: uid };
			const newToken: string = jwt.sign(tokenInfo, JWT_SECRET, { expiresIn: JWT_EXPIRE });

			return res.json({ token: newToken });
		} catch (err) {
			logger.error(err);

			return res.status(500).json(internalError());
		}
	}
}

export { AuthController };
