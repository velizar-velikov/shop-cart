import authAPI from '../../api/auth-api.js';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useWishlistContext } from '../../contexts/WishlistContext.jsx';

export function useLogin() {
    const { changeAuthState } = useAuthContext();
    const { updateWishlist } = useWishlistContext();

    const loginHandler = async (email, password) => {
        const result = await authAPI.login(email, password);
        changeAuthState({
            userId: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            accessToken: result.accessToken,
        });

        // when user logs in, only the items that are not his own are left in his wishlist
        updateWishlist((oldWishlist) => oldWishlist.filter((item) => item._ownerId !== result._id));

        return result;
    };

    return loginHandler;
}

export function useRegister() {
    const { changeAuthState } = useAuthContext();
    const { updateWishlist } = useWishlistContext();

    const registerHandler = async (firstName, lastName, email, password) => {
        const result = await authAPI.register(firstName, lastName, email, password);
        changeAuthState({
            userId: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            accessToken: result.accessToken,
        });

        // when user logs in, only the items that are not his own are left in his wishlist
        updateWishlist((oldWishlist) => oldWishlist.filter((item) => item._ownerId !== result._id));

        return result;
    };

    return registerHandler;
}

export function useLogout() {
    const { changeAuthState } = useAuthContext();
    const { updateWishlist } = useWishlistContext();

    const logoutHandler = async () => {
        await authAPI.logout();
        changeAuthState(null);
        updateWishlist([]);
    };

    return logoutHandler;
}
