import type { Request, Response } from 'express';

import EntityNotFoundError from '@/errors/EntityNotFoundError';

import * as categoryService from './categories.service';
import {
  createCategorySchema,
  updateCategorySchema,
} from './categories.validation';

export const listCategories = async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();

  res.json({ success: true, data: categories });
};

export const getCategoryBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const category = await categoryService.getCategoryBySlug(slug);

  if (!category) {
    throw new EntityNotFoundError(`Category with slug ${slug} not found!`);
  }

  res.json({ success: true, data: category });
};

export const createCategory = async (req: Request, res: Response) => {
  createCategorySchema.parse(req.body);
  res.json({ success: true, data: {} });
};

export const updateCategory = async (req: Request, res: Response) => {
  updateCategorySchema.parse(req.body);
  const { slug } = req.params;
  res.json({ success: true, data: { slug } });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;
  res.json({ success: true, data: { slug } });
};
