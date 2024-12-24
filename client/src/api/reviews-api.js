import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/reviews',
};

async function getReviewsForProduct(productId) {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}"`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const result = await requester.get(url);

    if (result.message == 'Resource not found') {
        return [];
    }

    return result;
}

async function getUserReviewsForProduct(productId, userId) {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}" AND _ownerId="${userId}"`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const result = await requester.get(url);

    if (result.message == 'Resource not found') {
        return [];
    }

    return result;
}

function createReviewForProduct(productId, rating, text, reviewerFullName) {
    return requester.post(host + endpoints.all, { productId, rating, text, reviewerFullName });
}

async function getRatingInfo(productId) {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}"`,
        select: 'rating',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const result = await requester.get(url);

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
    getRatingInfo,
};

export default reviewsAPI;
