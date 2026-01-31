import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetOTP } from '../config/emailConfig.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log('🔑 Generated OTP for:', email);
    console.log('📧 OTP:', otp);
    console.log('📅 OTP expires at:', verificationExpires.toISOString());

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      address,
      phone,
      emailVerificationOTP: otp,
      emailVerificationExpires: verificationExpires,
      otpAttempts: 0,
      isEmailVerified: false
    });

    if (user) {
      // Send OTP verification email
      try {
        await sendVerificationEmail(user.email, user.name, otp);
        console.log('✅ OTP verification email sent to:', user.email);
      } catch (emailError) {
        console.error('❌ Failed to send OTP verification email:', emailError);
        // Continue registration even if email fails
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        message: 'Registration successful! Please verify your email with the OTP sent to your inbox.',
        requiresVerification: true
        // No token - user must verify email first
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Check if email is verified
      if (!user.isEmailVerified) {
        return res.status(403).json({ 
          message: 'Please verify your email before logging in. Check your inbox for the OTP code.',
          emailNotVerified: true,
          email: user.email
        });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone,
        profileImage: user.profileImage,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.phone = req.body.phone || user.phone;

      if (req.body.password) {
        user.password = req.body.password;
      }

      if (req.file) {
        user.profileImage = '/uploadedimage/users/' + req.file.filename;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        address: updatedUser.address,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Request password reset OTP
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email address' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log('🔑 Generated password reset OTP for:', email);
    console.log('📧 OTP:', otp);
    console.log('📅 OTP expires at:', resetExpires.toISOString());

    // Save OTP to user
    user.passwordResetOTP = otp;
    user.passwordResetExpires = resetExpires;
    user.passwordResetAttempts = 0;
    await user.save();

    // Send OTP email
    try {
      await sendPasswordResetOTP(user.email, user.name, otp);
      console.log('✅ Password reset OTP email sent to:', user.email);
    } catch (emailError) {
      console.error('❌ Failed to send password reset OTP email:', emailError);
      return res.status(500).json({ message: 'Failed to send password reset email. Please try again.' });
    }

    res.json({ 
      success: true,
      message: 'Password reset OTP has been sent to your email address. Please check your inbox.',
      email: user.email
    });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify email with OTP
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log('🔍 OTP verification attempt for:', email);
    console.log('📧 Provided OTP:', otp);
    console.log('⏰ Current time:', new Date().toISOString());

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({ 
        message: 'User not found.' 
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      console.log('✅ Email already verified for:', email);
      return res.json({
        success: true,
        message: 'Email is already verified. You can login now.',
        alreadyVerified: true
      });
    }

    // Check OTP attempts (max 5 attempts)
    if (user.otpAttempts >= 5) {
      console.log('❌ Too many OTP attempts for:', email);
      return res.status(429).json({ 
        message: 'Too many failed attempts. Please request a new OTP.',
        tooManyAttempts: true
      });
    }

    // Check if OTP expired
    if (!user.emailVerificationExpires || Date.now() > user.emailVerificationExpires) {
      console.log('⚠️ OTP expired for:', email);
      console.log('📅 OTP expired at:', user.emailVerificationExpires);
      return res.status(400).json({ 
        message: 'OTP has expired. Please request a new one.',
        otpExpired: true
      });
    }

    // Verify OTP
    if (user.emailVerificationOTP !== otp) {
      console.log('❌ Invalid OTP for:', email);
      console.log('Expected:', user.emailVerificationOTP, 'Got:', otp);
      
      // Increment failed attempts
      user.otpAttempts += 1;
      await user.save();
      
      return res.status(400).json({ 
        message: `Invalid OTP. ${5 - user.otpAttempts} attempts remaining.`,
        attemptsRemaining: 5 - user.otpAttempts
      });
    }

    console.log('✅ OTP verified for:', email);

    // Update user verification status
    user.isEmailVerified = true;
    user.emailVerificationOTP = null;
    user.emailVerificationExpires = null;
    user.otpAttempts = 0;
    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name);
      console.log('✅ Welcome email sent to:', user.email);
    } catch (emailError) {
      console.error('❌ Failed to send welcome email:', emailError);
      // Continue even if welcome email fails
    }

    res.json({
      success: true,
      message: 'Email verified successfully! You can now login and enjoy all features of MobileShop.',
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      phone: user.phone,
      profileImage: user.profileImage,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('❌ Email verification error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Resend OTP verification email
// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate new 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.emailVerificationOTP = otp;
    user.emailVerificationExpires = verificationExpires;
    user.otpAttempts = 0; // Reset attempts
    await user.save();

    console.log('🔄 New OTP generated for:', email);
    console.log('📧 OTP:', otp);

    // Send OTP verification email
    await sendVerificationEmail(user.email, user.name, otp);

    res.json({
      success: true,
      message: 'New OTP has been sent to your email. Please check your inbox.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify password reset OTP
// @route   POST /api/auth/verify-reset-otp
// @access  Public
export const verifyPasswordResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log('🔍 Password reset OTP verification attempt for:', email);
    console.log('📧 Provided OTP:', otp);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check OTP attempts (max 5 attempts)
    if (user.passwordResetAttempts >= 5) {
      console.log('❌ Too many password reset OTP attempts for:', email);
      return res.status(429).json({ 
        message: 'Too many failed attempts. Please request a new OTP.',
        tooManyAttempts: true
      });
    }

    // Check if OTP expired
    if (!user.passwordResetExpires || Date.now() > user.passwordResetExpires) {
      console.log('⚠️ Password reset OTP expired for:', email);
      return res.status(400).json({ 
        message: 'OTP has expired. Please request a new one.',
        otpExpired: true
      });
    }

    // Verify OTP
    if (user.passwordResetOTP !== otp) {
      console.log('❌ Invalid password reset OTP for:', email);
      
      // Increment failed attempts
      user.passwordResetAttempts += 1;
      await user.save();
      
      return res.status(400).json({ 
        message: `Invalid OTP. ${5 - user.passwordResetAttempts} attempts remaining.`,
        attemptsRemaining: 5 - user.passwordResetAttempts
      });
    }

    console.log('✅ Password reset OTP verified for:', email);

    res.json({
      success: true,
      message: 'OTP verified successfully. You can now reset your password.',
      email: user.email
    });
  } catch (error) {
    console.error('❌ Password reset OTP verification error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset password with verified OTP
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    console.log('🔐 Password reset attempt for:', email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify OTP one more time for security
    if (user.passwordResetOTP !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // Check if OTP expired
    if (!user.passwordResetExpires || Date.now() > user.passwordResetExpires) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Validate new password
    if (newPassword.includes("'") || newPassword.includes('"')) {
      return res.status(400).json({ message: 'Password cannot contain single or double quotes' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    
    if (!/[a-z]/.test(newPassword)) {
      return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
    }
    
    if (!/[A-Z]/.test(newPassword)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
    }
    
    if (!/[0-9]/.test(newPassword)) {
      return res.status(400).json({ message: 'Password must contain at least one digit' });
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};:,.<>?/|`~]/.test(newPassword)) {
      return res.status(400).json({ message: 'Password must contain at least one special character' });
    }

    // Update password
    user.password = newPassword; // Will be hashed by pre-save middleware
    user.passwordResetOTP = null;
    user.passwordResetExpires = null;
    user.passwordResetAttempts = 0;
    await user.save();

    console.log('✅ Password reset successful for:', email);

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });
  } catch (error) {
    console.error('❌ Password reset error:', error);
    res.status(500).json({ message: error.message });
  }
};
