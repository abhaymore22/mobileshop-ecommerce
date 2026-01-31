import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkProductImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobileshop');
    console.log('📦 Connected to MongoDB\n');

    const products = await Product.find({}).populate('categoryID');
    
    console.log('📋 Checking Product Images:\n');
    console.log('═'.repeat(100));
    
    let missingImages = [];
    
    products.forEach((product, index) => {
      const categoryName = product.categoryID?.name || 'Unknown';
      console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
      console.log(`   Category: ${categoryName}`);
      console.log(`   Images in DB: ${product.images?.length || 0}`);
      
      if (product.images && product.images.length > 0) {
        product.images.forEach((img, i) => {
          const fullPath = path.join(__dirname, img);
          const exists = fs.existsSync(fullPath);
          console.log(`   ${i + 1}. ${img} - ${exists ? '✅' : '❌ MISSING'}`);
          if (!exists) {
            missingImages.push({
              product: `${product.brand} ${product.modelName}`,
              category: categoryName,
              imagePath: img,
              productId: product._id
            });
          }
        });
      } else {
        console.log(`   ⚠️  No images in database`);
        missingImages.push({
          product: `${product.brand} ${product.modelName}`,
          category: categoryName,
          imagePath: 'No images',
          productId: product._id
        });
      }
    });
    
    console.log('\n' + '═'.repeat(100));
    console.log(`\n📊 Summary:`);
    console.log(`   Total Products: ${products.length}`);
    console.log(`   Products with missing images: ${missingImages.length}\n`);
    
    if (missingImages.length > 0) {
      console.log('❌ Missing Images:\n');
      missingImages.forEach((item, i) => {
        console.log(`${i + 1}. ${item.product} (${item.category})`);
        console.log(`   Path: ${item.imagePath}`);
        console.log(`   ID: ${item.productId}\n`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkProductImages();
