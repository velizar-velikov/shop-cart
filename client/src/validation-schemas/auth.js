import { z } from 'zod';

// export const loginSchema = z.object({
//     email: z.string().trim().email(),
//     password: z.string().trim().min(4, 'Password must be at least 4 characters long'),
// });

export const loginSchema = z.object({
    email: z.string().trim().min(1),
    password: z.string().trim().min(1),
});
