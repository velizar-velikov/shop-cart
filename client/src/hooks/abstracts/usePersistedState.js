import { useState } from 'react';

function createInitialState(key, initialState) {
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
 * @returns {[state: any, updateState: function]}
 */
export function usePersistedState(key, initialState) {
    const [state, setState] = useState(() => createInitialState(key, initialState));

    const updateState = (updaterState) => {
        const newState = typeof updaterState == 'function' ? updaterState() : updaterState;

        if (newState == null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(newState));
        }

        setState(newState);
    };

    return [state, updateState];
}
