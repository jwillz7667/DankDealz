import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import CurrentOrders from './CurrentOrders';
import OrderHistory from './OrderHistory';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError('There was an issue loading your profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('/api/users/profile', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      });
      setUser(data);
      setEditMode(false);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="deliveryAddress">Delivery Address:</label>
            <textarea
              id="deliveryAddress"
              name="deliveryAddress"
              value={user.deliveryAddress}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Delivery Address:</strong> {user.deliveryAddress}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
      <CurrentOrders />
      <OrderHistory />
      <div>
        <h3>Saved Addresses</h3>
        {/* Implement saved addresses component here */}
      </div>
      <div>
        <h3>Payment Methods</h3>
        {/* Implement payment methods component here */}
      </div>
      <div>
        <h3>Preferences</h3>
        {/* Implement preferences component here */}
      </div>
    </div>
  );
}

export default UserProfile;
