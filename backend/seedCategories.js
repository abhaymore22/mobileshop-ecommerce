import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Category from './models/Category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample categories with high-quality image URLs
const categories = [
  {
    name: 'Samsung',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' // Samsung Galaxy phone
  },
  {
    name: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' // iPhone close-up
  },
  {
    name: 'Xiaomi',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' // Xiaomi phone
  },
  {
    name: 'OnePlus',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' // OnePlus phone
  },
  {
    name: 'Oppo',
    imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' // Oppo phone
  },
  {
    name: 'Vivo',
    imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' // Vivo phone
  },
  {
    name: 'Realme',
    imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' // Realme phone
  },
  {
    name: 'Google',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80' // Google Pixel
  }
];

// Download image from URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if error
      console.error(`❌ Error downloading ${url}:`, err.message);
      reject(err);
    });
  });
};

// Main seed function
const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobileshop');
    console.log('📦 Connected to MongoDB');

    // Create categories directory if it doesn't exist
    const categoriesDir = path.join(__dirname, 'uploadedimage', 'categories');
    if (!fs.existsSync(categoriesDir)) {
      fs.mkdirSync(categoriesDir, { recursive: true });
      console.log('📁 Created categories directory');
    }

    // Clear existing categories
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing categories');

    // Download images and create categories
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const filename = `${category.name.toLowerCase()}.jpg`;
      const filepath = path.join(categoriesDir, filename);
      
      console.log(`\n📥 Downloading image for ${category.name}...`);
      
      try {
        await downloadImage(category.imageUrl, filepath);
        
        // Create category in database
        const newCategory = await Category.create({
          name: category.name,
          imagePath: `/uploadedimage/categories/${filename}`,
          isActive: true
        });
        
        console.log(`✅ Created category: ${newCategory.name}`);
      } catch (error) {
        console.error(`❌ Failed to process ${category.name}:`, error.message);
      }
    }

    console.log('\n🎉 Category seeding completed!');
    
    // Display summary
    const totalCategories = await Category.countDocuments();
    console.log(`\n📊 Summary: ${totalCategories} categories created`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

// Run the seed function
seedCategories();
