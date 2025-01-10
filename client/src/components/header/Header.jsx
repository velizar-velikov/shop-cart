import HeaderDesktop from './HeaderDesktop.jsx';
import HeaderMobile from './HeaderMobile.jsx';
import { useDynamicNav } from '../../hooks/custom/useDynamicNav.js';

export default function Header() {
    const { deviceWidth } = useDynamicNav();

    if (deviceWidth > 768) {
        return <HeaderDesktop />;
    } else {
        return <HeaderMobile />;
    }
}
