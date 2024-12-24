import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function AddStockModal({ show, handleClose }) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span className="small">Add in stock: </span>
                        <span> Nike Sports t-shirt</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="d-flex gap-1">
                            <Form.Group className="col-4 mt-1">
                                <Form.Label>S (Small)</Form.Label>
                                <Form.Control type="number" min="0" defaultValue="0"></Form.Control>
                            </Form.Group>
                            <Form.Group className="col-4 mt-1">
                                <Form.Label>M (Medium)</Form.Label>
                                <Form.Control type="number" min="0" defaultValue="0"></Form.Control>
                            </Form.Group>
                            <Form.Group className="col-4 mt-1">
                                <Form.Label>L (Large)</Form.Label>
                                <Form.Control type="number" min="0" defaultValue="0"></Form.Control>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
