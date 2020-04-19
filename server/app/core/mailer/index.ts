import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';
import handlebars from 'handlebars';
import * as Mail from 'nodemailer/lib/mailer';

import * as config from '../config';
import { logger } from '../logger';
import { Locale } from '../locale';

/**
 * This class is responsible to send email with HTML template
 *
 * @class
 */
class Mailer {
	/**
   * Set a value in Redis
   * @static
   *
   * @param {Object} data
   *
   * @return void
   */
	static sendMail(data: any): void {
		try {
			const user: string = config.MAIL_USERNAME;

			const smtpTransport: Mail = nodemailer.createTransport({
				// @ts-ignore
				host: config.MAIL_HOST,
				port: config.MAIL_PORT,
				auth: {
					user,
					pass: config.MAIL_PASSWORD,
				},
			});

			const filePath: string = `${path.join(__dirname, `./templates/${Locale.getLocale()}`)}/${data.template}.html`;
			const source: Buffer = fs.readFileSync(filePath);
			const template: HandlebarsTemplateDelegate<string> = handlebars.compile(source.toString());
			const html: string = template(data.context);

			const updatedData: any = {
				...data,
				html,
				from: `Node Starter <${user}>`,
				subject: Locale.trans(data.subject),
			};

			smtpTransport.sendMail(updatedData).then((result: nodemailer.SentMessageInfo): void => {
				logger.info(result.toString());
			});
		} catch (e) {
			logger.error(e);
		}
	}
}

export default Mailer;
