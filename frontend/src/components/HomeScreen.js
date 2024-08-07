import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import './LeftMenu.css';

const categories = [
  { slug: 'flower', name: 'Flower' },
  { slug: 'cartridges', name: 'Cartridges' },
  { slug: 'dabs', name: 'Dabs' },
  { slug: 'edibles', name: 'Edibles' },
  { slug: 'pre-rolls', name: 'Pre-Rolls' },
];

const recentListings = [
  { _id: '1', title: 'OG Kush', price: 50, location: 'Los Angeles, CA', date: '2023-08-05' },
  { _id: '2', title: 'Blue Dream Cartridge', price: 40, location: 'San Francisco, CA', date: '2023-08-04' },
  { _id: '3', title: 'Shatter Dabs', price: 30, location: 'Denver, CO', date: '2023-08-03' },
  { _id: '4', title: 'Gummy Edibles', price: 25, location: 'Seattle, WA', date: '2023-08-02' },
  { _id: '5', title: 'Pre-Roll Pack', price: 35, location: 'Portland, OR', date: '2023-08-01' },
];

function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
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
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/post-listing" onClick={toggleMenu}>Post a Listing</Link></li>
          <li><Link to="/my-listings" onClick={toggleMenu}>My Listings</Link></li>
          <li><Link to="/messages" onClick={toggleMenu}>Messages</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/account-settings" onClick={toggleMenu}>Account Settings</Link></li>
        </ul>
        <h3>Categories</h3>
        <ul>
          {categories.map(category => (
            <li key={category.slug}>
              <Link to={`/category/${category.slug}`} onClick={toggleMenu}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <header className="modern-header">
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
          <div className="logo-container">
            <img src="/logo.png" alt="Marketplace Logo" className="logo" />
          </div>
          <form onSubmit={handleSearch} className="search-bar-small">
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button-small">🔍</button>
          </form>
        </header>

        <section className="categories-section">
          <h2>Browse Categories</h2>
          <div className="category-grid">
            {categories.map(category => (
              <Link to={`/category/${category.slug}`} key={category.slug} className="category-card">
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="recent-listings">
          <h2>Recent Listings</h2>
          <div className="listings-grid">
            {recentListings.map(listing => (
              <div key={listing._id} className="listing-card">
                <h3>{listing.title}</h3>
                {listing.price && <p className="price">${listing.price}</p>}
                <p className="location">{listing.location}</p>
                <p className="date">{listing.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomeScreen;
