import { ZodObject, ZodSchema } from 'zod';

interface ValidationResultCustom {
    data: object;
    errors: object;
    success: boolean;
}

/**
 * Validates an object based on a Zod schema
 * @param {ZodObject} schema the Zod schema based on which to validate
 * @param {object} object the object to validate
 */
export function validateInputs(schema: ZodSchema, object: object): ValidationResultCustom {
    const result = schema.safeParse(object);

    let data = object;
    const errors: { [key: string]: string } = {};

    if (result.success) {
        data = result.data;
    } else {
        const errorsArr = Object.values(result.error)[0];

        errorsArr.forEach((err: any) => {
            errors[err.path[0]] = err.message;
        });
    }

    return { data, errors, success: result.success };
}
