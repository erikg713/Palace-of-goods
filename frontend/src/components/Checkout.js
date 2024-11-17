import React, { useState, useEffect } from "react";
import './Checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "creditCard",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Load cart items and calculate total price from local storage or API
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    calculateTotalPrice(savedCart);
  }, []);

  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("Order processed successfully!");
      // Clear cart after order submission
      localStorage.removeItem('cart');
      setCartItems([]);
    }, 2000);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. Please add items to proceed.</p>
        ) : (
          <div>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-item-image" />
                  <div className="checkout-item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price} x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-price">
              <span>Total: </span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Billing Information</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          ZIP Code:
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            required
          />
        </label>

        <div className="payment-method">
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={formData.paymentMethod === "creditCard"}
              onChange={handleInputChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === "paypal"}
              onChange={handleInputChange}
            />
            PayPal
          </label>
        </div>

        <button type="submit" className="checkout-button" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Complete Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;import React, { useState } from 'react';
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

  // Create Payment
  const createPayment = async () => {
    try {
      const response = await axios.post('/api/payment/create-payment', {
        userUid,
        amount,
        memo,
        productId
      });
      setPaymentId(response.data.paymentId);
      alert('Payment created! Proceed to submit.');
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Payment creation failed.');
    }
  };

  // Submit Payment
  const submitPayment = async () => {
    try {
      const response = await axios.post('/api/payment/submit-payment', { paymentId });
      setTxid(response.data.txid);
      alert('Payment submitted! Proceed to complete.');
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Payment submission failed.');
    }
  };

  // Complete Payment
  const completePayment = async () => {
    try {
      const response = await axios.post('/api/payment/complete-payment', {
        paymentId,
        txid
      });
      setStatus(response.data.completedPayment.status);
      alert('Payment completed!');
    } catch (error) {
      console.error('Error completing payment:', error);
      alert('Payment completion failed.');
    }
  };

  return (
    <div>
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
        onChange={(e) => setAmount(Number(e.target.value))}
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

      <button onClick={createPayment}>Create Payment</button>
      {paymentId && <button onClick={submitPayment}>Submit Payment</button>}
      {txid && <button onClick={completePayment}>Complete Payment</button>}

      {status && <p>Payment Status: {status}</p>}
    </div>
  );
};

export default Checkout;
