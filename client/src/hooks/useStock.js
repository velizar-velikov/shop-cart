import { useEffect, useState } from 'react';
import stockAPI from '../api/stock-api.js';

export function useAddStock() {
    const addStockHandler = async (productId, sizesToAdd) => {
        const result = await stockAPI.addStockForProduct(productId, sizesToAdd);
        return result;
    };

    return addStockHandler;
}

export function useGetSizesForProduct(productId) {
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        async function loadSizes() {
            const result = await stockAPI.getSizesForProduct(productId);
            setSizes(result);
        }
        loadSizes();
    }, []);

    return { sizes, setSizes };
}
