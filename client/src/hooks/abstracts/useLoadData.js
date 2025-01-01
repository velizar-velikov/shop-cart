import { useEffect, useState } from 'react';

/**
 * Abstract function to load data from an api
 * @param {string} initialState the initial state of the data
 * @param {function} asyncCallback the api function to call
 * @param {object} params the params to call the function with
 * @param {array} dependencies the dependencies on which the useEffect to retrigger
 * @returns {{data: any, setData: function, isLoading: boolean, hasError: boolean}}
 */
export function useLoadData(initialState, asyncCallback, params = {}, dependencies = []) {
    const [data, setData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function loadProduct() {
            setIsLoading(true);
            try {
                const result = await asyncCallback(...Object.values(params));
                setData(result);
            } catch (error) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }
        loadProduct();
    }, [...dependencies]);

    return { data, setData, isLoading, hasError };
}
