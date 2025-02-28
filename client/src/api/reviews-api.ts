import requester from './request.ts';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    all: '/data/reviews',
    byId: (id: string) => `/data/reviews/${id}`,
};

interface ReviewResponse {
    _ownerId: string;
    _id: string;
    productId: string;
    _createdOn: number;
    _updatedOn?: number;
    rating: string;
    text: string;
    reviewerFullName: string;
}

async function getReviewsForProduct(productId: string): Promise<ReviewResponse[]> {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}"`,
    });

    const urlParamSort = new URLSearchParams({
        sortBy: '_createdOn%20desc',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(urlParamSort.toString())}`;

    const result: ReviewResponse[] & { message: string } = await requester.get(url);

    if (result.message == 'Resource not found') {
        return [];
    }

    return result;
}

async function getUserReviewsForProduct(productId: string, userId: string): Promise<ReviewResponse[]> {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}" AND _ownerId="${userId}"`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const result: ReviewResponse[] & { message: string } = await requester.get(url);

    if (result.message == 'Resource not found') {
        return [];
    }

    return result;
}

function createReviewForProduct(
    productId: string,
    rating: number,
    text: string,
    reviewerFullName: string
): Promise<ReviewResponse> {
    return requester.post(host + endpoints.all, { productId, rating, text, reviewerFullName });
}

function editReviewForProduct(reviewId: string, text: string): Promise<ReviewResponse> {
    return requester.patch(host + endpoints.byId(reviewId), { text });
}

function deleteReviewForProduct(reviewId: string) {
    return requester.delete(host + endpoints.byId(reviewId));
}

async function getRatingInfo(productId: string) {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}"`,
        select: 'rating',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const result: { rating: string }[] & { message: string } = await requester.get(url);

    if (result.message == 'Resource not found') {
        return { averageRating: 0, ratingsCount: 0 };
    }

    const ratingsCount = result.length;
    const averageRating = result.reduce((acc, value) => acc + Number(value.rating), 0) / (ratingsCount || 1);

    return { averageRating, ratingsCount };
}

const reviewsAPI = {
    getReviewsForProduct,
    getUserReviewsForProduct,
    createReviewForProduct,
    editReviewForProduct,
    deleteReviewForProduct,
    getRatingInfo,
};

export default reviewsAPI;
