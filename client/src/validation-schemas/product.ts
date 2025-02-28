import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().trim().min(1, 'Name must be at least 1 character long'),
    brand: z.string().trim().min(1, 'Brand must be at least 1 character long'),
    category: z.string().trim(),
    price: z.coerce.number().gte(0, 'Price must be a positive number'),
    imageUrl: z.string().trim().url(),
    summary: z
        .string()
        .trim()
        .min(1, 'Summary must be between 1 and 40 characters long')
        .max(40, 'Summary must be between 1 and 40 characters long'),
    description: z.string().trim().min(1, 'Description must be at least 1 character long'),
});
