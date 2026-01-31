import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Loader from '../components/Loader';

function VerifyEmailScreen() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      console.log('🔍 Verifying email with token:', token);
      const { data } = await axiosInstance.get(`/api/auth/verify-email/${token}`);
      console.log('✅ Verification successful:', data);
      setSuccess(true);
      setError('');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('❌ Verification failed:', err.response?.data);
      setError(err.response?.data?.message || 'Email verification failed');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg">
            {/* Header with Gradient */}
            <div
              className="card-header text-white text-center border-0"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '2rem'
              }}
            >
              <i className="bi bi-envelope-check-fill" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3 mb-0">Email Verification</h3>
            </div>

            <div className="card-body p-5 text-center">
              {loading ? (
                <>
                  <Loader />
                  <p className="mt-3 text-muted">Verifying your email...</p>
                </>
              ) : success ? (
                <>
                  <div
                    className="mb-4"
                    style={{
                      fontSize: '4rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <h4 className="mb-3">Email Verified Successfully! 🎉</h4>
                  <p className="text-muted mb-4">
                    Your email has been verified. You can now access all features of MobileShop.
                  </p>
                  <div className="alert alert-success">
                    <i className="bi bi-info-circle me-2"></i>
                    Redirecting to login page in 3 seconds...
                  </div>
                  <button
                    onClick={() => navigate('/login')}
                    className="btn text-white btn-lg mt-3"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    Go to Login Now
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="mb-4"
                    style={{ fontSize: '4rem', color: '#dc3545' }}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </div>
                  <h4 className="mb-3">Verification Failed</h4>
                  <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                  <p className="text-muted mb-4">
                    The verification link may have expired or is invalid.
                  </p>
                  <div className="d-grid gap-2">
                    <button
                      onClick={() => navigate('/register')}
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      Register Again
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      className="btn btn-outline-secondary"
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Back to Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailScreen;
