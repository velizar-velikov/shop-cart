import { createContext, useContext, useState } from 'react';

const MenuContext = createContext({
    isMenuOpened: false,
    openMenu: () => null,
    closeMenu: () => null,
});

export function MenuContextProvider(props) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const contextData = {
        isMenuOpened,
        openMenu: () => setIsMenuOpened(true),
        closeMenu: () => setIsMenuOpened(false),
    };

    return (
        // prettier-ignore
        <MenuContext.Provider value={contextData}>
            {props.children}
        </MenuContext.Provider>
    );
}

export const useMenuContext = () => useContext(MenuContext);
