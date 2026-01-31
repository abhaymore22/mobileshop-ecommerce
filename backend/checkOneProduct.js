import mongoose from 'mongoose';
import Product from './models/Product.js';

await mongoose.connect('mongodb://127.0.0.1:27017/mobileShop');

const count = await Product.countDocuments();
console.log('Total products:', count);

const watches = await Product.find({ modelName: /watch/i }).limit(3);
console.log('\nWatch products found:', watches.length);
watches.forEach(w => {
  console.log(`- ${w.brand} ${w.modelName}`);
  console.log(`  Image: ${w.images[0]}`);
});

await mongoose.connection.close();
