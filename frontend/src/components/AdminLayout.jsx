import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminLayout({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

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

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white position-fixed"
        style={{
          left: sidebarVisible ? '0' : '-250px',
          transition: 'left 0.3s ease',
          zIndex: 1040,
          width: '250px',
          height: '100vh',
          overflowY: 'auto'
        }}
      >
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Admin Panel</h5>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setSidebarVisible(false)}
              title="Hide Sidebar"
            >
              ✕
            </button>
          </div>
          <nav className="nav flex-column">
            <Link
              to="/admin/dashboard"
              className={`nav-link text-white ${isActive('/admin/dashboard') ? 'bg-primary rounded' : ''}`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`nav-link text-white ${isActive('/admin/products') ? 'bg-primary rounded' : ''}`}
            >
              📱 Products
            </Link>
            <Link
              to="/admin/categories"
              className={`nav-link text-white ${isActive('/admin/categories') ? 'bg-primary rounded' : ''}`}
            >
              📂 Categories
            </Link>
            <Link
              to="/admin/orders"
              className={`nav-link text-white ${isActive('/admin/orders') ? 'bg-primary rounded' : ''}`}
            >
              🛒 Orders
            </Link>
            {(userInfo?.role === 'admin' || userInfo?.role === 'staff') && (
              <Link
                to="/admin/contacts"
                className={`nav-link text-white ${isActive('/admin/contacts') ? 'bg-primary rounded' : ''}`}
              >
                📧 Contact Management
              </Link>
            )}
            {userInfo?.role === 'admin' && (
              <Link
                to="/admin/users"
                className={`nav-link text-white ${isActive('/admin/users') ? 'bg-primary rounded' : ''}`}
              >
                👥 Users
              </Link>
            )}
            <hr className="bg-white" />
            <Link to="/" className="nav-link text-white">
              🏠 Back to Store
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: sidebarVisible ? '250px' : '0',
          transition: 'margin-left 0.3s ease',
          width: sidebarVisible ? 'calc(100% - 250px)' : '100%',
          minHeight: '100vh'
        }}
      >
        {/* Top Navigation Bar */}
        <nav className="navbar navbar-light bg-light border-bottom sticky-top">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              {!sidebarVisible && (
                <button
                  className="btn btn-outline-secondary me-3"
                  onClick={() => setSidebarVisible(true)}
                  title="Show Sidebar"
                >
                  ☰
                </button>
              )}
              <h4 className="mb-0">{getPageTitle()}</h4>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">{userInfo?.name}</span>
              <span className="badge bg-primary">{userInfo?.role?.toUpperCase()}</span>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
