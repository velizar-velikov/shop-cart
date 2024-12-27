import { useEffect, useState } from 'react';
import cartAPI from '../api/cart-api.js';
import stockAPI from '../api/stock-api.js';

export function useAddToUserCart() {
    const addToUserCartHandler = async (productId, userId, size, quantity) => {
        const cartResult = await cartAPI.addToUserCart(productId, userId, size, quantity);
        // stockAPI.removeSizeOfProduct(productId, { [size]: quantity })
        return cartResult;
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

    return { userCartProducts, setUserCartProducts, isLoading };
}

export function useRemoveFromUserCart() {
    const removeFromCartHandler = async(productId, userId, size) => {
        const removedProduct = await cartAPI.removeFromUserCart(productId, userId, size);
        return removedProduct;
    };

    return removeFromCartHandler;
}