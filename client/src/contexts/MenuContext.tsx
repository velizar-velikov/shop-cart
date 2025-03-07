import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';

interface MenuContextType {
    isMenuOpened: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    isMobile: boolean;
    setIsMobile: Dispatch<SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuContextType>({
    isMenuOpened: false,
    openMenu: () => null,
    closeMenu: () => null,
    isMobile: false,
    setIsMobile: () => null,
});

export function MenuContextProvider({ children }: PropsWithChildren) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    const contextData = {
        isMenuOpened,
        openMenu: () => setIsMenuOpened(true),
        closeMenu: () => setIsMenuOpened(false),
        isMobile,
        setIsMobile,
    };

    return (
        // prettier-ignore
        <MenuContext.Provider value={contextData}>
            {children}
        </MenuContext.Provider>
    );
}

export const useMenuContext = () => useContext(MenuContext);
