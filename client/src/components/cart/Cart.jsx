import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useGetUserCart } from '../../hooks/useCart.js';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import CartItem from './cart-iitem/CartItem.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

export default function Cart() {
    const { userId } = useAuthContext();

    const { userCartProducts, isLoading } = useGetUserCart(userId);
    console.log(userCartProducts);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Container className="container-sm col-12 col-md-10 col-lg-7 mt-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                    <h2>Your cart</h2>
                    {userCartProducts.map((product) => (
                        <CartItem
                            key={product._id}
                            size={product.size}
                            quantity={product.quantity}
                            productInfo={product.productInfo}
                        />
                    ))}
                </Container>
            )}
        </>
    );
}
