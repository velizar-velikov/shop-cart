import authAPI from '../../api/auth-api.js';
import { useAuthContext } from '../../contexts/AuthContext.jsx';

export function useLogin() {
    const { changeAuthState } = useAuthContext();

    const loginHandler = async (email, password) => {
        const result = await authAPI.login(email, password);
        changeAuthState({
            userId: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            accessToken: result.accessToken,
        });

        return result;
    };

    return loginHandler;
}

export function useRegister() {
    const { changeAuthState } = useAuthContext();

    const registerHandler = async (firstName, lastName, email, password) => {
        const result = await authAPI.register(firstName, lastName, email, password);
        changeAuthState({
            userId: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            accessToken: result.accessToken,
        });

        return result;
    };

    return registerHandler;
}

export function useLogout() {
    const { changeAuthState } = useAuthContext();

    const logoutHandler = async () => {
        await authAPI.logout();
        changeAuthState(null);
    };

    return logoutHandler;
}
