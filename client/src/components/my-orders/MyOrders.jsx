import { Container } from 'react-bootstrap';
import { useGetUserOrders } from '../../hooks/custom/useOrders.ts';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';
import Order from './order/Order.jsx';
import NoOrders from './no-orders/NoOrders.jsx';

export default function MyOrders() {
    const { orders, isLoading } = useGetUserOrders();

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Container className="container-sm col-12 col-md-10 col-lg-7 mt-5 mb-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                    <header className="d-flex justify-content-between align-items-center mx-3">
                        <h2>Orders</h2>
                    </header>
                    {orders.length > 0 ? (
                        <Container className="d-flex flex-column gap-4 mt-4 px-3 py-5 bg-light border rounded shadow">
                            {orders.map((order) => (
                                <Order key={order._id} {...order} />
                            ))}
                        </Container>
                    ) : (
                        <NoOrders />
                    )}
                </Container>
            )}
        </>
    );
}
