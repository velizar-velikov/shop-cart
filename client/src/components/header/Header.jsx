import HeaderDesktop from './header-desktop/HeaderDesktop.jsx';
import HeaderMobile from './header-mobile/HeaderMobile.jsx';
import { useDynamicNav } from '../../hooks/custom/useDynamicNav.js';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/custom/useAuth.js';
import { useMenuContext } from '../../contexts/MenuContext.jsx';
import paths from '../../config/paths.js';

export default function Header() {
    const { deviceWidth } = useDynamicNav();

    const { closeMenu, setIsMobile } = useMenuContext();

    const navigate = useNavigate();
    const logout = useLogout();

    const logoutHandler = async () => {
        await logout();
        navigate(paths.home.path);
    };

    if (deviceWidth > 800) {
        setIsMobile(false);
        closeMenu();

        return <HeaderDesktop logoutHandler={logoutHandler} />;
    } else {
        setIsMobile(true);

        return <HeaderMobile logoutHandler={logoutHandler} />;
    }
}
