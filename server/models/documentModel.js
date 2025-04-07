// models/documentModel.js
import pool from '../config/db.js';

export const addDocument = async ({ propertyId, documentType, documentUrl, documentHash }) => {
  const query = `
    INSERT INTO documents (property_id, document_type, document_url, document_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [propertyId, documentType, documentUrl, documentHash];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getDocumentsByProperty = async (propertyId) => {
  const query = `SELECT * FROM documents WHERE property_id = $1;`;
  const result = await pool.query(query, [propertyId]);
  return result.rows;
};
