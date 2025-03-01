import { createContext, ReactNode, useContext } from 'react';
import { usePersistedState } from '../hooks/abstracts/usePersistedState.ts';
import { PersistedWishlistItem } from '../types/wishlist.ts';

const WishlistContext = createContext({
    wishlist: [] as PersistedWishlistItem[],
    updateWishlist: (state: PersistedWishlistItem[] | ((state: PersistedWishlistItem[]) => PersistedWishlistItem[])) => null,
});

interface WishlistContextProviderProps {
    children: ReactNode[];
}

export function WishlistContextProvider({ children }: WishlistContextProviderProps) {
    const [persistedWishlistState, setPersistedWishlistState] = usePersistedState<PersistedWishlistItem[]>('wishlist', []);

    const contextData = {
        wishlist: persistedWishlistState,
        updateWishlist: setPersistedWishlistState,
    };
    return (
        //prettier-ignore
        <WishlistContext.Provider value={contextData as any}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlistContext = () => useContext(WishlistContext);
