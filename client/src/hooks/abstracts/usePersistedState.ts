import { useState } from 'react';

function createInitialState<T>(key: string, initialState: T) {
    const authData = localStorage.getItem(key);

    if (!authData) {
        return typeof initialState == 'function' ? initialState() : initialState;
    }

    return JSON.parse(authData);
}

/**
 * Uses local storage and useState to create persisted state
 * @param {string} key the name of the local storage record
 * @param {any} initialState the initial state to set the persisted state to
 */
export function usePersistedState<T>(key: string, initialState: T) {
    const [state, setState] = useState<T>(() => createInitialState<T>(key, initialState));

    const updateState = (updaterState: T) => {
        const newState = typeof updaterState == 'function' ? updaterState(state) : updaterState;

        if (newState == null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(newState));
        }

        setState(newState);
    };

    return [state, updateState];
}
