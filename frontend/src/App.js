import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import HomeScreen from './components/HomeScreen';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductPreview from './components/ProductPreview';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import OrderDetails from './components/OrderDetails';
import Favorites from './components/Favorites';
import LoginScreen from './components/LoginScreen';
import RegistrationForm from './components/RegistrationForm';
import EmailVerificationScreen from './components/EmailVerificationScreen';
import ProfileSetup from './components/ProfileSetup';
import SupplierDashboard from './components/SupplierDashboard';
import ProductManagement from './components/ProductManagement';
import ProductForm from './components/ProductForm';
import OrderManagement from './components/OrderManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import NotFound from './components/NotFound';
import CategoryPage from './components/CategoryPage';
import AccountSettings from './components/AccountSettings';

function App() {
  const isLoading = useSelector(state => state.auth.loading);
  const isAuthenticated = useSelector(state => state.auth.user !== null);

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  if (isLoading) {
    console.log('App is loading');
    return <Loading />;
  }

  console.log('Rendering App component');

  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <ProductList /> : <HomeScreen />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/product-preview/:id" element={<ProductPreview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/verify" element={<EmailVerificationScreen />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/account-settings" element={<PrivateRoute><AccountSettings /></PrivateRoute>} />
          <Route path="/order-history" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
          <Route path="/order/:id" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
          <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
          <Route path="/supplier/dashboard" element={<PrivateRoute><SupplierDashboard /></PrivateRoute>} />
          <Route path="/supplier/products" element={<PrivateRoute><ProductManagement /></PrivateRoute>} />
          <Route path="/supplier/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/supplier/products/:id/edit" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/supplier/orders" element={<PrivateRoute><OrderManagement /></PrivateRoute>} />
          <Route path="/supplier/analytics" element={<PrivateRoute><AnalyticsDashboard /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
          {routes.map((route) => {
            console.log('Rendering route:', route.path);
            return route.private ? (
              <Route key={route.path} element={<PrivateRoute />}>
                <Route path={route.path} element={route.element} />
              </Route>
            ) : (
              <Route key={route.path} path={route.path} element={route.element} />
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
