import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedUsers() {
  return await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      return prisma.user.create({
        data: {
          username: faker.internet.username().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          // password: bcrypt.hashSync(faker.internet.password(), 10)
          password: await bcrypt.hash('#Admin123', 10),
        },
      });
    }),
  );
}

export default seedUsers;
