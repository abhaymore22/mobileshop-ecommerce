import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';
import dotenv from 'dotenv';

dotenv.config();

async function verifySmartWatches() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const category = await Category.findOne({ name: 'Smart Watches' });
    const products = await Product.find({ categoryID: category._id });
    
    console.log('\n📱 Smart Watches Products in Database:\n');
    console.log('='.repeat(80));
    
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.brand} ${p.modelName}`);
      console.log(`   💰 Price: ₹${p.price} | 📦 Stock: ${p.stock} | ⭐ Approved: ${p.isApproved}`);
      console.log(`   🖼️  Images: ${p.images.length} image(s)`);
      console.log('   ' + '-'.repeat(76));
    });
    
    console.log('='.repeat(80));
    console.log(`\n✅ Total: ${products.length} Smart Watches\n`);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

verifySmartWatches();
