import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEditQuantityInUserCart, useRemoveFromUserCart } from '../../../hooks/useCart.js';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { useQuantityForm } from '../../../hooks/useQuantityForm.js';
import { useGetSizesForProduct } from '../../../hooks/useStock.js';
import { useRef } from 'react';
import styles from './cartItem.module.css';

const sizesOptions = {
    small: 'S',
    medium: 'M',
    large: 'L',
};

// TODO: when listing cart items, look in stock for said size,
// 1) if quantity is less than chosen amount, display message that the max amount available is: ___
// and do not add item for the next step until the amount is less or equal to the in stock amount
// 2) if item is out of stock of said size, display message to user and do not add item for the next step
export default function CartItem({ cartProduct, setUserCartProducts }) {
    const { userId } = useAuthContext();
    const removeFromCart = useRemoveFromUserCart();
    const editQuantity = useEditQuantityInUserCart();

    const { sizes: inStockSizes } = useGetSizesForProduct(cartProduct.productInfo._id);
    const maxQuantity = inStockSizes[cartProduct.size];

    const deleteCartItemHandler = async () => {
        try {
            await removeFromCart(cartProduct.productInfo._id, userId, cartProduct.size);

            setUserCartProducts((cartProducts) => {
                const index = cartProducts.findIndex((cartItem) => cartItem._id == cartProduct._id);

                return cartProducts.toSpliced(index, 1);
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const formRef = useRef();

    const quantityHandler = async (values) => {
        values.quantity = values.quantity.toString().trim();

        try {
            if (!values.quantity || Number(values.quantity) < 0) {
                throw new Error('Quantity must be greater than 0');
            }

            if (values.quantity > maxQuantity) {
                throw new Error(`We only have ${maxQuantity} in stock from this product.`);
            }

            await editQuantity(cartProduct._id, Number(values.quantity));
        } catch (error) {
            console.log(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useQuantityForm(cartProduct.quantity, quantityHandler, formRef);

    return (
        <Row className="d-flex flex-column flex-xs-row flex-sm-row flex-md-row flex-lg-row mt-4 bg-light border rounded shadow">
            <Col sm={2} className="p-3 p-sm-0 d-flex justify-content-center align-items-center">
                <Card as={Link} to={`/catalog/${cartProduct.productInfo._id}/details`}>
                    <img src={cartProduct.productInfo.imageUrl} className={styles['img-fixed-height']} />
                </Card>
            </Col>
            <Col sm={8} className="col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-8 d-flex flex-column justify-content-around">
                <Link
                    className="d-flex align-items-center gap-4 text-decoration-none text-dark"
                    to={`/catalog/${cartProduct.productInfo._id}/details`}
                >
                    <h5 className="text-secondary">{cartProduct.productInfo.brand}</h5>
                    <h4 className="">{cartProduct.productInfo.name}</h4>
                </Link>
                <div className="d-flex gap-3 align-items-center">
                    <p>
                        Size: <span>{sizesOptions[cartProduct.size]}</span>
                    </p>
                    <Form ref={formRef} onSubmit={submitHandler} className="col-4 col-lg-3 mb-3">
                        <Form.Group className="">
                            <Form.Control
                                type="number"
                                min="1"
                                max={maxQuantity}
                                name="quantity"
                                value={values.quantity}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                    </Form>
                </div>
            </Col>
            <Col sm={1} className="d-flex flex-column justify-content-between py-3">
                <i onClick={deleteCartItemHandler} role="button" className="fa-solid fa-trash fa fa-2x text-danger mx-3"></i>
                <h4>${Number(cartProduct.productInfo.price).toFixed(2)}</h4>
            </Col>
        </Row>
    );
}
