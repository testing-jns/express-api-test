import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import z from 'zod';

import { readKeys } from './utils/helper';

expand(dotenv.config({ path: '.env' }));

// eslint-disable-next-line node/no-process-env
process.env.TZ = 'Asia/Jakarta';

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default('development'),
    APP_NAME: z.string().default('Node.js API'),
    APP_PORT: z.coerce.number().default(3000),
    BASE_URL: z.string(),
    LOG_LEVEL: z.enum([
      'fatal',
      'error',
      'warn',
      'info',
      'debug',
      'trace',
      'silent',
    ]), // pino
    DATABASE_URL: z.string().url(),
    JWT_PRIVATE_KEY_PATH: z.string(),
    JWT_PUBLIC_KEY_PATH: z.string(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === 'production' && !input.DATABASE_URL) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_URL'],
        message: 'Must be set when NODE_ENV is "production"',
      });
    }
  });

// export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line node/no-process-env
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error('❌ Invalid ENV:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

const { privateKey: JWT_PRIVATE_KEY, publicKey: JWT_PUBLIC_KEY } = readKeys(
  env!.JWT_PRIVATE_KEY_PATH,
  env!.JWT_PUBLIC_KEY_PATH,
);

const { JWT_PRIVATE_KEY_PATH, JWT_PUBLIC_KEY_PATH, ...environments } = env!;

export default { ...environments!, JWT_PRIVATE_KEY, JWT_PUBLIC_KEY };
