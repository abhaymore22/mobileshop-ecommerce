import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mobileshop';

// Tablet products with existing images
const tablets = [
  {
    brand: 'Apple',
    modelName: 'iPad Pro 12.9" (6th Gen)',
    description: 'Ultimate iPad experience with M2 chip, Liquid Retina XDR display, and ProMotion technology. Perfect for professionals with Apple Pencil support and thunderbolt connectivity.',
    image: 'ipad-pro-129.jpg',
    specs: {
      display: '12.9" Liquid Retina XDR',
      ram: '8GB',
      storage: '128GB',
      battery: 'Up to 10 hours',
      processor: 'Apple M2',
      camera: '12MP Wide + 10MP Ultra Wide',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3',
      os: 'iPadOS 17'
    }
  },
  {
    brand: 'Samsung',
    modelName: 'Galaxy Tab S9 Ultra',
    description: 'Flagship Android tablet with massive 14.6" Dynamic AMOLED 2X display. Includes S Pen, DeX mode for desktop experience, and IP68 water resistance.',
    image: 'samsung-galaxy-tab-s9-ultra.jpg',
    specs: {
      display: '14.6" Dynamic AMOLED 2X',
      ram: '12GB',
      storage: '256GB',
      battery: '11200mAh, 45W charging',
      processor: 'Snapdragon 8 Gen 2',
      camera: '13MP + 8MP Ultra Wide',
      connectivity: 'Wi-Fi 6E, 5G, Bluetooth 5.3',
      os: 'Android 13, One UI 5.1'
    }
  },
  {
    brand: 'Microsoft',
    modelName: 'Surface Pro 9',
    description: '2-in-1 tablet with laptop performance. Features built-in kickstand, detachable keyboard, and full Windows 11 experience for productivity on the go.',
    image: 'microsoft-surface-pro-9.jpg',
    specs: {
      display: '13" PixelSense Flow',
      ram: '16GB',
      storage: '256GB SSD',
      battery: 'Up to 15.5 hours',
      processor: 'Intel Core i5 12th Gen',
      camera: '10MP rear, 1080p front',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.1',
      os: 'Windows 11 Pro'
    }
  },
  {
    brand: 'OnePlus',
    modelName: 'OnePlus Pad',
    description: 'Premium Android tablet with 11.61" display and 144Hz refresh rate. Features quad speakers with Dolby Atmos and long-lasting battery life.',
    image: 'oneplus-pad.jpg',
    specs: {
      display: '11.61" LCD 2.8K, 144Hz',
      ram: '8GB',
      storage: '128GB',
      battery: '9510mAh, 67W SuperVOOC',
      processor: 'MediaTek Dimensity 9000',
      camera: '13MP rear, 8MP front',
      connectivity: 'Wi-Fi 6, Bluetooth 5.3',
      os: 'Android 13, OxygenOS 13.1'
    }
  },
  {
    brand: 'Xiaomi',
    modelName: 'Xiaomi Pad 6',
    description: 'Feature-rich tablet with 11" high refresh rate display and Snapdragon performance. Ideal for entertainment and productivity with split-screen multitasking.',
    image: 'xiaomi-pad-6.jpg',
    specs: {
      display: '11" LCD 2.8K, 144Hz',
      ram: '8GB',
      storage: '256GB',
      battery: '8840mAh, 33W charging',
      processor: 'Snapdragon 870',
      camera: '13MP rear, 8MP front',
      connectivity: 'Wi-Fi 6, Bluetooth 5.2',
      os: 'Android 13, MIUI Pad 14'
    }
  },
  {
    brand: 'Lenovo',
    modelName: 'Lenovo Tab P12 Pro',
    description: 'Premium AMOLED tablet with productivity features. Includes Lenovo Precision Pen 3 and keyboard support for content creation.',
    image: 'lenovo-tab-p12-pro.jpg',
    specs: {
      display: '12.6" AMOLED 2.5K, 120Hz',
      ram: '8GB',
      storage: '256GB',
      battery: '10200mAh, 45W charging',
      processor: 'Snapdragon 870',
      camera: '13MP + 5MP dual rear',
      connectivity: 'Wi-Fi 6, Bluetooth 5.2',
      os: 'Android 12'
    }
  },
  {
    brand: 'Realme',
    modelName: 'Realme Pad 2',
    description: 'Affordable yet powerful tablet with 11.5" 2K display and quad speakers. Perfect for media consumption and casual gaming.',
    image: 'realme-pad-2.jpg',
    specs: {
      display: '11.5" LCD 2K, 120Hz',
      ram: '8GB',
      storage: '256GB',
      battery: '8360mAh, 33W charging',
      processor: 'MediaTek Helio G99',
      camera: '8MP rear, 8MP front',
      connectivity: 'Wi-Fi 5, Bluetooth 5.3',
      os: 'Android 13, Realme UI 4.0'
    }
  },
  {
    brand: 'Oppo',
    modelName: 'Oppo Pad Air',
    description: 'Lightweight tablet with vibrant 10.36" display and ColorOS features. Great for reading, browsing, and entertainment.',
    image: 'oppo-pad-air.jpg',
    specs: {
      display: '10.36" LCD 2K',
      ram: '6GB',
      storage: '128GB',
      battery: '7100mAh, 18W charging',
      processor: 'Snapdragon 680',
      camera: '8MP rear, 5MP front',
      connectivity: 'Wi-Fi 5, Bluetooth 5.1',
      os: 'Android 12, ColorOS 12'
    }
  },
  {
    brand: 'Honor',
    modelName: 'Honor Pad 8',
    description: 'Large screen tablet with eye comfort display and powerful speakers. Features MagicOS for enhanced productivity and entertainment.',
    image: 'honor-pad-8.jpg',
    specs: {
      display: '12" LCD 2K',
      ram: '6GB',
      storage: '128GB',
      battery: '7250mAh, 22.5W charging',
      processor: 'Snapdragon 680',
      camera: '5MP rear, 5MP front',
      connectivity: 'Wi-Fi 5, Bluetooth 5.1',
      os: 'Android 12, MagicOS 6.1'
    }
  },
  {
    brand: 'Amazon',
    modelName: 'Amazon Fire HD 10 (2023)',
    description: 'Budget-friendly tablet with Alexa integration and access to Amazon services. Perfect for reading, streaming, and smart home control.',
    image: 'amazon-fire-hd-10.jpg',
    specs: {
      display: '10.1" Full HD',
      ram: '3GB',
      storage: '64GB',
      battery: 'Up to 13 hours',
      processor: 'Octa-core 2.0 GHz',
      camera: '5MP rear, 2MP front',
      connectivity: 'Wi-Fi 5, Bluetooth 5.2',
      os: 'Fire OS 8'
    }
  }
];

// Function to generate random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Connect to MongoDB and seed products
async function seedTablets() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find Tablets category
    const category = await Category.findOne({ name: 'Tablets' });
    if (!category) {
      console.error('❌ Tablets category not found!');
      process.exit(1);
    }
    console.log(`📁 Found category: ${category.name} (ID: ${category._id})\n`);

    // Check for existing tablet products
    const existingProducts = await Product.find({ categoryID: category._id });
    console.log(`📊 Existing Tablets: ${existingProducts.length}`);

    let addedCount = 0;
    let skippedCount = 0;

    for (const tablet of tablets) {
      // Check if product already exists
      const exists = await Product.findOne({
        brand: tablet.brand,
        modelName: tablet.modelName,
        categoryID: category._id
      });

      if (exists) {
        console.log(`⏭️  Skipped: ${tablet.brand} ${tablet.modelName} (already exists)`);
        skippedCount++;
        continue;
      }

      // Generate random price between 7000 and 30000
      const price = getRandomNumber(7000, 30000);
      
      // Generate random stock between 8 and 15
      const stock = getRandomNumber(8, 15);

      // Create product object
      const productData = {
        brand: tablet.brand,
        modelName: tablet.modelName,
        description: tablet.description,
        price: price,
        discount: 0,
        stock: stock,
        categoryID: category._id,
        images: [`/uploadedimage/products/tablets/${tablet.image}`],
        specs: tablet.specs,
        createdByRole: 'admin',
        isApproved: true
      };

      // Save product
      const product = new Product(productData);
      await product.save();

      console.log(`✅ Added: ${tablet.brand} ${tablet.modelName}`);
      console.log(`   💰 Price: ₹${price} | 📦 Stock: ${stock} | 🖼️  Image: ${tablet.image}`);
      addedCount++;
    }

    console.log('\n' + '='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   ✅ Added: ${addedCount} products`);
    console.log(`   ⏭️  Skipped: ${skippedCount} products`);
    console.log(`   📦 Total Tablets: ${existingProducts.length + addedCount}`);
    console.log('='.repeat(60));

    // Verify the products
    const finalCount = await Product.countDocuments({ categoryID: category._id });
    console.log(`\n✅ Verification: ${finalCount} Tablets in database`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔒 Database connection closed');
  }
}

// Run the seeding function
seedTablets();
