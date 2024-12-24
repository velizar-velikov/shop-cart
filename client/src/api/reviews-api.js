import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/reviews',
};

async function getReviewsForProduct(productId) {
    const urlParams = new URLSearchParams({
        where: `productId=${productId}`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const result = await requester.get(url);

    if (result.message == 'Resource not found') {
        return [];
    }

    return result;
}

function createReviewForProduct(productId, rating, text) {
    return requester.post(host + endpoints.all, { productId, rating, text });
}

const reviewsAPI = {
    getReviewsForProduct,
    createReviewForProduct,
};

export default reviewsAPI;
