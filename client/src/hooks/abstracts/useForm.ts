import { useEffect, useState } from 'react';

/**
 * Abstract hook to handle controlled forms
 * @param {any} initialValues the initial values of the form fields
 * @param {Function} submitCallback the function to call on submit event
 */
export function useForm<T extends { [key: string]: unknown }>(initialValues: T, submitCallback: Function) {
    const [values, setValues] = useState<T>(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((oldValues: T) => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        submitCallback(values);
        // setValues(initialValues);
    };

    return {
        values,
        changeHandler,
        submitHandler,
    };
}
