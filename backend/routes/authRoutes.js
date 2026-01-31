import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  verifyEmail,
  resendVerificationEmail,
  verifyPasswordResetOTP,
  resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadUserImage } from '../middleware/uploadMiddleware.js';
import { validateEmail, validatePassword } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateEmail, validatePassword, registerUser);
router.post('/login', validateEmail, loginUser);
router.post('/forgot-password', validateEmail, forgotPassword);
router.post('/verify-reset-otp', verifyPasswordResetOTP);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', validateEmail, resendVerificationEmail);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, uploadUserImage.single('profileImage'), updateUserProfile);

export default router;
