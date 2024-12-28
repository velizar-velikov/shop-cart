import { useEffect, useState } from 'react';
import cartAPI from '../api/cart-api.js';

export function useAddToUserCart() {
    const addToUserCartHandler = async (productId, userId, size, quantity) => {
        const cartResult = await cartAPI.addToUserCart(productId, userId, size, quantity);
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

export function useEditQuantityInUserCart() {
    const editQuantityHandler = async (cartItemId, quantity) => {
        const edittedCartItem = await cartAPI.editCartItemQuantity(cartItemId, quantity);
        return edittedCartItem;
    };

    return editQuantityHandler;
}

export function useRemoveFromUserCart() {
    const removeFromCartHandler = async (productId, userId, size) => {
        const removedProduct = await cartAPI.removeFromUserCart(productId, userId, size);
        return removedProduct;
    };

    return removeFromCartHandler;
}

export function useGetMaxQuantitiesToAddToCart(productId, userId, inStockSizes) {
    const [maxQuantities, setMaxQuantities] = useState({
        small: 0,
        medium: 0,
        large: 0,
    });

    useEffect(() => {
        async function loadInCart() {
            for (const [size, quantity] of Object.entries(inStockSizes)) {
                let inCartSizeQuantity = 0;
                try {
                    const result = await cartAPI.getProductSizeRecordInUserCart(productId, userId, size);

                    inCartSizeQuantity = result[0]?.quantity || 0;
                } catch (error) {
                    console.log(error.message);

                    if (error.message == 'Resource not found') {
                        inCartSizeQuantity = 0;
                    }
                }

                setMaxQuantities((quantities) => ({
                    ...quantities,
                    [size]: inStockSizes[size] - inCartSizeQuantity,
                }));
            }
        }
        loadInCart();
    }, [inStockSizes]);

    return { maxQuantities, setMaxQuantities };
}
