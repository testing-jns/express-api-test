import type { Category, Prisma } from '@prisma/client';

import db from '@/db/db';

export const findAll = async (): Promise<Category[]> => {
  return await db.category.findMany();
};

export const findBySlug = async (
  slug: string,
  options?: Omit<Prisma.CategoryFindUniqueArgs, 'where'>,
): Promise<Category | null> => {
  return await db.category.findUnique({ where: { slug }, ...options });
};

export const create = async (
  category: Prisma.CategoryUncheckedCreateInput,
): Promise<Category | null> => {
  return await db.category.create({ data: category });
};

export const update = async (
  id: string,
  category: Prisma.CategoryUncheckedUpdateInput,
): Promise<Category | null> => {
  return await db.category.update({ where: { id }, data: category });
};

export const deleteCategory = async (id: string): Promise<Category | null> => {
  return await db.category.delete({ where: { id } });
};
