import { createContext, ReactNode, useContext } from 'react';
import { usePersistedState } from '../hooks/abstracts/usePersistedState.js';

const WishlistContext = createContext({
    wishlist: [],
    updateWishlist: () => null,
});

interface WishlistContextProviderProps {
    children: ReactNode[];
}

export function WishlistContextProvider({ children }: WishlistContextProviderProps) {
    const [persistedWishlistState, setPersistedWishlistState] = usePersistedState('wishlist', []);

    const contextData = {
        wishlist: persistedWishlistState,
        updateWishlist: setPersistedWishlistState,
    };
    return (
        //prettier-ignore
        <WishlistContext.Provider value={contextData}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlistContext = () => useContext(WishlistContext);
