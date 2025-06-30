import { z } from 'zod';

export const createPostSchema = z.object({
  slug: z.string().nonempty({ message: '"slug" can\'t be empty' }),
  title: z.string().nonempty({ message: '"title" can\'t be empty' }),
  thumbnail: z.string().nonempty({ message: '"thumbnail" can\'t be empty' }),
  content: z.string().nonempty({ message: '"content" can\'t be empty' }),
  // isPublished: z.boolean().default(false),
  categoryId: z.string().nonempty({ message: '"categoryId" can\'t be empty' }),
  // deletedAt: z.date().optional(),
  tags: z.array(z.string()).nonempty({ message: '"tags" can\'t be empty' }),
});

// export type Post = z.infer<typeof postSchema>;

export const updatePostSchema = createPostSchema.partial();
