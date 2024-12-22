import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/stock',
    byId: (id) => `/data/stock/${id}`,
};

function buildUrlForProduct(productId) {
    const urlParams = new URLSearchParams({
        where: `productId=${productId}`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return url;
}

function getStockForProduct(productId) {
    const url = buildUrlForProduct(productId);

    return requester.get(url);
}

function initializeStockForProduct(productId) {
    const sizes = {
        small: 1,
        medium: 1,
        large: 1,
    };
    return requester.post(host + endpoints.all, { productId, sizes });
}

function getSizesForProduct(productId) {
    const urlParams = new URLSearchParams({
        where: `productId=${productId}`,
        select: 'sizes',
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return requester.get(url);
}

async function addStockForProduct(productId, sizesToAdd) {
    const sizes = await getSizesForProduct(productId);

    sizes.small = sizes.small + (sizesToAdd.small || 0);
    sizes.medium = sizes.medium + (sizesToAdd.medium || 0);
    sizes.large = sizes.large + (sizesToAdd.large || 0);

    const url = buildUrlForProduct(productId);
    return requester.put(url, { productId, sizes });
}

// currently not possible because the server lets only the owners of the item to edit it
// when adding to cart the user is not the owner
async function removeSizeOfProduct(productId, sizeToRemove) {
    const sizes = await getSizesForProduct(productId);

    sizes.small = sizes.small - (sizeToRemove.small || 0);
    sizes.medium = sizes.medium - (sizeToRemove.medium || 0);
    sizes.large = sizes.large - (sizeToRemove.large || 0);

    const url = buildUrlForProduct(productId);

    return requester.put(url, { productId, sizes });
}

const stockAPI = {
    getStockForProduct,
    initializeStockForProduct,
    addStockForProduct,
    removeSizeOfProduct,
};

export default stockAPI;
