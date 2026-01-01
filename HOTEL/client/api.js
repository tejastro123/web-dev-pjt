import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for web, special IP for Android emulator
const API_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getRestaurants = async () => {
  try {
    const response = await api.get('/restaurants');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;
