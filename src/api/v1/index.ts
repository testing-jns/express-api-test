import { Router } from 'express';

import { AuthRouter } from '@/api/v1/auth/auth.router';
import { CategoryRouter } from '@/api/v1/categories/categories.router';
import { PostRouter } from '@/api/v1/posts/posts.router';

export const RootRouter: Router = Router();

RootRouter.use('/auth', AuthRouter);
RootRouter.use('/posts', PostRouter);
// RootRouter.use('/tags');
RootRouter.use('/categories', CategoryRouter);
