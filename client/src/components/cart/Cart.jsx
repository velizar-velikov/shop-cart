import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useGetUserCart } from '../../hooks/useCart.js';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import CartItem from './cart-iitem/CartItem.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

export default function Cart() {
    const { userId } = useAuthContext();

    const { userCartProducts, setUserCartProducts, isLoading } = useGetUserCart(userId);
    const totalPrice = userCartProducts.reduce((acc, val) => acc + Number(val.productInfo.price), 0);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Container className="container-sm col-12 col-md-10 col-lg-7 mt-5 mb-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Cart</h2>
                        <div className="d-flex align-items-center gap-4">
                            <h4 className="pt-2 fw-bold">
                                <span className="fs-5 fw-normal">Total:</span> {`$${totalPrice.toFixed(2)}`}
                            </h4>
                            <Button className="h-25 btn-dark">Next step</Button>
                        </div>
                    </div>
                    {userCartProducts.map((product) => (
                        <CartItem
                            key={product._id}
                            size={product.size}
                            quantity={product.quantity}
                            productInfo={product.productInfo}
                            setUserCartProducts={setUserCartProducts}
                        />
                    ))}
                </Container>
            )}
        </>
    );
}
