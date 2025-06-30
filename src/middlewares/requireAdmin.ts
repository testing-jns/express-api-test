import type { NextFunction, Request, Response } from 'express';

import ForbiddenError from '@/errors/ForbiddenError';

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.user?.role !== 'ADMIN') {
    return next(
      new ForbiddenError(
        'Forbidden: You don\'t have permission to access this resource.',
      ),
    );
  }

  next();
};
