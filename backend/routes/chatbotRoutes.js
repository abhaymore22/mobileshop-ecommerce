import express from 'express';
import {
  sendMessage,
  getChatHistory,
  getAllChatSessions,
  getChatbotAnalytics
} from '../controllers/chatbotController.js';
import { protect, authorize, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes - anyone can use chatbot (with optional auth)
router.post('/message', optionalAuth, sendMessage);
router.get('/history/:sessionID', getChatHistory);

// Admin routes
router.get('/sessions', protect, authorize('admin', 'staff'), getAllChatSessions);
router.get('/analytics', protect, authorize('admin', 'staff'), getChatbotAnalytics);

export default router;
