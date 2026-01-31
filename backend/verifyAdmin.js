import mongoose from 'mongoose';
import User from './models/User.js';

const MONGODB_URI = 'mongodb://localhost:27017/mobileshop';

const verifyAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Find and update admin user
    const result = await User.findOneAndUpdate(
      { email: 'admin@mobileshop.com' },
      { $set: { isEmailVerified: true } },
      { new: true }
    );

    if (result) {
      console.log(`✅ Admin user verified successfully`);
      console.log(`📧 Email: ${result.email}`);
      console.log(`👤 Name: ${result.name}`);
      console.log(`✓ Email Verified: ${result.isEmailVerified}`);
    } else {
      console.log('❌ Admin user not found with email: admin@mobileshop.com');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

verifyAdmin();
