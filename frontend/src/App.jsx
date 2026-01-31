import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from './redux/slices/cartSlice';
import { getWishlist } from './redux/slices/wishlistSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Chatbot from './components/Chatbot';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrdersScreen from './screens/OrdersScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import WishlistScreen from './screens/WishlistScreen';
import ContactScreen from './screens/ContactScreen';
import MyContactsScreen from './screens/MyContactsScreen';
import AdminDashboard from './screens/AdminDashboard';
import AdminCategoriesScreen from './screens/Admin/AdminCategoriesScreen';
import AdminProductsScreen from './screens/Admin/AdminProductsScreen';
import AdminOrdersScreen from './screens/Admin/AdminOrdersScreen';
import AdminUsersScreen from './screens/Admin/AdminUsersScreen';
import AdminContactsScreen from './screens/Admin/AdminContactsScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      dispatch(getCart());
      dispatch(getWishlist());
    }
  }, [dispatch, userInfo]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/verify-email/:token" element={<VerifyEmailScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/products" element={<ProductsScreen />} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfileScreen />
              </PrivateRoute>
            } />
            
            <Route path="/cart" element={
              <PrivateRoute>
                <CartScreen />
              </PrivateRoute>
            } />
            
            <Route path="/checkout" element={
              <PrivateRoute>
                <CheckoutScreen />
              </PrivateRoute>
            } />
            
            <Route path="/orders" element={
              <PrivateRoute>
                <OrdersScreen />
              </PrivateRoute>
            } />
            
            <Route path="/order/:id" element={
              <PrivateRoute>
                <OrderDetailScreen />
              </PrivateRoute>
            } />
            
            <Route path="/wishlist" element={
              <PrivateRoute>
                <WishlistScreen />
              </PrivateRoute>
            } />
            
            <Route path="/my-contacts" element={
              <PrivateRoute>
                <MyContactsScreen />
              </PrivateRoute>
            } />
            
            <Route path="/my-contacts" element={
              <PrivateRoute>
                <MyContactsScreen />
              </PrivateRoute>
            } />
            
            <Route path="/admin/dashboard" element={
              <PrivateRoute roles={['admin', 'staff']}>
                <AdminDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/admin/categories" element={
              <PrivateRoute roles={['admin', 'staff']}>
                <AdminCategoriesScreen />
              </PrivateRoute>
            } />
            
            <Route path="/admin/products" element={
              <PrivateRoute roles={['admin', 'staff']}>
                <AdminProductsScreen />
              </PrivateRoute>
            } />
            
            <Route path="/admin/orders" element={
              <PrivateRoute roles={['admin', 'staff']}>
                <AdminOrdersScreen />
              </PrivateRoute>
            } />
            
            <Route path="/admin/users" element={
              <PrivateRoute roles={['admin']}>
                <AdminUsersScreen />
              </PrivateRoute>
            } />
            
            <Route path="/admin/contacts" element={
              <PrivateRoute roles={['admin', 'staff']}>
                <AdminContactsScreen />
              </PrivateRoute>
            } />
            
            <Route path="*" element={
              <div className="container my-5 text-center">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
