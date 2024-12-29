import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from '../../hooks/useForm.js';
import { useRegister } from '../../hooks/useAuth.js';
import paths from '../../config/paths.js';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repass: '',
};

export default function Register() {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const register = useRegister();

    const registerHandler = async (values) => {
        const { firstName, lastName, email, password, repass } = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value.trim()])
        );

        try {
            if (!firstName || !lastName || !email || !password) {
                throw new Error('All fields are required.');
            }
            if (password !== repass) {
                throw new Error("Passwords don't match.");
            }

            await register(firstName, lastName, email, password);
            console.log('successful registration with:', email);

            navigate(paths.home.path);
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, registerHandler);

    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 p-4 p-lg-5 pb-1 pb-lg-2 bg-dark-subtle shadow rounded-3">
            <Form onSubmit={submitHandler}>
                <h2>Register</h2>
                <Row className="d-flex">
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Peter"
                                name="firstName"
                                value={values.firstName}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Petrov"
                                name="lastName"
                                value={values.lastName}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Pasword</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder=""
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="" name="repass" value={values.repass} onChange={changeHandler} />
                </Form.Group>
                <Button variant="btn btn-dark mt-3 btn-outline-tertiary" type="submit">
                    Register
                </Button>
                <p className="mt-3 text-end">
                    Already have an account? click <Link to={paths.login.path}>here</Link>
                </p>
            </Form>
        </Container>
    );
}
