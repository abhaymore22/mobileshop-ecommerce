import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
  toggleProductActivation,
  getFeaturedProducts,
  getLatestProducts,
  getRelatedProducts
} from '../controllers/productController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';
import { uploadProductImages } from '../middleware/uploadMiddleware.js';
import { validateObjectId } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/featured/list', getFeaturedProducts);
router.get('/latest/list', getLatestProducts);
router.get('/:id', validateObjectId, getProductById);
router.get('/:id/related', validateObjectId, getRelatedProducts);
router.post('/', protect, checkRole('admin', 'staff'), uploadProductImages.array('images', 5), createProduct);
router.put('/:id', protect, checkRole('admin', 'staff'), validateObjectId, uploadProductImages.array('images', 5), updateProduct);
router.delete('/:id', protect, checkRole('admin'), validateObjectId, deleteProduct);
router.put('/:id/approve', protect, checkRole('admin'), validateObjectId, approveProduct);
router.put('/:id/toggle-active', protect, checkRole('admin'), validateObjectId, toggleProductActivation);

export default router;
