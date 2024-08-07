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
      // For demonstration purposes, we'll use mock data instead of making an API call
      const mockListings = [
        { _id: '1', title: 'Cozy Uptown Apartment', price: 1200, image: 'https://example.com/apartment1.jpg', location: 'Uptown, Minneapolis, MN', createdAt: '2023-08-01T12:00:00Z' },
        { _id: '2', title: 'Downtown Loft with Skyline View', price: 1800, image: 'https://example.com/loft1.jpg', location: 'Downtown, Minneapolis, MN', createdAt: '2023-08-02T14:30:00Z' },
        { _id: '3', title: 'Charming Northeast Bungalow', price: 1500, image: 'https://example.com/house1.jpg', location: 'Northeast, Minneapolis, MN', createdAt: '2023-08-03T09:15:00Z' },
        { _id: '4', title: 'Modern Condo near US Bank Stadium', price: 2000, image: 'https://example.com/condo1.jpg', location: 'Downtown East, Minneapolis, MN', createdAt: '2023-08-04T16:45:00Z' },
        { _id: '5', title: 'Spacious Family Home in Southwest', price: 2200, image: 'https://example.com/house2.jpg', location: 'Southwest, Minneapolis, MN', createdAt: '2023-08-05T11:20:00Z' },
        { _id: '6', title: 'Renovated Warehouse Apartment', price: 1600, image: 'https://example.com/apartment2.jpg', location: 'North Loop, Minneapolis, MN', createdAt: '2023-08-06T13:10:00Z' },
        { _id: '7', title: 'Lakeside Studio with Great Views', price: 1100, image: 'https://example.com/studio1.jpg', location: 'Bde Maka Ska, Minneapolis, MN', createdAt: '2023-08-07T10:30:00Z' },
        { _id: '8', title: 'Historic Brownstone in Loring Park', price: 1900, image: 'https://example.com/brownstone1.jpg', location: 'Loring Park, Minneapolis, MN', createdAt: '2023-08-08T15:00:00Z' },
        { _id: '9', title: 'Eco-Friendly Tiny House', price: 900, image: 'https://example.com/tinyhouse1.jpg', location: 'Seward, Minneapolis, MN', createdAt: '2023-08-09T08:45:00Z' },
        { _id: '10', title: 'Artist Loft in Northeast', price: 1400, image: 'https://example.com/loft2.jpg', location: 'Northeast, Minneapolis, MN', createdAt: '2023-08-10T17:20:00Z' },
        { _id: '11', title: 'Luxury Penthouse with Rooftop Terrace', price: 3500, image: 'https://example.com/penthouse1.jpg', location: 'Downtown, Minneapolis, MN', createdAt: '2023-08-11T12:15:00Z' },
        { _id: '12', title: 'Cozy Cottage near Minnehaha Falls', price: 1300, image: 'https://example.com/cottage1.jpg', location: 'Minnehaha, Minneapolis, MN', createdAt: '2023-08-12T14:00:00Z' },
        { _id: '13', title: 'Modern Townhouse in Uptown', price: 2100, image: 'https://example.com/townhouse1.jpg', location: 'Uptown, Minneapolis, MN', createdAt: '2023-08-13T09:30:00Z' },
        { _id: '14', title: 'Riverside Apartment with Balcony', price: 1700, image: 'https://example.com/apartment3.jpg', location: 'St. Anthony Main, Minneapolis, MN', createdAt: '2023-08-14T16:10:00Z' },
        { _id: '15', title: 'Converted Church Loft', price: 2300, image: 'https://example.com/loft3.jpg', location: 'Whittier, Minneapolis, MN', createdAt: '2023-08-15T11:45:00Z' },
        { _id: '16', title: 'Stylish Studio in North Loop', price: 1250, image: 'https://example.com/studio2.jpg', location: 'North Loop, Minneapolis, MN', createdAt: '2023-08-16T13:30:00Z' },
        { _id: '17', title: 'Family-Friendly Home near Lakes', price: 2400, image: 'https://example.com/house3.jpg', location: 'Linden Hills, Minneapolis, MN', createdAt: '2023-08-17T10:00:00Z' },
        { _id: '18', title: 'Industrial Chic Loft in Mill District', price: 1950, image: 'https://example.com/loft4.jpg', location: 'Mill District, Minneapolis, MN', createdAt: '2023-08-18T15:20:00Z' },
        { _id: '19', title: 'Charming Duplex in Powderhorn', price: 1550, image: 'https://example.com/duplex1.jpg', location: 'Powderhorn, Minneapolis, MN', createdAt: '2023-08-19T08:30:00Z' },
        { _id: '20', title: 'Sleek High-Rise Apartment', price: 2600, image: 'https://example.com/apartment4.jpg', location: 'Downtown, Minneapolis, MN', createdAt: '2023-08-20T17:00:00Z' }
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
                  {listing.price && <p className="price">${listing.price.toFixed(2)}</p>}
                  <p className="location">{listing.location}</p>
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
