import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router-dom';
import productsAPI from '../../api/products-api.js';

export default function DeleteProductModal({ show, handleClose, _id, name, brand }) {
    const navigate = useNavigate();
    const deleteHandler = async () => {
        try {
            await productsAPI.deleteById(_id);
            navigate('/catalog');
        } catch (error) {
            console.log(error.message);
            handleClose();
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span className="small">Are you sure you want to delete:</span>
                        <br></br>
                        <span>{`${brand} ${name}`}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteHandler}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
