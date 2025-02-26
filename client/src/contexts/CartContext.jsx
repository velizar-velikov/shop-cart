import { createContext, useContext, useReducer } from 'react';
import { useAuthContext } from './AuthContext.jsx';
import { useGetUserCart } from '../hooks/custom/useCart.js';

const CartContext = createContext({
    userCartProducts: [],
    setUserCartProducts: () => null,
    cartItemsCount: 0,
    totalPrice: 0,
    cartReducer: (state, action) => null,
});

function cartReducer(state, action) {
    switch (action.type) {
        case 'add_cart_product': {
            const newProducts = state.slice();
            const productInCart = newProducts.find(
                (p) => p.productId === action.payload.productId && p.size === action.payload.size
            );

            if (!productInCart) {
                newProducts.unshift(action.payload.cartItemResponse);
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

export function CartContextProvider({ children }) {
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
