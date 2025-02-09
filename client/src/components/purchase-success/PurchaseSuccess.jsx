import { Button, Container } from 'react-bootstrap';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import paths from '../../config/paths.js';

import checkLogo from '../../assets/img/check.png';

import styles from './purchaseSuccess.module.css';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

export default function PurchaseSuccess() {
    return (
        <Container className="d-flex flex-column gap-2 justify-content-center align-items-center container-sm col-11 col-sm-10 col-lg-7 mt-5 mb-5 p-4 p-lg-5 bg-light shadow rounded-3">
            <Container className="col-5 col-md-4 col-xxl-3">
                <img src={checkLogo} className="img-fluid" alt="check" />
            </Container>
            <h2 className="fw-bold text-center">Your order is Confirmed!</h2>
            <p className="col-9 col-sm-8 col-md-7 col-xxl-6 fs-5 text-center">
                We'll send you a shipping confirmation email as soon as your order ships.
            </p>
            <Button className={styles.button} as={Link} to={paths.catalog.basePath}>
                Continue shopping
            </Button>
        </Container>
    );
}
