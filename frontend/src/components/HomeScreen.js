import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css';

function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [dealsOfTheDay, setDealsOfTheDay] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch featured products, deals, and recommendations
    const fetchHomeData = async () => {
      try {
        const { data } = await axios.get('/api/products/home');
        setFeaturedProducts(data.featuredProducts);
        setDealsOfTheDay(data.dealsOfTheDay);
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

      <h2>Featured Products</h2>
      <div className="product-carousel">
        {featuredProducts.map(product => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="category-icons">
        <Link to="/category/flower">🌿 Flower</Link>
        <Link to="/category/edibles">🍬 Edibles</Link>
        <Link to="/category/concentrates">💧 Concentrates</Link>
        {/* Add more category icons as needed */}
      </div>

      <h2>Deals of the Day</h2>
      <div className="deals-section">
        {dealsOfTheDay.map(deal => (
          <Link to={`/products/${deal._id}`} key={deal._id}>
            <div className="deal-card">
              <img src={deal.image} alt={deal.name} />
              <h3>{deal.name}</h3>
              <p>
                <span className="original-price">${deal.originalPrice}</span>
                <span className="deal-price">${deal.dealPrice}</span>
              </p>
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
