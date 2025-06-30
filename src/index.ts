import type { Express } from 'express';
import type { Server } from 'node:http';

import http from 'node:http';

import { createApp } from '@/app';
import env from '@/env';
import { logger } from '@/utils/logger';

const app: Express = createApp();
const server: Server = http.createServer(app);

server.on('error', (error: NodeJS.ErrnoException): void => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${env.APP_PORT} is already in use.`);
    process.exit(1);
  }
});

server.listen(env.APP_PORT, (): void => {
  logger.info(`Server running on port ${env.APP_PORT} 🚀`);
});

// app.listen(env.APP_PORT, (): void => {
//   logger.info(`Server running on port ${env.APP_PORT} 🚀`);
// });
