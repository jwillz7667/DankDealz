import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css';
import './LeftMenu.css';

const categories = [
  { slug: 'flower', name: 'Flower' },
  { slug: 'edibles', name: 'Edibles' },
  { slug: 'concentrates', name: 'Concentrates' },
  { slug: 'vapes', name: 'Vapes' },
  { slug: 'pre-rolls', name: 'Pre-Rolls' },
  { slug: 'cbd', name: 'CBD' },
  { slug: 'accessories', name: 'Accessories' },
  { slug: 'tinctures', name: 'Tinctures' },
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
      // For demonstration purposes, we'll use mock data instead of making an API call
      const mockListings = [
        { _id: '1', title: 'OG Kush', price: 35.99, image: 'https://example.com/og-kush.jpg', location: 'Uptown, Minneapolis, MN', createdAt: '2023-08-01T12:00:00Z', thcContent: 22, cbdContent: 0.1, category: 'Flower' },
        { _id: '2', title: 'Blue Dream', price: 32.99, image: 'https://example.com/blue-dream.jpg', location: 'Downtown, Minneapolis, MN', createdAt: '2023-08-02T14:30:00Z', thcContent: 18, cbdContent: 0.2, category: 'Flower' },
        { _id: '3', title: 'Sour Diesel', price: 37.99, image: 'https://example.com/sour-diesel.jpg', location: 'Northeast, Minneapolis, MN', createdAt: '2023-08-03T09:15:00Z', thcContent: 25, cbdContent: 0.1, category: 'Flower' },
        { _id: '4', title: 'Girl Scout Cookies', price: 39.99, image: 'https://example.com/gsc.jpg', location: 'Downtown East, Minneapolis, MN', createdAt: '2023-08-04T16:45:00Z', thcContent: 28, cbdContent: 0.1, category: 'Flower' },
        { _id: '5', title: 'Gelato', price: 36.99, image: 'https://example.com/gelato.jpg', location: 'Southwest, Minneapolis, MN', createdAt: '2023-08-05T11:20:00Z', thcContent: 20, cbdContent: 0.1, category: 'Flower' },
        { _id: '6', title: 'Wedding Cake', price: 38.99, image: 'https://example.com/wedding-cake.jpg', location: 'North Loop, Minneapolis, MN', createdAt: '2023-08-06T13:10:00Z', thcContent: 24, cbdContent: 0.1, category: 'Flower' },
        { _id: '7', title: 'Purple Punch', price: 34.99, image: 'https://example.com/purple-punch.jpg', location: 'Bde Maka Ska, Minneapolis, MN', createdAt: '2023-08-07T10:30:00Z', thcContent: 19, cbdContent: 0.1, category: 'Flower' },
        { _id: '8', title: 'Gorilla Glue', price: 36.99, image: 'https://example.com/gorilla-glue.jpg', location: 'Loring Park, Minneapolis, MN', createdAt: '2023-08-08T15:00:00Z', thcContent: 26, cbdContent: 0.1, category: 'Flower' },
        { _id: '9', title: 'Jack Herer', price: 33.99, image: 'https://example.com/jack-herer.jpg', location: 'Seward, Minneapolis, MN', createdAt: '2023-08-09T08:45:00Z', thcContent: 21, cbdContent: 0.1, category: 'Flower' },
        { _id: '10', title: 'Northern Lights', price: 31.99, image: 'https://example.com/northern-lights.jpg', location: 'Northeast, Minneapolis, MN', createdAt: '2023-08-10T17:20:00Z', thcContent: 17, cbdContent: 0.1, category: 'Flower' },
        { _id: '11', title: 'Gummy Bears', price: 25.99, image: 'https://example.com/gummy-bears.jpg', location: 'Downtown, Minneapolis, MN', createdAt: '2023-08-11T12:15:00Z', thcContent: 10, category: 'Edibles' },
        { _id: '12', title: 'Chocolate Bar', price: 22.99, image: 'https://example.com/chocolate-bar.jpg', location: 'Minnehaha, Minneapolis, MN', createdAt: '2023-08-12T14:00:00Z', thcContent: 100, category: 'Edibles' },
        { _id: '13', title: 'Vape Cartridge - OG Kush', price: 45.99, image: 'https://example.com/vape-og-kush.jpg', location: 'Uptown, Minneapolis, MN', createdAt: '2023-08-13T09:30:00Z', thcContent: 85, category: 'Vapes' },
        { _id: '14', title: 'Shatter - Blue Dream', price: 50.99, image: 'https://example.com/shatter-blue-dream.jpg', location: 'St. Anthony Main, Minneapolis, MN', createdAt: '2023-08-14T16:10:00Z', thcContent: 80, category: 'Concentrates' },
        { _id: '15', title: 'Pre-Roll Pack', price: 29.99, image: 'https://example.com/pre-roll-pack.jpg', location: 'Whittier, Minneapolis, MN', createdAt: '2023-08-15T11:45:00Z', thcContent: 22, cbdContent: 0.1, category: 'Pre-Rolls' },
        { _id: '16', title: 'CBD Oil', price: 59.99, image: 'https://example.com/cbd-oil.jpg', location: 'North Loop, Minneapolis, MN', createdAt: '2023-08-16T13:30:00Z', cbdContent: 1000, category: 'CBD' },
        { _id: '17', title: 'Grinder', price: 24.99, image: 'https://example.com/grinder.jpg', location: 'Linden Hills, Minneapolis, MN', createdAt: '2023-08-17T10:00:00Z', category: 'Accessories' },
        { _id: '18', title: 'Rolling Papers', price: 3.99, image: 'https://example.com/rolling-papers.jpg', location: 'Mill District, Minneapolis, MN', createdAt: '2023-08-18T15:20:00Z', category: 'Accessories' },
        { _id: '19', title: 'Bong', price: 79.99, image: 'https://example.com/bong.jpg', location: 'Powderhorn, Minneapolis, MN', createdAt: '2023-08-19T08:30:00Z', category: 'Accessories' },
        { _id: '20', title: 'THC Tincture', price: 54.99, image: 'https://example.com/tincture.jpg', location: 'Downtown, Minneapolis, MN', createdAt: '2023-08-20T17:00:00Z', thcContent: 300, category: 'Tinctures' }
      ];
      setLocalListings(mockListings);
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
                <Link to={`/listing/${listing._id}`} key={listing._id} className="listing-card">
                  <img src={listing.image} alt={listing.title} className="listing-image" />
                  <h3>{listing.title}</h3>
                  <p className="price">${listing.price.toFixed(2)}</p>
                  <p className="location">{listing.location}</p>
                  <p className="category">{listing.category}</p>
                  {listing.thcContent && <p className="thc">THC: {listing.thcContent}%</p>}
                  {listing.cbdContent && <p className="cbd">CBD: {listing.cbdContent}%</p>}
                  <p className="date">{new Date(listing.createdAt).toLocaleDateString()}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomeScreen;
