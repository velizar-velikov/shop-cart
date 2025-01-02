import { z } from 'zod';

export const reviewSchema = z.object({
    rating: z.coerce.number().min(1, 'Rating must be between 1 and 5.').max(5, 'Rating must be between 1 and 5.'),
    text: z
        .string()
        .trim()
        .min(1, 'Review text must be between 1 and 100 characters.')
        .max(100, 'Review text must be between 1 and 100 characters.'),
});
