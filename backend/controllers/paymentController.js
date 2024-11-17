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
