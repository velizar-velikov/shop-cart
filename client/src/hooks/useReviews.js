import { useEffect, useState } from 'react';
import reviewsAPI from '../api/reviews-api.js';

export function useAGetAllReviewsForProduct(productId, userId) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadReviews() {
            setIsLoading(true);
            try {
                let result = await reviewsAPI.getReviewsForProduct(productId);
                if (userId) {
                    // moving the user review to the beginning so he can see his own review at the top
                    const userReviewIndex = result.findIndex((review) => review._ownerId == userId);
                    if (userReviewIndex !== -1) {
                        const userReview = result.splice(userReviewIndex, 1)[0];
                        userReview.reviewerFullName = userReview.reviewerFullName + ' (you)';
                        result.unshift(userReview);
                    }
                }
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

export function useGetUserReviewsForProduct(productId, userId, hasAddedNewReview) {
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
    }, [hasAddedNewReview]);

    return { userReviews: reviews, hasUserReviewed: reviews.length > 0, isLoading };
}

export function useAddReviewForProduct() {
    const addReviewHandler = async (productId, rating, text, reviewerFullName) => {
        const result = await reviewsAPI.createReviewForProduct(productId, rating, text, reviewerFullName);
        return result;
    };

    return addReviewHandler;
}

export function useEditReviewForProduct() {
    const editReviewHandler = async (reviewId, text) => {
        const result = await reviewsAPI.editReviewForProduct(reviewId, text);
        return result;
    };

    return editReviewHandler;
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
