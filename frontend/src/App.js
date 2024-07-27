import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import RegistrationForm from './components/RegistrationForm';
import VerificationScreen from './components/VerificationScreen';
import ProfileSetup from './components/ProfileSetup';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={WelcomeScreen} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/verify" component={VerificationScreen} />
          <Route path="/profile-setup" component={ProfileSetup} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
