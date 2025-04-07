// routes/propertyTransferRoutes.js
import express from 'express';
import { updatePropertyTransfer } from '../controllers/propertyTransferController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Endpoint to update property transfer details from on-chain data
router.put('/property-transfer/:propertyId', authenticateToken, updatePropertyTransfer);

export default router;
