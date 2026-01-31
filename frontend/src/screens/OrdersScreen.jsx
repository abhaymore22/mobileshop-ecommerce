import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../redux/slices/orderSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

function OrdersScreen() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      dispatch(getMyOrders());
    }
  }, [dispatch, userInfo]);

  if (!userInfo) {
    return (
      <div className="container my-5">
        <Message variant="info">
          Please <Link to="/login">login</Link> to view your orders
        </Message>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Orders</h2>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders.length === 0 ? (
        <Message variant="info">
          You have no orders yet. <Link to="/products">Start shopping</Link>
        </Message>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}...</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>RS {order.totalAmount.toFixed(2)}</td>
                  <td>
                    <span className={`badge bg-${order.paymentStatus === 'Paid' ? 'success' : 'warning'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${
                      order.orderStatus === 'Delivered' ? 'success' : 
                      order.orderStatus === 'Cancelled' ? 'danger' : 
                      'primary'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`} className="btn btn-sm btn-primary">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrdersScreen;
