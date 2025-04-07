// models/landRegistryModel.js
import pool from '../config/db.js';

export const createLandRegistryEntry = async ({ propertyId, registrationNumber, registrationDate, governmentCertificateUrl, blockchainTxHash, status }) => {
  const query = `
    INSERT INTO land_registry (property_id, registration_number, registration_date, government_certificate_url, blockchain_tx_hash, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [propertyId, registrationNumber, registrationDate, governmentCertificateUrl, blockchainTxHash, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getLandRegistryEntry = async (registryId) => {
  const query = `SELECT * FROM land_registry WHERE registry_id = $1;`;
  const result = await pool.query(query, [registryId]);
  return result.rows[0];
};
2