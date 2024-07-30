import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from './contexts/AuthContext';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';

const WelcomeScreen = lazy(() => import('./components/WelcomeScreen'));
const LoginScreen = lazy(() => import('./components/LoginScreen'));
const RegistrationForm = lazy(() => import('./components/RegistrationForm'));
const EmailVerificationScreen = lazy(() => import('./components/EmailVerificationScreen'));
const ProfileSetup = lazy(() => import('./components/ProfileSetup'));
const HomeScreen = lazy(() => import('./components/HomeScreen'));
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
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

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/verify" element={<EmailVerificationScreen />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/home" element={<PrivateRoute><HomeScreen /></PrivateRoute>} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/order/:id" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
            <Route path="/supplier/dashboard" element={<PrivateRoute><SupplierDashboard /></PrivateRoute>} />
            <Route path="/supplier/products" element={<PrivateRoute><ProductManagement /></PrivateRoute>} />
            <Route path="/supplier/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
            <Route path="/supplier/products/:id/edit" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
            <Route path="/supplier/orders" element={<PrivateRoute><OrderManagement /></PrivateRoute>} />
            <Route path="/supplier/analytics" element={<PrivateRoute><AnalyticsDashboard /></PrivateRoute>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      </div>
  );
}

export default App;
