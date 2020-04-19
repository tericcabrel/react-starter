import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

import { CustomRequest } from '../core/types';
import { logger } from '../core/logger';
import { Locale } from '../core/locale';

import { internalError, parseRequest } from '../utils/helpers';

import { UserModel, userUpdateParams } from '../models/user.model';

import { UserTransformer } from '../transformers/user';

/**
 * Controller for user details
 *
 * @class
 */
class UserController {
	/**
   * me()
   *
   * Get the informations of the user authenticated
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async me(req: CustomRequest|any, res: Response, next: NextFunction): Promise<any> {
		try {
			const user: Document|null = await UserModel.findOne({ _id: req.userId });

			if (!user) {
				return res.status(404).json({ message: Locale.trans('no.user') });
			}

			const transformer: UserTransformer = new UserTransformer(user);

			return res.json(await transformer.transform());
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}

	/**
   * all()
   *
   * Get all users in the database
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async all(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const users: Document[] = await UserModel.find({}).sort('-created_at').exec();
			const transformer: UserTransformer = new UserTransformer(users);

			return res.json(await transformer.transform());
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}

	/**
   * one()
   *
   * Get an user by it's ID
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async one(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const user: Document|null = await UserModel.findOne({ _id: req.params.id });

			if (!user) {
				return res.status(404).json({ message: Locale.trans('model.not.found', { model: 'User' }) });
			}

			const transformer: UserTransformer = new UserTransformer(user);

			return res.json(await transformer.transform());
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}

	/**
   * updatePassword()
   *
   * Change the password of the user authenticated
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async updatePassword(req: CustomRequest|any, res: Response, next: NextFunction): Promise<any> {
		const id: string = req.userId;
		const newPassword: string = req.body.new_password;
		let updatedUser: Document|null = null;

		try {
			if (req.body.uid !== id) {
				return res.status(403).json({ message: Locale.trans('unauthorized.resource') });
			}

			const user: any = await UserModel.findOne({ _id: id });

			if (!user) {
				return res.status(404).json({ message: Locale.trans('model.not.found', { model: 'User' }) });
			}

			const isMatch: boolean = bcrypt.compareSync(req.body.password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: Locale.trans('invalid.password') });
			}
			const { _id }: any = user;

			await UserModel.findOneAndUpdate({ _id }, { password: bcrypt.hashSync(newPassword, 10) });
			updatedUser = await UserModel.findOne({ _id });

			const transformer: UserTransformer = new UserTransformer(updatedUser);

			return res.json(await transformer.transform());
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}

	/**
   * update()
   *
   * Update information of the authenticated user
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async update(req: CustomRequest|any, res: Response, next: NextFunction): Promise<any> {
		const uid: string = req.body.uid;
		const authUserId: string = req.userId;
		const data: any = parseRequest(req.body, userUpdateParams);
		let updatedUser: Document|null = null;

		try {
			if (uid !== authUserId) {
				return res.status(403).json({ message: Locale.trans('unauthorized.resource') });
			}

			const user: any = await UserModel.findOne({ _id: uid });

			if (!user) {
				return res.status(404).json({ message: Locale.trans('model.not.found', { model: 'User' }) });
			}

			if (data !== null) {
				await UserModel.findOneAndUpdate({ _id: uid }, data);
			}
			updatedUser = await UserModel.findOne({ _id: uid });

			const transformer: UserTransformer = new UserTransformer(updatedUser);

			return res.json(await transformer.transform());
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}

	/**
   * destroy()
   *
   * Delete an user in the database
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async destroy(req: CustomRequest|any, res: Response, next: NextFunction): Promise<any> {
		const id: string = req.params.id;

		try {
			if (req.userId === id) {
				await UserModel.deleteOne({ _id: id });
			}

			// TODO check if authenticated user has privilege to delete

			return res.json({ message: Locale.trans('model.deleted', { model: 'User' }) });
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}
}

export { UserController };
