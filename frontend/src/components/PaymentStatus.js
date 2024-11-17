// frontend/src/components/PaymentStatus.js
import React, { useState } from 'react';
import { submitPayment } from '../api/paymentApi';

const PaymentStatus = () => {
  const [paymentId, setPaymentId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitPayment(paymentId);
      setStatus(`Payment submitted successfully! Transaction ID: ${result.txid}`);
    } catch (error) {
      setStatus('Error: Payment submission failed.');
    }
  };

  return (
    <div>
      <h2>Submit Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Payment ID"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default PaymentStatus;
