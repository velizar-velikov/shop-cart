import reviewsAPI from '../../api/reviews-api.ts';
import { ReviewResponse } from '../../types/review.ts';
import { useLoadData } from '../abstracts/useLoadData.ts';

export function useAGetAllReviewsForProduct(productId: string, userId: string) {
    const {
        data: reviews,
        setData: setReviews,
        isLoading,
        hasError,
    } = useLoadData<Array<ReviewResponse>>([], reviewsAPI.getReviewsForProduct, { productId });

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

export function useGetUserReviewsForProduct(productId: string, userId: string, hasAddedNewReview: boolean) {
    const {
        data: userReviews,
        setData: setReviews,
        isLoading,
        hasError,
    } = useLoadData<Array<ReviewResponse>>([], reviewsAPI.getUserReviewsForProduct, { productId, userId }, [hasAddedNewReview]);

    if (hasError) {
        setReviews([]);
    }

    return { userReviews, hasUserReviewed: userReviews.length > 0, isLoading };
}

export function useAddReviewForProduct() {
    const addReviewHandler = async (productId: string, rating: number, text: string, reviewerFullName: string) => {
        const result = await reviewsAPI.createReviewForProduct(productId, rating, text, reviewerFullName);
        return result;
    };

    return addReviewHandler;
}

export function useEditReviewForProduct() {
    const editReviewHandler = async (reviewId: string, text: string) => {
        const result = await reviewsAPI.editReviewForProduct(reviewId, text);
        return result;
    };

    return editReviewHandler;
}

export function useDeleteReviewForProduct() {
    const deleteReviewHandler = async (reviewId: string) => {
        const result = await reviewsAPI.deleteReviewForProduct(reviewId);
        return result;
    };

    return deleteReviewHandler;
}

export function useGetRatingInfo(productId: string, hasAddedNewReview: boolean) {
    const initialState = {
        averageRating: 0,
        ratingsCount: 0,
    };

    const { data: ratingInfo, isLoading } = useLoadData(initialState, reviewsAPI.getRatingInfo, { productId }, [
        hasAddedNewReview,
    ]);

    return { ...ratingInfo, isLoading };
}
