import mongoose from 'mongoose';
import Category from './models/Category.js';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Product type categories
const categories = [
  { name: 'Smartphones', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800' },
  { name: 'Smart Watches', imageUrl: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800' },
  { name: 'Tablets', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' },
  { name: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800' }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

const updateCategories = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mobileshop');
    console.log('📦 Connected to MongoDB\n');

    // Clear existing
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing categories\n');

    // Ensure directory exists
    const categoriesDir = path.join(__dirname, 'uploadedimage', 'categories');
    if (!fs.existsSync(categoriesDir)) {
      fs.mkdirSync(categoriesDir, { recursive: true });
    }

    // Create new categories
    for (const cat of categories) {
      const filename = cat.name.toLowerCase().replace(/\s+/g, '') + '.jpg';
      const filepath = path.join(categoriesDir, filename);
      const dbPath = `/uploadedimage/categories/${filename}`;

      console.log(`📥 Downloading image for ${cat.name}...`);
      await downloadImage(cat.imageUrl, filepath);
      console.log(`✅ Downloaded: ${filename}`);

      await Category.create({
        name: cat.name,
        imagePath: dbPath,
        isActive: true
      });
      console.log(`✅ Created category: ${cat.name}\n`);
    }

    console.log('🎉 Categories updated successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📦 Connection closed');
  }
};

updateCategories();
