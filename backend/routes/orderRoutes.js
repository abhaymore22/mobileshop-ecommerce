import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  payOrder
} from '../controllers/orderController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, validateObjectId, getOrderById);
router.get('/', protect, checkRole('admin', 'staff'), getAllOrders);
router.put('/:id/status', protect, checkRole('admin', 'staff'), validateObjectId, updateOrderStatus);
router.post('/:id/pay', protect, validateObjectId, payOrder);

export default router;
