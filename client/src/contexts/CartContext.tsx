import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext } from 'react';
import { useAuthContext } from './AuthContext.tsx';
import { useGetUserCart } from '../hooks/custom/useCart.ts';
import { UserCartResponse } from '../types/cart.ts';
import { SizeOption } from '../types/product.ts';

interface CartAction {
    type: string;
    payload: {
        _id: string;
        quantity: number;
        size?: SizeOption;
        cartItemResponse?: UserCartResponse;
    };
}

interface CartContext {
    userCartProducts: UserCartResponse[];
    setUserCartProducts: Dispatch<SetStateAction<UserCartResponse[]>>;
    cartItemsCount: number;
    totalPrice: number;
    isLoading: boolean;
    cartReducer: (state: UserCartResponse[], action: CartAction) => UserCartResponse[];
}

const CartContext = createContext<CartContext>({
    userCartProducts: [],
    setUserCartProducts: () => null,
    cartItemsCount: 0,
    totalPrice: 0,
    isLoading: false,
    cartReducer: (state: UserCartResponse[], action) => [],
});

function cartReducer(state: UserCartResponse[], action: CartAction) {
    switch (action.type) {
        case 'add_cart_product': {
            const newProducts = state.slice();
            const productInCart = newProducts.find((p) => p.productId === action.payload._id && p.size === action.payload.size);

            if (!productInCart) {
                newProducts.unshift(action.payload.cartItemResponse as UserCartResponse);
            } else {
                productInCart.quantity = productInCart.quantity + Number(action.payload.quantity);
            }

            return newProducts;
        }
        case 'edit_quantity': {
            const index = state.findIndex((cartItem) => cartItem._id == action.payload._id);
            const copiedCartProducts = state.slice();
            copiedCartProducts[index].quantity = Number(action.payload.quantity);
            return copiedCartProducts;
        }
        case 'remove_product': {
            const index = state.findIndex((cartItem) => cartItem._id == action.payload._id);
            return state.toSpliced(index, 1);
        }
        default:
            return state;
    }
}

export function CartContextProvider({ children }: PropsWithChildren) {
    const { userId } = useAuthContext();

    const { userCartProducts, setUserCartProducts, isLoading } = useGetUserCart(userId);

    const totalPrice = userCartProducts
        .filter((product) => product.sizes[product.size] >= product.quantity)
        .reduce((acc, val) => acc + Number(val.productInfo.price) * Number(val.quantity), 0);

    const contextData = {
        userCartProducts,
        setUserCartProducts,
        cartItemsCount: userCartProducts.reduce((acc, val) => acc + Number(val.quantity), 0),
        totalPrice,
        isLoading,
        cartReducer,
    };

    return (
        // prettier-ignore
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    );
}

export const UseCartContext = () => useContext(CartContext);
