import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import PasswordResetOTPModal from '../components/PasswordResetOTPModal';

function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const showAlert = (message, variant = 'info') => {
    setAlertInfo({ message, variant });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/api/auth/forgot-password', { email });
      showAlert(data.message || 'OTP sent to your email', 'success');
      setShowOTPModal(true);
      setLoading(false);
    } catch (err) {
      showAlert(err.response?.data?.message || 'Failed to send OTP', 'danger');
      setLoading(false);
    }
  };

  const handleOTPSuccess = () => {
    setShowOTPModal(false);
    showAlert('Password reset successful! You can now login with your new password.', 'success');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
  };

  return (
    <div className="container my-5">
      {showOTPModal && (
        <PasswordResetOTPModal
          email={email}
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
              <div className="text-center mb-4">
                <i className="bi bi-key-fill text-primary" style={{ fontSize: '3rem' }}></i>
                <h2 className="mt-3">Forgot Password?</h2>
                <p className="text-muted">
                  Enter your email and we'll send you an OTP to reset your password
                </p>
              </div>
              
              {loading && <Loader />}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    <i className="bi bi-envelope me-1"></i>Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2"></i>
                      Send OTP
                    </>
                  )}
                </button>
              </form>
              <div className="text-center mt-3">
                <Link to="/login" className="text-decoration-none">
                  <i className="bi bi-arrow-left me-1"></i>
                  Back to Login
                </Link>
              </div>

              <hr className="my-4" />

              <div className="alert alert-info mb-0">
                <small>
                  <i className="bi bi-info-circle me-1"></i>
                  <strong>Note:</strong> This is a demo feature. In production, you would receive an email with a password reset link.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
