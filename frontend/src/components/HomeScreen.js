import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css';

function HomeScreen() {
  const [topProducts, setTopProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const { data } = await axios.get('/api/products/home');
        setTopProducts(data.topProducts);
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="home-screen">
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button className="voice-search">🎤</button>
      </div>

      <div className="category-icons">
        <Link to="/category/flower">🌿 Flower</Link>
        <Link to="/category/edibles">🍬 Edibles</Link>
        <Link to="/category/concentrates">💧 Concentrates</Link>
        <Link to="/category/vapes">🔋 Vapes</Link>
        <Link to="/category/accessories">🛠️ Accessories</Link>
      </div>

      <h2>Top Products</h2>
      <div className="product-carousel">
        {topProducts.map(product => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>Rating: {product.rating}/5 ({product.numReviews} reviews)</p>
            </div>
          </Link>
        ))}
      </div>

      <h2>Recommended for You</h2>
      <div className="recommendations-section">
        {recommendations.map(product => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.category}</p>
              <p>THC: {product.thcContent}%</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
