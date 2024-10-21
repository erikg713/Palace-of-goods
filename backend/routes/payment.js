import express from 'express';
import PiNetwork from 'pi-backend';
import dotenv from 'dotenv';
import { db } from '../config/db';

dotenv.config();

const router = express.Router();

// Initialize Pi Network SDK
const apiKey = process.env.PI_API_KEY;
const walletPrivateSeed = process.env.WALLET_PRIVATE_SEED;
const pi = new PiNetwork(apiKey, walletPrivateSeed);

// Create Payment
router.post('/create-payment', async (req, res) => {
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
    });
    res.json({ paymentId });
  } catch (error) {
    console.error('Payment creation failed:', error);
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

// Submit Payment
router.post('/submit-payment', async (req, res) => {
  const { paymentId } = req.body;

  try {
    const txid = await pi.submitPayment(paymentId);
    await db.updatePaymentTxId(paymentId, txid);
    res.json({ txid });
  } catch (error) {
    console.error('Payment submission failed:', error);
    res.status(500).json({ error: 'Payment submission failed' });
  }
});

// Complete Payment
router.post('/complete-payment', async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const completedPayment = await pi.completePayment(paymentId, txid);
    await db.completePayment(paymentId, completedPayment);
    res.json({ completedPayment });
  } catch (error) {
    console.error('Payment completion failed:', error);
    res.status(500).json({ error: 'Payment completion failed' });
  }
});

export default router;
