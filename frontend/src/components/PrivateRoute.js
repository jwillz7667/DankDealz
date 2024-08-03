import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  return auth.user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
