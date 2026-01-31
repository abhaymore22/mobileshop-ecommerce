import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    console.log('=== getUserProfile controller called ===');
    console.log('User ID:', req.user._id);
    console.log('User email:', req.user.email);
    console.log('User role:', req.user.role);
    
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      console.log('User profile found and returning');
      res.json(user);
    } else {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update current user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    console.log('updateUserProfile called for user:', req.user.email);
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.phone = req.body.phone || user.phone;

      if (req.body.password) {
        // Validate password
        const password = req.body.password;
        
        // Check for single or double quotes
        if (password.includes("'") || password.includes('"')) {
          return res.status(400).json({ message: 'Password cannot contain single or double quotes' });
        }
        
        // Check minimum length
        if (password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        
        // Check for lowercase
        if (!/[a-z]/.test(password)) {
          return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
        }
        
        // Check for uppercase
        if (!/[A-Z]/.test(password)) {
          return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
        }
        
        // Check for digit
        if (!/[0-9]/.test(password)) {
          return res.status(400).json({ message: 'Password must contain at least one digit' });
        }
        
        // Check for special character (excluding single and double quotes)
        if (!/[!@#$%^&*()_+\-=\[\]{};:,.<>?/|`~]/.test(password)) {
          return res.status(400).json({ message: 'Password must contain at least one special character' });
        }
        
        // Set password directly - pre-save middleware will hash it
        user.password = req.body.password;
        console.log('Password will be hashed by pre-save middleware');
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        address: updatedUser.address,
        phone: updatedUser.phone,
        createdAt: updatedUser.createdAt
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    console.log('=== getUserById controller called (ADMIN ONLY) ===');
    console.log('Requested ID:', req.params.id);
    console.log('Requester role:', req.user.role);
    
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.address = req.body.address || user.address;
      user.phone = req.body.phone || user.phone;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        address: updatedUser.address,
        phone: updatedUser.phone
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset user password to default
// @route   PUT /api/users/:id/reset-password
// @access  Private/Admin
export const resetUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const defaultPassword = 'abcd1234';
      
      // Set password and mark as modified to trigger pre-save hook
      user.password = defaultPassword;
      user.markModified('password');

      await user.save();

      console.log('Password reset successfully for:', user.email);
      console.log('New password (plain):', defaultPassword);
      console.log('Hashed password in DB:', user.password.substring(0, 20) + '...');

      res.json({ message: 'Password reset to default (abcd1234)' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: error.message });
  }
};
