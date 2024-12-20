import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Create() {
    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <Form>
                <h2>Create</h2>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control type="text" placeholder="Short sleeve t-shirt" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Product summary</Form.Label>
                    <Form.Control type="text" placeholder="comfortable t-shirt" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Full description</Form.Label>
                    <Form.Control type="text" placeholder="Great for summer and spring and also..." />
                </Form.Group>
                <Button variant="btn btn-dark mt-3 btn-outline-tertiary" type="submit">
                    Create
                </Button>
            </Form>
        </Container>
    );
}
