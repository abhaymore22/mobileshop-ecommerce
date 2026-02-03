import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  useEffect(() => {
    if (userInfo) {
      dispatch(getCart());
    }
  }, [dispatch, userInfo]);

  const handleQuantityChange = (productID, qty) => {
    dispatch(updateCartItem({ productID, qty: Number(qty) }));
  };

  const handleRemove = (productID) => {
    setProductToRemove(productID);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    if (productToRemove) {
      dispatch(removeFromCart(productToRemove));
      setShowRemoveModal(false);
      setProductToRemove(null);
    }
  };

  const cancelRemove = () => {
    setShowRemoveModal(false);
    setProductToRemove(null);
  };

  const calculateTotal = () => {
    if (!cart.items) return 0;
    return cart.items.reduce((acc, item) => {
      const price = item.productID?.price || 0;
      const discount = item.productID?.discount || 0;
      const discountedPrice = price - (price * discount / 100);
      return acc + (discountedPrice * item.qty);
    }, 0);
  };

  if (!userInfo) {
    return (
      <div className="container my-5">
        <Message variant="info">
          Please <Link to="/login">login</Link> to view your cart
        </Message>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Shopping Cart</h2>
      
      {/* Remove Confirmation Modal */}
      <div className={`modal fade ${showRemoveModal ? 'show' : ''}`} style={{ display: showRemoveModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Confirm Removal
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={cancelRemove}></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">Are you sure you want to remove this item from your cart?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={cancelRemove}>
                <i className="bi bi-x-circle me-1"></i>No, Keep It
              </button>
              <button type="button" className="btn btn-danger" onClick={confirmRemove}>
                <i className="bi bi-trash me-1"></i>Yes, Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      {showRemoveModal && <div className="modal-backdrop fade show"></div>}
      
      {!cart.items || cart.items.length === 0 ? (
        <Message variant="info">
          Your cart is empty. <Link to="/products">Shop Now</Link>
        </Message>
      ) : (
        <div className="row">
          <div className="col-12 col-md-8 mb-3 mb-md-0">
            <div className="card">
              <div className="card-body">
                {cart.items.map((item) => {
                  const product = item.productID;
                  if (!product) return null;
                  
                  const imageUrl = product.images?.[0] 
                    ? (product.images[0].startsWith('http') ? product.images[0] : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.images[0]}`)
                    : 'https://via.placeholder.com/100';
                  const price = product.price || 0;
                  const discount = product.discount || 0;
                  const discountedPrice = price - (price * discount / 100);
                  
                  return (
                    <div key={product._id} className="row align-items-center mb-3 pb-3 border-bottom cart-item-row">
                      <div className="col-12 col-md-2 mb-2 mb-md-0">
                        <img src={imageUrl} alt={product.modelName} className="img-fluid rounded" style={{ maxWidth: '100px' }} />
                      </div>
                      <div className="col-12 col-md-4 mb-2 mb-md-0">
                        <Link to={`/product/${product._id}`} className="text-decoration-none">
                          <h6 className="mb-0">{product.brand} {product.modelName}</h6>
                        </Link>
                      </div>
                      <div className="col-6 col-md-2 mb-2 mb-md-0">
                        <small className="text-muted d-md-none">Price:</small>
                        <p className="mb-0 fw-bold">RS {discountedPrice.toFixed(2)}</p>
                        {discount > 0 && (
                          <small className="text-muted text-decoration-line-through">
                            RS {price.toFixed(2)}
                          </small>
                        )}
                      </div>
                      <div className="col-6 col-md-2 mb-2 mb-md-0">
                        <small className="text-muted d-md-none">Quantity:</small>
                        <select
                          className="form-select form-select-sm"
                          value={item.qty}
                          onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                        >
                          {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12 col-md-2 text-md-end mt-2 mt-md-0">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemove(product._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({cart.items.reduce((acc, item) => acc + item.qty, 0)}):</span>
                  <span>RS {calculateTotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="text-success">RS {calculateTotal().toFixed(2)}</strong>
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => navigate('/checkout')}
                  disabled={cart.items.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
