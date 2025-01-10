import HeaderDesktop from './header-desktop/HeaderDesktop.jsx';
import HeaderMobile from './header-mobile/HeaderMobile.jsx';
import { useDynamicNav } from '../../hooks/custom/useDynamicNav.js';

export default function Header() {
    const { deviceWidth } = useDynamicNav();

    if (deviceWidth > 800) {
        return <HeaderDesktop />;
    } else {
        return <HeaderMobile />;
    }
}
