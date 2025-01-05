import requester from './request.js';
import stockAPI from './stock-api.js';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    all: '/data/cart',
    byId: (id) => `/data/cart/${id}`,
};

function getCartForUser(userId) {
    const urlParams = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `productInfo=productId:products`,
    });

    const urlParamSort = new URLSearchParams({
        sortBy: '_createdOn%20desc',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(urlParamSort)}`;

    return requester.get(url);
}

async function getUserCartItemsCount(userId) {
    const cartItems = await getCartForUser(userId);
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
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

    // no product with said size is added to cart yet
    if (productSizeRecord.length == 0) {
        const newProductSizeRecord = await requester.post(host + endpoints.all, { productId, size, quantity: Number(quantity) });
        return newProductSizeRecord;
    } else {
        // product with said size is already added to cart

        // we check if quantity in cart + new quantity is more than quantity in stock
        // if it is we abort the add to cart action
        const sizesInStock = await stockAPI.getSizesForProduct(productId);

        const newQuantity = Number(productSizeRecord[0].quantity) + Number(quantity);

        if (newQuantity > sizesInStock[size]) {
            throw new Error('We do not have any more items in stock of this product and size.');
        }

        // if it is not, we add the quantity to the cart
        return requester.put(host + endpoints.byId(productSizeRecord[0]._id), {
            productId,
            size,
            quantity: newQuantity,
        });
    }
}

function editCartItemQuantity(cartItemId, quantity) {
    return requester.patch(host + endpoints.byId(cartItemId), { quantity });
}

async function removeFromUserCart(productId, userId, size) {
    const productSizeRecord = await getProductSizeRecordInUserCart(productId, userId, size);
    return requester.delete(host + endpoints.byId(productSizeRecord[0]._id));
}

const cartAPI = {
    getCartForUser,
    getUserCartItemsCount,
    addToUserCart,
    editCartItemQuantity,
    removeFromUserCart,
    getProductSizeRecordInUserCart,
};

export default cartAPI;
