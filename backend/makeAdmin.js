import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB Atlas (production database)
await mongoose.connect(process.env.MONGO_URI);

console.log('🔍 Enter the email address you registered with:');
const email = process.argv[2];

if (!email) {
  console.log('❌ Please provide an email address');
  console.log('Usage: node makeAdmin.js your-email@example.com');
  process.exit(1);
}

const user = await User.findOne({ email: email });

if (!user) {
  console.log(`❌ User ${email} not found`);
  console.log('Please register first on your website');
} else {
  user.role = 'admin';
  await user.save();
  console.log(`✅ ${user.name} is now an ADMIN!`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Role: ${user.role}`);
}

await mongoose.connection.close();
