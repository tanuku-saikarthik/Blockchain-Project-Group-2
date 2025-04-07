// models/propertyModel.js
import pool from '../config/db.js';

export const createProperty = async ({ ownerId, address, latitude, longitude, size, value, status, blockchainTxHash }) => {
  const query = `
    INSERT INTO properties (owner_id, address, latitude, longitude, size, value, status, blockchain_tx_hash)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [ownerId, address, latitude, longitude, size, value, status, blockchainTxHash];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getPropertyById = async (propertyId) => {
  const query = `SELECT * FROM properties WHERE property_id = $1;`;
  const result = await pool.query(query, [propertyId]);
  return result.rows[0];
};

export const getAllProperties = async () => {
  const query = `SELECT * FROM properties;`;
  const result = await pool.query(query);
  return result.rows;
};
