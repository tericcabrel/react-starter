import { Request, Response, NextFunction } from 'express';

import { Locale } from '../locale';

/**
 * Middleware to get the language of the client
 * @async
 *
 * @param {Request|any} req: Request object
 * @param {Response} res: Response object
 * @param {NextFunction} next: NextFunction object
 *
 * @return Promise<void>
 */
const localeMiddleware: any = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const availableLocales: string[] = Locale.getAvailableLocales();
	const language: string = req.headers['accept-language'] || availableLocales[0];

	Locale.setLocale(availableLocales.indexOf(language) >= 0 ? language : availableLocales[0]);

	return next();
};

export { localeMiddleware };
