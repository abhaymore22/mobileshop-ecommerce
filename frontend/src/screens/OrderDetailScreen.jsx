import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../redux/slices/orderSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

function OrderDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!order) return <Message variant="info">Order not found</Message>;

  return (
    <div className="container my-4">
      <Link to="/orders" className="btn btn-secondary mb-3">
        ← Back to Orders
      </Link>

      <h2 className="mb-4">Order Details</h2>

      <div className="row">
        <div className="col-md-8">
          {/* Order Items */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Order Items</h5>
              {order.items?.map((item) => {
                const product = item.productID;
                const imageUrl = product?.images?.[0]
                  ? `http://localhost:5000${product.images[0]}`
                  : 'https://via.placeholder.com/100';

                return (
                  <div key={item._id} className="row align-items-center mb-3 pb-3 border-bottom">
                    <div className="col-2">
                      <img src={imageUrl} alt={product?.modelName} className="img-fluid rounded" />
                    </div>
                    <div className="col-5">
                      <Link to={`/product/${product?._id}`} className="text-decoration-none">
                        <h6>{product?.brand} {product?.modelName}</h6>
                      </Link>
                    </div>
                    <div className="col-2">
                      <p className="mb-0">Qty: {item.qty}</p>
                    </div>
                    <div className="col-3 text-end">
                      <p className="mb-0 fw-bold">RS {(item.price * item.qty).toFixed(2)}</p>
                      <small className="text-muted">RS {item.price.toFixed(2)} each</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Shipping Address</h5>
              <p className="mb-0">{order.shippingAddress}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Payment Method</h5>
              <p className="mb-0">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Order Summary */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Order ID:</span>
                <span className="text-muted">{order._id?.substring(0, 8)}...</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Items Total:</span>
                <span>RS {order.totalAmount?.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total Amount:</strong>
                <strong className="text-success">RS {order.totalAmount?.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Status</h5>
              <div className="mb-3">
                <strong>Payment Status:</strong>
                <span className={`badge bg-${order.paymentStatus === 'Paid' ? 'success' : 'warning'} ms-2`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div className="mb-0">
                <strong>Order Status:</strong>
                <span className={`badge bg-${
                  order.orderStatus === 'Delivered' ? 'success' :
                  order.orderStatus === 'Shipped' ? 'info' :
                  order.orderStatus === 'Processing' ? 'primary' :
                  'warning'
                } ms-2`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Timeline</h5>
              <small className="text-muted d-block mb-2">
                <strong>Ordered:</strong> {new Date(order.createdAt).toLocaleString()}
              </small>
              {order.updatedAt && order.updatedAt !== order.createdAt && (
                <small className="text-muted d-block">
                  <strong>Last Updated:</strong> {new Date(order.updatedAt).toLocaleString()}
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailScreen;
