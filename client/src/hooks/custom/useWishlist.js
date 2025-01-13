import { useEffect, useState } from 'react';
import { useWishlistContext } from '../../contexts/WishlistContext.jsx';
import productsAPI from '../../api/products-api.js';

export function useLoadWishlist() {
    const { wishlist, updateWishlist } = useWishlistContext();

    const [wishlistData, setWishlistData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadWishlist() {
            try {
                setIsLoading(true);

                const data = [];

                for (const productId of wishlist) {
                    const product = await productsAPI.getOne(productId);
                    data.push(product);
                }

                setWishlistData(data);
            } catch (error) {
                console.log(error.mesage);
            } finally {
                setIsLoading(false);
            }
        }
        loadWishlist();
    }, []);

    return { wishlistData, isLoading };
}
