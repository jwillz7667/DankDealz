import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" component={WelcomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/verify" component={EmailVerificationScreen} />
          <Route path="/profile-setup" component={ProfileSetup} />
          <Route path="/home" component={HomeScreen} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-confirmation" component={OrderConfirmation} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/order/:id" component={OrderDetails} />
          <Route path="/supplier/dashboard" component={SupplierDashboard} />
          <Route exact path="/supplier/products" component={ProductManagement} />
          <Route path="/supplier/products/new" component={ProductForm} />
          <Route path="/supplier/products/:id/edit" component={ProductForm} />
          <Route path="/supplier/orders" component={OrderManagement} />
          <Route path="/supplier/analytics" component={AnalyticsDashboard} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
