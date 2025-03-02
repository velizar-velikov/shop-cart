import { useEffect, useState } from 'react';
import cartAPI from '../../api/cart-api.ts';
import { useLoadData } from '../abstracts/useLoadData.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';
import { UseCartContext } from '../../contexts/CartContext.tsx';
import { toast } from 'react-toastify';
import { SizeOption } from '../../types/product.ts';
import { Sizes } from '../../types/stock.ts';
import { CartResponseDetailed, UserCartResponse } from '../../types/cart.ts';

export function useAddToUserCart() {
    const addToUserCartHandler = async (productId: string, userId: string, size: SizeOption, quantity: number) => {
        const cartResult = await cartAPI.addToUserCart(productId, userId, size, quantity);
        return cartResult;
    };

    return addToUserCartHandler;
}

export function useGetUserCart(userId: string) {
    const {
        data: userCartProducts,
        setData: setUserCartProducts,
        isLoading,
    } = useLoadData<Array<UserCartResponse>>([], cartAPI.getCartForUser, { userId }, [userId]);

    return { userCartProducts, setUserCartProducts, isLoading };
}

export function useGetUserCartCount(userId: string) {
    const { data: cartItemsCount, setData: setCartItemsCount } = useLoadData<number>(
        0,
        cartAPI.getUserCartItemsCount,
        { userId },
        [userId]
    );

    return { cartItemsCount, setCartItemsCount };
}

export function useEditQuantityInUserCart() {
    const editQuantityHandler = async (cartItemId: string, quantity: number) => {
        const edittedCartItem = await cartAPI.editCartItemQuantity(cartItemId, quantity);
        return edittedCartItem;
    };

    return editQuantityHandler;
}

export function useRemoveFromUserCart() {
    const removeFromCartHandler = async (productId: string, userId: string, size: SizeOption) => {
        const removedProduct = await cartAPI.removeFromUserCart(productId, userId, size);
        return removedProduct;
    };

    return removeFromCartHandler;
}

export function useGetMaxQuantitiesToAddToCart(productId: string, userId: string, inStockSizes: Sizes) {
    const [maxQuantities, setMaxQuantities] = useState<Sizes>({
        small: 0,
        medium: 0,
        large: 0,
    });

    useEffect(() => {
        async function loadInCart() {
            for (const [size, quantity] of Object.entries(inStockSizes)) {
                let inCartSizeQuantity = 0;
                try {
                    const result = await cartAPI.getProductSizeRecordInUserCart(productId, userId, size as SizeOption);

                    inCartSizeQuantity = result[0]?.quantity || 0;
                } catch (error) {
                    if (error instanceof Error) {
                        if (error.message == 'Resource not found') {
                            console.log(error.message);
                            inCartSizeQuantity = 0;
                        }
                    }
                }

                const sizeQuantity = inStockSizes[size as SizeOption] - inCartSizeQuantity;
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

type UserCartType = CartResponseDetailed & {
    sizes: Sizes;
    maxQuantity?: number;
};

export function useAddToUserCartHandler(productId: string, inStockSizes: Sizes, closeModal: Function | undefined) {
    const [errorMessage, setErrorMessage] = useState('');

    const { userId } = useAuthContext();
    const { setUserCartProducts, cartReducer } = UseCartContext();
    const addToUserCart = useAddToUserCart();

    let { maxQuantities, setMaxQuantities } = useGetMaxQuantitiesToAddToCart(productId, userId, inStockSizes);

    const addToCartHandler = async (values: { quantity: string; size: SizeOption }) => {
        try {
            values.quantity = values.quantity.trim();
            values.size = values.size.trim() as SizeOption;

            if (!values.quantity || !values.size) {
                throw new Error('All field are required.');
            }

            if ((values.size as SizeOption & '---') == '---') {
                throw new Error('Please specify a size first.');
            }

            if (maxQuantities[values.size as SizeOption] <= 0) {
                return;
            }

            const notify = () => {
                toast.success(`Product added to cart.`, { autoClose: 2000 });
            };

            const cartItemResponse = (await addToUserCart(
                productId,
                userId,
                values.size as SizeOption,
                Number(values.quantity)
            )) as UserCartResponse;

            setMaxQuantities((oldSizes: Sizes) => ({
                ...oldSizes,
                [values.size]: oldSizes[values.size] - Number(values.quantity),
            }));

            cartItemResponse.sizes = inStockSizes;

            const action = {
                type: 'add_cart_product',
                payload: {
                    _id: productId,
                    quantity: Number(values.quantity),
                    size: values.size,
                    cartItemResponse,
                },
            };
            setUserCartProducts((state: UserCartType[]) => cartReducer(state, action));

            setErrorMessage('');

            if (typeof closeModal == 'function') {
                closeModal();
            }
            notify();
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
    };

    return { addToCartHandler, maxQuantities, errorMessage };
}
