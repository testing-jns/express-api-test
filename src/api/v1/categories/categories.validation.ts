import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export const updateCategorySchema = createCategorySchema.optional();
