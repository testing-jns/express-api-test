import status from 'http-status';

import CustomError from './CustomError';

export default class EntityNotFoundError extends CustomError {
  constructor(message: string) {
    super({
      name: 'Entity Not Found',
      message,
      statusCode: status.NOT_FOUND,
      code: 'ERR_ENTITY_NOT_FOUND',
    });
  }
}
