import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, clearSuccess, clearError } from '../redux/slices/orderSlice';
import { getCart } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Alert from '../components/Alert';

function CheckoutScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.orders);

  const [shippingAddress, setShippingAddress] = useState(userInfo?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [upiId, setUpiId] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getCart());
      dispatch(clearError());
    }
  }, [dispatch, userInfo, navigate]);

  useEffect(() => {
    if (success) {
      navigate('/orders');
      dispatch(clearSuccess());
    }
  }, [success, navigate, dispatch]);

  const showAlert = (message, variant = 'info') => {
    setAlertInfo({ message, variant });
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

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      value = value.match(/.{1,4}/g)?.join(' ') || value;
      setCardDetails({ ...cardDetails, cardNumber: value });
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      setCardDetails({ ...cardDetails, expiryDate: value });
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCardDetails({ ...cardDetails, cvv: value });
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!shippingAddress) {
      showAlert('Please enter shipping address', 'warning');
      return;
    }

    if (paymentMethod === 'Card') {
      if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
        showAlert('Please fill in all card details', 'warning');
        return;
      }
      if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        showAlert('Please enter a valid 16-digit card number', 'warning');
        return;
      }
      if (cardDetails.cvv.length !== 3) {
        showAlert('Please enter a valid 3-digit CVV', 'warning');
        return;
      }
    }

    if (paymentMethod === 'UPI') {
      if (!upiId) {
        showAlert('Please enter your UPI ID', 'warning');
        return;
      }
      if (!upiId.includes('@')) {
        showAlert('Please enter a valid UPI ID (e.g., yourname@paytm)', 'warning');
        return;
      }
      
      setPaymentProcessing(true);
      showAlert('Payment request sent to your UPI app for RS ' + calculateTotal().toFixed(2) + ' (Dummy payment)', 'info');
      setTimeout(() => setPaymentProcessing(false), 1000);
    }

    if (paymentMethod === 'Card') {
      setPaymentProcessing(true);
      showAlert('Processing card payment of RS ' + calculateTotal().toFixed(2) + ' (Dummy payment)', 'info');
      setTimeout(() => setPaymentProcessing(false), 1000);
    }

    const items = cart.items.map(item => ({
      productID: item.productID._id,
      qty: item.qty
    }));

    try {
      await dispatch(createOrder({
        items,
        shippingAddress,
        paymentMethod: paymentMethod // Send the actual value: 'COD', 'Card', or 'UPI'
      })).unwrap();
      showAlert('Order placed successfully!', 'success');
    } catch (err) {
      console.error('Order creation failed:', err);
      showAlert(err || 'Failed to create order. Please try again.', 'danger');
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container my-5">
        <Message variant="info">Your cart is empty</Message>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {alertInfo && (
        <Alert 
          message={alertInfo.message} 
          variant={alertInfo.variant} 
          onClose={() => setAlertInfo(null)} 
        />
      )}
      
      <h2 className="mb-4">Checkout</h2>
      
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handlePlaceOrder}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Shipping Address</h5>
                <textarea
                  className="form-control"
                  rows="3"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  placeholder="Enter your complete shipping address"
                ></textarea>
              </div>
            </div>
            
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Payment Method</h5>
                
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    <strong>💵 Cash on Delivery</strong>
                    <small className="d-block text-muted">Pay when you receive the product</small>
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="card"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="card">
                    <strong>💳 Credit/Debit Card</strong>
                    <small className="d-block text-muted">Pay securely with your card</small>
                  </label>
                </div>

                {paymentMethod === 'Card' && (
                  <div className="card bg-light p-3 mb-3">
                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cardholder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name on Card"
                        value={cardDetails.cardName}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={handleExpiryChange}
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">CVV</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCvvChange}
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                    <small className="text-muted mt-2 d-block">
                      🔒 Your card details are secure (Dummy payment - No actual charges)
                    </small>
                  </div>
                )}

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="upi"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="upi">
                    <strong>📱 UPI Payment</strong>
                    <small className="d-block text-muted">Pay using Google Pay, PhonePe, Paytm, etc.</small>
                  </label>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="card bg-light p-3 mb-3">
                    <div className="mb-3">
                      <label className="form-label">UPI ID</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="yourname@paytm"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                      />
                      <small className="text-muted">Enter your UPI ID (e.g., 9876543210@paytm)</small>
                    </div>
                    <small className="text-muted d-block">
                      🔒 You will receive a payment request on your UPI app (Dummy payment - No actual charges)
                    </small>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100" 
              disabled={loading || paymentProcessing}
            >
              {paymentProcessing ? 'Processing Payment...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <hr />
              
              {cart.items.map((item) => (
                <div key={item.productID._id} className="d-flex justify-content-between mb-2">
                  <span>{item.productID.modelName} x {item.qty}</span>
                  <span>
                    RS {((item.productID.price - (item.productID.price * item.productID.discount / 100)) * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-success">RS {calculateTotal().toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
