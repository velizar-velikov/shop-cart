import { Link } from 'react-router-dom';
import { useMenuContext } from '../../../../contexts/MenuContext.jsx';

import styles from './hamburgerMenu.module.css';
import { useEffect, useRef } from 'react';

export default function HamburgerMenu() {
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

    return (
        <section className={styles['menu-wrapper']}>
            <div ref={menuRef} className={styles.menu}>
                <div className={styles['btn-wrapper']}>
                    <button onClick={closeMenuHandler} className={`${styles['btn-close']} fa-lg`}>
                        <i className="fa-solid fa-xmark fa-2x"></i>
                    </button>
                </div>
                <nav>
                    <ul className={styles.list}>
                        <li className={styles['list-item']}>
                            <Link className={styles.link}>All products</Link>
                        </li>
                        <li className={styles['list-item']}>
                            <Link className={styles.link}>T-shirts</Link>
                        </li>
                        <li className={styles['list-item']}>
                            <Link className={styles.link}>Sweatshirts</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}
