// models/propertyInspectionModel.js
import pool from '../config/db.js';

export const addPropertyInspection = async ({ propertyId, inspectorId, inspectionDate, inspectionStatus }) => {
  const query = `
    INSERT INTO property_inspections (property_id, inspector_id, inspection_date, inspection_status)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [propertyId, inspectorId, inspectionDate, inspectionStatus];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getInspectionsByProperty = async (propertyId) => {
  const query = `SELECT * FROM property_inspections WHERE property_id = $1;`;
  const result = await pool.query(query, [propertyId]);
  return result.rows;
};
