import { useEffect, useState } from 'react';
import cartAPI from '../../api/cart-api.ts';
import { useLoadData } from '../abstracts/useLoadData.js';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { UseCartContext } from '../../contexts/CartContext.jsx';
import { toast } from 'react-toastify';

export function useAddToUserCart() {
    const addToUserCartHandler = async (productId, userId, size, quantity) => {
        const cartResult = await cartAPI.addToUserCart(productId, userId, size, quantity);
        return cartResult;
    };

    return addToUserCartHandler;
}

export function useGetUserCart(userId) {
    const {
        data: userCartProducts,
        setData: setUserCartProducts,
        isLoading,
    } = useLoadData([], cartAPI.getCartForUser, { userId }, [userId]);

    return { userCartProducts, setUserCartProducts, isLoading };
}

export function useGetUserCartCount(userId) {
    const { data: cartItemsCount, setData: setCartItemsCount } = useLoadData(0, cartAPI.getUserCartItemsCount, { userId }, [
        userId,
    ]);

    return { cartItemsCount, setCartItemsCount };
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

                const sizeQuantity = inStockSizes[size] - inCartSizeQuantity;
                setMaxQuantities((quantities) => ({
                    ...quantities,
                    [size]: sizeQuantity >= 0 ? sizeQuantity : 0,
                }));
            }
        }
        loadInCart();
    }, [inStockSizes]);

    return { maxQuantities, setMaxQuantities };
}

export function useAddToUserCartHandler(productId, inStockSizes, closeModal = false) {
    const [errorMessage, setErrorMessage] = useState('');

    const { userId } = useAuthContext();
    const { setUserCartProducts, cartReducer } = UseCartContext();
    const addToUserCart = useAddToUserCart();

    let { maxQuantities, setMaxQuantities } = useGetMaxQuantitiesToAddToCart(productId, userId, inStockSizes);

    const addToCartHandler = async (values) => {
        try {
            values.quantity = values.quantity.trim();
            values.size = values.size.trim();

            if (!values.quantity || !values.size) {
                throw new Error('All field are required.');
            }

            if (values.size == '---') {
                throw new Error('Please specify a size first.');
            }

            if (maxQuantities[values.size] <= 0) {
                return;
            }

            const notify = () => {
                toast.success(`Product added to cart.`, { autoClose: 2000 });
            };

            const cartItemResponse = await addToUserCart(productId, userId, values.size, values.quantity);

            setMaxQuantities((oldSizes) => ({
                ...oldSizes,
                [values.size]: oldSizes[values.size] - values.quantity,
            }));

            cartItemResponse.sizes = inStockSizes;

            const action = {
                type: 'add_cart_product',
                payload: {
                    productId,
                    quantity: values.quantity,
                    size: values.size,
                    cartItemResponse,
                },
            };
            setUserCartProducts((state) => cartReducer(state, action));

            setErrorMessage('');

            if (typeof closeModal == 'function') {
                closeModal();
            }
            notify();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return { addToCartHandler, maxQuantities, errorMessage };
}
