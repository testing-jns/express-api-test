import type { User } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

import { TokenExpiredError } from 'jsonwebtoken';

import * as authService from '@/api/v1/auth/auth.service';
import UnauthorizedError from '@/errors/UnauthorizedError';

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token: string | undefined = req
    .get('Authorization')
    ?.replace('Bearer ', '');

  if (!token) {
    return next(
      new UnauthorizedError(
        'Unauthorized. Please provide a valid token.',
        'ERR_UNAUTHORIZED',
      ),
    );
  }

  try {
    const payload: JwtPayload | string = authService.verifyAccessToken(
      token as string,
    ) as JwtPayload;

    // const user: User | null = await authService.getUserById(payload.userId, {
    //   omit: {
    //     id: true,
    //     password: true,
    //     createdAt: true,
    //     updatedAt: true,
    //   },
    // });

    const user: User | null = await authService.getUserById(payload.userId);

    req.user = user;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(
        new UnauthorizedError(
          'Token has expired. Please log in again.',
          'ERR_TOKEN_EXPIRED',
        ),
      );
    }

    return next(
      new UnauthorizedError(
        'Unauthorized. Please provide a valid token.',
        'ERR_NOT_VALID_TOKEN',
      ),
    );
  }

  next();
};
