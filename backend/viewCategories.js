import mongoose from 'mongoose';
import Category from './models/Category.js';

const viewCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobileshop');
    console.log('📦 Connected to MongoDB\n');

    const categories = await Category.find({}).sort({ name: 1 });
    
    console.log('📋 Categories in Database:\n');
    console.log('═'.repeat(70));
    
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name.padEnd(15)} | Image: ${cat.imagePath}`);
      console.log(`   Active: ${cat.isActive ? '✅' : '❌'} | Created: ${new Date(cat.createdAt).toLocaleDateString()}`);
      console.log('─'.repeat(70));
    });
    
    console.log(`\n✅ Total Categories: ${categories.length}\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

viewCategories();
