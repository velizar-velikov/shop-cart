import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import NotFound from './components/not-found/NotFound.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Home from './components/home/Home.jsx';
import Catalog from './components/catalog/Catalog.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import CreateProduct from './components/create-product/CreateProduct.jsx';
import EditProduct from './components/edit-product/EditProduct.jsx';
import ProductReviews from './components/product-reviews/ProductReviews.jsx';
import Cart from './components/cart/Cart.jsx';
import PurchaseSection from './components/purchase/PurshaseSection.jsx';
import PurchaseSuccess from './components/purchase-success/PurchaseSuccess.jsx';
import MyOrders from './components/my-orders/MyOrders.jsx';

import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { CartContextProvider } from './contexts/CartContext.jsx';
import { MenuContextProvider, useMenuContext } from './contexts/MenuContext.jsx';

import PrivateGuard from './components/route-guards/PrivateGuard.jsx';
import GuestGuard from './components/route-guards/GuestGuard.jsx';

import paths from './config/paths.js';

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AuthContextProvider>
                <CartContextProvider>
                    {/* menu only for small devices */}
                    <MenuContextProvider>
                        <Header />
                        <ToastContainer />
                        <main>
                            <Routes>
                                <Route path={paths.home.path} element={<Home />} />
                                {paths.catalog.paths.map((path) => (
                                    <Route key={path} path={path} element={<Catalog />} />
                                ))}

                                <Route path={paths.details.path} element={<ProductDetails />} />
                                <Route path={paths.reviews.path} element={<ProductReviews />} />

                                {/* pages only for unauthenticated users */}
                                <Route element={<GuestGuard />}>
                                    <Route path={paths.login.path} element={<Login />} />
                                    <Route path={paths.register.path} element={<Register />} />
                                </Route>

                                {/* private pages */}
                                <Route element={<PrivateGuard />}>
                                    <Route path={paths.createProduct.path} element={<CreateProduct />} />
                                    <Route path={paths.editProduct.path} element={<EditProduct />} />
                                    <Route path={paths.cart.path} element={<Cart />} />
                                    <Route path={paths.purchase.path} element={<PurchaseSection />} />
                                    <Route path={paths.purchaseSuccess.path} element={<PurchaseSuccess />} />
                                    <Route path={paths.orders.path} element={<MyOrders />} />
                                </Route>

                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                    </MenuContextProvider>
                </CartContextProvider>
            </AuthContextProvider>
            <Footer />
        </div>
    );
}

export default App;
