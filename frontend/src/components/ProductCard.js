// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price} Pi</p>
      <button>Buy Now</button>
    </div>
  );
};

export default ProductCard;
