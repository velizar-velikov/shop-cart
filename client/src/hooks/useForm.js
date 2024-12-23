import { useState } from 'react';

export function useForm(initialValues, submitCallback) {
    const [values, setValues] = useState(initialValues);

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
