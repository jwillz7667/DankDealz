import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
