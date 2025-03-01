import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';
import CatalogCard from '../catalog-card/CatalogCard.jsx';

import { useGetLatestProducts } from '../../hooks/custom/useProducts.ts';
import paths from '../../config/paths.ts';

export default function Home() {
    const { products, isLoading } = useGetLatestProducts();

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <section id="catalog" className="container-fluid overflow-hidden mb-4">
                    <h1 className="mt-5 text-center">
                        Your newest clothing store is here! <br></br>{' '}
                        <span className="fs-3">
                            Start your shopping therapy <Link to={paths.catalog.basePath}>now!</Link>
                        </span>
                    </h1>
                    {products.length == 0 ? (
                        <p className="position-absolute top-50 start-50 translate-middle fs-1 px-3 py-2 px-lg-5 py-lg-3 rounded bg-dark-subtle">
                            No clothes yet.
                        </p>
                    ) : (
                        <div>
                            <div className="d-flex flex-column align-items-center mt-5">
                                <h3>Latest clothes:</h3>
                            </div>
                            <Row className="d-flex justify-content-center row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 g-sm-2 g-xl-3 mx-md-5">
                                {products.map((product) => (
                                    <CatalogCard key={product._id} {...product} isHome={true} />
                                ))}
                            </Row>
                        </div>
                    )}
                </section>
            )}
        </>
    );
}
