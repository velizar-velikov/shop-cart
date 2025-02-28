import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useForm } from '../../../hooks/abstracts/useForm.js';
import { useAddToUserCartHandler } from '../../../hooks/custom/useCart.js';

import { useAuthContext } from '../../../contexts/AuthContext.tsx';
import InputErrorMessage from '../../error-messages/InputErrorMessage.jsx';
import paths from '../../../config/paths.ts';

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
    const { userId } = useAuthContext();
    const isOwner = userId == product._ownerId;

    const { addToCartHandler, maxQuantities, errorMessage } = useAddToUserCartHandler(product._id, inStockSizes);

    const { values, changeHandler, submitHandler } = useForm(initialValues, addToCartHandler);

    return (
        <>
            {isOwner ? (
                <Row className="d-flex flex-wrap align-items-center">
                    <Col className="col-7 col-sm-5">
                        <Button as={Link} onClick={handleShowAddStock} className="btn-dark mb-1">
                            Add in stock
                        </Button>
                    </Col>
                    <div className="col-7 d-flex flex-wrap justify-content-start gap-2">
                        <Button as={Link} to={paths.editProduct.getHref(product._id)} className="mb-1">
                            Edit
                        </Button>
                        <Button as={Link} onClick={handleShowDelete} className="btn-danger mb-1">
                            Delete
                        </Button>
                    </div>
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
