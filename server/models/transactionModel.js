// models/transactionModel.js
import pool from '../config/db.js';

export const createTransaction = async ({ propertyId, buyerId, sellerId, transactionDate, amount, blockchainTxHash, status }) => {
  const query = `
    INSERT INTO transactions (property_id, buyer_id, seller_id, transaction_date, amount, blockchain_tx_hash, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [propertyId, buyerId, sellerId, transactionDate, amount, blockchainTxHash, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getTransactionById = async (transactionId) => {
  const query = `SELECT * FROM transactions WHERE transaction_id = $1;`;
  const result = await pool.query(query, [transactionId]);
  return result.rows[0];
};

export const getTransactionsByUser = async (userId) => {
  const query = `
    SELECT * FROM transactions
    WHERE buyer_id = $1 OR seller_id = $1;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};
