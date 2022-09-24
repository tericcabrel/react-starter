import mongoose, { ConnectOptions } from 'mongoose';

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
const dbConnection = async (): Promise<void> => {
	try {
		await mongoose.connect(config.DB_URL);

		logger.info(DB_CONNECTION_SUCCESS);
	} catch (err) {
		logger.error(err);
	}
};

export { dbConnection };
