import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/cart',
};

function getCartForUser(userId) {
    const urlParams = new URLSearchParams({
        where: `_ownerId=${userId}`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return requester.get(url);
}

function addToUserCart(productId) {
    return requester.post(host + endpoints.all, { productId });
}

const cartAPI = {
    getCartForUser,
    addToUserCart,
};

export default cartAPI;
