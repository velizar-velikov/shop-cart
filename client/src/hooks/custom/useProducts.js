import productsAPI from '../../api/products-api.ts';
import stockAPI from '../../api/stock-api.js';
import { useLoadData } from '../abstracts/useLoadData.js';

export function useGetCatalogProducts(currentPage, search) {
    const { data: products, isLoading } = useLoadData([], productsAPI.getCatalogProducts, { currentPage, search }, [
        currentPage,
        search,
    ]);

    return { products, isLoading };
}

export function useGetCatalogLength(search) {
    const { data: length, isLoading } = useLoadData(0, productsAPI.getCalatogLength, { search }, [search]);

    return { length, isLoading };
}

export function useGetLatestProducts() {
    const { data: products, isLoading } = useLoadData([], productsAPI.getLatest, { pageSize: 3 }, []);

    return { products, isLoading };
}

export function useGetOneProduct(productId) {
    const initialState = {
        name: '',
        brand: '',
        category: 'T-shirts',
        price: 0,
        imageUrl: '',
        summary: '',
        description: '',
    };

    const { data: product, isLoading } = useLoadData(initialState, productsAPI.getOne, { productId }, []);

    return { product, isLoading };
}

export function useCreateProduct() {
    const createHandler = async (productData) => {
        const product = await productsAPI.create(productData);
        await stockAPI.initializeStockForProduct(product._id);

        return product;
    };

    return createHandler;
}

export function useEditProduct() {
    const editHandler = async (productId, productData) => {
        const product = await productsAPI.editById(productId, productData);

        return product;
    };

    return editHandler;
}
