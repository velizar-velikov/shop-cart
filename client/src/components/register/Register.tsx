import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from '../../hooks/abstracts/useForm.ts';
import { useRegister } from '../../hooks/custom/useAuth.ts';
import { registerSchema } from '../../validation-schemas/auth.ts';
import { validateInputs } from '../../util/validateInputs.ts';
import InputErrorMessage from '../error-messages/InputErrorMessage.tsx';

import paths from '../../config/paths.ts';

type RegisterDetails = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repass: string;
};

const initialValues: RegisterDetails = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repass: '',
};

export default function Register() {
    const [validationErrors, setValidationErrors] = useState<RegisterDetails | {}>({});
    const [serverError, setServerError] = useState<{ message?: string }>({});
    const navigate = useNavigate();
    const register = useRegister();

    const registerHandler = async (values: RegisterDetails) => {
        try {
            const { data, errors, success } = validateInputs(registerSchema, values);

            if (!success) {
                throw errors;
            }

            const { firstName, lastName, email, password } = data;

            await register(firstName, lastName, email, password);
            console.log('successful registration with:', email);

            navigate(paths.home.path);
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error);
                setValidationErrors({});
            } else {
                setValidationErrors(error as RegisterDetails);
                setServerError({});
            }
        }
    };

    const { values, changeHandler, submitHandler } = useForm<RegisterDetails>(initialValues, registerHandler);

    return (
        <Container className="container-sm col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 mt-5 p-4 p-lg-5 pb-1 pb-lg-2 mb-4 bg-dark-subtle shadow rounded-3">
            {serverError && <p className="text-danger">{serverError.message}</p>}
            <Form onSubmit={submitHandler}>
                <h2>Register</h2>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>First name</Form.Label>
                    {'firstName' in validationErrors && <InputErrorMessage text={validationErrors.firstName} />}
                    <Form.Control
                        className={'firstName' in validationErrors ? 'input-error' : ''}
                        type="text"
                        placeholder="Peter"
                        name="firstName"
                        value={values.firstName}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Last name</Form.Label>
                    {'lastName' in validationErrors && <InputErrorMessage text={validationErrors.lastName} />}
                    <Form.Control
                        className={'lastName' in validationErrors ? 'input-error' : ''}
                        type="text"
                        placeholder="Petrov"
                        name="lastName"
                        value={values.lastName}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Email address</Form.Label>
                    {'email' in validationErrors && <InputErrorMessage text={validationErrors.email} />}
                    <Form.Control
                        className={'email' in validationErrors ? 'input-error' : ''}
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Pasword</Form.Label>
                    {'password' in validationErrors && <InputErrorMessage text={validationErrors.password} />}
                    <Form.Control
                        className={'password' in validationErrors ? 'input-error' : ''}
                        type="password"
                        placeholder=""
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Confirm password</Form.Label>
                    {'repass' in validationErrors && <InputErrorMessage text={validationErrors.repass} />}
                    <Form.Control
                        className={'repass' in validationErrors ? 'input-error' : ''}
                        type="password"
                        placeholder=""
                        name="repass"
                        value={values.repass}
                        onChange={changeHandler}
                    />
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
