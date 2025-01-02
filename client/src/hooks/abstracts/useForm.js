import { useEffect, useState } from 'react';

/**
 * Abstract hook to handle controlled forms
 * @param {any} initialValues the initial values of the form fields
 * @param {function} submitCallback the function to call on submit event
 * @returns {{values: any, changeHandler: function, submitHandler: function}}
 */
export function useForm(initialValues, submitCallback) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const changeHandler = (event) => {
        setValues((oldValues) => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    const submitHandler = (event) => {
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
