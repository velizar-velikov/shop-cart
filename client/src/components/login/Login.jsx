import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from '../../hooks/abstracts/useForm.js';
import { useLogin } from '../../hooks/custom/useAuth.js';
import paths from '../../config/paths.js';

const initialValues = {
    email: '',
    password: '',
};

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const login = useLogin();

    const loginHandler = async (values) => {
        const { email, password } = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));

        try {
            if (!email || !password) {
                throw new Error('All fields are required.');
            }

            await login(email, password);
            console.log('successful login with:', email);

            navigate(paths.home.path);
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, loginHandler);

    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 p-4 p-lg-5 pb-1 pb-lg-2 bg-dark-subtle shadow rounded-3">
            <Form onSubmit={submitHandler}>
                <h2>Login</h2>
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
                        placeholder="123456789"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Button variant="btn btn-dark mt-3 btn-outline-tertiary" type="submit">
                    Login
                </Button>
                <p className="mt-3 text-end">
                    Dont't have an account? click <Link to={paths.register.path}>here</Link>
                </p>
            </Form>
        </Container>
    );
}
