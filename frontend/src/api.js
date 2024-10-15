// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

export const fetchProducts = async () => {
  const response = await API.get('/api/products');
  return response.data;
};
