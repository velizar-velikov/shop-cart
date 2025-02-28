import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { useEditQuantityInUserCart, useRemoveFromUserCart } from '../../../hooks/custom/useCart.js';
import { useAuthContext } from '../../../contexts/AuthContext.tsx';
import { useQuantityForm } from '../../../hooks/custom/useQuantityForm.js';
import { useGetSizesForProduct } from '../../../hooks/custom/useStock.js';
import { UseCartContext } from '../../../contexts/CartContext.jsx';

import paths from '../../../config/paths.ts';
import styles from './cartItem.module.css';

const sizesOptions = {
    small: 'S',
    medium: 'M',
    large: 'L',
};

export default function CartItem({ cartProduct }) {
    const [errorMessage, setErrorMessage] = useState('');

    const { userId } = useAuthContext();
    const { setUserCartProducts, cartReducer } = UseCartContext();

    const removeFromCart = useRemoveFromUserCart();
    const editQuantity = useEditQuantityInUserCart();

    const { sizes: inStockSizes } = useGetSizesForProduct(cartProduct.productInfo._id);
    const maxQuantity = inStockSizes[cartProduct.size];

    useEffect(() => {
        if (cartProduct.quantity > cartProduct.maxQuantity) {
            if (cartProduct.maxQuantity === 0) {
                setErrorMessage('We are out of stock of this size');
            } else {
                setErrorMessage(`We only have ${cartProduct.sizes[cartProduct.size]} in stock from this product.`);
            }
        }
    }, []);

    const deleteCartItemHandler = async () => {
        try {
            await removeFromCart(cartProduct.productInfo._id, userId, cartProduct.size);

            const action = {
                type: 'remove_product',
                payload: { _id: cartProduct._id },
            };
            setUserCartProducts((state) => cartReducer(state, action));
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

            await editQuantity(cartProduct._id, Number(values.quantity));

            const action = {
                type: 'edit_quantity',
                payload: {
                    _id: cartProduct._id,
                    quantity: values.quantity,
                },
            };
            setUserCartProducts((state) => cartReducer(state, action));
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useQuantityForm(cartProduct.quantity, quantityHandler, formRef);

    return (
        <Row
            className={`d-flex flex-column flex-xs-row flex-sm-row flex-md-row flex-lg-row mt-4 bg-light border rounded shadow${
                cartProduct.maxQuantity === 0 ? ' opacity-50' : ''
            }`}
        >
            <Col sm={2} className="p-3 p-sm-0 d-flex justify-content-center align-items-center">
                <Card className="border-none rounded-0" as={Link} to={paths.details.getHref(cartProduct.productInfo._id)}>
                    <img src={cartProduct.productInfo.imageUrl} className={styles['img-fixed-height']} />
                </Card>
            </Col>
            <Col
                sm={8}
                className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 d-flex flex-column justify-content-around"
            >
                <div className="d-flex flex-column">
                    <Link
                        className="d-flex flex-wrap align-items-center gap-4 text-decoration-none text-dark"
                        to={paths.details.getHref(cartProduct.productInfo._id)}
                    >
                        <h5 className="text-secondary">{cartProduct.productInfo.brand}</h5>
                        <h4 className="">{cartProduct.productInfo.name}</h4>
                    </Link>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </div>
                <div className="d-flex gap-3 align-items-center">
                    <p>
                        Size: <span>{sizesOptions[cartProduct.size]}</span>
                    </p>
                    <Form ref={formRef} onSubmit={submitHandler} className="col-4 col-lg-3 mb-3">
                        <Form.Group>
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
                <i
                    title="Delete"
                    onClick={deleteCartItemHandler}
                    role="button"
                    className="fa-solid fa-trash fa fa-2x text-danger mx-3"
                ></i>
                <h4>${Number(cartProduct.productInfo.price).toFixed(2)}</h4>
            </Col>
        </Row>
    );
}
