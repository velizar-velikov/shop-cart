import cartAPI from '../../api/cart-api.js';
import ordersAPI from '../../api/orders.js';
import { useCartContext } from '../../contexts/CartContext.jsx';

export function useMakeOrder() {
    const { userCartProducts } = useCartContext();
    const userCartProductIds = userCartProducts.map((p) => p._id);

    const makeOrder = async (productIds, address, paymentType) => {
        const [order, deletedCartRecords] = await Promise.all([
            ordersAPI.createOrder(productIds, address, paymentType),
            // cartAPI.clearCartRecords(userCartProductIds),
        ]);

        return order;
    };

    return makeOrder;
}
