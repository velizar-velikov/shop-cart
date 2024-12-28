import { useState } from 'react';

export function useQuantityForm(initialQuantity, onChangeCallback) {
    const [values, setValues] = useState({ quantity: initialQuantity });

    const changeHandler = async (event) => {
        setValues((oldQuantity) => ({
            ...oldQuantity,
            [event.target.name]: Number(event.target.value),
        }));

        onChangeCallback(values);
    };

    return { values, changeHandler };
}
