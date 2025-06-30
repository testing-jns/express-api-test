import status from 'http-status';

import CustomError from './CustomError';

export default class EntityAlreadyExistsError extends CustomError {
  constructor(message: string) {
    super({
      name: 'Entity Already Exists',
      message,
      statusCode: status.CONFLICT,
      code: 'ERR_CONFLICT',
    });
  }
}
