import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from '../../hooks/abstracts/useForm.ts';
import { useLogin } from '../../hooks/custom/useAuth.ts';
import { loginSchema } from '../../validation-schemas/auth.ts';
import { validateInputs } from '../../util/validateInputs.ts';

import paths from '../../config/paths.ts';

type LoginDetails = {
    email: string;
    password: string;
};

type LoginValidationsErrors = {
    errors?: LoginDetails;
    message?: string;
};

const initialValues: LoginDetails = {
    email: '',
    password: '',
};

export default function Login() {
    const [validationErrors, setValidationErrors] = useState<LoginValidationsErrors>({});
    const [serverError, setServerError] = useState<{ message?: string }>({});

    const navigate = useNavigate();
    const login = useLogin();

    const loginHandler = async (values: LoginDetails) => {
        try {
            const { data, errors, success } = validateInputs(loginSchema, values);

            if (!success) {
                throw errors;
            }

            const { email, password } = data;

            await login(email, password);
            console.log('successful login with:', email);

            navigate(paths.home.path);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message) {
                    setServerError(error);
                    setValidationErrors({});
                }
            } else {
                setValidationErrors({
                    errors: error as LoginDetails,
                    message:
                        !('email' in (error as LoginDetails)) && !('password' in (error as LoginDetails))
                            ? 'Incorrect email or password'
                            : 'All fields are required.',
                });
                setServerError({});
            }
        }
    };

    const { values, changeHandler, submitHandler } = useForm<LoginDetails>(initialValues, loginHandler);

    return (
        <Container className="container-sm col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 mt-5 p-4 p-lg-5 pb-1 pb-lg-2 bg-dark-subtle shadow rounded-3">
            {serverError && <p className="text-danger">{serverError.message}</p>}
            {validationErrors.message && <p className="text-danger">{validationErrors.message}</p>}
            <Form onSubmit={submitHandler}>
                <h2>Login</h2>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        className={validationErrors.errors?.email ? 'input-error' : ''}
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
                        className={validationErrors.errors?.password ? 'input-error' : ''}
                        type="password"
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
