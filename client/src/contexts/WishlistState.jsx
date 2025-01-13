import { createContext } from 'react';
import { usePersistedState } from '../hooks/abstracts/usePersistedState.js';

const WishlistContext = createContext({});

export function WishlistContextProvider(props) {
    const [persistedWishlistState, setPersistedWishlistState] = usePersistedState('wishlist', []);

    const contextData = {
        wishlist: persistedWishlistState,
        updateWishlist: (newState) => setPersistedWishlistState(newState),
    };
    return (
        //prettier-ignore
        <WishlistContext.Provider value={contextData}>
            {props.children}
        </WishlistContext.Provider>
    );
}
