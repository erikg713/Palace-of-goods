# Palace of Goods Frontend

## Setup Instructions

1. Clone the repository and navigate to the `frontend` directory.
2. Install dependencies:
    ```
    npm install
    ```
3. Add the Pi SDK to `public/index.html`:
    ```html
    <script src="https://sdk.minepi.com/pi-sdk.js"></script>
    <script>
      Pi.init({ version: "2.0", sandbox: true });
    </script>
    ```
4. Run the React app:
    ```
    npm start
    ```

## Pages

- **Home Page** (`/`) - Displays a welcome message.
- **Product Detail Page** (`/product/:id`) - Displays product details and a button to make payments with Pi Network.

### Payment Integration with Pi SDK

To handle payments with Pi Network, the `ProductDetail` page includes the following logic:

```tsx
const handlePayment = () => {
  Pi.createPayment({
    amount: 100,
    memo: "Purchase Product",
    metadata: { productId: "123" }
  }).then((payment) => {
    payment.complete()
      .then(() => alert('Payment complete!'))
      .catch((error) => console.error("Payment failed:", error));
  });
};



Step 1: Set Up Pi Network SDK in Backend

1. Install Pi Network SDK:



First, make sure you have the Pi Network SDK available for use in your project. If you don't have it yet, ensure you install it or download the required Pi Network SDK (depending on the Node.js package or custom SDK).

npm install pi-backend

2. Backend Configuration (env file):



Make sure to add your Pi API Key and wallet private seed to the .env file.

PI_API_KEY=your_pi_api_key_here
WALLET_PRIVATE_SEED=your_wallet_private_seed_here

3. Initialize Pi Network SDK in Backend:



Create a new file paymentController.js in your controllers directory, where you’ll handle the payment logic.

const PiNetwork = require('pi-backend');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.PI_API_KEY;
const walletPrivateSeed = process.env.WALLET_PRIVATE_SEED;
const pi = new PiNetwork(apiKey, walletPrivateSeed);

// Create a payment
exports.createPayment = async (req, res) => {
  const { userUid, amount, memo, productId } = req.body;

  // Payment data to send to Pi Network
  const paymentData = {
    amount,      // Payment amount
    memo,        // Payment memo for the user
    metadata: {  // Add metadata to associate with the payment
      productId, 
      userUid
    },
    uid: userUid
  };

  try {
    // Request to Pi Network to create payment
    const paymentId = await pi.createPayment(paymentData);

    // Store payment details in DB (replace this with your actual DB logic)
    await db.storePaymentData({
      uid: userUid,
      product_id: productId,
      amount,
      memo,
      payment_id: paymentId,
      txid: null,
      status: 'created'
    });

    // Respond with the generated payment ID
    res.json({ paymentId });
  } catch (error) {
    console.error('Payment creation failed:', error.message);
    res.status(500).json({ error: 'Payment creation failed' });
  }
};

// Submit Payment
exports.submitPayment = async (req, res) => {
  const { paymentId } = req.body;

  try {
    // Submit the payment through Pi Network
    const txid = await pi.submitPayment(paymentId);

    // Store the transaction ID and update payment status
    await db.updatePaymentTxId(paymentId, txid);
    await db.updatePaymentStatus(paymentId, 'submitted');
    res.json({ txid });
  } catch (error) {
    console.error('Payment submission failed:', error.message);
    res.status(500).json({ error: 'Payment submission failed' });
  }
};

// Complete Payment
exports.completePayment = async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    // Complete the payment with the transaction ID
    const completedPayment = await pi.completePayment(paymentId, txid);

    // Store completed payment details and update status
    await db.completePayment(paymentId, completedPayment);
    await db.updatePaymentStatus(paymentId, 'completed');
    res.json({ completedPayment });
  } catch (error) {
    console.error('Payment completion failed:', error.message);
    res.status(500).json({ error: 'Payment completion failed' });
  }
};


---

Step 2: Set Up Routes

Create a paymentRoutes.js file to define your API endpoints that handle payments.

const express = require('express');
const { createPayment, submitPayment, completePayment } = require('../controllers/paymentController');
const router = express.Router();

// Payment Routes
router.post('/create-payment', createPayment);
router.post('/submit-payment', submitPayment);
router.post('/complete-payment', completePayment);

module.exports = router;


---

Step 3: Frontend Integration for Pi Network Payment

1. Frontend: Install Axios (to make API requests):



npm install axios

2. Create Checkout Component (React):



Here’s how you’ll set up your frontend to handle payment creation, submission, and completion using Pi Network:

src/components/Checkout.js:

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

This component handles creating a payment, submitting it, and completing it via the Pi Network API. You’ll have to replace API keys and other constants as per your environment setup.


---

Step 4: Backend Payment Logic and DB Integration

For a more complete solution, you will need to:

1. Store the payment data (e.g., uid, productId, amount, status, etc.) in your database.


2. Ensure that after each payment step (create, submit, complete), you’re updating your database accordingly.



For example, here's a simple MongoDB setup using Mongoose:

// models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  productId: { type: String, required: true },
  amount: { type: Number, required: true },
  memo: { type: String, required: true },
  paymentId: { type: String, required: true },
  txid: { type: String, default: null },
  status: { type: String, default: 'created' }
});

module.exports = mongoose.model('Payment', paymentSchema);

Then, inside your controller, when creating a payment, you can store it:

const Payment = require('../models/payment');

exports.createPayment = async (req, res) => {
  const { userUid, amount, memo, productId } = req.body;
  
  // Create a new payment record in the DB
  const newPayment = new Payment({
    uid: userUid,
    productId,
    amount,
    memo,
    paymentId: 'generated_payment_id', // Will be replaced after Pi payment creation
    status: 'created'
  });

  try {
    await newPayment.save();
    res.json({ paymentId: newPayment.paymentId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store payment data' });
  }
};


---

Step 5: Test Everything

Test the payment flow from frontend to backend.

Make sure the Pi Network API is integrated properly and that payments are successfully created, submitted, and completed.
