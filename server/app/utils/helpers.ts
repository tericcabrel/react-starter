import { CustomRequest, InternalServerError } from '../core/types';

import { REGEX } from './constants';

import { Locale } from '../core/locale';

/**
 * Translate internal server error
 *
 * @return Object
 */
export const internalError: Function = (): InternalServerError => {
	return { message: Locale.trans('internal.error') };
};

/**
 * Translate item existence message
 *
 * @param {string} modelName - Model's name
 *
 * @return string
 */
export const existMessage: Function = (modelName: string): string => {
	return Locale.trans('model.exist', { model: modelName });
};

/**
 * Translate not found message
 *
 * @param {string} modelName - Model's name
 *
 * @return string
 */
export const notFound: Function = (modelName: string): string => {
	return Locale.trans('model.not.found', { model: modelName });
};

/**
 * Parse the body of the request
 *
 * @param {Object} requestBody - Content of the request's body
 * @param {string[]} objectKeys - Array of valid's key
 *
 * @return Object
 */
export const parseRequest: Function = (requestBody: any, objectKeys: string[]): any => {
	const result: any = {};

	objectKeys.forEach((key: string) => {
		if (requestBody[key] !== undefined) {
			result[key] = requestBody[key];
		}
	});

	return Object.keys(result).length === 0 ? null : result;
};

/**
 * Remove whitespace and line returns in the text
 *
 * @param {string} str - Text to clean
 *
 * @return string
 */
export const cleanText: Function = (str: string): string => {
	return str.trim().replace(/\\n/g, '');
};

/**
 * Validate an IP address
 *
 * @param {string} ipAddress - IP address to validate
 *
 * @return boolean
 */
export const isValidIPV4Address: Function = (ipAddress: string): boolean => {
	return REGEX.ipAddress.test(ipAddress);
};

/**
 * Get the base URL of the server application
 *
 * @param {CustomRequest|any} req - Request object
 *
 * @return string
 */
export const getBaseUrlFromRequest: Function = (req: CustomRequest|any): string => {
	const port: string = isValidIPV4Address(req.hostname) || req.hostname === 'localhost' ? `:${process.env.SERVER_PORT}` : '';

	return `${req.protocol}://${req.hostname}${port}`;
};

/**
 * Generate a random string
 *
 * @param {string} n=16 - Number of characters of the string
 *
 * @return string
 */
export const randomStr: Function = (n: number = 16): string => {
	let text: string = '';
	const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i: number = 0; i < n; i += 1) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

/**
 * Translate item existence message
 *
 * @param {string} array - Array of data
 * @param {number} limit - Number of element to get
 * @param {number} offset - Index of the array to start retrieving the data
 *
 * @return Object[]
 */
export const paginate: Function = (array: any[], limit: number, offset: number): any[] => {
	const result: any[] = [];
	const startIndex: number = limit * (offset - 1);
	const length: number = startIndex + limit;

	for (let i: number = startIndex; i < length; i += 1) {
		if (!array[i]) {
			break;
		}

		result.push(array[i]);
	}

	return result;
};

/**
 * Generate a random number in a defined interval
 *
 * @param {number} min - Inclusive minimum value
 * @param {number} max - Inclusive maximum value
 *
 * @return number
 */
export const getRandomInt: Function = (min: number, max: number): number => {
	const borne: number = max - (min + 1);

	return Math.floor(Math.random() * (borne + min));
};
