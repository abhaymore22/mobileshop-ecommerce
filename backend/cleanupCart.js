import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cart from './models/Cart.js';

dotenv.config();

const cleanupCarts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Delete all carts with null userID
    const result = await Cart.deleteMany({ userID: null });
    console.log(`Deleted ${result.deletedCount} carts with null userID`);

    // Drop old index if exists
    try {
      await Cart.collection.dropIndex('user_1');
      console.log('Dropped old user_1 index');
    } catch (err) {
      console.log('Index user_1 does not exist (this is fine)');
    }

    console.log('Cleanup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Cleanup failed:', error);
    process.exit(1);
  }
};

cleanupCarts();
