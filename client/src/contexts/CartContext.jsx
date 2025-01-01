import { createContext, useContext } from 'react';
import { useGetUserCartCount } from '../hooks/custom/useCart.js';
import { useAuthContext } from './AuthContext.jsx';

const CartContext = createContext({
    cartItemsCount: 0,
    setCartItemsCount: () => null,
});

export function CartContextProvider({ children }) {
    const { userId } = useAuthContext();
    const { cartItemsCount, setCartItemsCount } = useGetUserCartCount(userId);

    const contextData = {
        cartItemsCount: cartItemsCount,
        setCartItemsCount: setCartItemsCount,
    };

    return (
        // prettier-ignore
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
