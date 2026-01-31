import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:productId', protect, validateObjectId, updateCartItem);
router.delete('/:productId', protect, validateObjectId, removeFromCart);
router.delete('/', protect, clearCart);

export default router;
