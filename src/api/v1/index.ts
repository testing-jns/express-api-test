import { Request, Response, Router } from 'express';

import { AuthRouter } from '@/api/v1/auth/auth.router';
import { CategoryRouter } from '@/api/v1/categories/categories.router';
import { PostRouter } from '@/api/v1/posts/posts.router';
import { logger } from '@/utils/logger';

export const RootRouter: Router = Router();

RootRouter.use('/auth', AuthRouter);
RootRouter.use('/posts', PostRouter);
// RootRouter.use('/tags');
RootRouter.use('/categories', CategoryRouter);
RootRouter.use('/waduh', (req: Request, res: Response) => {
  logger.error('Waduhhh Erorrr!');
  throw new Error('Aduh Error!');
  res.json({ ea: 'error' });
});
