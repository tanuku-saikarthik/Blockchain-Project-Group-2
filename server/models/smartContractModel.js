// models/smartContractModel.js
import pool from '../config/db.js';

export const createSmartContractRecord = async ({ propertyId, contractDetails, contractStatus, blockchainTxHash }) => {
  const query = `
    INSERT INTO smart_contracts (property_id, contract_details, contract_status, blockchain_tx_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [propertyId, contractDetails, contractStatus, blockchainTxHash];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getSmartContractRecord = async (contractId) => {
  const query = `SELECT * FROM smart_contracts WHERE contract_id = $1;`;
  const result = await pool.query(query, [contractId]);
  return result.rows[0];
};
