import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function ProfileSetup() {
  const [profileData, setProfileData] = useState({
    profilePicture: null,
    deliveryAddress: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the profile data to your backend API
    console.log('Profile setup submitted:', profileData);
    // For now, we'll just redirect to the home page
    history.push('/');
  };

  return (
    <div className="profile-setup">
      <h2>Set Up Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryAddress">Delivery Address</label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={profileData.deliveryAddress}
            onChange={handleChange}
            placeholder="Enter your delivery address"
          />
        </div>
        <button type="submit" className="btn btn-primary">Complete Profile Setup</button>
      </form>
    </div>
  );
}

export default ProfileSetup;
