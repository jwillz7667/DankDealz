import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeScreen.css';

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <img src="/logo.png" alt="Dank Deals Logo" className="logo" />
      <h1>Dank Deals</h1>
      <p className="tagline">Elevate Your Experience</p>
      <p className="description">Your one-stop shop for premium recreational marijuana delivery</p>
      <div className="button-container">
        <Link to="/register" className="btn btn-primary">Sign Up</Link>
        <Link to="/login" className="btn btn-secondary">Log In</Link>
      </div>
      <p className="age-disclaimer">Must be 21+ to use this service</p>
    </div>
  );
}

export default WelcomeScreen;
