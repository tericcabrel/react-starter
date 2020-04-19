import { Router } from 'express';

import { API_BASE } from '../core/config';

import userValidator from '../validator/user.validator';
import { Validator } from '../validator';

import { AuthController } from '../controllers/auth.controller';

const { user }: any = Validator.methods;

/**
 * Router configuration for authentication
 *
 * @class
 */
class AuthRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes(): void {
		const prefix: string = `${API_BASE}auth`;

		this.router.post(`${prefix}/register`, userValidator.validate(user.createUser), AuthController.register);

		this.router.post(`${prefix}/account/confirm`, userValidator.validate(user.confirmAccount), AuthController.confirmAccount);

		this.router.post(`${prefix}/login`, userValidator.validate(user.loginUser), AuthController.login);

		this.router.post(`${prefix}/password/forgot`, userValidator.validate(user.forgotPassword), AuthController.forgotPassword);

		this.router.post(`${prefix}/password/reset`, userValidator.validate(user.resetPassword), AuthController.resetPassword);

		this.router.post(`${prefix}/token/refresh`, userValidator.validate(user.refreshToken), AuthController.refreshToken);
	}
}

export { AuthRouter };
