import { Router } from 'express';

import { API_BASE } from '../core/config';

import userValidator from '../validator/user.validator';
import { Validator } from '../validator';

import { UserController } from '../controllers/user.controller';

const { user }: any = Validator.methods;

/**
 * Router configuration for user
 *
 * @class
 */
class UserRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes(): void {
		const prefix: string = `${API_BASE}users`;

		this.router.get(`${prefix}/me`, UserController.me);

		this.router.get(`${prefix}`, UserController.all);

		this.router.get(`${prefix}/:id`, UserController.one);

		this.router.put(`${prefix}`, userValidator.validate(user.updateUser), UserController.update);

		this.router.put(`${prefix}/password`, userValidator.validate(user.updateUserPassword), UserController.updatePassword);

		this.router.delete(`${prefix}/:id`, userValidator.validate(user.deleteUser), UserController.destroy);
	}
}

export { UserRouter };
