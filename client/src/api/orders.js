import productsAPI from './products-api.ts';
import requester from './request.ts';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    all: '/data/orders',
    byId: (id) => `/data/orders/${id}`,
};

/**
 * @typedef {{productId: string, size: string, quantity: number}} orderedProduct
 */

/**
 * Creates an order with all products in it
 * @param {[orderedProduct]} products
 * @param {string} address
 * @param {string} paymentType
 * @returns
 */
function createOrder(products, address, paymentType) {
    return requester.post(host + endpoints.all, { products, address, paymentType });
}

async function getUserOrders(userId) {
    const urlParams = new URLSearchParams({
        where: `_ownerId="${userId}"`,
    });

    const sortParams = new URLSearchParams({
        sortBy: '_createdOn%20desc',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(sortParams)}`;

    const orders = await requester.get(url);

    // populating products as products are a reference to the products collection
    // but the server does not support a populating a collection of references (only a single reference)
    for (const order of orders) {
        for (let product of order.products) {
            const productResponse = await productsAPI.getOne(product.productId);

            product = Object.assign(product, productResponse);
        }
    }

    return orders;
}

const ordersAPI = {
    createOrder,
    getUserOrders,
};

export default ordersAPI;
