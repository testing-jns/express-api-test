import { z } from 'zod';

const baseEmailValidation: z.ZodString = z
  .string()
  .email({ message: '"email" is invalid' })
  .nonempty({ message: '"email" can\'t be empty' });

const basePasswordValidation: z.ZodString = z
  .string()
  .min(8, { message: '"password" must be at least 8 characters long' })
  .nonempty({ message: '"password" can\'t be empty' })
  .regex(/[a-z]/, {
    message: '"password" must contain at least one lowercase letter',
  })
  .regex(/[A-Z]/, {
    message: '"password" must contain at least one uppercase letter',
  })
  .regex(/\d/, { message: '"password" must contain at least one number' })
  .regex(/[^a-z0-9]/i, {
    message: '"password" must contain at least one special character',
  });

export const signupUserSchema: z.ZodObject<any> = z.object({
  username: z
    .string()
    .min(3, { message: '"username" must be at least 3 characters long' })
    .nonempty({ message: '"username" can\'t be empty' })
    .refine((val) => val === val.toLowerCase(), {
      message: '"username" must be lowercase',
    }),
  email: baseEmailValidation,
  password: basePasswordValidation,
});

export const loginUserSchema: z.ZodObject<any> = z.object({
  email: z.string().nonempty({ message: '"email" can\'t be empty' }),
  password: z.string().nonempty({ message: '"password" can\'t be empty' }),
});

export const refreshTokenSchema: z.ZodObject<any> = z.object({
  refreshToken: z
    .string()
    .nonempty({ message: '"refreshToken" can\'t be empty' }),
});

export type User = z.infer<typeof signupUserSchema>;
