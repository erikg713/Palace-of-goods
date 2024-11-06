import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { productId } = useParams();  // Get productId from the URL parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details from the backend API
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [productId]);  // Dependency array ensures the effect is triggered when productId changes

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-details">
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock > 0 ? product.stock : 'Out of stock'}</p>
          {/* Add more product details as needed */}
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;

// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product details:", error));
  }, [id]);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert("Product added to cart!");
  };

  return (
    <div>
      {product && (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price} Pi</p>
          <button onClick={addToCart}>Add to Cart</button>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
