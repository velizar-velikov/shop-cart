import { AuthContextProvider } from './AuthContext.tsx';
import { WishlistContextProvider } from './WishlistContext.tsx';
import { CartContextProvider } from './CartContext.tsx';
import { MenuContextProvider } from './MenuContext.tsx';
import { PropsWithChildren } from 'react';

export function ContextWrapperProvider({ children }: PropsWithChildren) {
    return (
        <AuthContextProvider>
            <WishlistContextProvider>
                <CartContextProvider>
                    {/* menu only for small devices */}
                    <MenuContextProvider>{children}</MenuContextProvider>
                </CartContextProvider>
            </WishlistContextProvider>
        </AuthContextProvider>
    );
}
