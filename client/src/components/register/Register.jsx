import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from '../../hooks/abstracts/useForm.js';
import { useRegister } from '../../hooks/custom/useAuth.js';
import { registerSchema } from '../../validation-schemas/auth.js';
import { validateInputs } from '../../util/validateInputs.js';
import InputErrorMessage from '../error-messages/InputErrorMessage.jsx';

import paths from '../../config/paths.js';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repass: '',
};

export default function Register() {
    const [validationErrors, setValidationErrors] = useState({});
    const [serverError, setServerError] = useState({});
    const navigate = useNavigate();
    const register = useRegister();

    const registerHandler = async (values) => {
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
            if (error.message) {
                setServerError(error);
                setValidationErrors({});
            } else {
                setValidationErrors(error);
                setServerError({});
            }
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, registerHandler);

    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 p-4 p-lg-5 pb-1 pb-lg-2 mb-4 bg-dark-subtle shadow rounded-3">
            {serverError && <p className="text-danger">{serverError.message}</p>}
            <Form onSubmit={submitHandler}>
                <h2>Register</h2>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>First name</Form.Label>
                    {validationErrors.firstName && <InputErrorMessage text={validationErrors.firstName} />}
                    <Form.Control
                        className={validationErrors.firstName ? 'input-error' : ''}
                        type="text"
                        placeholder="Peter"
                        name="firstName"
                        value={values.firstName}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last name</Form.Label>
                    {validationErrors.lastName && <InputErrorMessage text={validationErrors.lastName} />}
                    <Form.Control
                        className={validationErrors.lastName ? 'input-error' : ''}
                        type="text"
                        placeholder="Petrov"
                        name="lastName"
                        value={values.lastName}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    {validationErrors.email && <InputErrorMessage text={validationErrors.email} />}
                    <Form.Control
                        className={validationErrors.email ? 'input-error' : ''}
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Pasword</Form.Label>
                    {validationErrors.password && <InputErrorMessage text={validationErrors.password} />}
                    <Form.Control
                        className={validationErrors.password ? 'input-error' : ''}
                        type="password"
                        placeholder=""
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Confirm password</Form.Label>
                    {validationErrors.repass && <InputErrorMessage text={validationErrors.repass} />}
                    <Form.Control
                        className={validationErrors.repass ? 'input-error' : ''}
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
