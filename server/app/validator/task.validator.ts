import { check, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

import { Locale } from '../core/locale';
import { Validator } from './index';

import { TaskModel } from '../models/task.model';
import { REGEX } from '../utils/constants';

export default {
	validate: (method: string): (ValidationChain | ((req: Request, res: Response, next: NextFunction) => void))[] => {
		const validator: Validator = new Validator();

		switch (method) {
			case 'createTask': {
				return [
					check('title').not().isEmpty().withMessage(() => { return Locale.trans('input.empty'); }),
					check('description').not().isEmpty().withMessage(() => { return Locale.trans('input.empty'); }),
					check('status').not().isEmpty().withMessage(() => { return Locale.trans('input.empty'); }),
					check('date').not().isEmpty().withMessage(() => { return Locale.trans('input.empty'); }),
					check('is_important').not().isEmpty().withMessage(() => { return Locale.trans('input.empty'); }),
					check('user').not().isEmpty().withMessage(() => { return Locale.trans('input.empty'); }),
					check('title')
						.custom(async (value: any, { req }: any) => {
							const { title, user }: any = req.body;
							const task: Document|null = await TaskModel.findOne({ title, user });

							if (task) {
								throw new Error(Locale.trans('input.taken'));
							}
						}),
					check('date')
						.custom(async (value: any, { req }: any) => {
							if (!REGEX.date.test(req.body.date)) {
								throw new Error(Locale.trans('input.date.invalid'));
							}
						}),
					(req: Request, res: Response, next: NextFunction): void => {
						validator.validationHandler(req, res, next);
					},
				];
			}
			case 'updateTask': {
				return [
					check('title').optional().not().isEmpty()
						.withMessage(() => { return Locale.trans('input.empty'); }),
					check('description').optional().not().isEmpty()
						.withMessage(() => { return Locale.trans('input.empty'); }),
					check('status').optional().not().isEmpty()
						.withMessage(() => { return Locale.trans('input.empty'); }),
					check('date').optional().not().isEmpty()
						.withMessage(() => { return Locale.trans('input.empty'); }),
					check('is_important').optional().not().isEmpty()
						.withMessage(() => { return Locale.trans('input.empty'); }),
					check('title')
						.optional()
						.custom(async (value: any, { req }: any) => {
							const task: any = await TaskModel.findOne({ _id: req.params.id });
							const taskExist: Document|null = await TaskModel.findOne({
																																					title: req.body.title,
																																					user: task.user,
																																				});
							const { _id }: any = task;

							if (taskExist && _id.toString() !== taskExist._id.toString()) {
								throw new Error(Locale.trans('input.taken'));
							}
						}),
					check('date')
						.custom(async (value: any, { req }: any) => {
							if (req.body.date && !REGEX.date.test(req.body.date)) {
								throw new Error(Locale.trans('input.date.invalid'));
							}
						}),
					(req: Request, res: Response, next: NextFunction): void => {
						validator.validationHandler(req, res, next);
					},
				];
			}
			default:
				return [
					(req: Request, res: Response, next: NextFunction): void => {
						validator.validationHandler(req, res, next);
					},
				];
		}
	},
};
