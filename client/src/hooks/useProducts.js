import { useEffect, useState } from 'react';
import productsAPI from '../api/products-api.js';

export function useGetProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const products = await productsAPI.getAll();
            setProducts(products);
        }
        loadProducts();
    }, []);

    return [products, setProducts];
}

export function useGetLatestProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const products = await productsAPI.getLatest(3);
            setProducts(products);
        }
        loadProducts();
    }, []);

    return [products, setProducts];
}

export function useGetOneProduct(productId) {
    const [product, setProduct] = useState([]);
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

export function useCreateProduct() {}
