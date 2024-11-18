// frontend/src/components/PaymentForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentForm = () => {
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', address: '' });
  const [cartItems, setCartItems] = useState([]);  // This can be fetched dynamically based on the cart
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be sent to the backend
    const orderData = { customerInfo, cartItems, totalPrice, paymentMethod };

    try {
      // Make a POST request to Flask API
      const response = await axios.post('http://localhost:5000/api/submit-order', orderData);

      if (response.status === 200) {
        toast.success('Order submitted successfully!');
      }
    } catch (error) {
      toast.error('Failed to submit order!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Customer Information */}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
        />
      </div>
      {/* Email */}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={customerInfo.email}
          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
        />
      </div>
      {/* Address */}
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          value={customerInfo.address}
          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
        />
      </div>
      {/* Total Price */}
      <div className="form-group">
        <label>Total Price</label>
        <input
          type="number"
          className="form-control"
          value={totalPrice}
          onChange={(e) => setTotalPrice(Number(e.target.value))}
        />
      </div>
      {/* Payment Method */}
      <div className="form-group">
        <label>Payment Method</label>
        <select
          className="form-control"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit Order</button>
    </form>
  );
};

export default PaymentForm;