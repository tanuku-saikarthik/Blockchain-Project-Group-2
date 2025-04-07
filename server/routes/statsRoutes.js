// routes/statsRoutes.js
import express from 'express';
import { fetchBuyerStats, fetchSellerStats, fetchInspectorStats } from '../controllers/statsController.js';
import { authenticate } from '../controllers/landController.js';

const router = express.Router();

router.get('/buyer-stats', authenticate, fetchBuyerStats);
router.get('/seller-stats', authenticate, fetchSellerStats);
router.get('/inspector-stats', authenticate, fetchInspectorStats);

export default router;
