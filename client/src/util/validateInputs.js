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
