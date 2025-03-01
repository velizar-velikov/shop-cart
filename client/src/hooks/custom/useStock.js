import stockAPI from '../../api/stock-api.ts';
import { useLoadData } from '../abstracts/useLoadData.ts';

export function useAddStock() {
    const addStockHandler = async (productId, sizesToAdd) => {
        const result = await stockAPI.addStockForProduct(productId, sizesToAdd);
        return result;
    };

    return addStockHandler;
}

export function useGetSizesForProduct(productId) {
    const { data: sizes, setData: setSizes, isLoading } = useLoadData([], stockAPI.getSizesForProduct, { productId });

    return { sizes, setSizes, isLoading };
}
