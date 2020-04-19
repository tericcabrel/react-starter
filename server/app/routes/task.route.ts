import { Router } from 'express';

import { TaskController } from '../controllers/task.controller';
import { Validator } from '../validator';
import taskValidator from '../validator/task.validator';

import { API_BASE } from '../core/config';

const { task }: any = Validator.methods;

/**
 * Router configuration for task
 *
 * @class
 */
class TaskRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes(): void {
		const prefix = `${API_BASE}tasks`;

		this.router.post(`${prefix}/create`, taskValidator.validate(task.createTask), TaskController.create);

		this.router.put(`${prefix}/:id`, taskValidator.validate(task.updateTask), TaskController.update);

		this.router.delete(`${prefix}/:id`, TaskController.destroy);

		this.router.get(`${prefix}`, TaskController.all);

		this.router.get(`${prefix}/:id`, TaskController.one);
	}
}

export { TaskRouter };
