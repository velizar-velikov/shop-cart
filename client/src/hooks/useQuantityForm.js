import { useEffect, useState } from 'react';

export function useQuantityForm(initialQuantity, submitCallback, formRef) {
    const [values, setValues] = useState({ quantity: initialQuantity });

    // form is submitted on every input change therefore we
    // debounce the form submission with 1 sec to prevent unnecessary requests on every input change
    useEffect(() => {
        const timeout = setTimeout(() => {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }, 1000);

        return () => clearTimeout(timeout);
    }, [values]);

    const changeHandler = async (event) => {
        setValues((oldQuantity) => ({
            ...oldQuantity,
            [event.target.name]: Number(event.target.value),
        }));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        console.log('submitting');

        submitCallback(values);
    };

    return { values, changeHandler, submitHandler };
}
