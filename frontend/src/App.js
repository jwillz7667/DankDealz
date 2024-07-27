import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify" element={<EmailVerificationScreen />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
        <Route path="/supplier/products" element={<ProductManagement />} />
        <Route path="/supplier/products/new" element={<ProductForm />} />
        <Route path="/supplier/products/:id/edit" element={<ProductForm />} />
        <Route path="/supplier/orders" element={<OrderManagement />} />
        <Route path="/supplier/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
