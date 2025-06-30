import { PrismaClient } from '@prisma/client';

import env from '@/env';

const db = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query'] : [],
});

export default db;
