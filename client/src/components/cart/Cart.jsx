import { Button, Container } from 'react-bootstrap';
import CartItem from './cart-iitem/CartItem.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';
import { Link } from 'react-router-dom';
import paths from '../../config/paths.js';
import { UseCartContext } from '../../contexts/CartContext.jsx';
import EmptyCart from './empty-cart/EmptyCart.jsx';

export default function Cart() {
    let { userCartProducts, isLoading, totalPrice } = UseCartContext();
    userCartProducts.map((product) => {
        product.maxQuantity = product.sizes[product.size];
        return product;
    });

    const canProceed = userCartProducts.length > 0 && userCartProducts.some((product) => product.maxQuantity >= product.quantity);

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
                            <Button
                                as={Link}
                                to={paths.purchase.path}
                                disabled={!canProceed}
                                className={`h-25 btn-dark${!canProceed ? ' disabled' : ''}`}
                            >
                                Next step
                            </Button>
                        </div>
                    </div>
                    {userCartProducts.length > 0 ? (
                        userCartProducts.map((product) => <CartItem key={product._id} cartProduct={product} />)
                    ) : (
                        <EmptyCart />
                    )}
                </Container>
            )}
        </>
    );
}
