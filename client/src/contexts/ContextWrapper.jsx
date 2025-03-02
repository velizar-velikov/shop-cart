import { AuthContextProvider } from './AuthContext.tsx';
import { WishlistContextProvider } from './WishlistContext.tsx';
import { CartContextProvider } from './CartContext.jsx';
import { MenuContextProvider } from './MenuContext.tsx';

export function ContextWrapperProvider({ children }) {
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
