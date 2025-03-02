import stockAPI from '../../api/stock-api.ts';
import { Sizes } from '../../types/stock.ts';
import { useLoadData } from '../abstracts/useLoadData.ts';

export function useAddStock() {
    const addStockHandler = async (productId: string, sizesToAdd: Sizes<string>) => {
        const result = await stockAPI.addStockForProduct(productId, sizesToAdd);
        return result;
    };

    return addStockHandler;
}

export function useGetSizesForProduct(productId: string) {
    const {
        data: sizes,
        setData: setSizes,
        isLoading,
    } = useLoadData<Array<Sizes<number>>>([], stockAPI.getSizesForProduct, { productId });

    return { sizes, setSizes, isLoading };
}
