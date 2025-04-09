// routes/transactionsRoutes.js
import express from 'express';
import {
  getPendingTransactions,
  validateTransaction,
  rejectValidation,
  getValidatedTransactions,
  approveTransaction,
  rejectTransaction,
} from '../controllers/transactionsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/transactions/pending', authenticateToken, getPendingTransactions);

router.post('/transactions/validate', validateTransaction);
router.post('/transactions/:transactionId/reject-validation', authenticateToken, rejectValidation);

router.get('/transactions/validated', authenticateToken, getValidatedTransactions);



export default router;
