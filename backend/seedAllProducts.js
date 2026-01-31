import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';

const seedAllProducts = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mobileshop');
    console.log('📦 Connected to MongoDB');

    // Get categories
    const smartPhoneCategory = await Category.findOne({ name: 'Smartphones' });
    const smartWatchesCategory = await Category.findOne({ name: 'Smart Watches' });
    const tabletsCategory = await Category.findOne({ name: 'Tablets' });
    const accessoriesCategory = await Category.findOne({ name: 'Accessories' });

    if (!smartPhoneCategory || !smartWatchesCategory || !tabletsCategory || !accessoriesCategory) {
      console.error('❌ Categories not found! Run seedCategories.js first');
      process.exit(1);
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products\n');

    // Smartphones (using local images from your existing seed)
    const smartphones = [
      { brand: 'Samsung', modelName: 'Samsung Galaxy S24 Ultra', price: 84999, description: 'Flagship smartphone with 200MP camera', stock: 50, images: ['/uploadedimage/products/samsung-samsung-galaxy-s24-ultra.jpg'], specs: { ram: '12GB', storage: '256GB', color: 'Mixed' } },
      { brand: 'Samsung', modelName: 'Samsung Galaxy S24+', price: 74999, description: 'Premium smartphone', stock: 60, images: ['/uploadedimage/products/samsung-samsung-galaxy-s24-.jpg'], specs: { ram: '8GB', storage: '256GB', color: 'Mixed' } },
      { brand: 'Apple', modelName: 'iPhone 15 Pro Max', price: 84999, description: 'Ultimate iPhone', stock: 45, images: ['/uploadedimage/products/apple-iphone-15-pro-max.jpg'], specs: { ram: '8GB', storage: '256GB', color: 'Mixed' } },
      { brand: 'Apple', modelName: 'iPhone 15 Pro', price: 74999, description: 'Pro iPhone', stock: 55, images: ['/uploadedimage/products/apple-iphone-15-pro.jpg'], specs: { ram: '8GB', storage: '128GB', color: 'Mixed' } },
      { brand: 'Xiaomi', modelName: 'Xiaomi 14 Ultra', price: 79999, description: 'Flagship with Leica cameras', stock: 40, images: ['/uploadedimage/products/xiaomi-xiaomi-14-ultra.jpg'], specs: { ram: '16GB', storage: '512GB', color: 'Mixed' } }
    ];

    // Smart Watches
    const smartwatches = [
      { brand: 'Apple', modelName: 'Apple Watch Series 9', price: 42999, description: 'Latest Apple Watch with advanced health features', stock: 50, images: ['/uploadedimage/products/smartwatches/apple-watch-series-9.jpg'], specs: { displaySize: '45mm', battery: '18 hours', waterResistance: '50m', color: 'Mixed' } },
      { brand: 'Samsung', modelName: 'Samsung Galaxy Watch 6', price: 28999, description: 'Premium smartwatch with Wear OS', stock: 60, images: ['/uploadedimage/products/smartwatches/samsung-galaxy-watch-6.jpg'], specs: { displaySize: '44mm', battery: '40 hours', waterResistance: '50m', color: 'Mixed' } },
      { brand: 'Fitbit', modelName: 'Fitbit Sense 2', price: 24999, description: 'Health-focused smartwatch', stock: 45, images: ['/uploadedimage/products/smartwatches/fitbit-sense-2.jpg'], specs: { displaySize: '40mm', battery: '6+ days', waterResistance: '50m', color: 'Mixed' } },
      { brand: 'Garmin', modelName: 'Garmin Venu 3', price: 34999, description: 'GPS smartwatch for athletes', stock: 35, images: ['/uploadedimage/products/smartwatches/garmin-venu-3.jpg'], specs: { displaySize: '45mm', battery: '14 days', waterResistance: '50m', color: 'Mixed' } },
      { brand: 'Amazfit', modelName: 'Amazfit GTR 4', price: 16999, description: 'Affordable smartwatch with long battery', stock: 70, images: ['/uploadedimage/products/smartwatches/amazfit-gtr-4.jpg'], specs: { displaySize: '46mm', battery: '14 days', waterResistance: '50m', color: 'Mixed' } },
      { brand: 'Fossil', modelName: 'Fossil Gen 6', price: 19999, description: 'Stylish Wear OS smartwatch', stock: 40, images: ['/uploadedimage/products/smartwatches/fossil-gen-6.jpg'], specs: { displaySize: '44mm', battery: '24 hours', waterResistance: '30m', color: 'Mixed' } },
      { brand: 'Noise', modelName: 'Noise ColorFit Ultra 3', price: 3999, description: 'Budget smartwatch with AMOLED display', stock: 100, images: ['/uploadedimage/products/smartwatches/noise-colorfit-ultra-3.jpg'], specs: { displaySize: '1.96"', battery: '7 days', waterResistance: 'IP68', color: 'Mixed' } },
      { brand: 'Fire-Boltt', modelName: 'Fire-Boltt Phoenix Ultra', price: 4499, description: 'Large display smartwatch', stock: 90, images: ['/uploadedimage/products/smartwatches/fire-boltt-phoenix-ultra.jpg'], specs: { displaySize: '1.96"', battery: '7 days', waterResistance: 'IP67', color: 'Mixed' } },
      { brand: 'boAt', modelName: 'boAt Wave Flex Connect', price: 5999, description: 'Feature-rich smartwatch', stock: 85, images: ['/uploadedimage/products/smartwatches/boat-wave-flex-connect.jpg'], specs: { displaySize: '1.83"', battery: '7 days', waterResistance: 'IP68', color: 'Mixed' } },
      { brand: 'Titan', modelName: 'Titan Smart Pro', price: 12999, description: 'Premium Indian brand smartwatch', stock: 50, images: ['/uploadedimage/products/smartwatches/titan-smart-pro.jpg'], specs: { displaySize: '1.39"', battery: '14 days', waterResistance: 'IP68', color: 'Mixed' } }
    ];

    // Tablets
    const tablets = [
      { brand: 'Apple', modelName: 'iPad Pro 12.9"', price: 109999, description: 'Pro-level tablet with M2 chip', stock: 30, images: ['/uploadedimage/products/tablets/ipad-pro-129.jpg'], specs: { displaySize: '12.9"', storage: '256GB', processor: 'M2', color: 'Mixed' } },
      { brand: 'Samsung', modelName: 'Samsung Galaxy Tab S9 Ultra', price: 99999, description: 'Ultra-premium Android tablet', stock: 25, images: ['/uploadedimage/products/tablets/samsung-galaxy-tab-s9-ultra.jpg'], specs: { displaySize: '14.6"', storage: '256GB', processor: 'Snapdragon 8 Gen 2', color: 'Mixed' } },
      { brand: 'Microsoft', modelName: 'Microsoft Surface Pro 9', price: 89999, description: 'Versatile 2-in-1 tablet/laptop', stock: 35, images: ['/uploadedimage/products/tablets/microsoft-surface-pro-9.jpg'], specs: { displaySize: '13"', storage: '256GB', processor: 'Intel i5', color: 'Mixed' } },
      { brand: 'Lenovo', modelName: 'Lenovo Tab P12 Pro', price: 54999, description: 'Premium Android tablet', stock: 40, images: ['/uploadedimage/products/tablets/lenovo-tab-p12-pro.jpg'], specs: { displaySize: '12.6"', storage: '256GB', processor: 'Snapdragon 870', color: 'Mixed' } },
      { brand: 'Xiaomi', modelName: 'Xiaomi Pad 6', price: 26999, description: 'Affordable flagship tablet', stock: 50, images: ['/uploadedimage/products/tablets/xiaomi-pad-6.jpg'], specs: { displaySize: '11"', storage: '128GB', processor: 'Snapdragon 870', color: 'Mixed' } },
      { brand: 'OnePlus', modelName: 'OnePlus Pad', price: 37999, description: 'Smooth performance tablet', stock: 45, images: ['/uploadedimage/products/tablets/oneplus-pad.jpg'], specs: { displaySize: '11.61"', storage: '128GB', processor: 'Dimensity 9000', color: 'Mixed' } },
      { brand: 'Realme', modelName: 'Realme Pad 2', price: 19999, description: 'Budget tablet with premium features', stock: 60, images: ['/uploadedimage/products/tablets/realme-pad-2.jpg'], specs: { displaySize: '11.5"', storage: '128GB', processor: 'MediaTek Helio G99', color: 'Mixed' } },
      { brand: 'Amazon', modelName: 'Amazon Fire HD 10', price: 14999, description: 'Affordable entertainment tablet', stock: 80, images: ['/uploadedimage/products/tablets/amazon-fire-hd-10.jpg'], specs: { displaySize: '10.1"', storage: '64GB', processor: 'MediaTek MT8183', color: 'Mixed' } },
      { brand: 'Oppo', modelName: 'Oppo Pad Air', price: 16999, description: 'Slim and light tablet', stock: 55, images: ['/uploadedimage/products/tablets/oppo-pad-air.jpg'], specs: { displaySize: '10.36"', storage: '64GB', processor: 'Snapdragon 680', color: 'Mixed' } },
      { brand: 'Honor', modelName: 'Honor Pad 8', price: 18999, description: 'Mid-range tablet', stock: 50, images: ['/uploadedimage/products/tablets/honor-pad-8.jpg'], specs: { displaySize: '12"', storage: '128GB', processor: 'Snapdragon 680', color: 'Mixed' } }
    ];

    // Accessories
    const accessories = [
      { brand: 'Apple', modelName: 'AirPods Pro 2', price: 24999, description: 'Premium wireless earbuds with ANC', stock: 100, images: ['/uploadedimage/products/accessories/apple-airpods-pro-2.jpg'], specs: { type: 'TWS Earbuds', battery: '30 hours', features: 'Active Noise Cancellation', color: 'White' } },
      { brand: 'Samsung', modelName: 'Galaxy Buds2 Pro', price: 16999, description: 'Premium buds with 360 Audio', stock: 90, images: ['/uploadedimage/products/accessories/samsung-galaxy-buds2-pro.jpg'], specs: { type: 'TWS Earbuds', battery: '29 hours', features: 'ANC, 360 Audio', color: 'Mixed' } },
      { brand: 'Sony', modelName: 'WH-1000XM5', price: 29999, description: 'Industry-leading noise cancellation headphones', stock: 60, images: ['/uploadedimage/products/accessories/sony-wh-1000xm5.jpg'], specs: { type: 'Over-Ear Headphones', battery: '30 hours', features: 'Best-in-class ANC', color: 'Black' } },
      { brand: 'JBL', modelName: 'Tune 230NC TWS', price: 4999, description: 'Affordable TWS with ANC', stock: 120, images: ['/uploadedimage/products/accessories/jbl-tune-230nc-tws.jpg'], specs: { type: 'TWS Earbuds', battery: '40 hours', features: 'ANC', color: 'Mixed' } },
      { brand: 'boAt', modelName: 'Airdopes 161', price: 1299, description: 'Budget TWS earbuds', stock: 200, images: ['/uploadedimage/products/accessories/boat-airdopes-161.jpg'], specs: { type: 'TWS Earbuds', battery: '17 hours', features: 'IPX5', color: 'Mixed' } },
      { brand: 'Anker', modelName: 'PowerCore 20000mAh', price: 3999, description: 'High-capacity power bank', stock: 150, images: ['/uploadedimage/products/accessories/anker-powercore-20000mah.jpg'], specs: { type: 'Power Bank', capacity: '20000mAh', features: 'Fast Charging', color: 'Black' } },
      { brand: 'Belkin', modelName: 'Boost Charge Pro', price: 4999, description: '3-in-1 wireless charger', stock: 80, images: ['/uploadedimage/products/accessories/belkin-boost-charge-pro.jpg'], specs: { type: 'Wireless Charger', wattage: '15W', features: '3-in-1', color: 'White' } },
      { brand: 'Spigen', modelName: 'Ultra Hybrid Case', price: 1499, description: 'Clear protective case', stock: 250, images: ['/uploadedimage/products/accessories/spigen-ultra-hybrid-case.jpg'], specs: { type: 'Phone Case', material: 'TPU + PC', features: 'Drop Protection', color: 'Clear' } },
      { brand: 'Logitech', modelName: 'MX Master 3S', price: 8999, description: 'Premium wireless mouse', stock: 70, images: ['/uploadedimage/products/accessories/logitech-mx-master-3s.jpg'], specs: { type: 'Mouse', connectivity: 'Bluetooth + USB', features: 'Ergonomic', color: 'Black' } },
      { brand: 'Portronics', modelName: 'Konnect L 1.2m Cable', price: 299, description: 'Durable USB-C cable', stock: 300, images: ['/uploadedimage/products/accessories/portronics-konnect-l-12m-cable.jpg'], specs: { type: 'Cable', length: '1.2m', features: 'Fast Charging', color: 'Mixed' } }
    ];

    let totalCreated = 0;

    // Insert smartphones
    console.log('📱 Seeding smartphones...');
    for (const phone of smartphones) {
      await Product.create({ ...phone, categoryID: smartPhoneCategory._id, createdByRole: 'admin', isApproved: true });
      totalCreated++;
    }
    console.log(`✅ Created ${smartphones.length} smartphones\n`);

    // Insert smartwatches
    console.log('⌚ Seeding smartwatches...');
    for (const watch of smartwatches) {
      await Product.create({ ...watch, categoryID: smartWatchesCategory._id, createdByRole: 'admin', isApproved: true });
      totalCreated++;
    }
    console.log(`✅ Created ${smartwatches.length} smartwatches\n`);

    // Insert tablets
    console.log('📱 Seeding tablets...');
    for (const tablet of tablets) {
      await Product.create({ ...tablet, categoryID: tabletsCategory._id, createdByRole: 'admin', isApproved: true });
      totalCreated++;
    }
    console.log(`✅ Created ${tablets.length} tablets\n`);

    // Insert accessories
    console.log('🎧 Seeding accessories...');
    for (const accessory of accessories) {
      await Product.create({ ...accessory, categoryID: accessoriesCategory._id, createdByRole: 'admin', isApproved: true });
      totalCreated++;
    }
    console.log(`✅ Created ${accessories.length} accessories\n`);

    console.log('═══════════════════════════════════════');
    console.log(`🎉 Successfully seeded ${totalCreated} products!`);
    console.log('═══════════════════════════════════════');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n📦 Database connection closed');
  }
};

seedAllProducts();
