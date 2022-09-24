import * as express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import * as path from 'path';

import * as config from '../core/config';

import { DefaultRouter } from './default.route';
import { AuthRouter } from './auth.route';
import { UserRouter } from './user.route';
import { TaskRouter } from './task.route';

import { localeMiddleware } from '../core/middleware/locale';
import { authMiddleware } from '../core/middleware/auth';

/**
 * Global router configuration of the application
 *
 * @class
 */
class Routes {
	/**
   * @param  {Application} app
   *
   * @returns void
   */
	static init(app: express.Application): void {
		const router: express.Router = express.Router();

		// Express middleware
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		// app.use(cookieParser());
		// app.use(helmet());
		// app.use(helmet.noSniff());
		app.use(cors());

		app.use(localeMiddleware);

		if (config.AUTH_ENABLED === 'true') {
			app.use(authMiddleware);
		}

		app.use('/', router);
		// default
		app.use('/', new DefaultRouter().router);
		// auth
		app.use('/', new AuthRouter().router);
		// users
		app.use('/', new UserRouter().router);
		// tasks
		app.use('/', new TaskRouter().router);

		// Static content
		app.use(express.static(path.join(__dirname, '../../public')));

		if (config.ENV === 'production') {
			app.use(express.static(path.resolve(__dirname, '../../client')));
		}
	}
}

export { Routes };
