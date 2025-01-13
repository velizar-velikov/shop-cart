import { AuthContextProvider } from './AuthContext.jsx';
import { WishlistContextProvider } from './WishlistContext.jsx';
import { CartContextProvider } from './CartContext.jsx';
import { MenuContextProvider } from './MenuContext.jsx';

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
