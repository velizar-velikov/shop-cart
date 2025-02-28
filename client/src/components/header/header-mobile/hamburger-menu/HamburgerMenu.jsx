import { Link } from 'react-router-dom';
import { useMenuContext } from '../../../../contexts/MenuContext.jsx';
import { useEffect, useRef } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext.tsx';

import styles from './hamburgerMenu.module.css';
import paths from '../../../../config/paths.ts';

const categories = ['All products', 'T-shirts', 'Shorts', 'Sweatshirts', 'Pants'];

export default function HamburgerMenu({ logoutHandler }) {
    const { isAuthenticated } = useAuthContext();
    const { closeMenu } = useMenuContext();

    const menuRef = useRef();
    const timeoutRef = useRef();

    const closeMenuHandler = () => {
        menuRef.current.classList.remove(styles.menu);
        menuRef.current.classList.add(styles.removeMenu);

        timeoutRef.current = setTimeout(() => closeMenu(), 330);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef);
    }, []);

    const logoutAction = () => {
        logoutHandler();
        closeMenuHandler();
    };

    return (
        <section onClick={closeMenuHandler} className={styles['menu-wrapper']}>
            <div ref={menuRef} className={styles.menu} onClick={(e) => e.stopPropagation()}>
                <div className={styles['btn-wrapper']}>
                    <button onClick={closeMenuHandler} className={`${styles['btn-close']} fa-lg`}>
                        <i className="fa-solid fa-xmark fa-2x"></i>
                    </button>
                </div>
                <nav>
                    <ul className={styles['category-list']}>
                        {categories.map((category) => (
                            <CategoryLink key={category} closeMenuHandler={closeMenuHandler} category={category} />
                        ))}
                    </ul>
                    {isAuthenticated && (
                        <ul className={styles['account-list']}>
                            <li className={styles['account-list-item']}>
                                <Link className={styles.link} onClick={closeMenuHandler}>
                                    Account
                                </Link>
                            </li>
                            <li className={styles['account-list-item']}>
                                <Link className={styles.link} onClick={closeMenuHandler} to={paths.createProduct.path}>
                                    Create product
                                </Link>
                            </li>
                            <li className={styles['account-list-item']}>
                                <Link className={styles.link} onClick={closeMenuHandler} to={paths.orders.path}>
                                    Orders
                                </Link>
                            </li>
                            <li className={styles['account-list-item']}>
                                <Link className={styles.link} onClick={logoutAction}>
                                    Sign out
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </section>
    );
}

function CategoryLink({ category, closeMenuHandler }) {
    let path = paths.catalog.basePath;

    if (category !== 'All products') {
        path = path + `?category=${category}`;
    }

    return (
        <li className={styles['category-list-item']}>
            <Link className={styles.link} onClick={closeMenuHandler} to={path}>
                {category}
            </Link>
        </li>
    );
}
