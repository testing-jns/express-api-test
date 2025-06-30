import status from 'http-status';

import CustomError from './CustomError';

export default class PrismaError extends CustomError {
  constructor(message: string) {
    super({
      name: 'Prisma Error',
      message,
      statusCode: status.INTERNAL_SERVER_ERROR,
      code: 'ERR_PRISMA',
    });
  }
}
