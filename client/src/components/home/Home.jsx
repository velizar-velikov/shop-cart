import { Button, Row } from 'react-bootstrap';
import CatalogCard from '../catalog-card/CatalogCard.jsx';
import { Link } from 'react-router-dom';

const arr = [1, 2, 3];

export default function Home() {
    return (
        <section id="catalog" className="container-fluid overflow-hidden mb-4">
            <h1 className="mt-4 text-center">
                Your newest clothing store is here! <br></br>{' '}
                <span className="fs-3">
                    Start your shopping therapy <Link to="/catalog">now!</Link>
                </span>
            </h1>
            {arr.length == 0 ? (
                <p className="position-absolute top-50 start-50 translate-middle fs-1 px-3 py-2 px-lg-5 py-lg-3 rounded bg-dark-subtle">
                    No clothes yet.
                </p>
            ) : (
                <div>
                    <div className="d-flex flex-column align-items-center mt-5">
                        <h3>Latest clothes:</h3>
                    </div>
                    <Row className="d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4">
                        {arr.map((el) => (
                            <CatalogCard key={el} />
                        ))}
                    </Row>
                </div>
            )}
        </section>
    );
}
