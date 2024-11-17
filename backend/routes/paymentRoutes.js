const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createPayment, webhookHandler } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create', protect, createPayment);
router.post('/webhook', webhookHandler);

module.exports = router;
import express from 'express';
import { createPayment } from '../controllers/paymentController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { check } from 'express-validator';

const router = express.Router();

router.post(
  '/create-payment',
  [
    check('userUid').notEmpty().withMessage('User UID is required'),
    check('amount').isFloat({ gt: 0 }).withMessage('Amount must be positive'),
    check('memo').notEmpty().withMessage('Memo is required'),
    check('productId').notEmpty().withMessage('Product ID is required')
  ],
  validateRequest,
  createPayment
);

export default router;
const express = require('express');
const { createPayment, submitPayment, completePayment } = require('../controllers/paymentController');
const router = express.Router();

// Payment Routes
router.post('/create-payment', createPayment);
router.post('/submit-payment', submitPayment);
router.post('/complete-payment', completePayment);

module.exports = router;
const express = require('express');
const { createPayment, submitPayment, completePayment } = require('../controllers/paymentController');
const router = express.Router();

// Payment Routes
router.post('/create-payment', createPayment);
router.post('/submit-payment', submitPayment);
router.post('/complete-payment', completePayment);

module.exports = router;
