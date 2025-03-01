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

const defaultAuthState: AuthContextType = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (state: any) => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthState);

interface AuthContextProviderProps {
    children: ReactNode[];
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [persistedState, setPersistedState] = usePersistedState<AuthContextType>('auth', defaultAuthState);

    const contextData = {
        ...defaultAuthState,
        ...persistedState,
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
