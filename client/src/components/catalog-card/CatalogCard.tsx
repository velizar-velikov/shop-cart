import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useWishlistContext } from '../../contexts/WishlistContext.tsx';
import { useAuthContext } from '../../contexts/AuthContext.tsx';
import { useWishlist } from '../../hooks/custom/useWishlist.ts';
import paths from '../../config/paths.ts';

import styles from './catalogCard.module.css';
import { Sizes } from '../../types/stock.ts';
import { Category, SizeOption } from '../../types/product.ts';

const sizesReference = {
    small: 'S',
    medium: 'M',
    large: 'L',
};

interface CatalogCardProps {
    _id: string;
    name: string;
    category: Category;
    price: number;
    summary: string;
    imageUrl: string;
    _ownerId: string;
    sizes?: Sizes<number> | {};
    isHome?: boolean;
}

export default function CatalogCard({
    _id,
    name,
    category,
    price,
    summary,
    imageUrl,
    _ownerId,
    sizes,
    isHome = false,
}: CatalogCardProps) {
    const { isAuthenticated, userId } = useAuthContext();
    const { wishlist } = useWishlistContext();

    const heartedProduct = wishlist.find((p) => p._id === _id);
    let canHeart = true;
    if (isAuthenticated) {
        canHeart = isAuthenticated && userId !== _ownerId;
    }

    if (!sizes) {
        sizes = {};
    }

    const sizesText = Object.entries(sizes)
        .filter(([size, quantity]) => quantity > 0)
        .map(([size, quantity]) => `${sizesReference[size as SizeOption]}`)
        .join(', ');

    const [text, setText] = useState(summary);

    const showSizes = () => {
        setText(Object.values(sizes).some((q) => q > 0) ? `Available sizes: ${sizesText}` : 'Out of stock');
    };

    const showSummary = () => {
        setText(summary);
    };

    const iconButtonRef = useRef<HTMLButtonElement>();

    const { iconClassName, fillHeart, emptyHeart, addToWishlist, removeFromWishlist } = useWishlist(
        { _id, name, category, price, imageUrl, _ownerId },
        iconButtonRef
    );

    return (
        <div>
            <div onMouseEnter={showSizes} onMouseLeave={showSummary} className={styles.container}>
                {canHeart && (
                    <button
                        ref={iconButtonRef as React.MutableRefObject<HTMLButtonElement | null>}
                        onMouseEnter={fillHeart}
                        onMouseLeave={emptyHeart}
                        className={styles.icon}
                        onClick={!heartedProduct ? addToWishlist : removeFromWishlist}
                    >
                        <i className={!heartedProduct ? iconClassName.empty : iconClassName.filled}></i>
                    </button>
                )}

                <Link to={paths.details.getHref(_id)} className="text-decoration-none">
                    <Card className={styles.card}>
                        <img src={imageUrl} alt={category} className={`card-img-catalog ${styles['card-img-top']}`} />
                        <CardBody className={styles.body}>
                            <CardTitle className={styles.title}>{name}</CardTitle>
                            <CardText className={styles.text}>{!isHome ? text : summary}</CardText>
                            <p className={styles.price}>{`$${price}`}</p>
                        </CardBody>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
