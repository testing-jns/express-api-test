import type { Request, Response } from 'express';

import EntityAlreadyExistsError from '@/errors/EntityAlreadyExistsError';
import EntityNotFoundError from '@/errors/EntityNotFoundError';
import ForbiddenError from '@/errors/ForbiddenError';

import * as postService from './posts.service';
import { createPostSchema, updatePostSchema } from './posts.validation';

export const listPosts = async (req: Request, res: Response): Promise<void> => {
  const posts = await postService.getAllPosts();

  res.json({ success: true, data: posts });
};

export const getPostBySlug = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { slug } = req.params;

  const post = await postService.getPostBySlug(slug);

  if (!post) {
    throw new EntityNotFoundError(`Post with slug ${slug} not found!`);
  }

  res.json({ success: true, data: post });
};

export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = createPostSchema.parse(req.body);
  const userId = req.user!.id;

  const isPostExists = await postService.getPostByTitleOrSlug(
    body.title,
    body.slug,
  );

  if (isPostExists) {
    throw new EntityAlreadyExistsError(
      'A post with the same title or slug already exists',
    );
  }

  const post = await postService.createPost({ ...body, userId });

  res.json({ success: true, data: post });
};

export const updatePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = updatePostSchema.parse(req.body);
  const { slug } = req.params;
  const { id: userId, role } = req.user!;

  const post = await postService.getPostBySlug(slug);

  if (!post) {
    throw new EntityNotFoundError(`Post with slug ${slug} not found!`);
  }

  if (post.userId !== userId && role !== 'ADMIN') {
    throw new ForbiddenError('You are not authorized to perform this action');
  }

  const result = await postService.updatePost({ slug, ...body });

  res.json({ success: true, data: result });
};

export const deletePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { slug } = req.params;
  const { id: userId, role } = req.user!;

  const post = await postService.getPostBySlug(slug);

  if (!post) {
    throw new EntityNotFoundError(`Post with slug ${slug} not found!`);
  }

  if (post.userId !== userId && role !== 'ADMIN') {
    throw new ForbiddenError('You are not authorized to perform this action');
  }

  await postService.deletePost(slug);

  res.json({ success: true });
};
