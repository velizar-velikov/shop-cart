import { z } from 'zod';

export const registerSchema = z
    .object({
        firstName: z.string().trim().min(1, 'First name must be at least 1 character long'),
        lastName: z.string().trim().min(1, 'Last name must be at least 1 character long'),
        email: z.string().trim().email(),
        password: z.string().trim().min(4, 'Password must be at least 4 characters long'),
        repass: z.string().trim(),
    })
    .refine((data) => data.password === data.repass, {
        message: "Passwords don't match",
        path: ['repass'],
    });

export const loginSchema = z.object({
    email: z.string().trim().min(1),
    password: z.string().trim().min(1),
});
