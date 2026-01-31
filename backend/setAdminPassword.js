import mongoose from 'mongoose';
import User from './models/User.js';

await mongoose.connect('mongodb://127.0.0.1:27017/mobileshop');

const user = await User.findOne({ email: 'admin@mobileshop.com' });

if (!user) {
  console.log('❌ User admin@mobileshop.com not found');
} else {
  user.password = 'Abcd@1234';
  await user.save();
  console.log('✅ Password updated successfully for admin@mobileshop.com');
  console.log(`   User: ${user.name} (${user.role})`);
}

await mongoose.connection.close();
