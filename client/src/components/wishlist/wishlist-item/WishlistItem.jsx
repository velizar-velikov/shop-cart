import { Card, CardBody, CardTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useWishlist } from '../../../hooks/custom/useWishlist.js';
import { useGetSizesForProduct } from '../../../hooks/custom/useStock.ts';
import { useAuthContext } from '../../../contexts/AuthContext.tsx';

import ChooseSizeModal from '../choose-size-modal/ChooseSizeModal.jsx';

import styles from './wishlistItem.module.css';
import paths from '../../../config/paths.ts';

export default function WishlistItem({ _id, imageUrl, category, name, price }) {
    const { isAuthenticated } = useAuthContext();
    const { iconClassName, removeFromWishlist } = useWishlist({ _id, imageUrl, category, name, price });

    const [showChooseSize, setShowChooseSize] = useState(false);

    const onShowChooseSize = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setShowChooseSize(true);
    };

    const { sizes } = useGetSizesForProduct(_id);

    return (
        <>
            {showChooseSize && (
                <ChooseSizeModal
                    show={() => setShowChooseSize(true)}
                    handleClose={() => setShowChooseSize(false)}
                    productId={_id}
                    name={name}
                    inStockSizes={sizes}
                />
            )}
            <div>
                <div className={styles.container}>
                    <button className={styles.icon} onClick={removeFromWishlist}>
                        <i className={iconClassName.filled}></i>
                    </button>
                    <Link className="text-decoration-none" to={paths.details.getHref(_id)}>
                        <Card className={styles.card}>
                            <img src={imageUrl} alt={category} className={`${styles['card-img-top']}`} />
                            <CardBody className={styles.body}>
                                <CardTitle className={styles.title}>{name}</CardTitle>
                                <p className={styles.price}>{`$${price}`}</p>
                                {isAuthenticated && (
                                    <div className={styles['add-wrapper']}>
                                        <button onClick={onShowChooseSize} className={styles.add}>
                                            Add to cart
                                        </button>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </Link>
                </div>
            </div>
        </>
    );
}
