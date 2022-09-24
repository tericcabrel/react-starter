import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

let configPath: string;

switch (process.env.NODE_ENV) {
	case 'test':
		configPath = path.resolve(__dirname, '../../.env.test');
		break;
	case 'production':
		configPath = path.resolve(__dirname, '../../.env.prod');
		break;
	default:
		configPath = path.resolve(__dirname, '../../.env');
}

dotenv.config({ path: configPath });

const e: any = process.env;

const ENV: string = e.NODE_ENV || '';
const BASE_URL: string = e.BASE_URL || '';
const SERVER_PORT: number = parseInt(e.SERVER_PORT || '7010', 10);
const APP_NAME: string = e.APP_NAME || '';
const APP_VERSION : string = e.APP_VERSION || '';
const API_BASE: string = e.API_BASE || '';
const DEFAULT_TIMEZONE: string = e.DEFAULT_TIMEZONE || '';
const AUTH_ENABLED: string = e.AUTH_ENABLED || 'true';
const JWT_SECRET: string = e.JWT_SECRET || 'UMbEJrHSNF$aZc50uRP9B1kz';
const JWT_EXPIRE: string = e.JWT_EXPIRE || '86400';
const JWT_EMAIL_SECRET: string = e.JWT_EMAIL_SECRET || 'xIT8Vq3Yh$tuDva4I2FxegDo';
const JWT_EMAIL_EXPIRE: string = e.JWT_EMAIL_EXPIRE || '300';
const JWT_REFRESH_SECRET: string = e.JWT_REFRESH_SECRET || 'rWJ2WRT4F5!5NUzzwPwnsZXy';
const JWT_REFRESH_EXPIRE: string = e.JWT_REFRESH_EXPIRE || '608400';
const DB_URL: string = e.DB_URL || '';
const LOG_FILE_DIR: string = e.LOG_FILE_DIR || '';
const MAIL_USERNAME: string = e.MAIL_USERNAME || '';
const MAIL_PASSWORD: string = e.MAIL_PASSWORD || '';
const MAIL_HOST: string = e.MAIL_HOST || '';
const MAIL_PORT: string = e.MAIL_PORT || '';
const WEB_APP_URL: string = e.WEB_APP_URL || '';
const RESET_PASSWORD_PATH: string = e.RESET_PASSWORD_PATH || '';
const CONFIRM_ACCOUNT_PATH: string = e.CONFIRM_ACCOUNT_PATH || '';
const COUNTRY_REST_BASE_URL: string = e.COUNTRY_REST_BASE_URL || '';
const REDIS_HOST: string = e.REDIS_HOST || 'localhost';
const REDIS_PORT: number = parseInt(e.REDIS_HOST || '6379', 10);

export {
	ENV, BASE_URL, SERVER_PORT, APP_NAME, APP_VERSION, API_BASE, DEFAULT_TIMEZONE, AUTH_ENABLED, JWT_SECRET, JWT_EXPIRE,
	JWT_EMAIL_SECRET, JWT_EMAIL_EXPIRE, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE, DB_URL, LOG_FILE_DIR, MAIL_USERNAME,
	MAIL_PASSWORD, MAIL_HOST, MAIL_PORT, WEB_APP_URL, RESET_PASSWORD_PATH, CONFIRM_ACCOUNT_PATH, COUNTRY_REST_BASE_URL,
	REDIS_HOST, REDIS_PORT,
};
