import type { User } from '@prisma/client';
import type { Request, Response } from 'express';

import EmailAlreadyTakenError from '@/errors/EmailAlreadyTakenError';
import InvalidCredentialError from '@/errors/InvalidCredentialError';
import UnauthorizedError from '@/errors/UnauthorizedError';
import { buildSessionPayload } from '@/utils/helper';

import * as authService from './auth.service';
import {
  loginUserSchema,
  refreshTokenSchema,
  signupUserSchema,
} from './auth.validation';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email } = signupUserSchema.parse(req.body);

  const isEmailAlreadyTaken = await authService.getUserByEmail(email);

  if (isEmailAlreadyTaken) {
    throw new EmailAlreadyTakenError(
      'The email address is already associated with another account.',
    );
  }

  const user = await authService.signupUser(req.body);

  res.status(201).json({ success: true, data: user });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = loginUserSchema.parse(req.body);

  const user: User | null = await authService.getUserByEmail(email);

  // Timing Attack

  // Ini bisa aja jadi vuln, niatnya supaya ga ketauan username sama password nya apa,
  //   jadi di return Invalid credentials
  // Tapi ketika ga ada user nya trus langsung return bahwa invalid credentials,
  //   attacker bisa dengan mudah nebak user by time response nya

  if (!user) {
    throw new InvalidCredentialError('Invalid credentials');
  }

  const isPasswordCorrect = await authService.comparePassword(
    password,
    user.password,
  );

  if (!isPasswordCorrect) {
    throw new InvalidCredentialError('Invalid credentials');
  }

  const accessToken = await authService.generateAccessToken(user.id, user.role);
  const refreshToken = authService.generateRefreshToken();
  const sessionPayload = buildSessionPayload(req, user.id, refreshToken);

  await authService.createSession(sessionPayload);

  res.json({ success: true, accessToken, refreshToken });
};

export const me = (req: Request, res: Response): void => {
  res.json({ success: true, data: req.user });
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = refreshTokenSchema.parse(req.body);

  const session = await authService.getSessionWithUser(refreshToken);

  if (!session || session.expiresAt < new Date()) {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }

  const accessToken = await authService.generateAccessToken(
    session!.user.id,
    session!.user.role,
  );

  res.json({ success: true, accessToken });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = refreshTokenSchema.parse(req.body);

  const session = await authService.getSession(refreshToken);

  if (!session || session.expiresAt < new Date()) {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }

  await authService.deleteSession(refreshToken);

  res.json({ success: true });
};
