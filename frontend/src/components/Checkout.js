import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = () => {
    const totalAmount = 10;  // Example total amount from cart items
    const txid = 'transaction-id-123';  // Replace with actual txid from Pi Network

    axios.post('http://localhost:5000/api/complete-payment/123', {
      txid: txid,
      total_amount: totalAmount
    })
      .then(response => {
        setPaymentStatus('Payment completed successfully!');
      })
      .catch(error => {
        setPaymentStatus('Error completing payment.');
      });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handlePayment}>Pay with Pi Network</button>
      <p>{paymentStatus}</p>
    </div>
  );
};

export default Checkout;
