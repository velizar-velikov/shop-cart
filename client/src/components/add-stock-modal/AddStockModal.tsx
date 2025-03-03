import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';
import { useAddStock } from '../../hooks/custom/useStock.ts';
import { useForm } from '../../hooks/abstracts/useForm.ts';
import { Dispatch, SetStateAction, useState } from 'react';
import { Sizes } from '../../types/stock.ts';
import InputErrorMessage from '../error-messages/InputErrorMessage.js';
import { ProductResponse } from '../../types/product.ts';

const initialValues: Sizes<string> = {
    small: '0',
    medium: '0',
    large: '0',
};

interface AddStockModalProps {
    show: () => void;
    handleClose: () => void;
    product: ProductResponse;
    sizes: Sizes<number>;
    updateSizes: Dispatch<SetStateAction<Sizes<number>>>;
}

export default function AddStockModal({ show, handleClose, product, sizes, updateSizes }: AddStockModalProps) {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { productId } = useParams<string>() as { productId: string };
    const addStock = useAddStock();

    const addStockHandler = async (sizesValues: Sizes<string>) => {
        sizesValues.small = sizesValues.small.trim();
        sizesValues.medium = sizesValues.medium.trim();
        sizesValues.large = sizesValues.large.trim();

        // form has default and min value, but user could inspect page and submit wrongfull values
        const hasInvalidField = Object.entries(sizesValues).some(([key, value]) => value == null || Number(value) < 0);
        const areAllSizesZeroes = Object.entries(sizesValues).every(([key, value]) => Number(value) == 0);

        const notify = () => {
            const total = Object.values(sizesValues).reduce((acc, curr) => acc + Number(curr), 0);
            toast.success(`${total} items added in stock.`, { autoClose: 2000 });
        };

        try {
            if (hasInvalidField) {
                throw new Error('Sizes must be non-negative');
            }
            if (areAllSizesZeroes) {
                throw new Error('At least one size quantity must be greater than zero.');
            }
            const updatedStock = await addStock(productId, sizesValues);
            updateSizes(updatedStock.sizes);
            setErrorMessage('');
            handleClose();

            notify();
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                setErrorMessage(error.message);
            }
        } finally {
        }
    };

    const { values, changeHandler, submitHandler } = useForm<Sizes<string>>(initialValues, addStockHandler);

    return (
        <>
            <Modal show={show as unknown as boolean} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span className="small">Add in stock: </span>
                        <span>{`${product.brand} ${product.name}`}</span>
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitHandler}>
                    <Modal.Body>
                        {errorMessage && <InputErrorMessage text={errorMessage} />}
                        <div className="d-flex gap-1">
                            <Form.Group className="col-4 mt-1" controlId="controlInput1">
                                <Form.Label>S (in stock: {sizes.small})</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    name="small"
                                    value={values.small}
                                    onChange={changeHandler}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="col-4 mt-1" controlId="controlInput2">
                                <Form.Label>M (in stock: {sizes.medium})</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    name="medium"
                                    value={values.medium}
                                    onChange={changeHandler}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="col-4 mt-1" controlId="controlInput3">
                                <Form.Label>L (in stock: {sizes.large})</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    name="large"
                                    value={values.large}
                                    onChange={changeHandler}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
