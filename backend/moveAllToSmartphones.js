import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';

await mongoose.connect('mongodb://127.0.0.1:27017/mobileshop');

const smartphonesCategory = await Category.findOne({ name: 'Smartphones' });
const result = await Product.updateMany({}, { $set: { categoryID: smartphonesCategory._id } });

console.log(`✅ Updated ${result.modifiedCount} products to Smartphones category`);
console.log(`📊 Total products now in Smartphones: ${await Product.countDocuments({ categoryID: smartphonesCategory._id })}`);

await mongoose.connection.close();
