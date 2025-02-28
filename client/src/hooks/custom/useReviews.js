import reviewsAPI from '../../api/reviews-api.ts';
import { useLoadData } from '../abstracts/useLoadData.js';

export function useAGetAllReviewsForProduct(productId, userId) {
    const {
        data: reviews,
        setData: setReviews,
        isLoading,
        hasError,
    } = useLoadData([], reviewsAPI.getReviewsForProduct, { productId });

    if (hasError) {
        setReviews([]);
    }

    if (userId) {
        // moving the user review to the beginning so he can see his own review at the top
        const userReviewIndex = reviews.findIndex((review) => review._ownerId == userId);
        if (userReviewIndex !== -1) {
            const userReview = reviews.splice(userReviewIndex, 1)[0];
            userReview.reviewerFullName = userReview.reviewerFullName + ' (you)';
            reviews.unshift(userReview);
        }
    }

    return { reviews, setReviews, isLoading };
}

export function useGetUserReviewsForProduct(productId, userId, hasAddedNewReview) {
    const {
        data: userReviews,
        setData: setReviews,
        isLoading,
        hasError,
    } = useLoadData([], reviewsAPI.getUserReviewsForProduct, { productId, userId }, [hasAddedNewReview]);

    if (hasError) {
        setReviews([]);
    }

    return { userReviews, hasUserReviewed: userReviews.length > 0, isLoading };
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

export function useDeleteReviewForProduct() {
    const deleteReviewHandler = async (reviewId) => {
        const result = await reviewsAPI.deleteReviewForProduct(reviewId);
        return result;
    };

    return deleteReviewHandler;
}

export function useGetRatingInfo(productId, hasAddedNewReview) {
    const initialState = {
        averageRating: 0,
        ratingsCount: 0,
    };

    const { data: ratingInfo, isLoading } = useLoadData(initialState, reviewsAPI.getRatingInfo, { productId }, [
        hasAddedNewReview,
    ]);

    return { ...ratingInfo, isLoading };
}
