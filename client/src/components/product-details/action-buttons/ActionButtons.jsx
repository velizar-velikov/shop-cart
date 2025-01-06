import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from '../../../hooks/abstracts/useForm.js';
import { useAddToUserCart, useGetMaxQuantitiesToAddToCart } from '../../../hooks/custom/useCart.js';

import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { useCartContext } from '../../../contexts/CartContext.jsx';
import InputErrorMessage from '../../error-messages/InputErrorMessage.jsx';
import { toast } from 'react-toastify';
import paths from '../../../config/paths.js';

const initialValues = {
    quantity: '1',
    size: '---',
};

export default function ActionButtons({
    product,
    inStockSizes,
    setInStockSizes,
    isOutOfStock,
    handleShowAddStock,
    handleShowDelete,
}) {
    const [errorMessage, setErrorMessage] = useState('');
    const { userId } = useAuthContext();
    const { setUserCartProducts, cartReducer } = useCartContext();
    const isOwner = userId == product._ownerId;

    const addToUserCart = useAddToUserCart();

    let { maxQuantities, setMaxQuantities } = useGetMaxQuantitiesToAddToCart(product._id, userId, inStockSizes);

    const addtoCartHandler = async (values) => {
        try {
            values.quantity = values.quantity.trim();
            values.size = values.size.trim();

            if (!values.quantity || !values.size) {
                throw new Error('All field are required.');
            }

            if (values.size == '---') {
                throw new Error('Please specify a size first.');
            }

            if (maxQuantities[values.size] <= 0) {
                return;
            }

            const notify = () => {
                toast.success(`Product added to cart.`, { autoClose: 2000 });
            };

            const cartItemResponse = await addToUserCart(product._id, userId, values.size, values.quantity);

            setMaxQuantities((oldSizes) => ({
                ...oldSizes,
                [values.size]: oldSizes[values.size] - values.quantity,
            }));

            const action = {
                type: 'add_cart_product',
                payload: {
                    productId: product._id,
                    qunatity: values.quantity,
                    size: values.size,
                    cartItemResponse,
                },
            };
            setUserCartProducts((state) => cartReducer(state, action));

            setErrorMessage('');

            notify();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // for add to cart operation
    const { values, changeHandler, submitHandler } = useForm(initialValues, addtoCartHandler);

    return (
        <>
            {isOwner ? (
                <Row className="d-flex align-items-center">
                    <Col sm={5}>
                        <Button as={Link} onClick={handleShowAddStock} className="btn-dark mb-1">
                            Add in stock
                        </Button>
                    </Col>
                    <Col sm={2} className="">
                        <Button as={Link} to={paths.editProduct.getHref(product._id)} className="mb-1">
                            Edit
                        </Button>
                    </Col>
                    <Col sm={3}>
                        <Button as={Link} onClick={handleShowDelete} className="btn-danger mb-1">
                            Delete
                        </Button>
                    </Col>
                </Row>
            ) : (
                <Form onSubmit={submitHandler}>
                    {errorMessage && <InputErrorMessage text={errorMessage} />}
                    <div className="d-flex gap-3">
                        <Form.Group className="col-4">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max={maxQuantities[values.size] || 1}
                                name="quantity"
                                value={values.quantity}
                                onChange={changeHandler}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="col-4 mt-1">
                            <Form.Label>Size</Form.Label>
                            <Form.Select
                                size="sm"
                                name="size"
                                value={inStockSizes[values.size] !== 0 ? values.size : '---'}
                                onChange={changeHandler}
                            >
                                <option value="---">---</option>
                                <option disabled={maxQuantities.small == 0} value="small">
                                    S{maxQuantities.small <= 3 && <p> ({maxQuantities.small} left)</p>}
                                </option>
                                <option disabled={maxQuantities.medium == 0} value="medium">
                                    M{maxQuantities.medium <= 3 && <p> ({maxQuantities.medium} left)</p>}
                                </option>
                                <option disabled={maxQuantities.large == 0} value="large">
                                    L{maxQuantities.large <= 3 && <p> ({maxQuantities.large} left)</p>}
                                </option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <Button type="submit" disabled={isOutOfStock} className="col-6 mt-4 m-sm-2 m-lg-4">
                        Add to cart
                    </Button>
                </Form>
            )}
        </>
    );
}
