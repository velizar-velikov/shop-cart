import productsAPI from '../../api/products-api.ts';
import stockAPI from '../../api/stock-api.ts';
import { Product, ProductResponse } from '../../types/product.ts';
import { Search } from '../../types/search.ts';
import { useLoadData } from '../abstracts/useLoadData.ts';

export function useGetCatalogProducts(currentPage: number, search: Search) {
    const { data: products, isLoading } = useLoadData<Array<ProductResponse>>(
        [],
        productsAPI.getCatalogProducts,
        { currentPage, search },
        [currentPage, search]
    );

    return { products, isLoading };
}

export function useGetCatalogLength(search: Search) {
    const { data: length, isLoading } = useLoadData(0, productsAPI.getCalatogLength, { search }, [search]);

    return { length, isLoading };
}

export function useGetLatestProducts() {
    const { data: products, isLoading } = useLoadData<Array<ProductResponse>>([], productsAPI.getLatest, { pageSize: 3 }, []);

    return { products, isLoading };
}

export function useGetOneProduct(productId: string) {
    const initialState: Product = {
        name: '',
        brand: '',
        category: 'T-shirts',
        price: 0,
        imageUrl: '',
        summary: '',
        description: '',
    };

    const { data: product, isLoading } = useLoadData<ProductResponse>(
        initialState as ProductResponse,
        productsAPI.getOne,
        { productId },
        []
    );

    return { product, isLoading };
}

export function useCreateProduct() {
    const createHandler = async (productData: Product) => {
        const product = await productsAPI.create(productData);
        await stockAPI.initializeStockForProduct(product._id);

        return product;
    };

    return createHandler;
}

export function useEditProduct() {
    const editHandler = async (productId: string, productData: Product) => {
        const product = await productsAPI.editById(productId, productData);

        return product;
    };

    return editHandler;
}
