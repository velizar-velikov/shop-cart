import CatalogCard from './catalog-card/CatalogCard.jsx';
import { Container, Row } from 'react-bootstrap';

const arr = [1, 2, 3, 4, 5];

export default function Catalog() {
    return (
        <section id="catalog" className="container-fluid overflow-hidden">
            {arr.length == 0 ? (
                <p className="position-absolute top-50 start-50 translate-middle fs-1 px-3 py-2 px-lg-5 py-lg-3 rounded bg-dark-subtle">
                    No clothes yet.
                </p>
            ) : (
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4 m-auto">
                    {arr.map((el) => (
                        <CatalogCard key={el} />
                    ))}
                </Row>
            )}
        </section>
    );
}
