import express from 'express';
import { getDashboardAnalytics } from '../controllers/analyticsController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, checkRole('admin', 'staff'), getDashboardAnalytics);

export default router;
