import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css';

function HomeScreen() {
  const [topProducts, setTopProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const { data } = await axios.get('/api/products/home');
        setTopProducts(data.topProducts);
        setRecommendations(data.recommendations);
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-screen">
      <header className="modern-header">
        <div className="logo">
          <img src="/logo.png" alt="Dank Deals Logo" />
          <h1>Dank Deals</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button className="voice-search">🎤</button>
        </div>
        <nav>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <div className="category-slider">
        {categories.map(category => (
          <Link to={`/category/${category.slug}`} key={category.slug} className="category-item">
            <img src={category.icon} alt={category.name} />
            <span>{category.name}</span>
          </Link>
        ))}
      </div>

      <section className="product-section">
        <h2>Top Products</h2>
        <div className="slider-container">
          <button className="slider-button left" onClick={() => slide('left')}>❮</button>
          <div className="product-slider" ref={sliderRef}>
            {topProducts.map(product => (
              <Link to={`/products/${product._id}`} key={product._id} className="product-tile">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <p className="rating">★ {product.rating} ({product.numReviews})</p>
                </div>
              </Link>
            ))}
          </div>
          <button className="slider-button right" onClick={() => slide('right')}>❯</button>
        </div>
      </section>

      <section className="product-section">
        <h2>Recommended for You</h2>
        <div className="slider-container">
          <button className="slider-button left" onClick={() => slide('left')}>❮</button>
          <div className="product-slider" ref={sliderRef}>
            {recommendations.map(product => (
              <Link to={`/products/${product._id}`} key={product._id} className="product-tile">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <p className="category">{product.category}</p>
                  <p className="thc">THC: {product.thcContent}%</p>
                </div>
              </Link>
            ))}
          </div>
          <button className="slider-button right" onClick={() => slide('right')}>❯</button>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
