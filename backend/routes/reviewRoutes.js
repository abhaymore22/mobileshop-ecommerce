import express from 'express';
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/product/:productId', validateObjectId, getProductReviews);
router.get('/myreviews', protect, getMyReviews);
router.post('/', protect, createReview);
router.put('/:id', protect, validateObjectId, updateReview);
router.delete('/:id', protect, validateObjectId, deleteReview);

export default router;
