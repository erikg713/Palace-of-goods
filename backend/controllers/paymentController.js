const PiNetwork = require('pi-backend');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.PI_API_KEY;
const walletPrivateSeed = process.env.WALLET_PRIVATE_SEED;
const pi = new PiNetwork(apiKey, walletPrivateSeed);

// Create a payment
exports.createPayment = async (req, res) => {
  const { userUid, amount, memo, productId } = req.body;

  // Payment data to send to Pi Network
  const paymentData = {
    amount,      // Payment amount
    memo,        // Payment memo for the user
    metadata: {  // Add metadata to associate with the payment
      productId, 
      userUid
    },
    uid: userUid
  };

  try {
    // Request to Pi Network to create payment
    const paymentId = await pi.createPayment(paymentData);

    // Store payment details in DB (replace this with your actual DB logic)
    await db.storePaymentData({
      uid: userUid,
      product_id: productId,
      amount,
      memo,
      payment_id: paymentId,
      txid: null,
      status: 'created'
    });

    // Respond with the generated payment ID
    res.json({ paymentId });
  } catch (error) {
    console.error('Payment creation failed:', error.message);
    res.status(500).json({ error: 'Payment creation failed' });
  }
};

// Submit Payment
exports.submitPayment = async (req, res) => {
  const { paymentId } = req.body;

  try {
    // Submit the payment through Pi Network
    const txid = await pi.submitPayment(paymentId);

    // Store the transaction ID and update payment status
    await db.updatePaymentTxId(paymentId, txid);
    await db.updatePaymentStatus(paymentId, 'submitted');
    res.json({ txid });
  } catch (error) {
    console.error('Payment submission failed:', error.message);
    res.status(500).json({ error: 'Payment submission failed' });
  }
};

// Complete Payment
exports.completePayment = async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    // Complete the payment with the transaction ID
    const completedPayment = await pi.completePayment(paymentId, txid);

    // Store completed payment details and update status
    await db.completePayment(paymentId, completedPayment);
    await db.updatePaymentStatus(paymentId, 'completed');
    res.json({ completedPayment });
  } catch (error) {
    console.error('Payment completion failed:', error.message);
    res.status(500).json({ error: 'Payment completion failed' });
  }
};
import db from '../config/db.js';
import PiNetwork from 'pi-backend';
import dotenv from 'dotenv';

dotenv.config();

const pi = new PiNetwork(process.env.PI_API_KEY, process.env.WALLET_PRIVATE_SEED);

export const createPayment = async (req, res) => {
  const { userUid, amount, memo, productId } = req.body;
  const paymentData = { amount, memo, metadata: { productId }, uid: userUid };

  try {
    const paymentId = await pi.createPayment(paymentData);
    await db.query('INSERT INTO payments (uid, product_id, amount, memo, payment_id) VALUES ($1, $2, $3, $4, $5)',
      [userUid, productId, amount, memo, paymentId]);
    res.json({ paymentId });
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
};

// Other payment handling functions follow a similar pattern
const { Client, resources } = require('coinbase-commerce-node');
const client = Client.init(process.env.COINBASE_API_KEY);

exports.createPayment = async (req, res) => {
  const { amount, productId } = req.body;
  const chargeData = {
    name: 'Palace of Goods Payment',
    description: `Payment for product ${productId}`,
    local_price: { amount, currency: 'USD' },
    pricing_type: 'fixed_price',
  };

  try {
    const charge = await resources.Charge.create(chargeData);
    res.status(201).json({ chargeId: charge.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

exports.webhookHandler = async (req, res) => {
  const sigHeader = req.headers['x-cc-webhook-signature'];
  const rawBody = JSON.stringify(req.body);

  try {
    const event = Webhook.verifyEventBody(rawBody, sigHeader, process.env.COINBASE_WEBHOOK_SECRET);
    if (event.type === 'charge:confirmed') {
      console.log('Payment confirmed:', event.data);
      // Update DB here
    }
    res.status(200).send();
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send('Webhook error');
  }
};
