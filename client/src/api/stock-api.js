import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/stock',
    byId: (id) => `/data/stock/${id}`,
};

function buildUrlForProduct(productId) {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}"`,
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

async function getSizesForProduct(productId) {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}"`,
        select: 'sizes',
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const sizesResponse = await requester.get(url);

    return sizesResponse;
}

async function addStockForProduct(productId, sizesToAdd) {
    // request matches only one stock, but we receive it in an array
    const stock = (await getStockForProduct(productId))[0];
    console.log({ productId, stock });
    const sizes = stock.sizes;

    sizes.small = Number(sizes.small) + Number(sizesToAdd.small || 0);
    sizes.medium = Number(sizes.medium) + Number(sizesToAdd.medium || 0);
    sizes.large = Number(sizes.large) + Number(sizesToAdd.large || 0);

    requester.put(host + endpoints.byId(stock._id), { productId, sizes });
}

// currently not possible because the server lets only the owners of the item to edit it
// when adding to cart the user is not the owner
// TODO: shady fix: add X-Admin header to go around that
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
