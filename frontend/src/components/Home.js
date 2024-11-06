import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Palace of Goods</h1>
      <p>Discover and shop amazing products in the Pi Network marketplace!</p>
      <Link to="/products">Start Shopping</Link>
    </div>
  );
};

export default Home;
