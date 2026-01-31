# Mobile E-Commerce Shop - MERN Stack

A professional full-stack mobile e-commerce application built with MongoDB, Express, React, and Node.js.

## Features

### Backend Features
- ✅ JWT Authentication with role-based access (Admin, Staff, User)
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ Image upload with Multer
- ✅ Product management with approval workflow
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ Wishlist feature
- ✅ Product reviews and ratings
- ✅ Category management
- ✅ Advanced product filtering and search
- ✅ Pagination support
- ✅ Inventory management with auto-deduction

### Frontend Features
- ✅ React with Vite
- ✅ Redux Toolkit for state management
- ✅ Bootstrap 5 responsive UI
- ✅ User authentication and profile management
- ✅ Product browsing with filters
- ✅ Shopping cart and checkout
- ✅ Order tracking
- ✅ Wishlist management
- ✅ Product reviews
- ✅ Admin dashboard
- ✅ Protected routes

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or connection string)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with:
```
MONGO_URI=mongodb://127.0.0.1:27017/mobileshop
PORT=5000
JWT_SECRET=supersecretkey
```

4. Start MongoDB service (if running locally)

5. Start the backend server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Database Seeding

To populate the database with sample data:

1. Use the `SEED_DATA.json` file as reference
2. Create an admin user first by registering through the API or manually in MongoDB
3. Use MongoDB Compass or the mongo shell to insert sample categories
4. Create products through the admin panel or API

### Quick Start Users (Register these via API):

**Admin User:**
- Email: admin@mobileshop.com
- Password: admin123

**Staff User:**
- Email: staff@mobileshop.com
- Password: staff123

**Regular User:**
- Email: user@example.com
- Password: user123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/latest/list` - Get latest products
- `GET /api/products/:id/related` - Get related products
- `POST /api/products` - Create product (Admin/Staff)
- `PUT /api/products/:id` - Update product (Admin/Staff)
- `DELETE /api/products/:id` - Delete product (Admin)
- `PUT /api/products/:id/approve` - Approve product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/active` - Get active categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add to cart (Protected)
- `PUT /api/cart/:productId` - Update cart item (Protected)
- `DELETE /api/cart/:productId` - Remove from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `POST /api/orders/:id/pay` - Pay order (Protected)

### Wishlist
- `GET /api/wishlist` - Get wishlist (Protected)
- `POST /api/wishlist` - Add to wishlist (Protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (Protected)
- `DELETE /api/wishlist` - Clear wishlist (Protected)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `GET /api/reviews/myreviews` - Get user reviews (Protected)
- `POST /api/reviews` - Create review (Protected)
- `PUT /api/reviews/:id` - Update review (Protected)
- `DELETE /api/reviews/:id` - Delete review (Protected)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Project Structure

```
Testing1/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   ├── reviewController.js
│   │   ├── userController.js
│   │   └── wishlistController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── Review.js
│   │   ├── User.js
│   │   └── Wishlist.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── userRoutes.js
│   │   └── wishlistRoutes.js
│   ├── uploadedimage/
│   │   ├── categories/
│   │   ├── products/
│   │   └── users/
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── categorySlice.js
│   │   │   │   ├── orderSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   ├── reviewSlice.js
│   │   │   │   └── wishlistSlice.js
│   │   │   └── store.js
│   │   ├── screens/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CartScreen.jsx
│   │   │   ├── CheckoutScreen.jsx
│   │   │   ├── HomeScreen.jsx
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── OrdersScreen.jsx
│   │   │   ├── ProductDetailScreen.jsx
│   │   │   ├── ProductsScreen.jsx
│   │   │   ├── RegisterScreen.jsx
│   │   │   └── WishlistScreen.jsx
│   │   ├── utils/
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── SEED_DATA.json
└── README.md
```

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Multer
- dotenv
- cors

### Frontend
- React 18
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Bootstrap 5
- React Bootstrap

## User Roles

1. **Admin**: Full access to all features including user management, product approval, and order management
2. **Staff**: Can create products (requires approval), manage orders
3. **User**: Can browse products, add to cart, place orders, write reviews, manage wishlist

## Contributing

This is a demonstration project. Feel free to fork and modify as needed.

## License

ISC

## Support

For issues or questions, please contact support@mobileshop.com
