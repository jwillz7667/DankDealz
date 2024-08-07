import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css';
import './LeftMenu.css';

const categories = [
  { slug: 'flower', name: 'Flower' },
  { slug: 'cartridges', name: 'Cartridges' },
  { slug: 'dabs', name: 'Dabs' },
  { slug: 'edibles', name: 'Edibles' },
  { slug: 'pre-rolls', name: 'Pre-Rolls' },
];

function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [localListings, setLocalListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const location = response.data.city + ', ' + response.data.principalSubdivision;
        setUserLocation(location);
        setSelectedLocation(location);
        fetchLocalListings(location);
      } catch (error) {
        console.error('Error getting user location:', error);
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  const fetchLocalListings = async (location) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/listings?location=${encodeURIComponent(location)}`);
      setLocalListings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching local listings:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(selectedLocation)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    fetchLocalListings(e.target.value);
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
        <div className="location-selector">
          <select value={selectedLocation} onChange={handleLocationChange}>
            <option value={userLocation}>Your Location: {userLocation}</option>
            <option value="New York, NY">New York, NY</option>
            <option value="Los Angeles, CA">Los Angeles, CA</option>
            <option value="Chicago, IL">Chicago, IL</option>
            {/* Add more locations as needed */}
          </select>
        </div>

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

        <section className="local-listings">
          <h2>Local Listings in {selectedLocation}</h2>
          {loading ? (
            <p>Loading local listings...</p>
          ) : (
            <div className="listings-grid">
              {localListings.map(listing => (
                <div key={listing._id} className="listing-card">
                  <h3>{listing.title}</h3>
                  {listing.price && <p className="price">${listing.price}</p>}
                  <p className="location">{listing.location}</p>
                  <p className="date">{new Date(listing.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomeScreen;
