// frontend/src/components/PaymentForm.js
import React, { useState } from 'react';
import { createPayment } from '../api/paymentApi';

const PaymentForm = () => {
  const [userUid, setUserUid] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [productId, setProductId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = { userUid, amount, memo, productId };
    try {
      const result = await createPayment(paymentData);
      setStatus(`Payment created successfully! Payment ID: ${result.paymentId}`);
    } catch (error) {
      setStatus('Error: Payment creation failed.');
    }
  };

  return (
    <div>
      <h2>Create a Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User UID"
          value={userUid}
          onChange={(e) => setUserUid(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default PaymentForm;
