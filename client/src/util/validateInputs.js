import { ZodObject } from 'zod';

/**
 * Validates an object based on a Zod schema
 * @param {ZodObject} schema the Zod schema based on which to validate
 * @param {object} object the object to validate
 * @returns {{data: object, errors: object, success: boolean}}
 */
export function validateInputs(schema, object) {
    const result = schema.safeParse(object);

    let data = object;
    const errors = {};

    if (result.success) {
        data = result.data;
    } else {
        const errorsArr = Object.values(result.error)[0];

        errorsArr.forEach((err) => {
            errors[err.path[0]] = err.message;
        });
    }

    return { data, errors, success: result.success };
}
