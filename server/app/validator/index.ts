import { Result, ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidatorMethod } from '../core/types';

interface IValidator {
	validationHandler(req: Request, res: Response, next: NextFunction): Response|NextFunction|void;
}

type ValidationResultError = {
	[string: string]: [string];
};

class Validator implements IValidator {
	validationHandler(req: Request, res: Response, next: NextFunction): Response|NextFunction|void {
		const errors: Result<ValidationError> = validationResult(req);
		const result: ValidationResultError = { };

		if (!errors.isEmpty()) {
			errors.array().forEach((item: Object) => {
				const { param, msg }: any = item;

				if (result[param]) {
					result[param].push(msg);
				} else {
					result[param] = [msg];
				}
			});

			return res.status(422).json({ errors: result });
		}

		return next();
	}

	public static methods: ValidatorMethod = {
		user: {
			createUser: 'createUser',
			confirmAccount: 'confirmAccount',
			loginUser: 'loginUser',
			forgotPassword: 'forgotPassword',
			resetPassword: 'resetPassword',
			updateUser: 'updateUser',
			updateUserPassword: 'updateUserPassword',
			deleteUser: 'deleteUser',
			refreshToken: 'refreshToken',
		},
		task: {
			createTask: 'createTask',
			updateTask: 'updateTask',
		},
	};
}

export { Validator };
