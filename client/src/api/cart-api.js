import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/cart',
    byId: (id) => `/data/cart/${id}`,
};

function getCartForUser(userId) {
    const urlParams = new URLSearchParams({
        where: `_ownerId=${userId}`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return requester.get(url);
}

function getProductSizeRecordInUserCart(productId, userId, size) {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}" AND size="${size}" AND _ownerId="${userId}"`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return requester.get(url);
}

async function addToUserCart(productId, userId, size, quantity) {
    let productSizeRecord = [];

    if (!['small', 'medium', 'large'].includes(size)) {
        return;
    }

    try {
        productSizeRecord = await getProductSizeRecordInUserCart(productId, userId, size);
    } catch (error) {
        console.log(error.message);
        if (error.message == 'Resource not found') {
            const newProductSizeRecord = await requester.post(host + endpoints.all, {
                productId,
                size,
                quantity: Number(quantity),
            });
            return newProductSizeRecord;
        }
    }

    if (productSizeRecord.length == 0) {
        const newProductSizeRecord = await requester.post(host + endpoints.all, { productId, size, quantity: Number(quantity) });
        return newProductSizeRecord;
    } else {
        return requester.put(host + endpoints.byId(productSizeRecord[0]._id), {
            productId,
            size,
            quantity: Number(productSizeRecord[0].quantity) + Number(quantity),
        });
    }
}

const cartAPI = {
    getCartForUser,
    addToUserCart,
};

export default cartAPI;
