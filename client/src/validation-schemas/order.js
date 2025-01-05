import { z } from 'zod';

const paymentEnum = ['visa', 'mastercard', 'cash'];

export const orderSchema = z.object({
    address: z.string().trim().min(5, 'Address must be at least 5 characters long'),
    payment: z.enum(paymentEnum, { message: 'Payment must be one of the provided options.' }),
});
