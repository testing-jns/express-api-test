import status from 'http-status';

import CustomError from './CustomError';

export default class EmailAlreadyTakenError extends CustomError {
  constructor(message: string) {
    super({
      name: 'Email Already Taken',
      message,
      statusCode: status.CONFLICT,
      code: 'ERR_EMAIL_ALREADY_TAKEN',
    });
  }
}
