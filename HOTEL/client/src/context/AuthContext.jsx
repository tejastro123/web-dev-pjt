import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './useAuth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const res = await axios.get('http://localhost:5000/api/auth/user');
          setUser(res.data);
        } catch (error) {
          console.error("Auth Error", error);
          localStorage.removeItem('token');
          setAuthToken(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setAuthToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const signup = async (username, email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
    localStorage.setItem('token', res.data.token);
    setAuthToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
