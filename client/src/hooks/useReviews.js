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

export function useGetUserReviewsForProduct(productId, userId) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadUserReviews() {
            setIsLoading(true);
            try {
                const result = await reviewsAPI.getUserReviewsForProduct(productId, userId);
                setReviews(result);
            } catch (error) {
                console.log(error.message);
                setReviews([]);
            } finally {
                setIsLoading(false);
            }
        }
        loadUserReviews();
    }, []);

    return { userReviews: reviews, hasUserReviewed: reviews.length > 0, isLoading };
}

export function useAddReviewForProduct() {
    const [review, setReview] = useState({});

    const addReviewHandler = async (productId, rating, text, reviewerFullName) => {
        const result = await reviewsAPI.createReviewForProduct(productId, rating, text, reviewerFullName);
        setReview(result);
        return result;
    };

    return addReviewHandler;
}

export function useGetRatingInfo(productId, hasAddedNewReview) {
    const [isLoading, setIsLoading] = useState(false);

    const [ratingInfo, setRatingInfo] = useState({
        averageRating: 0,
        ratingsCount: 0,
    });
    useEffect(() => {
        async function loadRatingInfo() {
            setIsLoading(true);
            const result = await reviewsAPI.getRatingInfo(productId);
            setRatingInfo(result);
            setIsLoading(false);
        }
        loadRatingInfo();
    }, [hasAddedNewReview]);

    return { ...ratingInfo, isLoading };
}
