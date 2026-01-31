import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetUserPassword
} from '../controllers/userController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../middleware/validationMiddleware.js';

const router = express.Router();

// IMPORTANT: Specific routes like /profile MUST come before parameterized routes like /:id
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

router.get('/', protect, checkRole('admin', 'staff'), getAllUsers);
// Reset password route must come BEFORE /:id routes to avoid matching /:id first
router.put('/:id/reset-password', protect, checkRole('admin'), resetUserPassword);
router.get('/:id', protect, checkRole('admin', 'staff'), validateObjectId, getUserById);
router.put('/:id', protect, checkRole('admin'), validateObjectId, updateUser);
router.delete('/:id', protect, checkRole('admin'), validateObjectId, deleteUser);

export default router;
