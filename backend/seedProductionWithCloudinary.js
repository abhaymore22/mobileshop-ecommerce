import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cloudinary from './config/cloudinaryConfig.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

// Connect to production database
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Connected to MongoDB Atlas');

// Categories with image URLs from Unsplash
const categories = [
  {
    name: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    isActive: true
  },
  {
    name: 'Tablets',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    isActive: true
  },
  {
    name: 'Smartwatches',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    isActive: true
  },
  {
    name: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    isActive: true
  }
];

// Products with image URLs
const products = [
  // Smartphones
  {
    brand: 'Apple',
    modelName: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
    price: 999,
    discount: 5,
    stock: 50,
    imageUrls: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
      'https://images.unsplash.com/photo-1695048133268-b3b9c8f31e2a?w=800&q=80'
    ],
    specs: {
      display: '6.1-inch Super Retina XDR',
      processor: 'A17 Pro chip',
      ram: '8GB',
      storage: '256GB',
      camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      battery: '3274mAh'
    },
    categoryName: 'Smartphones'
  },
  {
    brand: 'Samsung',
    modelName: 'Galaxy S24 Ultra',
    description: 'Premium Android flagship with S Pen, advanced AI features, and 200MP camera',
    price: 1199,
    discount: 10,
    stock: 40,
    imageUrls: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80'
    ],
    specs: {
      display: '6.8-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '512GB',
      camera: '200MP Wide, 50MP Telephoto, 12MP Ultra Wide',
      battery: '5000mAh'
    },
    categoryName: 'Smartphones'
  },
  {
    brand: 'Google',
    modelName: 'Pixel 8 Pro',
    description: 'Google\'s flagship with advanced AI photography and pure Android experience',
    price: 899,
    discount: 8,
    stock: 35,
    imageUrls: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80'
    ],
    specs: {
      display: '6.7-inch LTPO OLED',
      processor: 'Google Tensor G3',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP Wide, 48MP Ultra Wide, 48MP Telephoto',
      battery: '5050mAh'
    },
    categoryName: 'Smartphones'
  },
  // Tablets
  {
    brand: 'Apple',
    modelName: 'iPad Pro 12.9"',
    description: 'Professional tablet with M2 chip and stunning Liquid Retina XDR display',
    price: 1099,
    discount: 5,
    stock: 30,
    imageUrls: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80'
    ],
    specs: {
      display: '12.9-inch Liquid Retina XDR',
      processor: 'Apple M2',
      ram: '8GB',
      storage: '256GB',
      camera: '12MP Wide, 10MP Ultra Wide',
      battery: '10758mAh'
    },
    categoryName: 'Tablets'
  },
  {
    brand: 'Samsung',
    modelName: 'Galaxy Tab S9 Ultra',
    description: 'Premium Android tablet with S Pen and large display',
    price: 1199,
    discount: 10,
    stock: 25,
    imageUrls: [
      'https://images.unsplash.com/photo-1585790050230-5dd28404f999?w=800&q=80'
    ],
    specs: {
      display: '14.6-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      ram: '12GB',
      storage: '512GB',
      camera: '13MP Wide, 8MP Ultra Wide',
      battery: '11200mAh'
    },
    categoryName: 'Tablets'
  },
  // Smartwatches
  {
    brand: 'Apple',
    modelName: 'Apple Watch Series 9',
    description: 'Advanced health and fitness tracking with always-on display',
    price: 399,
    discount: 5,
    stock: 60,
    imageUrls: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    ],
    specs: {
      display: '1.9-inch LTPO OLED',
      processor: 'S9 chip',
      battery: 'Up to 18 hours',
      connectivity: 'GPS, Cellular, WiFi, Bluetooth',
      sensors: 'Heart rate, ECG, Blood oxygen, Temperature'
    },
    categoryName: 'Smartwatches'
  },
  {
    brand: 'Samsung',
    modelName: 'Galaxy Watch 6',
    description: 'Feature-rich smartwatch with advanced health monitoring',
    price: 299,
    discount: 8,
    stock: 45,
    imageUrls: [
      'https://images.unsplash.com/photo-1617625802912-cde586faf331?w=800&q=80'
    ],
    specs: {
      display: '1.5-inch Super AMOLED',
      processor: 'Exynos W930',
      battery: 'Up to 40 hours',
      connectivity: 'GPS, LTE, WiFi, Bluetooth',
      sensors: 'Heart rate, ECG, Body composition'
    },
    categoryName: 'Smartwatches'
  },
  // Accessories
  {
    brand: 'Apple',
    modelName: 'AirPods Pro (2nd Gen)',
    description: 'Premium wireless earbuds with active noise cancellation',
    price: 249,
    discount: 10,
    stock: 100,
    imageUrls: [
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80'
    ],
    specs: {
      type: 'In-ear wireless earbuds',
      features: 'Active Noise Cancellation, Spatial Audio',
      battery: 'Up to 6 hours (ANC on)',
      chip: 'H2 chip',
      connectivity: 'Bluetooth 5.3'
    },
    categoryName: 'Accessories'
  },
  {
    brand: 'Anker',
    modelName: 'PowerCore 20000mAh',
    description: 'High-capacity portable charger with fast charging',
    price: 49,
    discount: 15,
    stock: 80,
    imageUrls: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80'
    ],
    specs: {
      capacity: '20000mAh',
      output: 'USB-C 18W, USB-A 12W',
      input: 'USB-C 18W',
      weight: '356g',
      features: 'PowerIQ, VoltageBoost'
    },
    categoryName: 'Accessories'
  }
];

// Upload image to Cloudinary
const uploadToCloudinary = async (imageUrl, folder) => {
  try {
    console.log(`   📤 Uploading image from ${imageUrl.substring(0, 50)}...`);
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: `mobileshop/${folder}`,
      transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
    });
    console.log(`   ✅ Uploaded to Cloudinary: ${result.secure_url.substring(0, 60)}...`);
    return result.secure_url;
  } catch (error) {
    console.error(`   ❌ Failed to upload image: ${error.message}`);
    return null;
  }
};

// Seed categories
console.log('\n🏷️  Seeding Categories...');
const categoryMap = {};

for (const cat of categories) {
  try {
    // Check if category exists
    let category = await Category.findOne({ name: cat.name });
    
    if (category) {
      console.log(`   ⏭️  ${cat.name} already exists, skipping...`);
      categoryMap[cat.name] = category._id;
      continue;
    }

    // Upload image to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(cat.imageUrl, 'categories');
    
    // Create category
    category = await Category.create({
      name: cat.name,
      isActive: cat.isActive,
      imagePath: cloudinaryUrl || ''
    });

    categoryMap[cat.name] = category._id;
    console.log(`   ✅ Created: ${cat.name}`);
  } catch (error) {
    console.error(`   ❌ Error creating ${cat.name}:`, error.message);
  }
}

// Seed products
console.log('\n📱 Seeding Products...');

for (const prod of products) {
  try {
    // Check if product exists
    const existingProduct = await Product.findOne({ 
      brand: prod.brand, 
      modelName: prod.modelName 
    });
    
    if (existingProduct) {
      console.log(`   ⏭️  ${prod.brand} ${prod.modelName} already exists, skipping...`);
      continue;
    }

    // Upload images to Cloudinary
    const cloudinaryImages = [];
    for (const imageUrl of prod.imageUrls) {
      const cloudinaryUrl = await uploadToCloudinary(imageUrl, 'products');
      if (cloudinaryUrl) {
        cloudinaryImages.push(cloudinaryUrl);
      }
    }

    // Get category ID
    const categoryID = categoryMap[prod.categoryName];
    if (!categoryID) {
      console.log(`   ❌ Category ${prod.categoryName} not found for ${prod.modelName}`);
      continue;
    }

    // Create product
    await Product.create({
      brand: prod.brand,
      modelName: prod.modelName,
      description: prod.description,
      price: prod.price,
      discount: prod.discount,
      stock: prod.stock,
      categoryID: categoryID,
      images: cloudinaryImages,
      specs: prod.specs,
      isApproved: true,
      isActive: true,
      createdByRole: 'admin'
    });

    console.log(`   ✅ Created: ${prod.brand} ${prod.modelName}`);
  } catch (error) {
    console.error(`   ❌ Error creating ${prod.brand} ${prod.modelName}:`, error.message);
  }
}

console.log('\n🎉 Seeding completed!');
console.log('\n📊 Summary:');
const categoryCount = await Category.countDocuments();
const productCount = await Product.countDocuments();
console.log(`   Categories: ${categoryCount}`);
console.log(`   Products: ${productCount}`);

await mongoose.connection.close();
console.log('\n✅ Database connection closed');
