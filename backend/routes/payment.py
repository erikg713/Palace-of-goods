import express from 'express';
import PiNetwork from 'pi-backend';
import dotenv from 'dotenv';
import { db } from '../config/db';
import { check, validationResult } from 'express-validator';

dotenv.config();

const router = express.Router();

// Initialize Pi Network SDK
const apiKey = process.env.PI_API_KEY;
const walletPrivateSeed = process.env.WALLET_PRIVATE_SEED;
const pi = new PiNetwork(apiKey, walletPrivateSeed);

// Middleware to handle async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Validation middleware
const validatePaymentData = [
  check('userUid').notEmpty().withMessage('User UID is required'),
  check('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  check('memo').notEmpty().withMessage('Memo is required'),
  check('productId').notEmpty().withMessage('Product ID is required')
];

// Create Payment
router.post('/create-payment', validatePaymentData, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userUid, amount, memo, productId } = req.body;

  const paymentData = {
    amount,
    memo,
    metadata: { productId },
    uid: userUid,
  };

  try {
    const paymentId = await pi.createPayment(paymentData);
    await db.storePaymentData({
      uid: userUid,
      product_id: productId,
      amount,
      memo,
      payment_id: paymentId,
      txid: null,
      status: 'created'
    });
    res.json({ paymentId });
  } catch (error) {
    console.error('Payment creation failed:', error.message);
    res.status(500).json({ error: 'Payment creation failed' });
  }
}));

// Submit Payment
router.post('/submit-payment', [
  check('paymentId').notEmpty().withMessage('Payment ID is required')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { paymentId } = req.body;

  try {
    const txid = await pi.submitPayment(paymentId);
    await db.updatePaymentTxId(paymentId, txid);
    await db.updatePaymentStatus(paymentId, 'submitted');
    res.json({ txid });
  } catch (error) {
    console.error('Payment submission failed:', error.message);
    res.status(500).json({ error: 'Payment submission failed' });
  }
}));

// Complete Payment
router.post('/complete-payment', [
  check('paymentId').notEmpty().withMessage('Payment ID is required'),
  check('txid').notEmpty().withMessage('Transaction ID is required')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { paymentId, txid } = req.body;

  try {
    const completedPayment = await pi.completePayment(paymentId, txid);
    await db.completePayment(paymentId, completedPayment);
    await db.updatePaymentStatus(paymentId, 'completed');
    res.json({ completedPayment });
  } catch (error) {
    console.error('Payment completion failed:', error.message);
    res.status(500).json({ error: 'Payment completion failed' });
  }
}));

export default router;
class PaymentProcessor:
    def __init__(self, payment_service):
        self.payment_service = payment_service

    def process_payment(self, amount, currency):
        # Logic to process payment with a specific payment service
        try:
            transaction = self.payment_service.charge(amount, currency)
            print("Payment successful:", transaction)
        except Exception as e:
            print("Payment failed:", e)

# order.py
class OrderManager:
    def __init__(self, payment_processor):
        self.payment_processor = payment_processor

    def create_order(self, user, items, currency="USD"):
        # Logic to create an order, sum item prices, and process payment
        total_amount = sum(item['price'] for item in items)
        self.payment_processor.process_payment(total_amount, currency)
        print(f"Order created for user {user} with total: {total_amount} {currency}")
# payment.py (continued)
class PaymentProcessor:
    # ... (existing code)

    def process_payment(self, amount, currency):
        try:
            transaction = self.payment_service.charge(amount, currency)
            print("Payment successful:", transaction)
        except Exception as e:
            print(f"Payment failed: {e}")
            # Log or retry as necessary
            raise

# order.py (continued)
class OrderManager:
    # ... (existing code)

    def create_order(self, user, items, currency="USD"):
        try:
            validate_items(items)
            total_amount = sum(item['price'] for item in items)
            self.payment_processor.process_payment(total_amount, currency)
            print(f"Order created for user {user} with total: {total_amount} {currency}")
        except ValueError as ve:
            print("Invalid items:", ve)
        except Exception as e:
            print("Failed to create order:", e)
