import { ProductResponse, SizeOption } from '../types/product.ts';
import { Sizes } from '../types/stock.ts';
import productsAPI from './products-api.ts';
import requester from './request.ts';
import stockAPI from './stock-api.ts';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    all: '/data/cart',
    byId: (id: string) => `/data/cart/${id}`,
};

async function getCartForUser(userId: string): Promise<UserCartResponse[]> {
    const urlParams = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `productInfo=productId:products`,
    });

    const urlParamSort = new URLSearchParams({
        sortBy: '_createdOn%20desc',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(urlParamSort.toString())}`;

    const userCartProducts: UserCartResponse[] = await requester.get(url);

    // load sizes in stock
    for (const product of userCartProducts) {
        const sizes = await stockAPI.getSizesForProduct(product.productInfo._id);

        product.sizes = sizes;
    }

    return userCartProducts;
}

async function getUserCartItemsCount(userId: string): Promise<number> {
    const cartItems = await getCartForUser(userId);
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
}

async function getProductSizeRecordInUserCart(productId: string, userId: string, size: SizeOption): Promise<CartResponse[]> {
    const urlParams = new URLSearchParams({
        where: `productId="${productId}" AND size="${size}" AND _ownerId="${userId}"`,
    });
    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    const response = await requester.get(url);
    return response;
}

async function addToUserCart(
    productId: string,
    userId: string,
    size: SizeOption,
    quantity: number
): Promise<CartResponseDetailed> {
    let productSizeRecord: CartResponse[] = [];

    let newProductSizeRecord: CartResponseDetailed = {} as CartResponseDetailed;

    try {
        productSizeRecord = await getProductSizeRecordInUserCart(productId, userId, size);
    } catch (error: any) {
        if (error.message == 'Resource not found') {
            console.log(error.message);
            newProductSizeRecord = await requester.post(host + endpoints.all, {
                productId,
                size,
                quantity: Number(quantity),
            });
        }
    }

    // no product with said size is added to cart yet
    if (productSizeRecord.length == 0) {
        newProductSizeRecord = await requester.post(host + endpoints.all, { productId, size, quantity: Number(quantity) });
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
        newProductSizeRecord = await requester.put(host + endpoints.byId(productSizeRecord[0]._id), {
            productId,
            size,
            quantity: newQuantity,
        });
    }

    const productInfo = await productsAPI.getOne(productId);
    newProductSizeRecord.productInfo = productInfo;

    return newProductSizeRecord;
}

function editCartItemQuantity(cartItemId: string, quantity: number): Promise<CartResponse> {
    return requester.patch(host + endpoints.byId(cartItemId), { quantity });
}

async function removeFromUserCart(productId: string, userId: string, size: SizeOption) {
    const productSizeRecord = await getProductSizeRecordInUserCart(productId, userId, size);
    const removedRecord = await requester.delete(host + endpoints.byId(productSizeRecord[0]._id));

    return removedRecord;
}

// These requests in a loop are needed because server can delete only one record at a time
/**
 * Deletes multiple records from cart collection by given array of ids
 * @param {[string]} cartProductsIds the ids of cart products to delete
 * @returns
 */
function clearCartRecords(cartProductsIds: string[]) {
    //prettier-ignore
    return Promise.all(
        cartProductsIds.map((id) => (
            requester.delete(host + endpoints.byId(id))
            )
        )
    );
}

const cartAPI = {
    getCartForUser,
    getUserCartItemsCount,
    addToUserCart,
    editCartItemQuantity,
    removeFromUserCart,
    getProductSizeRecordInUserCart,
    clearCartRecords,
};

export default cartAPI;
