import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

export const db = {
  storePaymentData: async (data) => {
    const query = `INSERT INTO payments (uid, product_id, amount, memo, payment_id, txid) 
                   VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [data.uid, data.product_id, data.amount, data.memo, data.payment_id, data.txid];
    await pool.query(query, values);
  },
  
  updatePaymentTxId: async (paymentId, txid) => {
    const query = `UPDATE payments SET txid = $1 WHERE payment_id = $2`;
    const values = [txid, paymentId];
    await pool.query(query, values);
  },

  completePayment: async (paymentId, completedPayment) => {
    const query = `UPDATE payments SET status = $1 WHERE payment_id = $2`;
    const values = [JSON.stringify(completedPayment), paymentId];
    await pool.query(query, values);
  },
};
