import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import EmailVerificationScreen from './components/EmailVerificationScreen';
import ProfileSetup from './components/ProfileSetup';
import HomeScreen from './components/HomeScreen';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import UserProfile from './components/UserProfile';
import OrderDetails from './components/OrderDetails';
import SupplierDashboard from './components/SupplierDashboard';
import ProductManagement from './components/ProductManagement';
import ProductForm from './components/ProductForm';
import OrderManagement from './components/OrderManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Navbar />
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
      </div>
  );
}

export default App;
