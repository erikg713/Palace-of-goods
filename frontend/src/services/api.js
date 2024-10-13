import axios from 'axios';

// Example base URL, it could be your backend API or Pi Network API
const API = axios.create({
  baseURL: 'https://api.example.com', // Change this to your actual API endpoint
  headers: {
    'Content-Type': 'application/json'
  }
});

// Example GET request
export const fetchUserData = async () => {
  try {
    const response = await API.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

