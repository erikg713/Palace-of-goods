// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productList = await fetchProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="home-page">
      <h1>Marketplace</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;import React from 'react';
import useWeb3 from '../hooks/useWeb3';
import { toast } from 'react-toastify';

const Home = () => {
  const { account, connectWallet } = useWeb3();

  const handleConnect = () => {
    connectWallet().then(() => {
      toast.success("Wallet connected!");
    }).catch((error) => {
      toast.error("Failed to connect wallet.");
    });
  };

  return (
    <div>
      <h1>Welcome to Palace of Goods</h1>
      {account ? (
        <p>Connected Wallet: {account}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Home;

// frontend/src/pages/HomePage.js
import React from 'react';
import ProductList from '../components/ProductList';

const mockProducts = [
  { id: '1', name: 'Product A', price: 10 },
  { id: '2', name: 'Product B', price: 20 },
];

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Palace of Goods</h1>
      <ProductList products={mockProducts} />
    </div>
  );
};

export default HomePage;

import React from 'react';

const Home = () => (
  <div>
    <h1>Welcome to Palace of Goods</h1>
    <p>Your one-stop marketplace for Web3-powered shopping!</p>
  </div>
);

export default Home;
