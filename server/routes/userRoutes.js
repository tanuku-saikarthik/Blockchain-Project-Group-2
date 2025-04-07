// routes/userRoutes.js
import express from 'express';
import { getUserById, getProfile, getTransactionHistory } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/user/:id', authenticateToken, getUserById);
router.get('/profile', authenticateToken, getProfile);
router.get('/transaction-history', authenticateToken, getTransactionHistory);

export default router;
