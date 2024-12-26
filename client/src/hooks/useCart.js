import { useEffect, useState } from 'react';
import cartAPI from '../api/cart-api.js';
import stockAPI from '../api/stock-api.js';

export function useAddToUserCart() {
    const addToUserCartHandler = async (productId, userId, size, quantity) => {
        const [cartResult, stockResult] = await Promise.all([
            cartAPI.addToUserCart(productId, userId, size, quantity),
            stockAPI.removeSizeOfProduct(productId, { [size]: quantity }),
        ]);

        return stockResult;
    };

    return addToUserCartHandler;
}

export function useGetUserCart(userId) {
    const [userCartProducts, setUserCartProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadUserCart() {
            setIsLoading(true);
            const result = await cartAPI.getCartForUser(userId);
            setUserCartProducts(result);
            setIsLoading(false);
        }
        loadUserCart();
    }, []);

    return { userCartProducts, isLoading };
}
