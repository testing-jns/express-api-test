import type { Category } from '@prisma/client';

import { Prisma } from '@prisma/client';

import PrismaError from '@/errors/PrismaError';

import * as categoryRepository from './categories.repository';

type CreateCategoryInput = {
  name: string;
  slug: string;
};

type UpdateCategoryInput = {
  id: string;
  name: string;
  slug: string;
};

export const getAllCategories = async (): Promise<Category[]> => {
  return await categoryRepository.findAll();
};

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  return await categoryRepository.findBySlug(slug);
};

export const createCategory = async (category: CreateCategoryInput): Promise<Category | null | void> => {
  try {
    return await categoryRepository.create(category);
  }
  catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError('Error creating category');
    }
  }
};

export const updateCategory = async (category: UpdateCategoryInput): Promise<Category | null | void> => {
  try {
    const { id, ...data } = category;
    return await categoryRepository.update(id, data);
  }
  catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError('Error creating category');
    }
  }
};

export const deleteCategory = async (id: string): Promise<Category | null> => {
  return await categoryRepository.deleteCategory(id);
};
