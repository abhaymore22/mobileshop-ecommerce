# Quick Setup Guide

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Step 3: Start MongoDB

Make sure MongoDB is running on your system:
- Windows: Start MongoDB service from Services
- Mac/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`

## Step 4: Start Backend Server

```bash
cd backend
npm start
```

Backend should be running on http://localhost:5000

## Step 5: Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend should be running on http://localhost:3000

## Step 6: Create Admin User

1. Open http://localhost:3000/register
2. Register with:
   - Name: Admin
   - Email: admin@mobileshop.com
   - Password: admin123
   - Fill in other details

3. Manually update the user role in MongoDB:
   ```javascript
   use mobileshop
   db.users.updateOne(
     { email: "admin@mobileshop.com" },
     { $set: { role: "admin" } }
   )
   ```

## Step 7: Create Categories

As admin, navigate to the admin panel and create categories:
1. Smartphones
2. Tablets
3. Accessories
4. Smart Watches

Upload images for each category if desired.

## Step 8: Add Products

As admin, add products through the admin panel with product details and images.

## Ready to Use!

Your mobile e-commerce shop is now ready. You can:
- Browse products as a guest
- Register new users
- Add items to cart
- Place orders
- Write reviews
- Manage wishlist
- Access admin panel (if admin/staff)

## Testing Credentials

After setup, you can create these test users:

**Admin:**
- Email: admin@mobileshop.com
- Password: admin123

**Staff:**
- Email: staff@mobileshop.com
- Password: staff123

**Customer:**
- Email: user@example.com
- Password: user123

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the MONGO_URI in backend/.env

### Port Already in Use
- Change PORT in backend/.env
- Change port in frontend/vite.config.js

### CORS Errors
- Ensure backend is running before starting frontend
- Check axios baseURL in frontend/src/utils/axiosInstance.js

### Image Upload Issues
- Check write permissions on backend/uploadedimage/ folders
- Ensure folders exist: users/, categories/, products/

## Features to Explore

✅ User authentication and authorization
✅ Product browsing with advanced filters
✅ Shopping cart management
✅ Secure checkout process
✅ Order tracking
✅ Product reviews and ratings
✅ Wishlist functionality
✅ Admin dashboard
✅ Product approval workflow
✅ Category management
✅ User management (admin only)
✅ Responsive mobile-first design

Enjoy your mobile e-commerce shop! 🚀📱
