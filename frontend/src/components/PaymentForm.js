// frontend/src/components/PaymentForm.js
import React, { useState } from 'react';
import { createPayment } from '../api/paymentApi';

const PaymentForm = () => {
  const [userUid, setUserUid] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = { userUid, amount, memo, productId };
    try {
      const result = await createPayment(paymentData);
      alert(`Payment created with ID: ${result.paymentId}`);
    } catch (error) {
      alert('Payment creation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs for userUid, amount, memo, and productId */}
    </form>
  );
};

export default PaymentForm;
