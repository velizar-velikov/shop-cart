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
