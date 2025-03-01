import cartAPI from '../../api/cart-api.ts';
import ordersAPI from '../../api/orders.ts';
import stockAPI from '../../api/stock-api.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';
import { UseCartContext } from '../../contexts/CartContext.jsx';
import { Order, PaymentType } from '../../types/order.ts';
import { useLoadData } from '../abstracts/useLoadData.ts';

export function useMakeOrder() {
    const { userCartProducts } = UseCartContext();
    const userCartProductIds = userCartProducts.map((p) => p._id);

    const clean_userCartProducts = userCartProducts.map((product) => ({
        productId: product.productInfo._id,
        size: product.size,
        quantity: product.quantity,
        priceOfPurchase: Number(product.productInfo.price),
    }));

    const makeOrder = async (address: string, paymentType: PaymentType) => {
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

    const {
        data: orders,
        setData: setOrders,
        isLoading,
    } = useLoadData<Array<Order>>([], ordersAPI.getUserOrders, { userId }, []);

    return {
        orders,
        setOrders,
        isLoading,
    };
}
