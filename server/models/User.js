// models/userModel.js
import pool from '../config/db.js';

/**
 * Create a new user.
 * @param {object} userData - Contains name, email, passwordHash, address, government_id, phone_number, role_id.
 */
export const createUser = async ({ name, email, passwordHash, address, government_id, phone_number, role_id }) => {
  const query = `
    INSERT INTO users (name, email, password_hash, address, government_id, phone_number, role_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;
  const values = [name, email, passwordHash, address, government_id, phone_number, role_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Retrieve a user by email.
 * @param {string} email - The user's email.
 */
export const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
