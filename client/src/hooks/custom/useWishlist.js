import { useWishlistContext } from '../../contexts/WishlistContext.jsx';

export function useWishlist(productData, iconButtonRef) {
    const { wishlist, updateWishlist } = useWishlistContext();

    const heartedProduct = wishlist.find((p) => p._id === productData._id);

    const iconClassName = {
        empty: 'fa-regular fa-heart fa-lg',
        filled: 'fa-solid fa-heart fa-lg',
    };

    const fillHeart = () => {
        iconButtonRef.current.children[0].className = iconClassName.filled;
    };

    const emptyHeart = () => {
        if (heartedProduct) {
            return;
        }
        iconButtonRef.current.children[0].className = iconClassName.empty;
    };

    const addToWishlist = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (heartedProduct) {
            return;
        }

        updateWishlist((oldWishlist) => [...oldWishlist, productData]);
        fillHeart();
    };

    const removeFromWishlist = (e) => {
        e.stopPropagation();
        e.preventDefault();

        updateWishlist((oldWishlist) => {
            const productIndex = oldWishlist.findIndex((p) => p._id === productData._id);
            return oldWishlist.toSpliced(productIndex, 1);
        });

        emptyHeart();
    };

    return {
        iconClassName,
        fillHeart,
        emptyHeart,
        addToWishlist,
        removeFromWishlist,
    };
}
