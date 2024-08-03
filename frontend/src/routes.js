import { lazy } from 'react';

const LoginScreen = lazy(() => import('./components/LoginScreen'));
const RegistrationForm = lazy(() => import('./components/RegistrationForm'));
const EmailVerificationScreen = lazy(() => import('./components/EmailVerificationScreen'));
const ProfileSetup = lazy(() => import('./components/ProfileSetup'));
const HomeScreen = lazy(() => import('./components/HomeScreen'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const ProductPreview = lazy(() => import('./components/ProductPreview'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const OrderConfirmation = lazy(() => import('./components/OrderConfirmation'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const OrderDetails = lazy(() => import('./components/OrderDetails'));
const SupplierDashboard = lazy(() => import('./components/SupplierDashboard'));
const ProductManagement = lazy(() => import('./components/ProductManagement'));
const ProductForm = lazy(() => import('./components/ProductForm'));
const OrderManagement = lazy(() => import('./components/OrderManagement'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));
const NotFound = lazy(() => import('./components/NotFound'));

const routes = [
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegistrationForm /> },
  { path: "/verify", element: <EmailVerificationScreen /> },
  { path: "/profile-setup", element: <ProfileSetup /> },
  { path: "/", element: <HomeScreen /> },
  { path: "/products/:id", element: <ProductDetails /> },
  { path: "/product-preview/:id", element: <ProductPreview /> },
  { path: "/cart", element: <Cart />, private: true },
  { path: "/checkout", element: <Checkout />, private: true },
  { path: "/order-confirmation", element: <OrderConfirmation />, private: true },
  { path: "/profile", element: <UserProfile />, private: true },
  { path: "/order/:id", element: <OrderDetails />, private: true },
  { path: "/supplier/dashboard", element: <SupplierDashboard />, private: true },
  { path: "/supplier/products", element: <ProductManagement />, private: true },
  { path: "/supplier/products/new", element: <ProductForm />, private: true },
  { path: "/supplier/products/:id/edit", element: <ProductForm />, private: true },
  { path: "/supplier/orders", element: <OrderManagement />, private: true },
  { path: "/supplier/analytics", element: <AnalyticsDashboard />, private: true },
  { path: "*", element: <NotFound /> }
];

export default routes;
