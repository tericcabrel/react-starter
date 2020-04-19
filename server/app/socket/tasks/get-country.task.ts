import joi from '@hapi/joi';
import axios, { AxiosResponse } from 'axios';

import { SocketSession, SocketSessionItem } from '../../core/types/socket';
import { SOCKET_RESPONSE_EVENT } from '../events';
import { SocketTask } from './task';
import { COUNTRY_REST_BASE_URL } from '../../core/config';

class GetCountryTask {
	static schema: joi.ObjectSchema = joi.object().keys({
		code: joi.string().required(),
	});

	static async run(socketSessions: SocketSession, socketSessionId: string, data: any): Promise<void> {
		const sessionItem: SocketSessionItem | undefined = socketSessions[socketSessionId];

		const joiValidation: joi.ValidationResult<joi.ObjectSchema> = SocketTask.validateWithDefaultSchema(
			data,
			GetCountryTask.schema,
		);

		if (joiValidation.error) {
			const response: string = JSON.stringify({ errorType: 'wrong format', error: joiValidation.error.message });

			sessionItem.socket.emit(SOCKET_RESPONSE_EVENT, response);

			return;
		}

		try {
			const response: AxiosResponse = await axios.get(`${COUNTRY_REST_BASE_URL}/alpha/${data.code}`);

			if (sessionItem !== undefined) {
				const result: object = { rqid: data.rqid, data: response.data };

				sessionItem.socket.emit(SOCKET_RESPONSE_EVENT, JSON.stringify(result));
			}
		} catch (e) {
			if (sessionItem !== undefined) {
				sessionItem.socket.emit(SOCKET_RESPONSE_EVENT, JSON.stringify({ error: e.response.data }));
			}
		}
	}
}

export { GetCountryTask };
