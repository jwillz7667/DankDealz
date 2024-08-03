import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeScreen.css';

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <header className="welcome-header">
        <img src="/logo.png" alt="Dank Deals Logo" className="logo" />
        <nav>
          <Link to="/login" className="nav-link">Log In</Link>
          <Link to="/register" className="nav-link btn-primary">Sign Up</Link>
        </nav>
      </header>

      <main className="welcome-main">
        <section className="hero">
          <h1>Dank Deals</h1>
          <p className="tagline">Elevate Your Experience</p>
          <p className="description">Your premium destination for recreational marijuana delivery</p>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </section>

        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {/* Replace with actual product data */}
            {[1, 2, 3, 4].map((product) => (
              <div key={product} className="product-card">
                <img src={`/product-${product}.jpg`} alt={`Product ${product}`} />
                <h3>Premium Strain {product}</h3>
                <p>$49.99</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <section className="categories">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            <Link to="/category/flower" className="category-card">
              <img src="/flower-icon.png" alt="Flower" />
              <h3>Flower</h3>
            </Link>
            <Link to="/category/edibles" className="category-card">
              <img src="/edibles-icon.png" alt="Edibles" />
              <h3>Edibles</h3>
            </Link>
            <Link to="/category/concentrates" className="category-card">
              <img src="/concentrates-icon.png" alt="Concentrates" />
              <h3>Concentrates</h3>
            </Link>
            <Link to="/category/accessories" className="category-card">
              <img src="/accessories-icon.png" alt="Accessories" />
              <h3>Accessories</h3>
            </Link>
          </div>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose Dank Deals?</h2>
          <div className="features">
            <div className="feature">
              <img src="/quality-icon.png" alt="Quality" />
              <h3>Premium Quality</h3>
              <p>Carefully curated selection of top-tier products</p>
            </div>
            <div className="feature">
              <img src="/delivery-icon.png" alt="Fast Delivery" />
              <h3>Fast Delivery</h3>
              <p>Quick and discreet delivery to your doorstep</p>
            </div>
            <div className="feature">
              <img src="/customer-service-icon.png" alt="Customer Service" />
              <h3>Expert Support</h3>
              <p>Knowledgeable staff to assist with your needs</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="welcome-footer">
        <p>&copy; 2023 Dank Deals. All rights reserved.</p>
        <p className="age-disclaimer">Must be 21+ to use this service</p>
        <nav>
          <Link to="/about">About Us</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  );
}

export default WelcomeScreen;
