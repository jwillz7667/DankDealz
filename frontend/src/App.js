import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import HomeScreen from './components/HomeScreen';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import Favorites from './components/Favorites';

function App() {
  const isLoading = useSelector(state => state.auth.loading);

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
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/order-history" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
          <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
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
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import LoginScreen from './components/LoginScreen';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
