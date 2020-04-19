import { AxiosResponse } from 'axios';

import { InvalidDataResponse } from '../types/redux';
import { capitalize } from './helpers';

export const parseHTTPResponse: any = (response: AxiosResponse): string => {
  const { data, status }: AxiosResponse = response;

  switch (status) {
    case 400: // Bad request
      return data.message;
    case 401: // Unauthorized
      return data.message;
    case 403: // Forbidden
      return data;
    case 404: // Not found
      return data.message;
    case 422:
      const error: InvalidDataResponse = data;
      let result: string = '';

      console.log(error.errors);
      for (const property in error.errors) {
        result += `${capitalize(property)}: ${error.errors[property].join('; ')} - `;
      }

      console.log(result);

      return result;
    case 500: // Internal server error
      return data;
    case 504: // Time out
      return data;

    default:
      return `Http response error with status code: ${status}`;
  }
};
