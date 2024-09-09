import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters long'),
  email: z.string().email('Invalid Email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long')
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
