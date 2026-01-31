import express from 'express';
import {
  getAllCategories,
  getActiveCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';
import { uploadCategoryImage } from '../middleware/uploadMiddleware.js';
import { validateObjectId } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/active', getActiveCategories);
router.get('/:id', validateObjectId, getCategoryById);
router.post('/', protect, checkRole('admin'), uploadCategoryImage.single('image'), createCategory);
router.put('/:id', protect, checkRole('admin'), validateObjectId, uploadCategoryImage.single('image'), updateCategory);
router.delete('/:id', protect, checkRole('admin'), validateObjectId, deleteCategory);

export default router;
