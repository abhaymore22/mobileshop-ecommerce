import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mobileShop');
    console.log('📦 Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Download image from URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

// Create sanitized filename from product name
const sanitizeFilename = (brand, modelName) => {
  const combined = `${brand}-${modelName}`.toLowerCase()
    .replace(/[^a-z0-9-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return combined + '.jpg';
};

const fixProductImages = async () => {
  try {
    await connectDB();

    // Find all products with Unsplash URLs
    const products = await Product.find({
      images: { $regex: /unsplash\.com/ }
    }).populate('categoryID');

    console.log(`\n📋 Found ${products.length} products with Unsplash URLs\n`);

    let successCount = 0;
    let failCount = 0;

    for (const product of products) {
      const category = product.categoryID?.name || 'unknown';
      console.log(`Processing: ${product.brand} ${product.modelName} (${category})`);

      try {
        // Create category subfolder
        const categoryFolder = category.toLowerCase().replace(/\s+/g, '');
        const uploadDir = path.join(__dirname, 'uploadedimage', 'products', categoryFolder);
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
          console.log(`  Created folder: ${categoryFolder}`);
        }

        // Download each image
        const newImages = [];
        for (let i = 0; i < product.images.length; i++) {
          const imageUrl = product.images[i];
          
          if (imageUrl.includes('unsplash.com')) {
            const filename = sanitizeFilename(product.brand, product.modelName);
            const filepath = path.join(uploadDir, filename);
            const dbPath = `/uploadedimage/products/${categoryFolder}/${filename}`;

            console.log(`  Downloading from: ${imageUrl}`);
            await downloadImage(imageUrl, filepath);
            console.log(`  ✅ Saved to: ${dbPath}`);
            newImages.push(dbPath);
          } else {
            newImages.push(imageUrl);
          }
        }

        // Update product in database
        product.images = newImages;
        await product.save();
        console.log(`  ✅ Updated database\n`);
        successCount++;

      } catch (error) {
        console.error(`  ❌ Error: ${error.message}\n`);
        failCount++;
      }
    }

    console.log('\n═══════════════════════════════════════');
    console.log(`✅ Successfully processed: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📦 MongoDB connection closed');
  }
};

fixProductImages();
