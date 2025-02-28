import { createContext, ReactNode, useContext } from 'react';
import { usePersistedState } from '../hooks/abstracts/usePersistedState.js';

const AuthContext = createContext({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (state: any) => null,
});

interface AuthContextProviderProps {
    children: ReactNode[];
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [persistedState, setPersistedState] = usePersistedState('auth', {});

    const contextData = {
        userId: persistedState?.userId,
        firstName: persistedState?.firstName,
        lastName: persistedState?.lastName,
        email: persistedState?.email,
        accessToken: persistedState?.accessToken,
        isAuthenticated: Boolean(persistedState?.email),
        changeAuthState: (state: any) => setPersistedState(state),
    };

    return (
        //prettier-ignore
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
