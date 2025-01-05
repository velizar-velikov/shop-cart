import { createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext.jsx';
import { useGetUserCart } from '../hooks/custom/useCart.js';

const CartContext = createContext({
    userCartProducts: [],
    setUserCartProducts: () => null,
    cartItemsCount: 0,
    totalPrice: 0,
});

export function CartContextProvider({ children }) {
    const { userId } = useAuthContext();

    const { userCartProducts, setUserCartProducts, isLoading } = useGetUserCart(userId);

    const totalPrice = userCartProducts.reduce((acc, val) => acc + Number(val.productInfo.price) * Number(val.quantity), 0);

    const contextData = {
        userCartProducts,
        setUserCartProducts,
        cartItemsCount: userCartProducts.reduce((acc, val) => acc + Number(val.quantity), 0),
        totalPrice,
        isLoading,
    };

    return (
        // prettier-ignore
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
