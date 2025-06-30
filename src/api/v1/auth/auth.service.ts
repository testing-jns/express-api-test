import type { Session, User } from '@prisma/client';
import type { JwtPayload } from 'jsonwebtoken';

import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

import env from '@/env';
import PrismaError from '@/errors/PrismaError';

import * as authRepository from './auth.repository';

type CreateSession = {
  userId: string;
  refreshToken: string;
  userAgent: string;
  ipAddress: string;
};

export const signupUser = async (
  user: User,
): Promise<Omit<User, 'password'> | null | void> => {
  user.password = await bcrypt.hash(user.password, 10);

  try {
    return await authRepository.create(user, { omit: { password: true } });
  }
  catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError('Error creating user');
    }
  }
};

export const comparePassword = async (
  reqPassword: string,
  userPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(reqPassword, userPassword);
};

export const generateAccessToken = async (id: string, role: string): Promise<string> => {
  return jwt.sign({ userId: id, role }, env.JWT_PRIVATE_KEY, {
    expiresIn: '1h',
    algorithm: 'ES256',
  });
};

export const verifyAccessToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, env.JWT_PUBLIC_KEY);
};

export const generateRefreshToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

export const getUserById = async (
  id: string,
  options?: Omit<Prisma.UserFindUniqueArgs, 'where'>,
): Promise<User | null> => {
  return await authRepository.findById(id, options);
};

export const getUserByUsername = async (
  username: string,
): Promise<User | null> => {
  return await authRepository.findByUsername(username);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await authRepository.findByEmail(email);
};

export const getSessionWithUser = async (refreshToken: string): Promise<Session & { user: User } | null> => {
  return await authRepository.findSessionWithUser(refreshToken);
};

// export const getSession = async <T extends Prisma.SessionFindUniqueArgs>(
//   refreshToken: string,
//   options?: Omit<T, 'where'>
// ): Promise<
//   T extends { include: { user: true } }
//     ? (Session & { user: User }) | null
//     : Session | null
// > => {
//   return await authRepository.findSession(refreshToken, options);
// };

export const createSession = async (session: CreateSession): Promise<Session | null | void> => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  try {
    return await authRepository.createSession({ ...session, expiresAt });
  }
  catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError('Error creating user');
    }
  }
};

export const getSession = async (refreshToken: string): Promise<Session | null> => {
  return await authRepository.findSession(refreshToken);
};

export const deleteSession = async (refreshToken: string): Promise<Session | null> => {
  return await authRepository.deleteSession(refreshToken);
};
