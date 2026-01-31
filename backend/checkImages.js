import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const checkImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check categories
    console.log('📂 CATEGORY IMAGES:');
    console.log('='.repeat(70));
    const categories = await Category.find({});
    categories.forEach(cat => {
      console.log(`Category: ${cat.name}`);
      console.log(`  Image Path: ${cat.imagePath || 'NOT SET'}`);
    });

    console.log('\n📱 PRODUCT IMAGES SAMPLE:');
    console.log('='.repeat(70));
    
    // Check products from each category
    for (const cat of categories) {
      const products = await Product.find({ categoryID: cat._id }).limit(3);
      console.log(`\n${cat.name}:`);
      products.forEach(p => {
        console.log(`  ${p.brand} ${p.modelName}:`);
        console.log(`    Images array length: ${p.images?.length || 0}`);
        if (p.images && p.images.length > 0) {
          p.images.forEach((img, i) => {
            console.log(`    [${i}] ${img.substring(0, 80)}...`);
          });
        } else {
          console.log(`    ⚠️  NO IMAGES!`);
        }
      });
    }

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkImages();
