import { createContext, useContext, useState } from 'react';
import { usePersistedState } from '../hooks/usePersistedState.js';

const AuthContext = createContext({
    userId: '',
    firstName: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: () => null,
});

export function AuthContextProvider(props) {
    const [persistedState, setPersistedState] = usePersistedState('auth', {});

    const contextData = {
        userId: persistedState?.userId,
        firstName: persistedState?.firstName,
        email: persistedState?.email,
        accessToken: persistedState?.accessToken,
        isAuthenticated: Boolean(persistedState?.email),
        changeAuthState: (state) => setPersistedState(state),
    };

    return (
        //prettier-ignore
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
