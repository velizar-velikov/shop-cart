import CatalogCard from '../catalog-card/CatalogCard.jsx';
import { Row } from 'react-bootstrap';
import CatalogSearch from './catalog-search/CatalogSearch.jsx';
import Paginator from './pagination/Pagination.jsx';
import { useGetProducts } from '../../hooks/useProducts.js';

export default function Catalog() {
    const [products] = useGetProducts();

    return (
        <section id="catalog" className="container-fluid overflow-hidden mb-4">
            <h1 className="mt-4 text-center">Browse store</h1>
            <CatalogSearch />
            {products.length == 0 ? (
                <p className="position-absolute top-50 start-50 translate-middle fs-1 px-3 py-2 px-lg-5 py-lg-3 rounded bg-dark-subtle">
                    No clothes yet.
                </p>
            ) : (
                <div>
                    <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4 m-auto">
                        {products.map((product) => (
                            <CatalogCard key={product._id} {...product} />
                        ))}
                    </Row>
                    <Paginator />
                </div>
            )}
        </section>
    );
}
