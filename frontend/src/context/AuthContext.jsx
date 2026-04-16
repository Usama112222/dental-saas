// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      console.log('Fetched user:', response.data);
      
      // Handle different response formats
      let userData = null;
      if (response.data && response.data.data) {
        userData = response.data.data;
      } else if (response.data && response.data.user) {
        userData = response.data.user;
      } else if (response.data && response.data._id) {
        userData = response.data;
      }
      
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      // Token might be invalid, clear it
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data && response.data.token) {
        const { token, data } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        
        // Extract user data
        const userData = data?.user || data;
        setUser(userData);
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Invalid response from server' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password, role = 'patient') => {
    try {
      const response = await axiosInstance.post('/auth/register', { name, email, password, role });
      console.log('Register response:', response.data);
      
      if (response.data && response.data.token) {
        const { token, data } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        
        const userData = data?.user || data;
        setUser(userData);
        
        return { success: true, user: userData, token };
      } else {
        return { success: false, error: 'Invalid response from server' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};