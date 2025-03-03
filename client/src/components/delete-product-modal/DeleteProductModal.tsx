import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router-dom';
import productsAPI from '../../api/products-api.ts';
import { toast } from 'react-toastify';
import paths from '../../config/paths.ts';

interface DeleteProductModalProps {
    show: () => void;
    handleClose: () => void;
    _id: string;
    name: string;
    brand: string;
}

export default function DeleteProductModal({ show, handleClose, _id, name, brand }: DeleteProductModalProps) {
    const navigate = useNavigate();

    const notify = () => {
        toast.success(`${name} deleted`, { autoClose: 2000 });
    };

    const deleteHandler = async () => {
        try {
            await productsAPI.deleteById(_id);
            navigate(paths.catalog.basePath);

            notify();
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                handleClose();
            }
        }
    };
    return (
        <>
            <Modal show={show as any} onHide={handleClose}>
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
