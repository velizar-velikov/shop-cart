import { createContext, ReactNode, useContext } from 'react';
import { usePersistedState } from '../hooks/abstracts/usePersistedState.ts';

interface AuthContextType {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
    isAuthenticated: boolean;
    changeAuthState: (state: any) => void;
}

const AuthContext = createContext<AuthContextType>({
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
    const [persistedState, setPersistedState] = usePersistedState<AuthContextType>('auth', {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        accessToken: '',
        isAuthenticated: false,
        changeAuthState: (state: any) => null,
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
