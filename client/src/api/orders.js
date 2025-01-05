import requester from './request.js';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    all: '/data/orders',
    byId: (id) => `/data/orders/${id}`,
};

function createOrder(productIds, address, paymentType) {
    return requester.post(host + endpoints.all, { products: productIds, address, paymentType });
}

const ordersAPI = {
    createOrder,
};

export default ordersAPI;
