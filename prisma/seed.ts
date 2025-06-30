import { PrismaClient } from '@prisma/client';

import seedCategories from './seeder/categorySeeder';
import seedPosts from './seeder/postSeeder';
import seedTags from './seeder/tagSeeder';
import seedUsers from './seeder/userSeeder';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const categories = await seedCategories();
  const tags = await seedTags();
  const users = await seedUsers();
  // const posts = await seedPosts(users, categories, tags);
  await seedPosts(users, categories, tags);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
