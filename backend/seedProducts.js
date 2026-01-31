import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import Category from './models/Category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Product data for each category
const productsByCategory = {
  'Samsung': [
    { name: 'Samsung Galaxy S24 Ultra', price: 84999, description: 'Flagship smartphone with 200MP camera, S Pen, and powerful performance', stock: 50, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.8" Dynamic AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '200MP + 50MP + 12MP + 10MP', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' },
    { name: 'Samsung Galaxy S24+', price: 74999, description: 'Premium smartphone with excellent camera system and vibrant display', stock: 60, ram: '8GB', storage: '256GB', battery: '4900mAh', display: '6.7" Dynamic AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 12MP + 10MP', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80' },
    { name: 'Samsung Galaxy S24', price: 62999, description: 'Compact flagship with powerful performance and AI features', stock: 75, ram: '8GB', storage: '128GB', battery: '4000mAh', display: '6.2" Dynamic AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 12MP + 10MP', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { name: 'Samsung Galaxy Z Fold 5', price: 79999, description: 'Foldable smartphone with cutting-edge technology and multitasking capabilities', stock: 30, ram: '12GB', storage: '512GB', battery: '4400mAh', display: '7.6" Foldable AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '50MP + 12MP + 10MP', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80' },
    { name: 'Samsung Galaxy Z Flip 5', price: 54999, description: 'Stylish flip phone with compact design and powerful features', stock: 40, ram: '8GB', storage: '256GB', battery: '3700mAh', display: '6.7" Foldable AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '12MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' },
    { name: 'Samsung Galaxy A54 5G', price: 29999, description: 'Mid-range powerhouse with excellent battery life and 5G connectivity', stock: 100, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.4" Super AMOLED', processor: 'Exynos 1380', camera: '50MP + 12MP + 5MP', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' },
    { name: 'Samsung Galaxy A34 5G', price: 22999, description: 'Affordable 5G phone with great display and long battery life', stock: 120, ram: '6GB', storage: '128GB', battery: '5000mAh', display: '6.6" Super AMOLED', processor: 'MediaTek Dimensity 1080', camera: '48MP + 8MP + 5MP', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { name: 'Samsung Galaxy M54 5G', price: 26999, description: 'Budget-friendly with flagship features and massive battery', stock: 90, ram: '8GB', storage: '128GB', battery: '6000mAh', display: '6.7" Super AMOLED Plus', processor: 'Exynos 1380', camera: '108MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80' },
    { name: 'Samsung Galaxy F54 5G', price: 19999, description: 'Value smartphone with good performance and camera', stock: 110, ram: '8GB', storage: '128GB', battery: '6000mAh', display: '6.7" Super AMOLED Plus', processor: 'Exynos 1380', camera: '108MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' },
    { name: 'Samsung Galaxy S23 FE', price: 42999, description: 'Fan Edition with flagship features at mid-range price', stock: 70, ram: '8GB', storage: '128GB', battery: '4500mAh', display: '6.4" Dynamic AMOLED', processor: 'Exynos 2200', camera: '50MP + 12MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' }
  ],
  'Apple': [
    { name: 'iPhone 15 Pro Max', price: 84999, description: 'Ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system', stock: 45, ram: '8GB', storage: '256GB', battery: '4422mAh', display: '6.7" Super Retina XDR', processor: 'A17 Pro', camera: '48MP + 12MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80' },
    { name: 'iPhone 15 Pro', price: 74999, description: 'Pro iPhone with titanium finish and professional photography features', stock: 55, ram: '8GB', storage: '128GB', battery: '3274mAh', display: '6.1" Super Retina XDR', processor: 'A17 Pro', camera: '48MP + 12MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' },
    { name: 'iPhone 15 Plus', price: 67999, description: 'Large display iPhone with excellent battery life', stock: 60, ram: '6GB', storage: '128GB', battery: '4383mAh', display: '6.7" Super Retina XDR', processor: 'A16 Bionic', camera: '48MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80' },
    { name: 'iPhone 15', price: 59999, description: 'Standard iPhone with Dynamic Island and improved cameras', stock: 80, ram: '6GB', storage: '128GB', battery: '3349mAh', display: '6.1" Super Retina XDR', processor: 'A16 Bionic', camera: '48MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80' },
    { name: 'iPhone 14 Pro Max', price: 69999, description: 'Previous gen Pro Max with excellent performance', stock: 35, ram: '6GB', storage: '256GB', battery: '4323mAh', display: '6.7" Super Retina XDR', processor: 'A16 Bionic', camera: '48MP + 12MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&q=80' },
    { name: 'iPhone 14 Pro', price: 58999, description: 'Pro model with always-on display and Dynamic Island', stock: 40, ram: '6GB', storage: '128GB', battery: '3200mAh', display: '6.1" Super Retina XDR', processor: 'A16 Bionic', camera: '48MP + 12MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1632633728024-e1fd4bef561a?w=800&q=80' },
    { name: 'iPhone 14 Plus', price: 52999, description: 'Larger iPhone 14 with extended battery life', stock: 50, ram: '6GB', storage: '128GB', battery: '4325mAh', display: '6.7" Super Retina XDR', processor: 'A15 Bionic', camera: '12MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1632633728024-e1fd4bef561a?w=800&q=80' },
    { name: 'iPhone 14', price: 46999, description: 'Reliable iPhone with great cameras and performance', stock: 65, ram: '6GB', storage: '128GB', battery: '3279mAh', display: '6.1" Super Retina XDR', processor: 'A15 Bionic', camera: '12MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80' },
    { name: 'iPhone 13', price: 39999, description: 'Still powerful iPhone with excellent value', stock: 70, ram: '4GB', storage: '128GB', battery: '3240mAh', display: '6.1" Super Retina XDR', processor: 'A15 Bionic', camera: '12MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&q=80' },
    { name: 'iPhone SE (2024)', price: 32999, description: 'Compact and affordable iPhone with powerful A15 chip', stock: 90, ram: '4GB', storage: '64GB', battery: '2018mAh', display: '4.7" Retina HD', processor: 'A15 Bionic', camera: '12MP', imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80' }
  ],
  'Xiaomi': [
    { name: 'Xiaomi 14 Ultra', price: 79999, description: 'Flagship with Leica cameras and exceptional performance', stock: 40, ram: '16GB', storage: '512GB', battery: '5000mAh', display: '6.73" AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 50MP + 50MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { name: 'Xiaomi 14 Pro', price: 64999, description: 'Pro smartphone with Leica optics and premium build', stock: 50, ram: '12GB', storage: '256GB', battery: '4880mAh', display: '6.73" AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 50MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' },
    { name: 'Xiaomi 14', price: 54999, description: 'Compact flagship with powerful specs', stock: 65, ram: '12GB', storage: '256GB', battery: '4610mAh', display: '6.36" AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 50MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { name: 'Xiaomi 13T Pro', price: 46999, description: 'Performance flagship with MediaTek Dimensity', stock: 70, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Dimensity 9200+', camera: '50MP + 50MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' },
    { name: 'Xiaomi 13T', price: 36999, description: 'Mid-range flagship with excellent value', stock: 80, ram: '8GB', storage: '256GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Dimensity 8200 Ultra', camera: '50MP + 50MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80' },
    { name: 'Redmi Note 13 Pro+', price: 26999, description: 'Note series flagship with 200MP camera', stock: 100, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Dimensity 7200 Ultra', camera: '200MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' },
    { name: 'Redmi Note 13 Pro', price: 19999, description: 'Pro Note with excellent display and cameras', stock: 120, ram: '8GB', storage: '256GB', battery: '5100mAh', display: '6.67" AMOLED', processor: 'Snapdragon 7s Gen 2', camera: '200MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' },
    { name: 'Redmi Note 13', price: 14999, description: 'Affordable Note with good all-round performance', stock: 150, ram: '6GB', storage: '128GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Snapdragon 685', camera: '108MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' },
    { name: 'POCO X6 Pro', price: 24999, description: 'Performance-focused with flagship specs at mid-range price', stock: 90, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Dimensity 8300 Ultra', camera: '64MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' },
    { name: 'POCO F6', price: 29999, description: 'Flagship killer with exceptional performance', stock: 75, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Snapdragon 8s Gen 3', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80' }
  ],
  'OnePlus': [
    { name: 'OnePlus 12', price: 64999, description: 'Flagship with Hasselblad cameras and ultra-fast charging', stock: 50, ram: '16GB', storage: '256GB', battery: '5400mAh', display: '6.82" AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 64MP + 48MP', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { name: 'OnePlus 12R', price: 44999, description: 'Value flagship with excellent performance', stock: 65, ram: '12GB', storage: '256GB', battery: '5500mAh', display: '6.78" AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' },
    { name: 'OnePlus 11', price: 52999, description: 'Previous flagship with Hasselblad partnership', stock: 55, ram: '16GB', storage: '256GB', battery: '5000mAh', display: '6.7" AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '50MP + 48MP + 32MP', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' },
    { name: 'OnePlus Open', price: 79999, description: 'Foldable flagship with premium design', stock: 25, ram: '16GB', storage: '512GB', battery: '4805mAh', display: '7.82" Foldable AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '48MP + 64MP + 48MP', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { name: 'OnePlus Nord 4', price: 27999, description: 'Mid-range with metal unibody design', stock: 80, ram: '8GB', storage: '256GB', battery: '5500mAh', display: '6.74" AMOLED', processor: 'Snapdragon 7+ Gen 3', camera: '50MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' },
    { name: 'OnePlus Nord CE 4', price: 21999, description: 'Affordable Nord with good performance', stock: 90, ram: '8GB', storage: '128GB', battery: '5500mAh', display: '6.7" AMOLED', processor: 'Snapdragon 7 Gen 3', camera: '50MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80' },
    { name: 'OnePlus Nord 3', price: 32999, description: 'Previous Nord flagship with MediaTek power', stock: 70, ram: '16GB', storage: '256GB', battery: '5000mAh', display: '6.74" AMOLED', processor: 'Dimensity 9000', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' },
    { name: 'OnePlus 11R', price: 38999, description: 'Value flagship from previous generation', stock: 60, ram: '16GB', storage: '256GB', battery: '5000mAh', display: '6.74" AMOLED', processor: 'Snapdragon 8+ Gen 1', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' },
    { name: 'OnePlus 10T', price: 34999, description: 'Fast-charging flagship at great price', stock: 55, ram: '16GB', storage: '256GB', battery: '4800mAh', display: '6.7" AMOLED', processor: 'Snapdragon 8+ Gen 1', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' },
    { name: 'OnePlus Nord CE 3 Lite', price: 16999, description: 'Budget-friendly with long battery life', stock: 110, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.72" LCD', processor: 'Snapdragon 695', camera: '108MP + 2MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80' }
  ],
  'Oppo': [
    { name: 'Oppo Find X7 Ultra', price: 74999, description: 'Ultra-premium with dual periscope cameras', stock: 35, ram: '16GB', storage: '512GB', battery: '5000mAh', display: '6.82" AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 50MP + 50MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' },
    { name: 'Oppo Find X7 Pro', price: 59999, description: 'Pro flagship with Hasselblad cameras', stock: 45, ram: '16GB', storage: '256GB', battery: '5000mAh', display: '6.78" AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 50MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' },
    { name: 'Oppo Find X7', price: 48999, description: 'Standard flagship with excellent cameras', stock: 55, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.78" AMOLED', processor: 'Dimensity 9300', camera: '50MP + 50MP + 64MP', imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' },
    { name: 'Oppo Reno 11 Pro', price: 38999, description: 'Reno flagship with portrait features', stock: 60, ram: '12GB', storage: '256GB', battery: '4700mAh', display: '6.74" AMOLED', processor: 'Snapdragon 8+ Gen 1', camera: '50MP + 32MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80' },
    { name: 'Oppo Reno 11', price: 27999, description: 'Mid-range Reno with good cameras', stock: 75, ram: '8GB', storage: '256GB', battery: '5000mAh', display: '6.7" AMOLED', processor: 'Dimensity 8200', camera: '50MP + 32MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' },
    { name: 'Oppo A79 5G', price: 19999, description: 'Affordable 5G with good display', stock: 100, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.72" LCD', processor: 'Dimensity 6020', camera: '50MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' },
    { name: 'Oppo A59 5G', price: 14999, description: 'Budget 5G smartphone', stock: 120, ram: '6GB', storage: '128GB', battery: '5000mAh', display: '6.56" LCD', processor: 'Dimensity 6020', camera: '50MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { name: 'Oppo F25 Pro', price: 22999, description: 'F-series with focus on design and cameras', stock: 85, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.7" AMOLED', processor: 'Dimensity 7050', camera: '64MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { name: 'Oppo K12', price: 18999, description: 'K-series with gaming focus', stock: 95, ram: '8GB', storage: '256GB', battery: '5500mAh', display: '6.7" AMOLED', processor: 'Snapdragon 7 Gen 1', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' },
    { name: 'Oppo Find N3', price: 79999, description: 'Premium foldable with versatile cameras', stock: 30, ram: '16GB', storage: '512GB', battery: '4805mAh', display: '7.82" Foldable AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '48MP + 48MP + 64MP', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80' }
  ],
  'Vivo': [
    { name: 'Vivo X100 Pro', price: 69999, description: 'Flagship with Zeiss optics and powerful performance', stock: 45, ram: '16GB', storage: '512GB', battery: '5400mAh', display: '6.78" AMOLED', processor: 'Dimensity 9300', camera: '50MP + 50MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' },
    { name: 'Vivo X100', price: 57999, description: 'Flagship with excellent camera system', stock: 55, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.78" AMOLED', processor: 'Dimensity 9300', camera: '50MP + 64MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' },
    { name: 'Vivo X90 Pro', price: 61999, description: 'Previous gen pro with Zeiss cameras', stock: 40, ram: '12GB', storage: '256GB', battery: '4870mAh', display: '6.78" AMOLED', processor: 'Dimensity 9200', camera: '50MP + 50MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80' },
    { name: 'Vivo V30 Pro', price: 39999, description: 'V-series flagship with focus on portraits', stock: 65, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.78" AMOLED', processor: 'Dimensity 8200', camera: '50MP + 50MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' },
    { name: 'Vivo V30', price: 31999, description: 'Mid-range with excellent selfie camera', stock: 75, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.78" AMOLED', processor: 'Snapdragon 7 Gen 3', camera: '50MP + 50MP', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' },
    { name: 'Vivo T3 Pro', price: 24999, description: 'T-series with gaming capabilities', stock: 85, ram: '8GB', storage: '256GB', battery: '5500mAh', display: '6.77" AMOLED', processor: 'Snapdragon 7 Gen 3', camera: '50MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' },
    { name: 'Vivo T3', price: 19999, description: 'Affordable T-series with good performance', stock: 100, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Dimensity 7200', camera: '50MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { name: 'Vivo Y200 Pro', price: 17999, description: 'Y-series with balanced features', stock: 110, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.78" AMOLED', processor: 'Snapdragon 695', camera: '64MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { name: 'Vivo Y100', price: 14999, description: 'Budget smartphone with AMOLED display', stock: 130, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Dimensity 900', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' },
    { name: 'Vivo Y56 5G', price: 11999, description: 'Affordable 5G entry-level phone', stock: 150, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.58" LCD', processor: 'Dimensity 700', camera: '50MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80' }
  ],
  'Realme': [
    { name: 'Realme GT 5 Pro', price: 49999, description: 'Flagship with Snapdragon 8 Gen 3 power', stock: 50, ram: '16GB', storage: '512GB', battery: '5400mAh', display: '6.78" AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 50MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' },
    { name: 'Realme GT 5', price: 42999, description: 'Performance flagship with fast charging', stock: 60, ram: '16GB', storage: '256GB', battery: '5240mAh', display: '6.74" AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' },
    { name: 'Realme GT Neo 6', price: 32999, description: 'Neo flagship with gaming focus', stock: 70, ram: '12GB', storage: '256GB', battery: '5500mAh', display: '6.78" AMOLED', processor: 'Snapdragon 7+ Gen 3', camera: '50MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80' },
    { name: 'Realme 12 Pro+', price: 27999, description: 'Pro model with periscope telephoto', stock: 75, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.7" AMOLED', processor: 'Snapdragon 7s Gen 2', camera: '50MP + 64MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' },
    { name: 'Realme 12 Pro', price: 22999, description: 'Mid-range pro with good cameras', stock: 85, ram: '8GB', storage: '256GB', battery: '5000mAh', display: '6.7" AMOLED', processor: 'Snapdragon 6 Gen 1', camera: '50MP + 32MP + 8MP', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' },
    { name: 'Realme 12', price: 18999, description: 'Standard model with balanced features', stock: 95, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.72" AMOLED', processor: 'Dimensity 6100+', camera: '108MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { name: 'Realme Narzo 70 Pro', price: 19999, description: 'Narzo pro with performance focus', stock: 90, ram: '8GB', storage: '256GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Dimensity 7050', camera: '50MP + 8MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { name: 'Realme Narzo 70', price: 15999, description: 'Budget Narzo with good value', stock: 110, ram: '6GB', storage: '128GB', battery: '5000mAh', display: '6.67" AMOLED', processor: 'Dimensity 7050', camera: '50MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' },
    { name: 'Realme C67', price: 11999, description: 'C-series budget phone with long battery', stock: 130, ram: '8GB', storage: '128GB', battery: '5000mAh', display: '6.72" LCD', processor: 'Snapdragon 685', camera: '108MP + 2MP', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80' },
    { name: 'Realme C53', price: 8999, description: 'Entry-level with champion gold design', stock: 150, ram: '6GB', storage: '128GB', battery: '5000mAh', display: '6.74" LCD', processor: 'Unisoc T612', camera: '50MP + AI Lens', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80' }
  ],
  'Google': [
    { name: 'Google Pixel 8 Pro', price: 74999, description: 'Flagship with AI features and excellent camera', stock: 50, ram: '12GB', storage: '256GB', battery: '5050mAh', display: '6.7" LTPO OLED', processor: 'Tensor G3', camera: '50MP + 48MP + 48MP', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { name: 'Google Pixel 8', price: 54999, description: 'Compact Pixel with pure Android experience', stock: 65, ram: '8GB', storage: '128GB', battery: '4575mAh', display: '6.2" OLED', processor: 'Tensor G3', camera: '50MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { name: 'Google Pixel 8a', price: 39999, description: 'Affordable Pixel with flagship features', stock: 80, ram: '8GB', storage: '128GB', battery: '4492mAh', display: '6.1" OLED', processor: 'Tensor G3', camera: '64MP + 13MP', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80' },
    { name: 'Google Pixel 7 Pro', price: 64999, description: 'Previous gen pro with excellent value', stock: 45, ram: '12GB', storage: '256GB', battery: '5000mAh', display: '6.7" LTPO OLED', processor: 'Tensor G2', camera: '50MP + 48MP + 48MP', imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80' },
    { name: 'Google Pixel 7', price: 46999, description: 'Previous gen standard Pixel', stock: 60, ram: '8GB', storage: '128GB', battery: '4355mAh', display: '6.3" OLED', processor: 'Tensor G2', camera: '50MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80' },
    { name: 'Google Pixel 7a', price: 34999, description: 'Mid-range with flagship camera', stock: 75, ram: '8GB', storage: '128GB', battery: '4385mAh', display: '6.1" OLED', processor: 'Tensor G2', camera: '64MP + 13MP', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80' },
    { name: 'Google Pixel Fold', price: 84999, description: 'Foldable Pixel with premium design', stock: 25, ram: '12GB', storage: '256GB', battery: '4821mAh', display: '7.6" Foldable OLED', processor: 'Tensor G2', camera: '48MP + 10.8MP + 10.8MP', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { name: 'Google Pixel 6 Pro', price: 54999, description: 'Older pro model still capable', stock: 40, ram: '12GB', storage: '128GB', battery: '5003mAh', display: '6.7" LTPO OLED', processor: 'Tensor', camera: '50MP + 48MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=800&q=80' },
    { name: 'Google Pixel 6', price: 42999, description: 'Older standard model with good value', stock: 55, ram: '8GB', storage: '128GB', battery: '4614mAh', display: '6.4" OLED', processor: 'Tensor', camera: '50MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { name: 'Google Pixel 6a', price: 32999, description: 'Budget Pixel with clean Android', stock: 70, ram: '6GB', storage: '128GB', battery: '4410mAh', display: '6.1" OLED', processor: 'Tensor', camera: '12.2MP + 12MP', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80' }
  ]
};

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
const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobileshop');
    console.log('📦 Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products\n');

    // Ensure products directory exists
    const productsDir = path.join(__dirname, 'uploadedimage', 'products');
    if (!fs.existsSync(productsDir)) {
      fs.mkdirSync(productsDir, { recursive: true });
    }

    let totalProducts = 0;

    // Process each category
    for (const [categoryName, products] of Object.entries(productsByCategory)) {
      console.log(`\n📱 Processing ${categoryName} products...`);
      
      // Find category in database
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        console.log(`⚠️  Category ${categoryName} not found, skipping...`);
        continue;
      }

      // Process each product
      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        const productNumber = i + 1;
        
        try {
          // Generate unique filename
          const sanitizedName = productData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
          const filename = `${categoryName.toLowerCase()}-${sanitizedName}.jpg`;
          const filepath = path.join(productsDir, filename);

          // Download image
          console.log(`  📥 [${productNumber}/10] Downloading image for ${productData.name}...`);
          await downloadImage(productData.imageUrl, filepath);
          console.log(`  ✅ Downloaded: ${filename}`);

          // Extract brand and model name from product name
          const nameParts = productData.name.split(' ');
          const brand = categoryName;
          const modelName = productData.name;

          // Generate random stock between 8 and 15
          const randomStock = Math.floor(Math.random() * (15 - 8 + 1)) + 8;

          // Create product in database
          const product = await Product.create({
            brand: brand,
            modelName: modelName,
            price: productData.price,
            description: productData.description,
            categoryID: category._id,
            stock: randomStock,
            images: [`/uploadedimage/products/${filename}`],
            specs: {
              ram: productData.ram,
              storage: productData.storage,
              color: 'Mixed'
            },
            createdByRole: 'admin',
            isApproved: true
          });

          console.log(`  ✅ Created product: ${product.modelName}\n`);
          totalProducts++;
        } catch (error) {
          console.error(`  ❌ Error processing ${productData.name}:`, error.message);
        }
      }

      console.log(`✅ Completed ${categoryName} - ${products.length} products added`);
    }

    console.log(`\n🎉 Product seeding completed!`);
    console.log(`📊 Summary: ${totalProducts} products created across all categories`);

  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
  }
};

// Run the seed function
seedProducts();
