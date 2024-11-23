import axios from 'axios';

// Set the base URL for your backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/payment';

// Create Payment
export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/create-payment`, paymentData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating payment: ' + error.message);
  }
};

// Submit Payment
export const submitPayment = async (paymentId) => {
  try {
    const response = await axios.post(`${API_URL}/submit-payment`, { paymentId });
    return response.data;
  } catch (error) {
    throw new Error('Error submitting payment: ' + error.message);
  }
};

// Complete Payment
export const completePayment = async (paymentId, txid) => {
  try {
    const response = await axios.post(`${API_URL}/complete-payment`, { paymentId, txid });
    return response.data;
  } catch (error) {
    throw new Error('Error completing payment: ' + error.message);
  }
};
