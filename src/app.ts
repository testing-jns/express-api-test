import type { Express, Request, Response } from 'express';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import pinoHttp from 'pino-http';

import { RootRouter } from '@/api/v1';
import { scalarDocs } from '@/config/scalar';
import { specs } from '@/config/swagger';
import { errorHandler } from '@/middlewares/errorHandler';
import { genReqId, httpLogger } from '@/utils/logger';

const corsOptions = {
  // origin: ['http://'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export function createApp(): Express {
  const app: Express = express();

  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(morgan('dev'))
    .use(pinoHttp({ logger: httpLogger, genReqId }))
    .use(
      helmet.hsts(),
      helmet.noSniff(),
      helmet.xPoweredBy(),
      helmet.permittedCrossDomainPolicies(),
    )
    .use(cors(corsOptions));

  app.get('/openapi.json', (req: Request, res: Response) => {
    res.json(specs);
  });

  app.use('/docs', scalarDocs);

  app.get('/health', (req: Request, res: Response): void => {
    res.json({ succes: true });
  });

  app.use('/api/v1', RootRouter);

  app.use(errorHandler);

  return app;
}
