import { useEffect, useState } from 'react';

/**
 * Abstract hook to load data from an api
 * @param {unknown} initialState the initial state of the data
 * @param {function} asyncCallback the api function to call
 * @param {object} params the params to call the function with ([key]:[value] pairs)
 * @param {array} dependencies the dependencies on which the useEffect to retrigger
 */
export function useLoadData<T>(
    initialState: T,
    asyncCallback: Function,
    params: { [key: string]: unknown } = {},
    dependencies: Array<unknown> = []
) {
    const [data, setData] = useState<T>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        async function loadProduct() {
            setIsLoading(true);
            try {
                const result: T = await asyncCallback(...Object.values(params));
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
