import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';

const MONGODB_URI = 'mongodb://localhost:27017/mobileshop';

const updateProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Connected to MongoDB\n');

    // Find Smartphones category
    const smartphonesCategory = await Category.findOne({ name: 'Smartphones' });
    
    if (!smartphonesCategory) {
      console.error('❌ Smartphones category not found!');
      process.exit(1);
    }

    console.log(`✅ Found Smartphones category: ${smartphonesCategory._id}\n`);

    // Update all products to use Smartphones category
    const result = await Product.updateMany(
      {},
      { $set: { categoryID: smartphonesCategory._id } }
    );

    console.log(`✅ Updated ${result.modifiedCount} products to Smartphones category`);
    
    // Show updated count
    const totalProducts = await Product.countDocuments();
    console.log(`📊 Total products in database: ${totalProducts}\n`);

    // Verify update - show sample products
    const products = await Product.find().populate('categoryID').limit(5);
    console.log('Sample products:');
    products.forEach(p => {
      console.log(`  - ${p.brand} ${p.modelName} → Category: ${p.categoryID?.name || 'N/A'}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateProducts();
