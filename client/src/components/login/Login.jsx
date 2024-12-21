import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
export default function Login() {
    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 p-4 p-lg-5 pb-1 pb-lg-2 bg-dark-subtle shadow rounded-3">
            <Form>
                <h2>Login</h2>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Pasword</Form.Label>
                    <Form.Control type="password" placeholder="123456789" />
                </Form.Group>
                <Button variant="btn btn-dark mt-3 btn-outline-tertiary" type="submit">
                    Login
                </Button>
                <p className="mt-3 text-end">
                    Dont't have an account? click <Link to="/register">here</Link>
                </p>
            </Form>
        </Container>
    );
}
