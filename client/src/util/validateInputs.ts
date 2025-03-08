import { ZodSchema } from 'zod';

interface ValidationResultCustom<T> {
    data: T;
    errors: T;
    success: boolean;
}

/**
 * Validates an object based on a Zod schema
 * @param {ZodObject} schema the Zod schema based on which to validate
 * @param  object the object to validate
 */
export function validateInputs<T>(schema: ZodSchema, object: T): ValidationResultCustom<T> {
    const result = schema.safeParse(object);

    let data: T = object;
    const errors: T = {} as T;

    if (result.success) {
        data = result.data as T;
    } else {
        const errorsArr = Object.values(result.error)[0];

        errorsArr.forEach((err: any) => {
            errors[err.path[0] as keyof T] = err.message;
        });
    }

    return { data, errors, success: result.success };
}
