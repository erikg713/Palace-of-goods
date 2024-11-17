const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Create Product
router.post('/', protect, createProduct);

// Get All Products
router.get('/', getAllProducts);

// Update Product
router.put('/:id', protect, updateProduct);

// Delete Product
router.delete('/:id', protect, deleteProduct);

module.exports = router;
