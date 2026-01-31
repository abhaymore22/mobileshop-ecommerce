import mongoose from 'mongoose';
import Category from './models/Category.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mobileshop';

async function checkCategories() {
  try {
    await mongoose.connect(MONGODB_URI);
    const categories = await Category.find({});
    console.log('Categories:');
    categories.forEach(cat => {
      console.log(`- "${cat.name}" (ID: ${cat._id})`);
    });
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkCategories();
