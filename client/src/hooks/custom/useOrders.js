import cartAPI from '../../api/cart-api.ts';
import ordersAPI from '../../api/orders.ts';
import stockAPI from '../../api/stock-api.ts';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { UseCartContext } from '../../contexts/CartContext.jsx';
import { useLoadData } from '../abstracts/useLoadData.js';

export function useMakeOrder() {
    const { userCartProducts } = UseCartContext();
    const userCartProductIds = userCartProducts.map((p) => p._id);

    const clean_userCartProducts = userCartProducts.map((product) => ({
        productId: product.productInfo._id,
        size: product.size,
        quantity: product.quantity,
        priceOfPurchase: Number(product.productInfo.price),
    }));

    const makeOrder = async (address, paymentType) => {
        const [order, deletedCartRecords, removedStockRecords] = await Promise.all([
            ordersAPI.createOrder(clean_userCartProducts, address, paymentType),
            cartAPI.clearCartRecords(userCartProductIds),
            stockAPI.removeMultiple(clean_userCartProducts),
        ]);

        return order;
    };

    return makeOrder;
}

export function useGetUserOrders() {
    const { userId } = useAuthContext();

    const { data: orders, setData: setOrders, isLoading } = useLoadData([], ordersAPI.getUserOrders, { userId }, []);

    return {
        orders,
        setOrders,
        isLoading,
    };
}
