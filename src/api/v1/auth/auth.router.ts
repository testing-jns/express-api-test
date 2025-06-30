import { Router } from 'express';

// import { requireAdmin } from '@/middlewares/requireAdmin';
import { requireUser } from '@/middlewares/requireUser';

import { login, logout, me, refresh, signup } from './auth.controller';

export const AuthRouter: Router = Router();

AuthRouter.post('/signup', signup);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);
AuthRouter.get('/me', [requireUser], me);
AuthRouter.post('/refresh', refresh);
