import { createContext, useContext } from 'react';
import { usePersistedState } from '../hooks/abstracts/usePersistedState.js';

const WishlistContext = createContext({
    wishlist: [],
    updateWishlist: () => null,
});

export function WishlistContextProvider(props) {
    const [persistedWishlistState, setPersistedWishlistState] = usePersistedState('wishlist', []);

    const contextData = {
        wishlist: persistedWishlistState,
        updateWishlist: setPersistedWishlistState,
    };
    return (
        //prettier-ignore
        <WishlistContext.Provider value={contextData}>
            {props.children}
        </WishlistContext.Provider>
    );
}

export const useWishlistContext = () => useContext(WishlistContext);
