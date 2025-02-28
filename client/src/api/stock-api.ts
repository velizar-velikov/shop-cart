import requester from './request.ts';
import { OrderedProduct } from '../types/product.ts';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    all: '/data/stock',
    byId: (id: string) => `/data/stock/${id}`,
};

interface Sizes {
    small: number;
    medium: number;
    large: number;
}

interface Stock {
    _id: string;
    _createdOn: number;
    _updatedOn?: number;
    _ownerId: string;
    productId: string;
    sizes: Sizes;
}

function buildUrlForProduct(productId: string) {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}"`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return url;
}

function getStockForProduct(productId: string): Promise<Stock[]> {
    const url = buildUrlForProduct(productId);

    return requester.get(url);
}

function initializeStockForProduct(productId: string): Promise<Stock> {
    const sizes: Sizes = {
        small: 1,
        medium: 1,
        large: 1,
    };
    return requester.post(host + endpoints.all, { productId, sizes });
}

async function getSizesForProduct(productId: string): Promise<Sizes> {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}"`,
        select: 'sizes',
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const sizesResponse: { sizes: Sizes }[] = await requester.get(url);

    return sizesResponse[0]?.sizes;
}

async function addStockForProduct(productId: string, sizesToAdd: Sizes): Promise<Stock> {
    // request matches only one stock, but we receive it in an array
    const stock = (await getStockForProduct(productId))[0];
    const sizes = stock.sizes;

    sizes.small = Number(sizes.small) + Number(sizesToAdd.small || 0);
    sizes.medium = Number(sizes.medium) + Number(sizesToAdd.medium || 0);
    sizes.large = Number(sizes.large) + Number(sizesToAdd.large || 0);

    return requester.put(host + endpoints.byId(stock._id), { productId, sizes });
}

async function removeSizeOfProduct(productId: string, sizeToRemove: Partial<Sizes>): Promise<Stock> {
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
 * Removes multiple products with said size and quantity from stock
 * @param {[orderedProduct]} orderedProducts all the ordered products to remove from the stock
 */
function removeMultiple(orderedProducts: OrderedProduct[]) {
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
