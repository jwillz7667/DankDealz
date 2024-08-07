import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import './LeftMenu.css';

const categories = [
  { slug: 'for-sale', name: 'For Sale' },
  { slug: 'housing', name: 'Housing' },
  { slug: 'jobs', name: 'Jobs' },
  { slug: 'services', name: 'Services' },
  { slug: 'community', name: 'Community' },
];

const recentListings = [
  { _id: '1', title: 'Used Sofa for Sale', price: 150, location: 'Downtown', date: '2023-08-05' },
  { _id: '2', title: 'Room for Rent', price: 800, location: 'Suburbs', date: '2023-08-04' },
  { _id: '3', title: 'Web Developer Needed', price: null, location: 'Remote', date: '2023-08-03' },
  { _id: '4', title: 'Lawn Mowing Services', price: 50, location: 'Local', date: '2023-08-02' },
  { _id: '5', title: 'Community Garage Sale', price: null, location: 'Neighborhood', date: '2023-08-01' },
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
