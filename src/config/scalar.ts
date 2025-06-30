import { apiReference } from '@scalar/express-api-reference';

export const scalarDocs = apiReference({
  url: '/openapi.json',
  theme: 'purple',
  layout: 'classic',
  pageTitle: 'JNS23 API',
});
