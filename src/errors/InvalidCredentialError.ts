import status from 'http-status';

import CustomError from './CustomError';

export default class InvalidCredentialError extends CustomError {
  constructor(message: string) {
    super({
      name: 'Invalid Credentials',
      message,
      statusCode: status.BAD_REQUEST,
      code: 'ERR_INVALID_CREDENTIALS',
    });
  }
}
