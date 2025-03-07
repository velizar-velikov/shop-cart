import { createContext, PropsWithChildren, ReactNode, useContext } from 'react';
import { usePersistedState } from '../hooks/abstracts/usePersistedState.ts';

interface AuthState {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
}

interface AuthContextType extends AuthState {
    isAuthenticated: boolean;
    changeAuthState: (state: AuthState | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (state: AuthState | null) => null,
});

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [persistedState, setPersistedState] = usePersistedState<AuthContextType>('auth', {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        accessToken: '',
        isAuthenticated: false,
        changeAuthState: (state: AuthState | null) => null,
    });

    const contextData = {
        ...persistedState,
        isAuthenticated: Boolean(persistedState?.email),
        changeAuthState: setPersistedState,
    };

    return (
        //prettier-ignore
        <AuthContext.Provider value={contextData as any}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
