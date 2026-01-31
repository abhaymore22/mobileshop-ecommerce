import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  getMyContacts,
  updateContact,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';
import { protect, authorize, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - anyone can submit a contact form (with optional auth)
router.post('/', optionalAuth, createContact);

// Protected routes - require authentication
router.get('/my-contacts', protect, getMyContacts);

// Admin/Staff routes
router.get('/stats', protect, authorize('admin', 'staff'), getContactStats);
router.get('/', protect, authorize('admin', 'staff'), getAllContacts);
router.get('/:id', protect, authorize('admin', 'staff'), getContactById);
router.put('/:id', protect, authorize('admin', 'staff'), updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;
