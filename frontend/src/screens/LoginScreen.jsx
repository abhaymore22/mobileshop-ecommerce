import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../redux/slices/authSlice';
import axiosInstance from '../utils/axiosInstance';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import OTPVerificationModal from '../components/OTPVerificationModal';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendingEmail, setResendingEmail] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setAlertInfo({ message: error, variant: 'danger' });
    }
  }, [error]);

  const showAlert = (message, variant = 'info') => {
    setAlertInfo({ message, variant });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    setShowResendVerification(false);
    
    try {
      const result = await dispatch(login({ email, password }));
      if (result.type === 'auth/login/fulfilled') {
        showAlert('Login successful!', 'success');
        setTimeout(() => navigate('/'), 500);
      } else if (result.type === 'auth/login/rejected') {
        const errorMessage = result.payload || 'Invalid email or password';
        
        // Check if error is due to unverified email
        if (result.payload && result.payload.includes('verify your email')) {
          setShowResendVerification(true);
          setUnverifiedEmail(email);
          showAlert(errorMessage, 'warning');
        } else {
          showAlert(errorMessage, 'danger');
        }
      }
    } catch (err) {
      showAlert('Login failed. Please try again.', 'danger');
    }
  };

  const handleResendVerification = async () => {
    try {
      setResendingEmail(true);
      const { data } = await axiosInstance.post('/api/auth/resend-verification', {
        email: unverifiedEmail
      });
      showAlert(data.message || 'OTP sent! Please check your inbox.', 'success');
      setShowResendVerification(false);
      setShowOTPModal(true);
    } catch (err) {
      showAlert(err.response?.data?.message || 'Failed to resend OTP', 'danger');
    } finally {
      setResendingEmail(false);
    }
  };

  const handleOTPSuccess = () => {
    setShowOTPModal(false);
    showAlert('Email verified successfully! Please login again.', 'success');
    setShowResendVerification(false);
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
  };

  if (userInfo) {
    navigate('/');
  }

  return (
    <div className="container my-5">
      {showOTPModal && (
        <OTPVerificationModal
          email={unverifiedEmail}
          onClose={handleOTPClose}
          onSuccess={handleOTPSuccess}
        />
      )}
      
      {alertInfo && (
        <Alert 
          message={alertInfo.message} 
          variant={alertInfo.variant} 
          onClose={() => setAlertInfo(null)} 
        />
      )}
      
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                <i className="bi bi-lock-fill me-2"></i>Login
              </h2>
              
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    <i className="bi bi-envelope me-1"></i>Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    <i className="bi bi-key me-1"></i>Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      style={{ paddingRight: '40px' }}
                    />
                    <span 
                      onClick={() => setShowPassword(!showPassword)}
                      className="position-absolute"
                      style={{
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </span>
                  </div>
                </div>

                <div className="mb-3 text-end">
                  <Link to="/forgot-password" className="text-decoration-none small">
                    Forgot Password?
                  </Link>
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </>
                  )}
                </button>

                {/* Resend Verification OTP Button */}
                {showResendVerification && (
                  <div className="alert alert-warning mb-3">
                    <p className="mb-2 small">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Your email is not verified. Please verify your email with OTP.
                    </p>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning w-100"
                      onClick={handleResendVerification}
                      disabled={resendingEmail}
                    >
                      {resendingEmail ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-envelope-fill me-2"></i>
                          Send OTP to Verify Email
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
              
              <div className="text-center mt-3">
                <p className="mb-0">
                  Don't have an account? <Link to="/register" className="fw-bold">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
