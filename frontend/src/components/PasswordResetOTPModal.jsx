import { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const PasswordResetOTPModal = ({ email, onClose, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    // Check if password contains single or double quotes
    if (password.includes("'") || password.includes('"')) {
      return 'Password cannot contain single or double quotes';
    }
    
    // Check minimum length
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    
    // Check for lowercase
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    
    // Check for uppercase
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    
    // Check for digit
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one digit';
    }
    
    // Check for special character (excluding single and double quotes)
    if (!/[!@#$%^&*()_+\-=\[\]{};:,.<>?/|`~]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    
    return null; // Valid password
  };

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !otpVerified) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, otpVerified]);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`reset-otp-${index + 1}`).focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`reset-otp-${index - 1}`).focus();
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

    const lastIndex = Math.min(pastedData.length, 5);
    document.getElementById(`reset-otp-${lastIndex}`).focus();
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
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

    setVerifying(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.post('/api/auth/verify-reset-otp', {
        email,
        otp: otpCode
      });

      console.log('✅ Password reset OTP verified:', data);
      setSuccess('OTP verified! Now set your new password.');
      setOtpVerified(true);
    } catch (err) {
      console.error('❌ OTP verification error:', err);
      const errorMessage = err.response?.data?.message || 'Verification failed. Please try again.';
      setError(errorMessage);
      
      if (err.response?.data?.attemptsRemaining !== undefined) {
        setAttemptsRemaining(err.response.data.attemptsRemaining);
      }
      
      setOtp(['', '', '', '', '', '']);
      document.getElementById('reset-otp-0').focus();
    } finally {
      setVerifying(false);
    }
  };

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Validate password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('/api/auth/reset-password', {
        email,
        otp: otp.join(''),
        newPassword
      });

      console.log('✅ Password reset successful:', data);
      setSuccess(data.message);
      
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
    } catch (err) {
      console.error('❌ Password reset error:', err);
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
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
      const { data } = await axios.post('/api/auth/forgot-password', { email });
      setSuccess(data.message);
      setTimer(600);
      setAttemptsRemaining(5);
      setOtp(['', '', '', '', '', '']);
      setOtpVerified(false);
      document.getElementById('reset-otp-0').focus();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h5 className="modal-title text-white">
              <i className="bi bi-key-fill me-2"></i>
              Reset Password
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading || verifying}
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

            {!otpVerified ? (
              <>
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-shield-lock" style={{ fontSize: '3rem', color: '#667eea' }}></i>
                  </div>
                  <p className="text-muted mb-1">
                    Enter the 6-digit code sent to
                  </p>
                  <p className="fw-bold mb-0">{email}</p>
                </div>

                <form onSubmit={handleVerifyOTP}>
                  <div className="mb-4">
                    <label className="form-label text-center d-block fw-semibold mb-3">
                      Enter OTP Code
                    </label>
                    <div className="d-flex justify-content-center gap-2" onPaste={handlePaste}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`reset-otp-${index}`}
                          type="text"
                          maxLength="1"
                          className="form-control text-center fs-4 fw-bold"
                          style={{
                            width: '50px',
                            height: '60px',
                            fontSize: '1.5rem',
                            borderColor: digit ? '#667eea' : '#ced4da',
                            opacity: verifying ? 0.6 : 1
                          }}
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          disabled={verifying || timer === 0}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-3 text-center">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">
                        <i className="bi bi-clock me-1"></i>
                        Time: <span className={timer < 60 ? 'text-danger fw-bold' : 'fw-semibold'}>
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
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: '600'
                    }}
                    disabled={verifying || timer === 0 || otp.join('').length !== 6}
                  >
                    {verifying ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Verify OTP
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="text-center mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                  <h5 className="mt-2">OTP Verified!</h5>
                  <p className="text-muted">Now set your new password</p>
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    <i className="bi bi-lock me-1"></i>
                    New Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      minLength="6"
                      disabled={loading}
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
                  <small className="text-muted d-block">Must contain: 1 uppercase, 1 lowercase, 1 digit, 1 special character (min 6 chars)</small>
                  <small className="text-muted">Note: Single quotes (') and double quotes (") are not allowed</small>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    <i className="bi bi-lock-fill me-1"></i>
                    Confirm Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                      disabled={loading}
                      style={{ paddingRight: '40px' }}
                    />
                    <span 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="position-absolute"
                      style={{
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: '600'
                  }}
                  disabled={loading || !newPassword || !confirmPassword}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-key-fill me-2"></i>
                      Reset Password
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetOTPModal;
