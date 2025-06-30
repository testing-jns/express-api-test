import type { NextFunction, Request, Response } from 'express';

import UnsupportedContentTypeError from '@/errors/UnsupportedContentTypeError';

export default (req: Request, res: Response, next: NextFunction): void => {
  const contentType: string | undefined = req.get('Content-Type');

  if (!contentType || contentType !== 'application/json') {
    return next(
      new UnsupportedContentTypeError(
        'Invalid Content-Type. Only application/json is allowed.',
      ),
    );
  }

  next();
};
