import cartAPI from '../api/cart-api.js';
import stockAPI from '../api/stock-api.js';

export function useAddToUserCart() {
    const addToUserCartHandler = async (productId, userId, size, quantity) => {
        const [cartResult, stockResult] = await Promise.all([
            cartAPI.addToUserCart(productId, userId, size, quantity),
            stockAPI.removeSizeOfProduct(productId, { [size]: quantity }),
        ]);

        return stockResult;
    };

    return addToUserCartHandler;
}
