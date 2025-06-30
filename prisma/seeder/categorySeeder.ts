import { PrismaClient } from '@prisma/client';

import { toSlug } from '../../src/utils/helper';

const prisma = new PrismaClient();

async function seedCategories() {
  const categories: string[] = [
    'Programming',
    'Internet of Things',
    'DevOps',
    'Cyber Security',
  ];

  return await Promise.all(
    categories.map((category) => {
      return prisma.category.create({
        data: {
          name: category,
          slug: toSlug(category),
        },
      });
    }),
  );
}

export default seedCategories;
