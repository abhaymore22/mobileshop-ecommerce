import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../utils/axiosInstance';
import Alert from './Alert';
import { setCredentials } from '../redux/slices/authSlice';

const OTPVerificationModal = ({ email, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length, 5);
    document.getElementById(`otp-${lastIndex}`).focus();
  };

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    if (timer === 0) {
      setError('OTP has expired. Please request a new one.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.post('/api/auth/verify-email', {
        email,
        otp: otpCode
      });

      console.log('✅ OTP verification successful:', data);
      setSuccess(data.message);
      
      // Store user credentials if token is provided
      if (data.token) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch(setCredentials(data));
        console.log('✅ User credentials stored and dispatched');
      }

      // Wait 2.5 seconds to show success message before closing
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 2500);
    } catch (err) {
      console.error('❌ OTP verification error:', err);
      console.error('Error response:', err.response?.data);
      const errorMessage = err.response?.data?.message || 'Verification failed. Please try again.';
      setError(errorMessage);
      
      // Update attempts remaining
      if (err.response?.data?.attemptsRemaining !== undefined) {
        setAttemptsRemaining(err.response.data.attemptsRemaining);
      }
      
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0').focus();
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setResending(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.post('/auth/resend-verification', { email });
      setSuccess(data.message);
      setTimer(600); // Reset timer
      setAttemptsRemaining(5); // Reset attempts
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0').focus();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h5 className="modal-title text-white">
              <i className="bi bi-shield-check me-2"></i>
              Verify Your Email
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <div className="modal-body p-4">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                <strong>{error}</strong>
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}
            {success && (
              <div className="alert alert-success alert-dismissible fade show mb-3" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                <strong>{success}</strong>
              </div>
            )}

            <div className="text-center mb-4">
              <div className="mb-3">
                <i className="bi bi-envelope-check" style={{ fontSize: '3rem', color: '#667eea' }}></i>
              </div>
              <p className="text-muted mb-1">
                We've sent a 6-digit verification code to
              </p>
              <p className="fw-bold mb-0">{email}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label text-center d-block fw-semibold mb-3">
                  Enter Verification Code
                </label>
                <div className="d-flex justify-content-center gap-2" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      className="form-control text-center fs-4 fw-bold"
                      style={{
                        width: '50px',
                        height: '60px',
                        fontSize: '1.5rem',
                        borderColor: digit ? '#667eea' : '#ced4da',
                        opacity: loading ? 0.6 : 1
                      }}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={loading || timer === 0 || success}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-3 text-center">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    Time remaining: <span className={timer < 60 ? 'text-danger fw-bold' : 'fw-semibold'}>
                      {formatTime(timer)}
                    </span>
                  </small>
                  <small className="text-muted">
                    Attempts: <span className={attemptsRemaining <= 2 ? 'text-danger fw-bold' : 'fw-semibold'}>
                      {attemptsRemaining}
                    </span>
                  </small>
                </div>
                
                {timer === 0 ? (
                  <div className="alert alert-warning py-2 mb-0">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    OTP has expired. Please request a new one.
                  </div>
                ) : (
                  <small className="text-muted">
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={handleResend}
                      disabled={resending}
                    >
                      {resending ? 'Sending...' : 'Resend OTP'}
                    </button>
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: loading || success ? '#6c757d' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '600'
                }}
                disabled={loading || timer === 0 || otp.join('').length !== 6 || success}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Verifying...
                  </>
                ) : success ? (
                  <>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Verified! Redirecting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Verify Email
                  </>
                )}
              </button>
            </form>

            <div className="mt-3 p-3 bg-light rounded">
              <small className="text-muted">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Security Tips:</strong>
                <ul className="mb-0 mt-2" style={{ fontSize: '0.85rem' }}>
                  <li>Never share your OTP with anyone</li>
                  <li>OTP is valid for 10 minutes only</li>
                  <li>Check your spam folder if you don't see the email</li>
                </ul>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;
