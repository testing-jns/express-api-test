import type { NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';

import CustomError from '@/errors/CustomError';
import { formatZodErrors, getErrorMessage } from '@/utils/helper';
// import { logger } from '@/utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    next(err);
  }

  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      code: 'ERR_VALIDATION',
      message: 'The given data was invalid.',
      errors: formatZodErrors(err),
    });
    return;
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
      // errors: {},
    });
    return;
  }

  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({
      success: false,
      code: 'ERR_INVALID_JSON_FORMAT',
      message: 'Invalid JSON format.',
    });
  }

  // logger.error(err);

  res.status(500).json({
    success: false,
    code: 'ERR_INTERNAL_SERVER',
    message: getErrorMessage(err),
    // errors: {},
  });
};
