import mongoose from 'mongoose';
import Product from './models/Product.js';

await mongoose.connect('mongodb://127.0.0.1:27017/mobileshop');
const count = await Product.countDocuments();
console.log(`Total products: ${count}`);
await mongoose.connection.close();
