import React from 'react';
import { Link } from 'react-router-dom';

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <img src="/logo.png" alt="Dank Deals Logo" className="logo" />
      <h1>Welcome to Dank Deals</h1>
      <p>Your one-stop shop for recreational marijuana delivery</p>
      <Link to="/register" className="btn btn-primary">Sign Up</Link>
      <Link to="/login" className="btn btn-link">Log In</Link>
    </div>
  );
}

export default WelcomeScreen;
