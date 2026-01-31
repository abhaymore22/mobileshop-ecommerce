import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import AdminLayout from '../components/AdminLayout';
import Loader from '../components/Loader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/analytics/dashboard');
      setAnalytics(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  // Chart configurations
  const revenueChartData = {
    labels: analytics?.monthlyRevenue?.map(m => m.month) || [],
    datasets: [
      {
        label: 'Revenue (RS)',
        data: analytics?.monthlyRevenue?.map(m => m.revenue) || [],
        borderColor: 'rgb(102, 126, 234)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const ordersChartData = {
    labels: analytics?.monthlyRevenue?.map(m => m.month) || [],
    datasets: [
      {
        label: 'Orders',
        data: analytics?.monthlyRevenue?.map(m => m.orders) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const orderStatusData = {
    labels: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [
          analytics?.ordersByStatus?.processing || 0,
          analytics?.ordersByStatus?.shipped || 0,
          analytics?.ordersByStatus?.delivered || 0,
          analytics?.ordersByStatus?.cancelled || 0
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)'
        ],
        borderWidth: 2
      }
    ]
  };

  const topProductsData = {
    labels: analytics?.topProducts?.map(p => p.productName) || [],
    datasets: [
      {
        label: 'Revenue (RS)',
        data: analytics?.topProducts?.map(p => p.totalRevenue) || [],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(40, 167, 69, 0.8)',
          'rgba(220, 53, 69, 0.8)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">📊 Dashboard Analytics</h2>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Total Revenue</h6>
                  <h3 className="mb-0">RS {analytics?.totalRevenue?.toLocaleString() || 0}</h3>
                </div>
                <div style={{ fontSize: '3rem', opacity: 0.3 }}>💰</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Total Orders</h6>
                  <h3 className="mb-0">{analytics?.totalOrders || 0}</h3>
                </div>
                <div style={{ fontSize: '3rem', opacity: 0.3 }}>📦</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Paid Orders</h6>
                  <h3 className="mb-0">{analytics?.paymentStatus?.paid || 0}</h3>
                </div>
                <div style={{ fontSize: '3rem', opacity: 0.3 }}>✅</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Total Users</h6>
                  <h3 className="mb-0">{analytics?.userStats?.total || 0}</h3>
                </div>
                <div style={{ fontSize: '3rem', opacity: 0.3 }}>👥</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Management Summary */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Total Contacts</p>
                  <h3 className="mb-0 fw-bold">{analytics?.contactStats?.total || 0}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                  <i className="bi bi-envelope-fill text-primary fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Open Contacts</p>
                  <h3 className="mb-0 fw-bold text-primary">{analytics?.contactStats?.open || 0}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                  <i className="bi bi-inbox-fill text-primary fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">In Progress</p>
                  <h3 className="mb-0 fw-bold text-warning">{analytics?.contactStats?.inProgress || 0}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                  <i className="bi bi-hourglass-split text-warning fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Urgent Priority</p>
                  <h3 className="mb-0 fw-bold text-danger">{analytics?.contactStats?.urgent || 0}</h3>
                </div>
                <div className="bg-danger bg-opacity-10 rounded-circle p-3">
                  <i className="bi bi-exclamation-circle-fill text-danger fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="row g-4 mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <h5 className="mb-0">📈 Revenue Trend (Last 6 Months)</h5>
            </div>
            <div className="card-body">
              <Line data={revenueChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">📊 Order Status</h5>
            </div>
            <div className="card-body">
              <Doughnut data={orderStatusData} options={{ ...chartOptions, maintainAspectRatio: true }} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">📦 Monthly Orders</h5>
            </div>
            <div className="card-body">
              <Bar data={ordersChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">🏆 Top 5 Products by Revenue</h5>
            </div>
            <div className="card-body">
              <Bar data={topProductsData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">📋 Order Details</h5>
            </div>
            <div className="card-body">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td><span className="badge bg-primary">Processing</span></td>
                    <td className="text-end"><strong>{analytics?.ordersByStatus?.processing || 0}</strong></td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-info">Shipped</span></td>
                    <td className="text-end"><strong>{analytics?.ordersByStatus?.shipped || 0}</strong></td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-success">Delivered</span></td>
                    <td className="text-end"><strong>{analytics?.ordersByStatus?.delivered || 0}</strong></td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-danger">Cancelled</span></td>
                    <td className="text-end"><strong>{analytics?.ordersByStatus?.cancelled || 0}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">🏅 Top Products Details</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-center">Qty Sold</th>
                      <th className="text-end">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics?.topProducts?.map((product, index) => (
                      <tr key={index}>
                        <td className="small">{product.productName}</td>
                        <td className="text-center"><span className="badge bg-primary">{product.totalQty}</span></td>
                        <td className="text-end"><strong>RS {product.totalRevenue.toLocaleString()}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Management Details */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <h5 className="mb-0">
                <i className="bi bi-envelope me-2"></i>
                Contact Status Breakdown
              </h5>
            </div>
            <div className="card-body">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>
                      <i className="bi bi-inbox-fill text-primary me-2"></i>
                      <span className="badge bg-primary">Open</span>
                    </td>
                    <td className="text-end"><strong>{analytics?.contactStats?.open || 0}</strong></td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-hourglass-split text-warning me-2"></i>
                      <span className="badge bg-warning">In Progress</span>
                    </td>
                    <td className="text-end"><strong>{analytics?.contactStats?.inProgress || 0}</strong></td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <span className="badge bg-success">Resolved</span>
                    </td>
                    <td className="text-end"><strong>{analytics?.contactStats?.resolved || 0}</strong></td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-x-circle-fill text-secondary me-2"></i>
                      <span className="badge bg-secondary">Closed</span>
                    </td>
                    <td className="text-end"><strong>{analytics?.contactStats?.closed || 0}</strong></td>
                  </tr>
                  <tr className="table-light">
                    <td>
                      <i className="bi bi-person-check-fill text-info me-2"></i>
                      Registered Users
                    </td>
                    <td className="text-end"><strong>{analytics?.contactStats?.registeredUsers || 0}</strong></td>
                  </tr>
                  <tr className="table-light">
                    <td>
                      <i className="bi bi-person-fill text-muted me-2"></i>
                      Guest Users
                    </td>
                    <td className="text-end"><strong>{analytics?.contactStats?.guests || 0}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">
                <i className="bi bi-tags me-2"></i>
                Contacts by Category
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th className="text-end">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics?.contactStats?.byCategory?.map((cat, index) => (
                      <tr key={index}>
                        <td>
                          <i className="bi bi-tag-fill text-muted me-2"></i>
                          {cat._id || 'Uncategorized'}
                        </td>
                        <td className="text-end">
                          <span className="badge bg-secondary">{cat.count}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
