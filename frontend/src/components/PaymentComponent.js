import React, { useState } from 'react';

function PaymentComponent() {
  const [authStatus, setAuthStatus] = useState(false);

  // Authenticate the user
  const authenticateUser = () => {
    const scopes = ['payments'];

    Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(auth => {
        setAuthStatus(true);
        console.log("User authenticated successfully!");
      })
      .catch(error => {
        console.error("Authentication failed:", error);
      });
  };

  // Callback for handling incomplete payments
  function onIncompletePaymentFound(payment) {
    const paymentId = payment.identifier;
    const txid = payment.transaction.txid;

    fetch('/payment/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId, txid })
    })
      .then(response => response.json())
      .then(data => console.log('Incomplete payment processed:', data))
      .catch(error => console.error('Error processing incomplete payment:', error));
  }

  // Request a payment from the user
  const createPayment = () => {
    const paymentData = {
      amount: 0.01,
      memo: "Purchase additional features in Palace of Goods.",
      metadata: { itemId: 12345 }
    };

    const paymentCallbacks = {
      onReadyForServerApproval: function(paymentId) {
        fetch('/payment/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId })
        })
        .then(response => response.json())
        .then(data => console.log('Payment approved:', data))
        .catch(error => console.error('Error approving payment:', error));
      },
      onReadyForServerCompletion: function(paymentId, txid) {
        fetch('/payment/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid })
        })
        .then(response => response.json())
        .then(data => console.log('Payment completed:', data))
        .catch(error => console.error('Error completing payment:', error));
      },
      onCancel: function(paymentId) {
        console.log('User canceled payment:', paymentId);
        fetch('/payment/cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId })
        })
        .then(response => response.json())
        .then(data => console.log('Payment canceled:', data))
        .catch(error => console.error('Error canceling payment:', error));
      },
      onError: function(error, payment) {
        console.error('Payment error:', error);
        const paymentId = payment.identifier;
        fetch('/payment/error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, error })
        })
        .then(response => response.json())
        .then(data => console.log('Error processed:', data))
        .catch(err => console.error('Error reporting payment error:', err));
      }
    };

    Pi.createPayment(paymentData, paymentCallbacks);
  };

  return (
    <div>
      <button onClick={authenticateUser}>Authenticate User</button>
      {authStatus && <button onClick={createPayment}>Make Payment</button>}
    </div>
  );
}

export default PaymentComponent;
