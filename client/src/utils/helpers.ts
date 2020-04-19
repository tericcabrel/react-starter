import { SocketResponse } from '../types/redux';
import { ApplicationError } from '../types/common';

/**
 * Takes the response return by the socket and parse to check if
 * it an error or success response
 *
 * @function
 * @param {string} message - Message returned by the socket.
 * @return SocketResponse|ApplicationError
 */
export const parseSocketResponseMessage: Function = (message: string): SocketResponse | ApplicationError => {
  try {
    const object: SocketResponse = JSON.parse(message);

    if (object.error) {
      return {
        errorType: 'Socket Error',
        message: object.error
      };
    }

    return object;
  } catch (e) {
    console.log('Response Parsing Error Message => ', e.toString());

    return {
      errorType: 'Socket Response Parsing Error ',
      message: { details: [e.toString()], response: [message] }
    };
  }
};

/**
 * Makes to uppercase the first letter of a word
 *
 * @function
 * @param {string} word - Word to capitalize
 * @return string
 */
export const capitalize: (word: string) => string = (word: string): string => {
  if (word.length === 0) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Check if a variable is an object or not
 *
 * @function
 * @param {any} obj - Parameter to check
 * @return boolean
 */
export const isObject: (obj: any) => boolean = (obj: any): boolean => {
  return (typeof obj === 'object' && obj !== null) || typeof obj === 'function';
};
