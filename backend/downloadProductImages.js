import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Product images to download
const images = {
  smartwatches: [
    { name: 'apple-watch-series-9.jpg', url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800' },
    { name: 'samsung-galaxy-watch-6.jpg', url: 'https://images.unsplash.com/photo-1617625802912-cde586faf331?w=800' },
    { name: 'fitbit-sense-2.jpg', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800' },
    { name: 'garmin-venu-3.jpg', url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800' },
    { name: 'amazfit-gtr-4.jpg', url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800' },
    { name: 'fossil-gen-6.jpg', url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800' },
    { name: 'noise-colorfit-ultra-3.jpg', url: 'https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?w=800' },
    { name: 'fire-boltt-phoenix-ultra.jpg', url: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800' },
    { name: 'boat-wave-flex-connect.jpg', url: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=800' },
    { name: 'titan-smart-pro.jpg', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800' }
  ],
  tablets: [
    { name: 'ipad-pro-129.jpg', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' },
    { name: 'samsung-galaxy-tab-s9-ultra.jpg', url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800' },
    { name: 'microsoft-surface-pro-9.jpg', url: 'https://images.unsplash.com/photo-1585790050230-5dd28404f29a?w=800' },
    { name: 'lenovo-tab-p12-pro.jpg', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800' },
    { name: 'xiaomi-pad-6.jpg', url: 'https://images.unsplash.com/photo-1585790050230-5dd28404f29a?w=800' },
    { name: 'oneplus-pad.jpg', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' },
    { name: 'realme-pad-2.jpg', url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800' },
    { name: 'amazon-fire-hd-10.jpg', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800' },
    { name: 'oppo-pad-air.jpg', url: 'https://images.unsplash.com/photo-1585790050230-5dd28404f29a?w=800' },
    { name: 'honor-pad-8.jpg', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' }
  ],
  accessories: [
    { name: 'apple-airpods-pro-2.jpg', url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800' },
    { name: 'samsung-galaxy-buds2-pro.jpg', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800' },
    { name: 'sony-wh-1000xm5.jpg', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800' },
    { name: 'jbl-tune-230nc-tws.jpg', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800' },
    { name: 'boat-airdopes-161.jpg', url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800' },
    { name: 'anker-powercore-20000mah.jpg', url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800' },
    { name: 'belkin-boost-charge-pro.jpg', url: 'https://images.unsplash.com/photo-1591290619762-d4e80e50e3e1?w=800' },
    { name: 'spigen-ultra-hybrid-case.jpg', url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800' },
    { name: 'logitech-mx-master-3s.jpg', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800' },
    { name: 'portronics-konnect-l-12m-cable.jpg', url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800' }
  ]
};

const downloadAll = async () => {
  console.log('📥 Downloading product images...\n');
  
  for (const [category, items] of Object.entries(images)) {
    console.log(`📂 ${category.toUpperCase()}`);
    const dir = path.join(__dirname, 'uploadedimage', 'products', category);
    
    for (const item of items) {
      const filepath = path.join(dir, item.name);
      try {
        console.log(`  Downloading ${item.name}...`);
        await downloadImage(item.url, filepath);
        console.log(`  ✅ ${item.name}`);
      } catch (error) {
        console.error(`  ❌ Failed ${item.name}: ${error.message}`);
      }
    }
    console.log('');
  }
  
  console.log('🎉 Download complete!');
};

downloadAll();
