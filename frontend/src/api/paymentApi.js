// frontend/src/api/paymentApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payments';

export const createPayment = async (paymentData) => {
  const response = await axios.post(`${API_URL}/create-payment`, paymentData);
  return response.data;
};
