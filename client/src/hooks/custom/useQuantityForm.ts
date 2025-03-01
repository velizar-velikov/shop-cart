import { RefObject, useEffect, useState } from 'react';

export function useQuantityForm(initialQuantity: number, submitCallback: Function, formRef: RefObject<HTMLFormElement>) {
    const [values, setValues] = useState({ quantity: initialQuantity });

    // form is submitted on every input change therefore we
    // debounce the form submission with 1 sec to prevent unnecessary requests on every input change
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (formRef.current) {
                formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [values]);

    const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((oldQuantity) => ({
            ...oldQuantity,
            [event.target.name]: Number(event.target.value),
        }));
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('submitting');

        submitCallback(values);
    };

    return { values, changeHandler, submitHandler };
}
