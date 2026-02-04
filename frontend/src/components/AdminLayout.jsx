import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminLayout({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  // Detect screen size and set initial sidebar state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setSidebarVisible(!mobile); // Show sidebar on desktop, hide on mobile
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, sidebarVisible]);

  // Auto close sidebar on navigation for mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarVisible(false);
    }
  }, [location.pathname, isMobile]);

  const isActive = (path) => location.pathname === path;

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin/dashboard') return 'Dashboard';
    if (path === '/admin/products') return 'Manage Products';
    if (path === '/admin/categories') return 'Manage Categories';
    if (path === '/admin/orders') return 'Manage Orders';
    if (path === '/admin/users') return 'Manage Users';
    if (path === '/admin/contacts') return 'Contact Management';
    return 'Admin Panel';
  };

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const closeSidebar = () => isMobile && setSidebarVisible(false);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobile && sidebarVisible && (
        <div
          className="admin-backdrop"
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1030,
            animation: 'fadeIn 0.3s'
          }}
        />
      )}

      <div className="admin-wrapper d-flex" style={{ minHeight: '100vh', position: 'relative' }}>
        {/* Sidebar */}
        <aside
          className="admin-sidebar bg-dark text-white"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '260px',
            transform: sidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
            zIndex: 1040,
            overflowY: 'auto',
            overflowX: 'hidden',
            boxShadow: sidebarVisible ? '2px 0 8px rgba(0,0,0,0.15)' : 'none'
          }}
        >
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Admin Panel</h5>
            {isMobile && (
              <button
                className="btn btn-sm btn-outline-light"
                onClick={closeSidebar}
                title="Close Menu"
              >
                ✕
              </button>
            )}
          </div>
          <nav className="nav flex-column">
            <Link
              to="/admin/dashboard"
              className={`nav-link text-white ${isActive('/admin/dashboard') ? 'bg-primary rounded' : ''}`}
              onClick={closeSidebar}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`nav-link text-white ${isActive('/admin/products') ? 'bg-primary rounded' : ''}`}
              onClick={closeSidebar}
            >
              📱 Products
            </Link>
            <Link
              to="/admin/categories"
              className={`nav-link text-white ${isActive('/admin/categories') ? 'bg-primary rounded' : ''}`}
              onClick={closeSidebar}
            >
              📂 Categories
            </Link>
            <Link
              to="/admin/orders"
              className={`nav-link text-white ${isActive('/admin/orders') ? 'bg-primary rounded' : ''}`}
              onClick={closeSidebar}
            >
              🛒 Orders
            </Link>
            {(userInfo?.role === 'admin' || userInfo?.role === 'staff') && (
              <Link
                to="/admin/contacts"
                className={`nav-link text-white ${isActive('/admin/contacts') ? 'bg-primary rounded' : ''}`}
                onClick={closeSidebar}
              >
                📧 Contact Management
              </Link>
            )}
            {userInfo?.role === 'admin' && (
              <Link
                to="/admin/users"
                className={`nav-link text-white ${isActive('/admin/users') ? 'bg-primary rounded' : ''}`}
                onClick={closeSidebar}
              >
                👥 Users
              </Link>
            )}
            <hr className="bg-white" />
            <Link to="/" className="nav-link text-white" onClick={closeSidebar}>
              🏠 Back to Store
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        className="admin-content"
        style={{
          marginLeft: !isMobile && sidebarVisible ? '260px' : '0',
          width: !isMobile && sidebarVisible ? 'calc(100% - 260px)' : '100%',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
        }}
      >
        {/* Top Navigation Bar */}
        <nav className="navbar navbar-light bg-light border-bottom sticky-top shadow-sm">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary me-3"
                onClick={toggleSidebar}
                title={sidebarVisible ? 'Hide Menu' : 'Show Menu'}
                aria-label="Toggle sidebar"
              >
                ☰
              </button>
              <h4 className="mb-0 fs-5">{getPageTitle()}</h4>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted me-2 d-none d-md-inline">{userInfo?.name}</span>
              <span className="badge bg-primary">{userInfo?.role?.toUpperCase()}</span>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="admin-page-content p-3 p-md-4">
          {children}
        </div>
      </main>
    </div>
    </>
  );
}

export default AdminLayout;
