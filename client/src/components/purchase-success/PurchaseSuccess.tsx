import { Button, Container } from 'react-bootstrap';
import { Link, LinkProps } from 'react-router-dom';

import checkLogo from '../../assets/img/check.png';

import styles from './purchaseSuccess.module.css';
import paths from '../../config/paths.ts';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

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
            <Button
                className={styles.button}
                as={Link as ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>> & 'symbol'}
                to={paths.catalog.basePath}
            >
                Continue shopping
            </Button>
        </Container>
    );
}
