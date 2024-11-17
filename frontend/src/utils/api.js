import axios from 'axios';

// Set the API base URL, which is defined in the environment variable
const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance for easier API calls
const api = axios.create({
  baseURL: API_URL,
});

// Function to fetch all products
export const fetchProducts = async () => {
  try {
    const response = await api.get('/marketplace/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

// Function to login a user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

