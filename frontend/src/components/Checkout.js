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
import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [userUid, setUserUid] = useState('');
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');
  const [productId, setProductId] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const [txid, setTxid] = useState('');
  const [status, setStatus] = useState('');

  // Handle Payment Creation
  const createPayment = async () => {
    try {
      const response = await axios.post('/api/payment/create-payment', {
        userUid,
        amount,
        memo,
        productId
      });
      setPaymentId(response.data.paymentId);
      alert('Payment created successfully. Proceed to submit!');
    } catch (error) {
      console.error('Payment creation error:', error.response.data);
    }
  };

  // Handle Payment Submission
  const submitPayment = async () => {
    try {
      const response = await axios.post('/api/payment/submit-payment', {
        paymentId
      });
      setTxid(response.data.txid);
      alert('Payment submitted successfully. Proceed to complete!');
    } catch (error) {
      console.error('Payment submission error:', error.response.data);
    }
  };

  // Handle Payment Completion
  const completePayment = async () => {
    try {
      const response = await axios.post('/api/payment/complete-payment', {
        paymentId,
        txid
      });
      setStatus(response.data.completedPayment.status);
      alert('Payment completed successfully!');
    } catch (error) {
      console.error('Payment completion error:', error.response.data);
    }
  };

  return (
    <div>
      <input type="text" placeholder="User UID" value={userUid} onChange={(e) => setUserUid(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <input type="text" placeholder="Memo" value={memo} onChange={(e) => setMemo(e.target.value)} />
      <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />

      <button onClick={createPayment}>Create Payment</button>
      {paymentId && <button onClick={submitPayment}>Submit Payment</button>}
      {txid && <button onClick={completePayment}>Complete Payment</button>}

      {status && <p>Payment Status: {status}</p>}
    </div>
  );
};

export default Checkout;
