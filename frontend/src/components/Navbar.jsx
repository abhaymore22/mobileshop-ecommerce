import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../redux/slices/authSlice';
import { resetCart } from '../redux/slices/cartSlice';
import { resetWishlist } from '../redux/slices/wishlistSlice';
import { fetchActiveCategories } from '../redux/slices/categorySlice';
import { toggleChatbot } from '../redux/slices/chatbotSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { activeCategories } = useSelector((state) => state.categories);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to close navbar on mobile
  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = window.bootstrap?.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
  };

  useEffect(() => {
    dispatch(fetchActiveCategories());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetWishlist());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };

  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.qty, 0) || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', zIndex: 1030 }}>
      <div className="container">
        <div className="navbar-brand fw-bold fs-4 text-light" onClick={handleHomeClick} style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)', cursor: 'pointer' }}>
          📱 MobileShop
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-lg-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light fw-bold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/products" onClick={closeNavbar}>All Products</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                {activeCategories.map((cat) => (
                  <li key={cat._id}>
                    <Link className="dropdown-item" to={`/products?category=${cat._id}`} onClick={closeNavbar}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            
            {userInfo && (
              <>
                <li className="nav-item">
                  <Link className="nav-link position-relative fw-bold text-light" to="/cart" onClick={closeNavbar} style={{ fontSize: '1.05rem' }}>
                    🛒 Cart
                    {cartItemsCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-light" to="/wishlist" onClick={closeNavbar} style={{ fontSize: '1.05rem' }}>
                    ❤️ Wishlist
                  </Link>
                </li>
              </>
            )}
            
            {userInfo ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-bold text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px' }}
                >
                  {userInfo.name.split(' ')[0]}
                </a>
                <ul className="dropdown-menu" style={{ zIndex: 1050 }}>
                  <li><Link className="dropdown-item" to="/profile" onClick={closeNavbar}>Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders" onClick={closeNavbar}>My Orders</Link></li>
                  {(userInfo.role === 'admin' || userInfo.role === 'staff') && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/admin/dashboard" onClick={closeNavbar}>Dashboard</Link></li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={() => { handleLogout(); closeNavbar(); }}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={closeNavbar}>
                  <button className="btn btn-warning btn-sm fw-bold" style={{ borderRadius: '20px', padding: '0.5rem 1.5rem' }}>Login</button>
                </Link>
              </li>
            )}
          </ul>

          {/* Chatbot Toggle Button */}
          <button
            onClick={() => dispatch(toggleChatbot())}
            className="btn btn-light me-2 d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              padding: '0',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
            title="Chat with us"
          >
            <i className="bi bi-chat-dots-fill" style={{ fontSize: '1.2rem', color: '#667eea' }}></i>
          </button>

          <form className="d-flex my-2 my-lg-0" style={{ maxWidth: '350px' }} onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search mobiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '20px' }}
            />
            <button className="btn btn-warning fw-bold" type="submit" style={{ borderRadius: '20px', minWidth: '80px' }}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
