import { Router } from 'express';

import { requireAdmin } from '@/middlewares/requireAdmin';

import { createCategory, deleteCategory, getCategoryBySlug, listCategories, updateCategory } from './categories.controller';

export const CategoryRouter: Router = Router();

CategoryRouter.get('/', listCategories);
CategoryRouter.get('/:slug', getCategoryBySlug);
CategoryRouter.post('/', [requireAdmin], createCategory);
CategoryRouter.patch('/:slug', [requireAdmin], updateCategory);
CategoryRouter.delete('/:slug', [requireAdmin], deleteCategory);
