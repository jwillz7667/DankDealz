import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import './LeftMenu.css';
import './LeftMenu.css';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sliderRefs = useRef(recommendationCategories.map(() => React.createRef()));
  const navigate = useNavigate();

  const slide = (direction, index) => {
    if (sliderRefs.current[index].current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRefs.current[index].current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product-preview/${productId}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-screen">
      <div className={`left-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={toggleMenu}>×</button>
        <h2>Menu</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/order-history">Order History</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/profile">Account Settings</Link></li>
        </ul>
        <h3>Categories</h3>
        <ul>
          {mockCategories.map(category => (
            <li key={category.slug}>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <header className="modern-header">
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
          <div className="logo">
            <img src="/logo.png" alt="DankDealz Logo" />
          </div>
          <form onSubmit={handleSearch} className="search-bar-small">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button-small">🔍</button>
          </form>
        </header>

        {recommendationCategories.map((category, index) => (
          <section className="product-section" key={category}>
            <h2>{category}</h2>
            <div className="slider-container">
              <button className="slider-button left" onClick={() => slide('left', index)}>❮</button>
              <div className="product-slider" ref={sliderRefs.current[index]}>
                {mockProducts.map(product => (
                  <div key={product._id} className="product-tile" onClick={() => handleProductClick(product._id)}>
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="price">${product.price}</p>
                      <p className="rating">★ {product.rating} ({product.numReviews})</p>
                      <p className="category">{product.category}</p>
                      <p className="thc">THC: {product.thcContent}%</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="slider-button right" onClick={() => slide('right', index)}>❯</button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
