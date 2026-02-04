import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '../../redux/slices/orderSlice';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function AdminOrdersScreen() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, orderStatus, paymentStatus) => {
    await dispatch(updateOrderStatus({ id: orderId, orderStatus, paymentStatus }));
    dispatch(getAllOrders());
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortedOrders = () => {
    if (!sortField) return orders;

    return [...orders].sort((a, b) => {
      let aValue, bValue;

      if (sortField === 'customer') {
        aValue = (a.userID?.name || 'N/A').toLowerCase();
        bValue = (b.userID?.name || 'N/A').toLowerCase();
      } else if (sortField === 'date') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else if (sortField === 'totalAmount') {
        aValue = Number(a.totalAmount);
        bValue = Number(b.totalAmount);
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-muted ms-1">⇅</span>;
    return sortOrder === 'asc' ? <span className="ms-1">↑</span> : <span className="ms-1">↓</span>;
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Manage Orders</h2>

      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <Message variant="info">No orders found</Message>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="d-lg-none">
            {getSortedOrders().map((order) => (
              <div key={order._id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="card-title mb-1">Order #{order._id.substring(0, 8)}</h6>
                      <p className="text-muted small mb-0">{order.userID?.name || 'N/A'}</p>
                    </div>
                    <span className="badge bg-success">RS {order.totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <small className="text-muted">Date</small>
                      <p className="mb-0 small">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Payment</small>
                      <br />
                      <span className={`badge bg-${order.paymentStatus === 'Paid' ? 'success' : 'warning'}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small mb-1">Order Status</label>
                    <select
                      className="form-select form-select-sm"
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value, order.paymentStatus)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-sm btn-info w-100"
                    onClick={() => handleViewDetails(order)}
                  >
                    <i className="bi bi-eye"></i> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="card d-none d-lg-block">
            <div className="card-body">
              <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th 
                      onClick={() => handleSort('customer')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Customer <SortIcon field="customer" />
                    </th>
                    <th 
                      onClick={() => handleSort('date')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Date <SortIcon field="date" />
                    </th>
                    <th 
                      onClick={() => handleSort('totalAmount')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Total <SortIcon field="totalAmount" />
                    </th>
                    <th 
                      onClick={() => handleSort('paymentStatus')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Payment Status <SortIcon field="paymentStatus" />
                    </th>
                    <th 
                      onClick={() => handleSort('orderStatus')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Order Status <SortIcon field="orderStatus" />
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedOrders().map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>{order.userID?.name || 'N/A'}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>RS {order.totalAmount.toFixed(2)}</td>
                      <td>
                        <select
                          className={`form-select form-select-sm badge bg-${
                            order.paymentStatus === 'Paid' ? 'success' : 'warning'
                          }`}
                          value={order.paymentStatus}
                          onChange={(e) => handleStatusChange(order._id, order.orderStatus, e.target.value)}
                          style={{ border: 'none' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </td>
                      <td>
                        <select
                          className={`form-select form-select-sm badge bg-${
                            order.orderStatus === 'Delivered' ? 'success' :
                            order.orderStatus === 'Cancelled' ? 'danger' :
                            'primary'
                          }`}
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value, order.paymentStatus)}
                          style={{ border: 'none' }}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => handleViewDetails(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details - #{selectedOrder._id.substring(0, 8)}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {/* Customer Information */}
                <div className="card mb-3">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">Customer Information</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Name:</strong> {selectedOrder.userID?.name}</p>
                        <p><strong>Email:</strong> {selectedOrder.userID?.email}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Phone:</strong> {selectedOrder.userID?.phone || 'N/A'}</p>
                        <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="card mb-3">
                  <div className="card-header bg-success text-white">
                    <h6 className="mb-0">Shipping Information</h6>
                  </div>
                  <div className="card-body">
                    <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                    <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="card mb-3">
                  <div className="card-header bg-info text-white">
                    <h6 className="mb-0">Order Items ({selectedOrder.items.length})</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.productID?.brand} {item.productID?.modelName}</td>
                              <td>{item.qty}</td>
                              <td>RS {item.price.toFixed(2)}</td>
                              <td>RS {(item.qty * item.price).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="card mb-3">
                  <div className="card-header bg-warning">
                    <h6 className="mb-0">Order Summary</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Payment Status:</strong> 
                          <span className={`badge bg-${selectedOrder.paymentStatus === 'Paid' ? 'success' : 'warning'} ms-2`}>
                            {selectedOrder.paymentStatus}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Order Status:</strong> 
                          <span className={`badge bg-${
                            selectedOrder.orderStatus === 'Delivered' ? 'success' :
                            selectedOrder.orderStatus === 'Cancelled' ? 'danger' :
                            'primary'
                          } ms-2`}>
                            {selectedOrder.orderStatus}
                          </span>
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h5>Total Amount:</h5>
                      <h5 className="text-success">RS {selectedOrder.totalAmount.toFixed(2)}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminOrdersScreen;
