import React from 'react';

const PaymentConfirmation = ({ txid, profit }) => {
  return (
    <div>
      <h1>Payment Confirmation</h1>
      <p>Transaction ID: {txid}</p>
      <p>Your Profit: {profit} Pi</p>
      <p>Thank you for your payment!</p>
    </div>
  );
};

export default PaymentConfirmation;
