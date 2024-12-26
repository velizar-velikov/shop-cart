import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { useForm } from '../../../hooks/useForm.js';
import { useAddToUserCart } from '../../../hooks/useCart.js';

const initialValues = {
    quantity: '1',
    size: '---',
};

export default function ActionButtons({ product, sizes, updateSizes, isOutOfStock, handleShowAddStock, handleShowDelete }) {
    const { userId } = useAuthContext();
    const isOwner = userId == product._ownerId;

    const addToUserCart = useAddToUserCart();

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

            const updatedStock = await addToUserCart(product._id, userId, values.size, values.quantity);
            updateSizes(updatedStock.sizes);
        } catch (error) {
            console.log(error.message);
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
                        <Button as={Link} to={`/catalog/${product._id}/edit`} className="mb-1">
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
                    <div className="d-flex gap-3">
                        <Form.Group className="col-4">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max={sizes[values.size]}
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
                                value={sizes[values.size] !== 0 ? values.size : '---'}
                                onChange={changeHandler}
                            >
                                <option value="---">---</option>
                                <option disabled={sizes.small == 0} value="small">
                                    S{sizes.small <= 3 && <p> ({sizes.small} left)</p>}
                                </option>
                                <option disabled={sizes.medium == 0} value="medium">
                                    M{sizes.medium <= 3 && <p> ({sizes.medium} left)</p>}
                                </option>
                                <option disabled={sizes.large == 0} value="large">
                                    L{sizes.large <= 3 && <p> ({sizes.large} left)</p>}
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
