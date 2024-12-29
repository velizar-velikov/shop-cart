import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Footer from './components/footer/Footer.jsx';
import CreateProduct from './components/create-product/CreateProduct.jsx';
import Catalog from './components/catalog/Catalog.jsx';
import Home from './components/home/Home.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import ProductReviews from './components/product-reviews/ProductReviews.jsx';
import Cart from './components/cart/Cart.jsx';
import EditProduct from './components/edit-product/EditProduct.jsx';
import Logout from './components/logout/Logout.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { CartContextProvider } from './contexts/CartContext.jsx';

import paths from './config/paths.js';

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AuthContextProvider>
                <CartContextProvider>
                    <Header />
                    <main>
                        <Routes>
                            <Route path={paths.home.path} element={<Home />} />
                            <Route path={paths.catalog.path} element={<Catalog />} />
                            <Route path={paths.details.path} element={<ProductDetails />} />
                            <Route path={paths.editProduct.path} element={<EditProduct />} />
                            <Route path={paths.reviews.path} element={<ProductReviews />} />
                            <Route path={paths.login.path} element={<Login />} />
                            <Route path={paths.register.path} element={<Register />} />
                            <Route path={paths.logout.path} element={<Logout />} />
                            <Route path={paths.createProduct.path} element={<CreateProduct />} />
                            <Route path={paths.cart.path} element={<Cart />} />
                        </Routes>
                    </main>
                </CartContextProvider>
            </AuthContextProvider>
            <Footer />
        </div>
    );
}

export default App;
