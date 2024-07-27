import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import RegistrationForm from './components/RegistrationForm';
import VerificationScreen from './components/VerificationScreen';
import ProfileSetup from './components/ProfileSetup';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={WelcomeScreen} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/verify" component={VerificationScreen} />
          <Route path="/profile-setup" component={ProfileSetup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
