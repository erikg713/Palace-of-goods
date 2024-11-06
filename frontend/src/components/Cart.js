// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
  const profit = totalAmount * 0.10;

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length ? (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <p>{item.name} - {item.price} Pi</p>
              </li>
            ))}
          </ul>
          <p>Total: {totalAmount} Pi</p>
          <p>Your Profit: {profit} Pi</p>
          <Link to="/checkout">Proceed to Checkout</Link>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
