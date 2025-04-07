// routes/escrowRoutes.js
import express from 'express';
import { fundEscrow } from '../controllers/transactionsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authenticate } from '../controllers/landController.js';
import { sendEscrowToSeller } from '../controllers/escrowController.js';

const router = express.Router();

router.post('/send-escrow', sendEscrowToSeller);

export default router;