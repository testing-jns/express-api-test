import { PrismaClient } from '@prisma/client';

import { toSlug } from '../../src/utils/helper';

const prisma = new PrismaClient();

async function seedTags() {
  const tags: string[] = [
    'Laravel',
    'Node.js',
    'Nginx',
    'Caddy',
    'Apache2',
    'DNS Server',
    'Mail Server',
  ];

  return await Promise.all(
    tags.map((tag) => {
      return prisma.tag.create({
        data: {
          name: tag,
          slug: toSlug(tag),
        },
      });
    }),
  );
}

export default seedTags;
