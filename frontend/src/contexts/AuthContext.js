import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../apiConfig';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

export { useAuth };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const response = await api.get('/users/profile');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          localStorage.removeItem('userToken');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      localStorage.setItem('userToken', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'An error occurred during login';
    }
  };

  const register = async (formData) => {
    try {
      const response = await api.post('/users/register', formData);
      localStorage.setItem('userToken', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'An error occurred during registration';
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
    // Optionally, you can redirect to the login page or home page after logout
    window.location.href = '/login';
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
