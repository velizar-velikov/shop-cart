import { useEffect, useState } from 'react';
import productsAPI from '../api/products-api.js';
import stockAPI from '../api/stock-api.js';

export function useGetProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadProducts() {
            setIsLoading(true);
            const products = await productsAPI.getAll();
            setProducts(products);
            setIsLoading(false);
        }
        loadProducts();
    }, []);

    return { products, isLoading };
}

export function useGetLatestProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadProducts() {
            setIsLoading(true);
            const products = await productsAPI.getLatest(3);
            setProducts(products);
            setIsLoading(false);
        }
        loadProducts();
    }, []);

    return { products, isLoading };
}

export function useGetOneProduct(productId) {
    const [product, setProduct] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        category: 'T-shirts',
        price: 0,
        imageUrl: '',
        summary: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadProduct() {
            setIsLoading(true);
            const product = await productsAPI.getOne(productId);
            setProduct(product);
            setIsLoading(false);
        }
        loadProduct();
    }, []);

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
