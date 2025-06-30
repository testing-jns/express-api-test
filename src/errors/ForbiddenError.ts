import status from 'http-status';

import CustomError from './CustomError';

export default class ForbiddenError extends CustomError {
  constructor(message: string) {
    super({
      name: 'Forbidden',
      message,
      statusCode: status.FORBIDDEN,
      code: 'ERR_FORBIDDEN',
    });
  }
}
