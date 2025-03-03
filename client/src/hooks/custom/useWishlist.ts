import { toast } from 'react-toastify';
import { useWishlistContext } from '../../contexts/WishlistContext.tsx';
import { ProductResponse } from '../../types/product.ts';
import React, { Ref, RefObject, SyntheticEvent } from 'react';
import { PersistedWishlistItem } from '../../types/wishlist.ts';

export function useWishlist(productData: Partial<ProductResponse>, iconButtonRef: RefObject<HTMLButtonElement | undefined>) {
    const { wishlist, updateWishlist } = useWishlistContext();

    const heartedProduct = wishlist.find((p) => p._id === productData._id);

    const iconClassName = {
        empty: 'fa-regular fa-heart fa-lg',
        filled: 'fa-solid fa-heart fa-lg',
    };

    const fillHeart = () => {
        if (iconButtonRef.current) {
            iconButtonRef.current.children[0].className = iconClassName.filled;
        }
    };

    const emptyHeart = () => {
        if (heartedProduct) {
            return;
        }

        if (iconButtonRef.current) {
            iconButtonRef.current.children[0].className = iconClassName.empty;
        }
    };

    const notify = () => {
        toast.success(`Product added to wishlist.`, { autoClose: 2000 });
    };

    const addToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (heartedProduct) {
            return;
        }

        updateWishlist((oldWishlist: PersistedWishlistItem[]) => [...oldWishlist, productData]);
        fillHeart();
        notify();
    };

    const removeFromWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        updateWishlist((oldWishlist: PersistedWishlistItem[]) => {
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
