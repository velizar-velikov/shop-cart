import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 p-4 p-lg-5 pb-1 pb-lg-2 bg-dark-subtle shadow rounded-3">
            <Form>
                <h2>Register</h2>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Peter" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Pasword</Form.Label>
                    <Form.Control type="password" placeholder="123456789" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="123456789" />
                </Form.Group>
                <Button variant="btn btn-dark mt-3 btn-outline-tertiary" type="submit">
                    Register
                </Button>
                <p className="mt-3 text-end">
                    Already have an account? click <Link to="/login">here</Link>
                </p>
            </Form>
        </Container>
    );
}
