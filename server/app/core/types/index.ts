import { Request, Application } from 'express';

export interface CustomRequest extends Request {
	userId: number;
}

export type TokenInfo = {
	id: string;
};

export type Locales = {
	[string: string]: {
		[string: string]: string,
	},
};

export interface IServer {
	app: Application;
}

export type ValidatorMethod = {
	[key: string]: {
		[key: string]: string,
	},
};

export type RegexObject = {
	ipAddress: RegExp;
	url: RegExp;
	email: RegExp;
	date: RegExp;
};

export type InternalServerError = {
	message: string;
};
