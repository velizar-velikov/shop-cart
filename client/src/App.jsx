import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Footer from './components/footer/Footer.jsx';
import Create from './components/create/Create.jsx';
import Catalog from './components/catalog/Catalog.jsx';
import Home from './components/home/Home.jsx';
import LoadingSpinner from './components/loading-spinner/LoadingSpinner.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import CreateReview from './components/create-review/CreateReview.jsx';
import ProductReviews from './components/product-reviews/ProductReviews.jsx';
import Cart from './components/cart/Cart.jsx';

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/:id/details" element={<ProductDetails />} />
                    <Route path="/catalog/:id/reviews" element={<ProductReviews />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
