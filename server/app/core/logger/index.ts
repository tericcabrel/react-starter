import path from 'path';
import * as fs from 'fs';
import { createLogger, format, transports, Logger } from 'winston';
import { isObject } from 'lodash';

import * as config from '../config';

type EnhancedLogger = {
	error: (output: unknown, logToSentry?: boolean) => void;
	info: (output: unknown) => void;
};

const { combine, printf, timestamp }: typeof format = format;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const t: any = require('winston-daily-rotate-file');

const logFileDir: string = path.join(__dirname, config.LOG_FILE_DIR);

if (!fs.existsSync(logFileDir)) {
	fs.mkdirSync(logFileDir);
}
const transport: any = new (t)({
																 dirname: logFileDir,
																 filename: 'logs/app-%DATE%.log',
																 datePattern: 'YYYY-MM-DD-HH',
																 zippedArchive: true,
																 maxSize: '20m',
																 maxFiles: '14d',
															 });

const logMessage = (message: any): string => {
	// @ts-ignore
	return isObject(message) ? (message.stack ? message.stack : JSON.stringify(message, null, 2)) : message.toString();
};

const myFormat = printf((info) => {
	const { level, message, timestamp } = info;

	return `${timestamp} ${level}: ${logMessage(message)}`;
});

const winstonLogger: Logger = createLogger({
 format: combine(timestamp(), myFormat),
 silent: config.ENV === 'test',
 transports: [transport, new transports.Console()],
});

const logger: EnhancedLogger = {
	error: (error: unknown, toSentry = true) => {
		winstonLogger.error(logMessage(error));
	},
	info: (output: unknown) => winstonLogger.info(logMessage(output)),
};

export { logger };

