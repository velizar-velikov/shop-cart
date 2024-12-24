import { useEffect, useState } from 'react';
import reviewsAPI from '../api/reviews-api.js';

export function useAGetAllReviewsForProduct(productId) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadReviews() {
            setIsLoading(true);
            try {
                const result = await reviewsAPI.getReviewsForProduct(productId);
                setReviews(result);
            } catch (error) {
                console.log(error.message);
                setReviews([]);
            } finally {
                setIsLoading(false);
            }
        }
        loadReviews();
    }, []);

    return { reviews, isLoading };
}

export function useAddReviewForProduct() {
    const addReviewHandler = async (productId, rating, text, reviewerFullName) => {
        const result = await reviewsAPI.createReviewForProduct(productId, rating, text, reviewerFullName);
        return result;
    };

    return addReviewHandler;
}
