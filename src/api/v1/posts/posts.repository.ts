import type { Post, Prisma } from '@prisma/client';

import db from '@/db/db';

export const findAll = async (): Promise<Post[]> => {
  return await db.post.findMany({ include: { category: true, tags: true }, orderBy: { createdAt: 'desc' } });
};

export const findBySlug = async (slug: string): Promise<Post | null> => {
  return await db.post.findUnique({ where: { slug } });
};

export const findByTitleOrSlug = async (title: string, slug: string): Promise<Post | null> => {
  return await db.post.findFirst({
    where: { OR: [{ title }, { slug }] },
  });
};

export const create = async (post: Prisma.PostUncheckedCreateInput): Promise<Post | null> => {
  return await db.post.create({ data: post });
};

export const update = async (slug: string, post: Prisma.PostUncheckedUpdateInput): Promise<Post | null> => {
  return await db.post.update({ where: { slug }, data: post });
};

export const deleteBySlug = async (slug: string): Promise<Post | null> => {
  return await db.post.delete({ where: { slug } });
};
