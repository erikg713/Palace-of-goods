// frontend/src/api/paymentApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payments';

export const createPayment = async (paymentData) => {
  const response = await axios.post(`${API_URL}/create-payment`, paymentData);
  return response.data;
};

export const submitPayment = async (paymentId) => {
  const response = await axios.post(`${API_URL}/submit-payment`, { paymentId });
  return response.data;
};

export const completePayment = async (paymentId, txid) => {
  const response = await axios.post(`${API_URL}/complete-payment`, { paymentId, txid });
  return response.data;
};
