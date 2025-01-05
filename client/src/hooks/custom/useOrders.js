import cartAPI from '../../api/cart-api.js';
import ordersAPI from '../../api/orders.js';
import { useCartContext } from '../../contexts/CartContext.jsx';

// TODO: remove purchased items from stock
export function useMakeOrder() {
    const { userCartProducts } = useCartContext();
    const userCartProductIds = userCartProducts.map((p) => p._id);

    const clean_userCartProducts = userCartProducts.map((product) => ({
        productId: product._id,
        size: product.size,
        quantity: product.quantity,
        priceOfPurchase: Number(product.productInfo.price),
    }));

    const makeOrder = async (address, paymentType) => {
        const [order, deletedCartRecords] = await Promise.all([
            ordersAPI.createOrder(clean_userCartProducts, address, paymentType),
            cartAPI.clearCartRecords(userCartProductIds),
        ]);

        return order;
    };

    return makeOrder;
}
