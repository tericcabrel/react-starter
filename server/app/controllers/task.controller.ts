import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

import { TaskModel, taskUpdateParams } from '../models/task.model';

import { Locale } from '../core/locale';
import { logger } from '../core/logger';
import { TaskTransformer } from '../transformers/task';
import { internalError, parseRequest } from '../utils/helpers';

/**
 * Controller for task
 *
 * @class
 */
class TaskController {
	/**
   * create()
   *
   * Create a new task
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const { title, description, date, status, is_important, user }: any = req.body;

			const param: any = { title, description, date, status, is_important, user };
			const task: Document[] = await TaskModel.create([param]);

			return res.json(task[0]);
		} catch (err) {
			logger.error(err);

			return res.status(500).json(internalError());
		}
	}

	/**
   * update()
   *
   * Update the information of the task
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async update(req: Request, res: Response, next: NextFunction): Promise<any> {
		const id: string = req.params.id;
		const data: any = parseRequest(req.body, taskUpdateParams);
		let updatedTask: Document|null = null;

		try {
			if (data !== null) {
				await TaskModel.findOneAndUpdate({ _id: id }, data);
			}
			updatedTask = await TaskModel.findOne({ _id: id });

			return res.json(updatedTask);
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}

	/**
   * destroy()
   *
   * Delete a task in the database
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async destroy(req: Request, res: Response, next: NextFunction): Promise<any> {
		const id: string = req.params.id;

		try {
			await TaskModel.deleteOne({ _id: id });

			return res.json({ message: Locale.trans('model.deleted', { model: 'Task' }) });
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}

	/**
   * all()
   *
   * Get all tasks in the database
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async all(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const tasks: Document[] = await TaskModel.find({}).sort('-created_at').exec();

			const transformer: TaskTransformer = new TaskTransformer(tasks);

			return res.json(await transformer.transform());
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}

	/**
   * one()
   *
   * Get a task by it's ID
   *
   * @param {Request} req: Request object
   * @param {Response} res: Response object
   * @param {NextFunction} next: NextFunction object
   *
   * @return Object
   */
	public static async one(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const task: Document|null = await TaskModel.findOne({ _id: req.params.id });

			if (!task) {
				return res.status(404).json({
																			message: Locale.trans('model.not.found', { model: 'Task' }),
																		});
			}

			const transformer: TaskTransformer = new TaskTransformer(task);

			return res.json(await transformer.transform());
		} catch (err) {
			logger.error(err);

			return res.status(500).json({ message: internalError() });
		}
	}
}

export { TaskController };
