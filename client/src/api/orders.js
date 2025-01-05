import requester from './request.js';

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

const ordersAPI = {
    createOrder,
};

export default ordersAPI;
