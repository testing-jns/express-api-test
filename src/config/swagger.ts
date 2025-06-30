import swaggerJsdoc from 'swagger-jsdoc';

import env from '@/env';

import { version } from '../../package.json';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version,
      description: 'This is my API',
    },
    servers: [{ url: `${env.BASE_URL}/api/v1` }],
  },
  apis: ['./src/api/v1/**/*.ts'],
};

export const specs = swaggerJsdoc(options);
