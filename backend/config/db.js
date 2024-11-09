import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Payment status constants
const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Custom error class for database operations
class DatabaseError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.originalError = originalError;
  }
}

// Database configuration
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait when connecting a new client
});

// Event handlers for the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

pool.on('connect', () => {
  console.log('New client connected to the database');
});

// Validation functions
const validatePaymentData = (data) => {
  const requiredFields = ['uid', 'product_id', 'amount', 'payment_id'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new DatabaseError(
      `Missing required fields: ${missingFields.join(', ')}`,
      'VALIDATION_ERROR'
    );
  }

  if (typeof data.amount !== 'number' || data.amount <= 0) {
    throw new DatabaseError('Amount must be a positive number', 'VALIDATION_ERROR');
  }
};

// Helper function to handle database errors
const handleDatabaseError = (error, operation) => {
  console.error(`Database error during ${operation}:`, error);
  
  if (error.code === '23505') { // unique violation
    throw new DatabaseError('Duplicate payment ID', 'DUPLICATE_ERROR', error);
  }
  
  if (error.code === '23503') { // foreign key violation
    throw new DatabaseError('Invalid reference ID', 'REFERENCE_ERROR', error);
  }
  
  throw new DatabaseError(
    `Error during ${operation}`,
    'OPERATION_ERROR',
    error
  );
};

export const db = {
  /**
   * Store new payment data in the database
   */
  storePaymentData: async (data) => {
    validatePaymentData(data);
    
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const query = `
        INSERT INTO payments (
          uid, 
          product_id, 
          amount, 
          memo, 
          payment_id, 
          txid, 
          status, 
          created_at
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING id, payment_id, status
      `;
      
      const values = [
        data.uid,
        data.product_id,
        data.amount,
        data.memo || null,
        data.payment_id,
        data.txid || null,
        PAYMENT_STATUS.PENDING
      ];
      
      const result = await client.query(query, values);
      await client.query('COMMIT');
      
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      handleDatabaseError(error, 'payment storage');
    } finally {
      client.release();
    }
  },

  /**
   * Update payment transaction ID
   */
  updatePaymentTxId: async (paymentId, txid) => {
    if (!paymentId || !txid) {
      throw new DatabaseError('Payment ID and transaction ID are required', 'VALIDATION_ERROR');
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const query = `
        UPDATE payments 
        SET 
          txid = $1,
          status = $2,
          updated_at = NOW()
        WHERE payment_id = $3
        RETURNING id, payment_id, status, txid
      `;
      
      const result = await client.query(query, [txid, PAYMENT_STATUS.PROCESSING, paymentId]);
      
      if (result.rowCount === 0) {
        throw new DatabaseError('Payment not found', 'NOT_FOUND_ERROR');
      }
      
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      handleDatabaseError(error, 'transaction ID update');
    } finally {
      client.release();
    }
  },

  /**
   * Complete a payment with final status and details
   */
  completePayment: async (paymentId, completedPayment) => {
    if (!paymentId || !completedPayment) {
      throw new DatabaseError('Payment ID and completion details are required', 'VALIDATION_ERROR');
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const query = `
        UPDATE payments 
        SET 
          status = $1,
          completion_data = $2,
          completed_at = NOW(),
          updated_at = NOW()
        WHERE payment_id = $3
        RETURNING id, payment_id, status, completion_data
      `;
      
      const result = await client.query(query, [
        PAYMENT_STATUS.COMPLETED,
        JSON.stringify(completedPayment),
        paymentId
      ]);
      
      if (result.rowCount === 0) {
        throw new DatabaseError('Payment not found', 'NOT_FOUND_ERROR');
      }
      
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      handleDatabaseError(error, 'payment completion');
    } finally {
      client.release();
    }
  },

  /**
   * Get payment details by payment ID
   */
  getPayment: async (paymentId) => {
    if (!paymentId) {
      throw new DatabaseError('Payment ID is required', 'VALIDATION_ERROR');
    }

    try {
      const query = `
        SELECT * FROM payments 
        WHERE payment_id = $1
      `;
      
      const result = await pool.query(query, [paymentId]);
      
      if (result.rowCount === 0) {
        throw new DatabaseError('Payment not found', 'NOT_FOUND_ERROR');
      }
      
      return result.rows[0];
    } catch (error) {
      handleDatabaseError(error, 'payment retrieval');
    }
  },

  /**
   * Get all payments for a user
   */
  getUserPayments: async (uid, options = {}) => {
    if (!uid) {
      throw new DatabaseError('User ID is required', 'VALIDATION_ERROR');
    }

    try {
      const {
        limit = 10,
        offset = 0,
        status = null,
        sortBy = 'created_at',
        sortOrder = 'DESC'
      } = options;

      let query = `
        SELECT * FROM payments 
        WHERE uid = $1
      `;
      
      const values = [uid];
      
      if (status) {
        query += ` AND status = $${values.length + 1}`;
        values.push(status);
      }
      
      query += ` ORDER BY ${sortBy} ${sortOrder}
                 LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
      values.push(limit, offset);

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      handleDatabaseError(error, 'user payments retrieval');
    }
  },

  /**
   * Mark payment as failed
   */
  failPayment: async (paymentId, reason) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const query = `
        UPDATE payments 
        SET 
          status = $1,
          failure_reason = $2,
          updated_at = NOW()
        WHERE payment_id = $3
        RETURNING id, payment_id, status, failure_reason
      `;
      
      const result = await client.query(query, [
        PAYMENT_STATUS.FAILED,
        reason,
        paymentId
      ]);
      
      if (result.rowCount === 0) {
        throw new DatabaseError('Payment not found', 'NOT_FOUND_ERROR');
      }
      
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      handleDatabaseError(error, 'payment failure update');
    } finally {
      client.release();
    }
  },

  /**
   * Close database pool
   */
  close: async () => {
    await pool.end();
  }
};
