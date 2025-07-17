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
    // eslint-disable-next-line unused-imports/no-unused-vars
    .use(
      pinoHttp({
        logger: httpLogger,
        genReqId,
        customLogLevel: (req: Request, res: Response,) => {
          // Log as info for 2xx status codes (successful responses)
          if (res.statusCode >= 200 && res.statusCode < 300) {
            return 'info';
          }
          // Log as warn for 4xx status codes (client errors)
          if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
          }
          // Log as error for 5xx status codes (server errors)
          if (res.statusCode >= 500) {
            return 'error';
            // return 'fatal';
          }
          return 'silent'; // Default to info if something else
        },
      }),
    )
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
