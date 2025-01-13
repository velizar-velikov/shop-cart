import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './catalogCard.module.css';
import paths from '../../config/paths.js';
import { useRef, useState } from 'react';
import { useWishlistContext } from '../../contexts/WishlistContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext.jsx';

const sizesReference = {
    small: 'S',
    medium: 'M',
    large: 'L',
};

const iconClassName = {
    empty: 'fa-regular fa-heart fa-lg',
    filled: 'fa-solid fa-heart fa-lg',
};

export default function CatalogCard({ _id, name, category, price, summary, imageUrl, _ownerId, sizes, isHome = false }) {
    const { isAuthenticated, userId } = useAuthContext();
    const canHeart = isAuthenticated && userId == _ownerId;

    if (!sizes) {
        sizes = {};
    }

    const sizesText = Object.entries(sizes)
        .filter(([size, quantity]) => quantity > 0)
        .map(([size, quantity]) => `${sizesReference[size]}`)
        .join(', ');

    const [text, setText] = useState(summary);

    const showSizes = () => {
        setText(Object.values(sizes).some((q) => q > 0) ? `Available sizes: ${sizesText}` : 'Out of stock');
    };

    const showSummary = () => {
        setText(summary);
    };

    const { wishlist, updateWishlist } = useWishlistContext();

    const iconButtonRef = useRef();

    const fillHeart = () => {
        iconButtonRef.current.children[0].className = iconClassName.filled;
    };

    const emptyHeart = () => {
        iconButtonRef.current.children[0].className = iconClassName.empty;
    };

    const addToWishlist = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(wishlist);

        updateWishlist((oldWishlist) => [...oldWishlist, _id]);
        fillHeart();
    };

    return (
        <div className={styles.container}>
            {canHeart && (
                <button
                    ref={iconButtonRef}
                    onMouseEnter={fillHeart}
                    onMouseLeave={emptyHeart}
                    className={styles.icon}
                    onClick={addToWishlist}
                >
                    <i className={iconClassName.empty}></i>
                </button>
            )}

            <Link to={paths.details.getHref(_id)} className="text-decoration-none">
                <Card onMouseEnter={showSizes} onMouseLeave={showSummary} className={styles.card}>
                    <img src={imageUrl} alt={category} className={`card-img-catalog ${styles['card-img-top']}`} />
                    <CardBody className={styles.body}>
                        <CardTitle className={styles.title}>{name}</CardTitle>
                        <CardText className={styles.text}>{!isHome ? text : summary}</CardText>
                        <p className={styles.price}>{`$${price}`}</p>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
}
