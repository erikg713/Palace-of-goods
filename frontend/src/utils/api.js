import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchItems = async () => {
  try {
    const response = await API.get('/items');
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export default API;
