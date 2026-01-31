import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mobileshop';

// Smartwatch products with existing images in the smartwatches folder
const smartWatches = [
  {
    brand: 'Apple',
    modelName: 'Apple Watch Series 9 GPS',
    description: 'Advanced health and fitness features with always-on Retina display. Track workouts, monitor heart rate, blood oxygen, and ECG. Features crash detection and emergency SOS.',
    image: 'apple-watch-series-9.jpg',
    specs: {
      display: '1.9" LTPO OLED Retina',
      battery: 'Up to 18 hours',
      sensors: 'Heart Rate, ECG, Blood Oxygen, Temperature',
      connectivity: 'GPS, Bluetooth 5.3, Wi-Fi',
      waterResistance: '50m water resistant',
      compatibility: 'iOS 17 or later'
    }
  },
  {
    brand: 'Samsung',
    modelName: 'Samsung Galaxy Watch 6 Classic',
    description: 'Premium smartwatch with rotating bezel and comprehensive health tracking. Features advanced sleep coaching, body composition analysis, and personalized workout routines.',
    image: 'samsung-galaxy-watch-6.jpg',
    specs: {
      display: '1.5" Super AMOLED',
      battery: 'Up to 40 hours',
      sensors: 'BioActive Sensor, Temperature, Samsung BioActive',
      connectivity: 'GPS, Bluetooth 5.3, Wi-Fi, NFC',
      waterResistance: '5ATM + IP68',
      compatibility: 'Android 8.0 or higher'
    }
  },
  {
    brand: 'Garmin',
    modelName: 'Garmin Venu 3',
    description: 'GPS smartwatch with AMOLED display and advanced health monitoring. Features wheelchair mode, adaptive training plans, and meditation & sleep coaching.',
    image: 'garmin-venu-3.jpg',
    specs: {
      display: '1.4" AMOLED',
      battery: 'Up to 14 days',
      sensors: 'Heart Rate, Pulse Ox, Body Battery',
      connectivity: 'GPS, Bluetooth, ANT+, Wi-Fi',
      waterResistance: '5ATM',
      compatibility: 'iOS & Android'
    }
  },
  {
    brand: 'Amazfit',
    modelName: 'Amazfit GTR 4',
    description: 'Ultra-long battery life smartwatch with dual-band GPS and 150+ sports modes. Features 24/7 health monitoring and Amazon Alexa built-in.',
    image: 'amazfit-gtr-4.jpg',
    specs: {
      display: '1.43" AMOLED',
      battery: 'Up to 14 days',
      sensors: 'BioTracker 4.0 PPG, SpO2',
      connectivity: 'Dual-band GPS, Bluetooth 5.0, Wi-Fi',
      waterResistance: '5ATM',
      compatibility: 'iOS & Android'
    }
  },
  {
    brand: 'Fitbit',
    modelName: 'Fitbit Sense 2',
    description: 'Advanced health & fitness smartwatch with stress management tools. Features all-day body response tracking, ECG app, and sleep profile.',
    image: 'fitbit-sense-2.jpg',
    specs: {
      display: '1.58" AMOLED',
      battery: 'Up to 6+ days',
      sensors: 'Multi-path Heart Rate, EDA, SpO2, Skin Temperature',
      connectivity: 'GPS, Bluetooth 5.0, NFC',
      waterResistance: '5ATM',
      compatibility: 'iOS & Android'
    }
  },
  {
    brand: 'Fossil',
    modelName: 'Fossil Gen 6 Wellness Edition',
    description: 'Stylish Wear OS smartwatch with wellness-focused features. Tracks heart rate, SpO2, cardio fitness level, and offers personalized wellness recommendations.',
    image: 'fossil-gen-6.jpg',
    specs: {
      display: '1.28" AMOLED',
      battery: 'Up to 24 hours',
      sensors: 'Heart Rate, SpO2, Accelerometer',
      connectivity: 'GPS, Bluetooth 5.0, Wi-Fi, NFC',
      waterResistance: '3ATM',
      compatibility: 'Android 6.0+, iOS 14+'
    }
  },
  {
    brand: 'Noise',
    modelName: 'Noise ColorFit Ultra 3',
    description: 'Large AMOLED display smartwatch with 100+ sports modes and health tracking. Features Bluetooth calling, voice assistant, and smart DND.',
    image: 'noise-colorfit-ultra-3.jpg',
    specs: {
      display: '1.96" AMOLED',
      battery: 'Up to 7 days',
      sensors: 'Heart Rate, SpO2, Sleep Monitor',
      connectivity: 'Bluetooth 5.3, BT Calling',
      waterResistance: 'IP68',
      compatibility: 'iOS & Android'
    }
  },
  {
    brand: 'boAt',
    modelName: 'boAt Wave Flex Connect',
    description: 'Premium smartwatch with HD display and advanced calling chip. Features 700+ active modes, health suite with heart rate and SpO2 monitoring.',
    image: 'boat-wave-flex-connect.jpg',
    specs: {
      display: '1.83" HD Display',
      battery: 'Up to 7 days',
      sensors: 'Heart Rate, SpO2, Sleep Tracker',
      connectivity: 'Bluetooth 5.2, Advanced Calling',
      waterResistance: 'IP67',
      compatibility: 'iOS & Android'
    }
  },
  {
    brand: 'Fire-Boltt',
    modelName: 'Fire-Boltt Phoenix Ultra',
    description: 'Luxury smartwatch with Bluetooth calling and AI voice assistant. Features 1.39" display with 120+ sports modes and comprehensive health tracking.',
    image: 'fire-boltt-phoenix-ultra.jpg',
    specs: {
      display: '1.39" HD Display',
      battery: 'Up to 7 days',
      sensors: 'Heart Rate, SpO2, Blood Pressure',
      connectivity: 'Bluetooth Calling, Voice Assistant',
      waterResistance: 'IP67',
      compatibility: 'iOS & Android'
    }
  },
  {
    brand: 'Titan',
    modelName: 'Titan Smart Pro',
    description: 'Premium smartwatch with metallic finish and comprehensive health monitoring. Features always-on display, multiple watch faces, and advanced fitness tracking.',
    image: 'titan-smart-pro.jpg',
    specs: {
      display: '1.96" AMOLED Always On',
      battery: 'Up to 14 days',
      sensors: 'Heart Rate, SpO2, Stress Monitor',
      connectivity: 'Bluetooth Calling, GPS',
      waterResistance: 'IP68',
      compatibility: 'iOS & Android'
    }
  }
];

// Function to generate random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Connect to MongoDB and seed products
async function seedSmartWatches() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find Smart Watches category
    const category = await Category.findOne({ name: 'Smart Watches' });
    if (!category) {
      console.error('❌ Smart Watches category not found!');
      process.exit(1);
    }
    console.log(`📁 Found category: ${category.name} (ID: ${category._id})\n`);

    // Check for existing smartwatch products
    const existingProducts = await Product.find({ categoryID: category._id });
    console.log(`📊 Existing Smart Watches: ${existingProducts.length}`);

    let addedCount = 0;
    let skippedCount = 0;

    for (const watch of smartWatches) {
      // Check if product already exists
      const exists = await Product.findOne({
        brand: watch.brand,
        modelName: watch.modelName,
        categoryID: category._id
      });

      if (exists) {
        console.log(`⏭️  Skipped: ${watch.brand} ${watch.modelName} (already exists)`);
        skippedCount++;
        continue;
      }

      // Generate random price between 3000 and 10000
      const price = getRandomNumber(3000, 10000);
      
      // Generate random stock between 8 and 15
      const stock = getRandomNumber(8, 15);

      // Create product object
      const productData = {
        brand: watch.brand,
        modelName: watch.modelName,
        description: watch.description,
        price: price,
        discount: 0,
        stock: stock,
        categoryID: category._id,
        images: [`/uploadedimage/products/smartwatches/${watch.image}`],
        specs: watch.specs,
        createdByRole: 'admin',
        isApproved: true
      };

      // Save product
      const product = new Product(productData);
      await product.save();

      console.log(`✅ Added: ${watch.brand} ${watch.modelName}`);
      console.log(`   💰 Price: ₹${price} | 📦 Stock: ${stock} | 🖼️  Image: ${watch.image}`);
      addedCount++;
    }

    console.log('\n' + '='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   ✅ Added: ${addedCount} products`);
    console.log(`   ⏭️  Skipped: ${skippedCount} products`);
    console.log(`   📦 Total Smart Watches: ${existingProducts.length + addedCount}`);
    console.log('='.repeat(60));

    // Verify the products
    const finalCount = await Product.countDocuments({ categoryID: category._id });
    console.log(`\n✅ Verification: ${finalCount} Smart Watches in database`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔒 Database connection closed');
  }
}

// Run the seeding function
seedSmartWatches();
