// frontend/src/pages/PaymentPage.js
import React from 'react';
import PaymentForm from '../components/PaymentForm';
import PaymentStatus from '../components/PaymentStatus';

const PaymentPage = () => {
  return (
    <div>
      <h1>Payment Portal</h1>
      <PaymentForm />
      <PaymentStatus />
    </div>
  );
};

export default PaymentPage;
