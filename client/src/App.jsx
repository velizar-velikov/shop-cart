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

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AuthContextProvider>
                <CartContextProvider>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/catalog/:productId/details" element={<ProductDetails />} />
                            <Route path="/catalog/:productId/edit" element={<EditProduct />} />
                            <Route path="/catalog/:productId/reviews" element={<ProductReviews />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/create" element={<CreateProduct />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </main>
                </CartContextProvider>
            </AuthContextProvider>
            <Footer />
        </div>
    );
}

export default App;
