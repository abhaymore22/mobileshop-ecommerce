# Category Seeding Guide

## Overview
This script automatically downloads high-quality category images from the internet and populates your database with 8 mobile phone brand categories.

## Categories Included
1. **Samsung** - Leading Android smartphone manufacturer
2. **Apple** - Premium iPhone devices
3. **Xiaomi** - Popular budget-friendly smartphones
4. **OnePlus** - Performance-focused devices
5. **Oppo** - Camera-centric smartphones
6. **Vivo** - Photography-focused devices
7. **Realme** - Budget smartphone brand
8. **Google** - Pixel smartphones with stock Android

## How to Use

### Run the Seeding Script
```bash
cd backend
npm run seed:categories
```

### What it Does
- ✅ Connects to MongoDB database
- ✅ Clears any existing categories
- ✅ Downloads high-quality images from Unsplash (800px width, 80% quality)
- ✅ Saves images to `backend/uploadedimage/categories/`
- ✅ Creates category records in the database with proper image paths
- ✅ Displays progress and summary

### Image Storage
- **Location**: `backend/uploadedimage/categories/`
- **Format**: `.jpg` files
- **Naming**: `{brand-name}.jpg` (e.g., `samsung.jpg`, `apple.jpg`)
- **Path in DB**: `/uploadedimage/categories/{filename}`

## Features
- 🖼️ High-quality images from Unsplash
- 🔄 Automatic download and storage
- 🗑️ Clears old data before seeding
- ✅ Error handling for failed downloads
- 📊 Progress tracking and summary

## Customization

### Add More Categories
Edit `seedCategories.js` and add entries to the `categories` array:

```javascript
{
  name: 'Brand Name',
  imageUrl: 'https://images.unsplash.com/photo-xxxxx?w=800&q=80'
}
```

### Change Image Source
Replace Unsplash URLs with any other image hosting service that supports direct downloads.

## Notes
- Images are downloaded using HTTPS protocol
- Script handles redirects automatically
- Failed downloads are logged but don't stop the process
- All categories are set to `isActive: true` by default

## Troubleshooting

### Images Not Downloading
- Check internet connection
- Verify image URLs are accessible
- Ensure `uploadedimage/categories/` folder has write permissions

### Database Connection Issues
- Verify MongoDB is running
- Check `MONGODB_URI` in environment variables
- Default connection: `mongodb://localhost:27017/mobileshop`

## Script Location
`backend/seedCategories.js`
