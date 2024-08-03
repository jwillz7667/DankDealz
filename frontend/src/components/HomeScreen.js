import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

// Mock data for placeholders
const mockCategories = [
  { slug: 'flower', name: 'Flower', icon: '/icons/flower.png' },
  { slug: 'edibles', name: 'Edibles', icon: '/icons/edibles.png' },
  { slug: 'concentrates', name: 'Concentrates', icon: '/icons/concentrates.png' },
  { slug: 'vapes', name: 'Vapes', icon: '/icons/vapes.png' },
  { slug: 'accessories', name: 'Accessories', icon: '/icons/accessories.png' },
];

const mockProducts = [
  { _id: '1', name: 'OG Kush', price: 35.99, rating: 4.5, numReviews: 120, image: '/images/og-kush.jpg', category: 'Flower', thcContent: 22 },
  { _id: '2', name: 'Blue Dream', price: 32.99, rating: 4.3, numReviews: 98, image: '/images/blue-dream.jpg', category: 'Flower', thcContent: 18 },
  { _id: '3', name: 'Sour Diesel', price: 37.99, rating: 4.7, numReviews: 150, image: '/images/sour-diesel.jpg', category: 'Flower', thcContent: 25 },
  { _id: '4', name: 'Girl Scout Cookies', price: 39.99, rating: 4.8, numReviews: 200, image: '/images/gsc.jpg', category: 'Flower', thcContent: 28 },
  { _id: '5', name: 'Gelato', price: 36.99, rating: 4.6, numReviews: 180, image: '/images/gelato.jpg', category: 'Flower', thcContent: 20 },
];

const recommendationCategories = [
  'Top Sellers', 'New Arrivals', 'High THC', 'CBD Dominant', 'Sativa Strains',
  'Indica Strains', 'Hybrid Strains', 'Edibles', 'Concentrates', 'Vape Cartridges'
];

function HomeScreen() {
  const sliderRefs = useRef(recommendationCategories.map(() => React.createRef()));

  const slide = (direction, index) => {
    if (sliderRefs.current[index].current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRefs.current[index].current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
        {mockCategories.map(category => (
          <Link to={`/category/${category.slug}`} key={category.slug} className="category-item">
            <img src={category.icon} alt={category.name} />
            <span>{category.name}</span>
          </Link>
        ))}
      </div>

      {recommendationCategories.map((category, index) => (
        <section className="product-section" key={category}>
          <h2>{category}</h2>
          <div className="slider-container">
            <button className="slider-button left" onClick={() => slide('left', index)}>❮</button>
            <div className="product-slider" ref={sliderRefs.current[index]}>
              {mockProducts.map(product => (
                <Link to={`/products/${product._id}`} key={product._id} className="product-tile">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price}</p>
                    <p className="rating">★ {product.rating} ({product.numReviews})</p>
                    <p className="category">{product.category}</p>
                    <p className="thc">THC: {product.thcContent}%</p>
                  </div>
                </Link>
              ))}
            </div>
            <button className="slider-button right" onClick={() => slide('right', index)}>❯</button>
          </div>
        </section>
      ))}
    </div>
  );
}

export default HomeScreen;
