import requester from './request.js';

const host = import.meta.env.VITE_API_URL;

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

    return sizesResponse[0]?.sizes;
}

async function addStockForProduct(productId, sizesToAdd) {
    // request matches only one stock, but we receive it in an array
    const stock = (await getStockForProduct(productId))[0];
    const sizes = stock.sizes;

    sizes.small = Number(sizes.small) + Number(sizesToAdd.small || 0);
    sizes.medium = Number(sizes.medium) + Number(sizesToAdd.medium || 0);
    sizes.large = Number(sizes.large) + Number(sizesToAdd.large || 0);

    return requester.put(host + endpoints.byId(stock._id), { productId, sizes });
}

async function removeSizeOfProduct(productId, sizeToRemove) {
    const response = await getStockForProduct(productId);
    const stockForProduct = response[0];

    const sizes = stockForProduct.sizes;

    sizes.small = Number(sizes.small) - Number(sizeToRemove.small || 0);
    sizes.medium = Number(sizes.medium) - Number(sizeToRemove.medium || 0);
    sizes.large = Number(sizes.large) - Number(sizeToRemove.large || 0);

    // add X-Admin header to update record that is not current user's
    return requester.put(host + endpoints.byId(stockForProduct._id), { productId, sizes }, true);
}

/**
 * @typedef {{productId: string, size: string, quantity: number}} orderedProduct
 */

/**
 * Removes multiple products with said size and quantity from stock
 * @param {[orderedProduct]} orderedProducts all the ordered products to remove from the stock
 */
function removeMultiple(orderedProducts) {
    return Promise.all(
        orderedProducts.map((product) => {
            return removeSizeOfProduct(product.productId, { [product.size]: product.quantity });
        })
    );
}

const stockAPI = {
    getStockForProduct,
    getSizesForProduct,
    initializeStockForProduct,
    addStockForProduct,
    removeSizeOfProduct,
    removeMultiple,
};

export default stockAPI;
