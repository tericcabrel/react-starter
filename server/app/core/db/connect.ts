import mongoose from 'mongoose';

import * as config from '../config';

import { logger } from '../logger';
import { DB_CONNECTION_SUCCESS } from '../../utils/constants';

mongoose.Promise = global.Promise;

/**
 * Create the connection to the database
 * @async
 *
 * @return Promise<void>
 */
const dbConnection: Function = async (): Promise<void> => {
	const dbHost: string = config.DB_HOST;
	const dbPort: number = config.DB_PORT;
	const dbName: string = config.DB_NAME;
	const dbUser: string = config.DB_USER;
	const dbPassword: string = config.DB_PASSWORD;

	const options: object = {
		useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true,
	};

	try {
		if (config.DB_AUTH !== 'true') {
			await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, options);
		} else {
			await mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, options);
		}
		logger.info(DB_CONNECTION_SUCCESS);
	} catch (err) {
		logger.error(err.stack);
	}
};

export { dbConnection };
