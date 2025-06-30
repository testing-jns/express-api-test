import { Router } from 'express';

import { requireUser } from '@/middlewares/requireUser';

import {
  createPost,
  deletePost,
  getPostBySlug,
  listPosts,
  updatePost,
} from './posts.controller';

export const PostRouter: Router = Router();

PostRouter.get('/', listPosts);
PostRouter.get('/:slug', getPostBySlug);
PostRouter.post('/', [requireUser], createPost);
PostRouter.patch('/:slug', [requireUser], updatePost);
PostRouter.delete('/:slug', [requireUser], deletePost);
