import type { Request, Response } from 'express';

import pino from 'pino';
import pretty from 'pino-pretty';
import { v4 as uuidv4 } from 'uuid';

import env from '@/env';

export const logger = pino({ base: { pid: false } }, pretty());

export function genReqId(req: Request, res: Response): string {
  const requestId: string = uuidv4();
  res.setHeader('X-Request-Id', requestId);
  return requestId;
}

export const httpLogger = pino({
  // level: env.LOG_LEVEL,
  // level: 'debug',
  transport: {
    targets: [
      {
        target: env.NODE_ENV === 'development' ? 'pino-pretty' : '',
        // level: 'debug',
        options: { pid: false, destination: process.stdout.fd },
      },
      {
        target: 'pino/file',
        // level: 'debug',
        options: { pid: false, destination: './logs/access.log' },
      },
    ],
  },
});
