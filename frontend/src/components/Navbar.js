import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

function Navbar() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Dank Deals</Link>
      <div className="navbar-menu">
        {user ? (
          <>
            <Link to="/profile" className="navbar-item">Profile</Link>
            <button onClick={handleLogout} className="navbar-item logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
