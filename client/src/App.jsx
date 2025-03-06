import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header.tsx';
import Footer from './components/footer/Footer.tsx';
import NotFound from './components/not-found/NotFound.tsx';
import Login from './components/login/Login.tsx';
import Register from './components/register/Register.tsx';
import Home from './components/home/Home.tsx';
import Catalog from './components/catalog/Catalog.tsx';
import ProductDetails from './components/product-details/ProductDetails.tsx';
import CreateProduct from './components/create-product/CreateProduct.tsx';
import EditProduct from './components/edit-product/EditProduct.tsx';
import ProductReviews from './components/product-reviews/ProductReviews.jsx';
import Cart from './components/cart/Cart.tsx';
import PurchaseSection from './components/purchase/PurshaseSection.jsx';
import PurchaseSuccess from './components/purchase-success/PurchaseSuccess.tsx';
import MyOrders from './components/my-orders/MyOrders.tsx';
import Wishlist from './components/wishlist/Wishlist.jsx';

import PrivateGuard from './components/route-guards/PrivateGuard.tsx';
import GuestGuard from './components/route-guards/GuestGuard.tsx';
import { ContextWrapperProvider } from './contexts/ContextWrapper.tsx';

import paths from './config/paths.ts';

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <ContextWrapperProvider>
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
                        <Route path={paths.wishlist.path} element={<Wishlist />} />

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
            </ContextWrapperProvider>
            <Footer />
        </div>
    );
}

export default App;
