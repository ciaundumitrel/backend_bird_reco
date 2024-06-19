import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  // Function to load token from storage and check login status
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Failed to load auth token', error);
    }
  };

  // Function to handle login
  const login = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      setAuthToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to save auth token', error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setAuthToken(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Failed to remove auth token', error);
    }
  };

  // Load the token when the component mounts
  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
