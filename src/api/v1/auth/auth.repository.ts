import type { Prisma, Session, User } from '@prisma/client';

import db from '@/db/db';

// type CreateSession = {
//   userId: string;
//   refreshToken: string;
//   userAgent?: string;
//   ipAddress?: string;
//   expiresAt?: Date;
// };

export const create = async (
  user: Prisma.UserUncheckedCreateInput,
  options?: Omit<Prisma.UserFindUniqueArgs, 'where'>,
): Promise<Omit<User, 'password'> | null> => {
  return await db.user.create({ data: user, ...options });
};

export const findById = async (
  id: string,
  options?: Omit<Prisma.UserFindUniqueArgs, 'where'>,
): Promise<User | null> => {
  return await db.user.findUnique({ where: { id }, ...options });
};

export const findByUsername = async (
  username: string,
): Promise<User | null> => {
  return await db.user.findUnique({ where: { username } });
};

export const findByEmail = async (email: string): Promise<User | null> => {
  return await db.user.findUnique({ where: { email } });
};

export const findSession = async (refreshToken: string): Promise<Session | null> => {
  return await db.session.findUnique({ where: { refreshToken } });
};

export const findSessionWithUser = async (refreshToken: string): Promise<Session & { user: User } | null> => {
  return await db.session.findUnique({ where: { refreshToken }, include: { user: true } });
};

// export const findSession = async <T extends Prisma.SessionFindUniqueArgs>(
//   refreshToken: string,
//   options?: Omit<T, 'where'>
// ): Promise<Prisma.PromiseReturnType<typeof db.session.findUnique<T>>> => {
//   return await db.session.findUnique({
//     where: { refreshToken },
//     ...options,
//   });
// };

export const createSession = async (session: Prisma.SessionUncheckedCreateInput): Promise<Session | null> => {
  return await db.session.create({ data: session });
};

export const deleteSession = async (refreshToken: string): Promise<Session | null> => {
  return db.session.delete({ where: { refreshToken } });
};
