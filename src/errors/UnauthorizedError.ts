import status from 'http-status';

import CustomError from './CustomError';

export default class UnauthorizedError extends CustomError {
  constructor(message: string, code?: string) {
    super({
      name: 'Unauthorized',
      message,
      statusCode: status.UNAUTHORIZED,
      code: code || 'ERR_UNAUTHORIZED',
    });
  }
}
