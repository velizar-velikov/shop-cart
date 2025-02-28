import { OrderedProduct } from '../types/product.ts';
import productsAPI from './products-api.ts';
import requester from './request.ts';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    all: '/data/orders',
    byId: (id: string) => `/data/orders/${id}`,
};

type PaymentType = 'visa' | 'mastercard' | 'cash';

type Order = {
    _ownerId: string;
    _id: string;
    _createdOn: string;
    address: string;
    paymentType: PaymentType;
    products: [OrderedProduct];
};

/**
 * Creates an order with all products in it
 * @param {[orderedProduct]} products
 * @param {string} address
 * @param {string} paymentType
 * @returns
 */
async function createOrder(products: OrderedProduct[], address: string, paymentType: PaymentType): Promise<Order> {
    const order = await requester.post(host + endpoints.all, { products, address, paymentType });
    return order;
}

async function getUserOrders(userId: string): Promise<Order[]> {
    const urlParams = new URLSearchParams({
        where: `_ownerId="${userId}"`,
    });

    const sortParams = new URLSearchParams({
        sortBy: '_createdOn%20desc',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(sortParams.toString())}`;

    const orders: Order[] = await requester.get(url);

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
