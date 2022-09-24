import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import * as config from '../config';
import { logger } from '../logger';

import { Locale } from '../locale';
import { CustomRequest } from '../types';

export type CreateJWTTokenFunction = (payload: any, jwtSecret: string, jwtExpire: number) => string;

/**
 * Create a JWT Token
 *
 * @param {any} payload Information to encode
 * @param {string} jwtSecret JWT Secret
 * @param {number} jwtExpire JWT Expiration date
 *
 * @return string
 */
export const createJwtToken: CreateJWTTokenFunction = (payload: any, jwtSecret: string, jwtExpire: number): string => {
	return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });
};

/**
 * Create a new user and save to the database
 * After registered, a confirmation's email is sent
 *
 * @param {string} token: Token to decode
 * @param {string} jwtSecret: Secret key used to create the token
 *
 * @return Promise<any>
 */
export const decodeJwtToken : Function = (token: string, jwtSecret: string): Promise<any> => {
	return new Promise((resolve: Function, reject: Function): void => {
		try {
			const decoded = jwt.verify(token, jwtSecret);

			return resolve(decoded)
		} catch(err) {
			return reject(err);
		}
	});
};

/**
 * Middleware to authorize a request only if a valid token is provided
 *
 * @param {Request|any} req: Request object
 * @param {Response} res: Response object
 * @param {NextFunction} next: NextFunction object
 *
 * @return any
 */
const authMiddleware: any = async (req: CustomRequest|any, res: Response, next: NextFunction): Promise<any> => {
	const token: any = req.headers['x-access-token'];

	const allowedRoutes: string[] = [
		'/',
		'/api/documentation',
		'auth/login',
		'auth/register',
		'auth/account/confirm',
		'auth/password/forgot',
		'auth/password/reset',
		'token/refresh',
	];

	// let routeName = null;

	if (req.originalUrl) {
		if (req.originalUrl.includes(config.API_BASE)) {
			const routeName: string = req.originalUrl.replace(config.API_BASE || '', '');

			if (allowedRoutes.includes(routeName)) {
				return next();
			}

			if (token) {
				try {
					const decoded: any = await decodeJwtToken(token, config.JWT_SECRET);

					if (!decoded.id) {
						return res.status(401).json({ message: Locale.trans('unauthorized') });
					}

					// if everything good, save to request for use in other routes
					req.userId = decoded.id;

					return next();
				} catch (err) {
					logger.error(err);
				}
			}

			return res.status(401).json({ message: Locale.trans('unauthorized') });
		}

		return next();
	}

	return res.status(401).json({ message: Locale.trans('unauthorized') });
};

export { authMiddleware };
