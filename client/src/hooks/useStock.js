import stockAPI from '../api/stock-api.js';

export function useAddStock() {
    const addStockHandler = async (productId, sizesToAdd) => {
        const result = await stockAPI.addStockForProduct(productId, sizesToAdd);
        return result;
    };

    return addStockHandler;
}
