import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

import { getRandomElements, toSlug } from '../../src/utils/helper';

const prisma = new PrismaClient();

async function seedPosts(users: any[], categories: any[], tags: any[]) {
  return await Promise.all(
    Array.from({ length: 5 }).map(() => {
      const title = faker.book.title();

      return prisma.post.create({
        data: {
          title,
          slug: toSlug(title),
          content: faker.lorem.paragraphs(3),
          thumbnail: faker.image.avatar(),
          userId: faker.helpers.arrayElement(users).id,
          categoryId: faker.helpers.arrayElement(categories).id,
          tags: {
            connect: getRandomElements(tags, 3).map((tag: any) => ({ id: tag.id })),
          },
        },
      });
    }),
  );
}

export default seedPosts;
