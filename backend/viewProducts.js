import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';

// View all products
const viewProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobileshop');
    console.log('📦 Connected to MongoDB\n');

    // Get all products with category population
    const products = await Product.find().populate('categoryID', 'name').sort({ 'categoryID.name': 1, modelName: 1 });

    if (products.length === 0) {
      console.log('⚠️  No products found in database');
      return;
    }

    console.log('📋 Products in Database:\n');
    console.log('══════════════════════════════════════════════════════════════════════');

    let currentCategory = '';
    let categoryCount = 0;
    const categoryStats = {};

    products.forEach((product, index) => {
      const categoryName = product.categoryID?.name || 'Uncategorized';
      
      // Track category stats
      if (!categoryStats[categoryName]) {
        categoryStats[categoryName] = 0;
      }
      categoryStats[categoryName]++;

      // Print category header
      if (categoryName !== currentCategory) {
        if (currentCategory !== '') {
          console.log('──────────────────────────────────────────────────────────────────────');
        }
        console.log(`\n📱 ${categoryName.toUpperCase()} PRODUCTS:`);
        console.log('──────────────────────────────────────────────────────────────────────');
        currentCategory = categoryName;
        categoryCount = 0;
      }

      categoryCount++;
      
      // Format product info
      const stockStatus = product.stock > 50 ? '✅' : product.stock > 20 ? '⚠️' : '🔴';
      const priceFormatted = `$${product.price}`;
      const discount = product.discount > 0 ? ` (${product.discount}% off)` : '';
      
      console.log(`${categoryCount}. ${product.modelName}`);
      console.log(`   Brand: ${product.brand} | Price: ${priceFormatted}${discount}`);
      console.log(`   Stock: ${stockStatus} ${product.stock} units | Approved: ${product.isApproved ? '✅' : '❌'}`);
      console.log(`   RAM: ${product.specs?.ram || 'N/A'} | Storage: ${product.specs?.storage || 'N/A'}`);
      console.log(`   Images: ${product.images?.join(', ') || 'No image'}`);
      console.log('');
    });

    console.log('══════════════════════════════════════════════════════════════════════');
    console.log('\n📊 Summary by Category:\n');
    
    Object.entries(categoryStats)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count} products`);
      });

    console.log(`\n✅ Total Products: ${products.length}`);

  } catch (error) {
    console.error('❌ Error viewing products:', error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run the view function
viewProducts();
