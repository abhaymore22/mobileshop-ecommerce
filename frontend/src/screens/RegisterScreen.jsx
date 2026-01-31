import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../redux/slices/authSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import OTPVerificationModal from '../components/OTPVerificationModal';

function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: ''
  });
  const [alertInfo, setAlertInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.auth);

  const showAlert = (message, variant = 'info') => {
    setAlertInfo({ message, variant });
  };

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
    
    if (value.length > 13) {
      value = value.slice(0, 13); // Max 13 digits (3 + 10)
    }
    
    // Format as XXX-XXXXXXXXXX
    if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }
    
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      showAlert(passwordError, 'warning');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      showAlert('Passwords do not match', 'warning');
      return;
    }
    
    // Validate phone format
    if (formData.phone && !/^\d{3}-\d{10}$/.test(formData.phone)) {
      showAlert('Phone number must be in format: XXX-XXXXXXXXXX (e.g., 091-9876543210)', 'warning');
      return;
    }
    
    const result = await dispatch(register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      phone: formData.phone
    }));
    
    if (result.type === 'auth/register/fulfilled') {
      setRegisteredEmail(formData.email);
      setShowOTPModal(true);
      showAlert('Registration successful! Please check your email for the OTP code.', 'success');
    }
  };

  const handleOTPSuccess = () => {
    setShowOTPModal(false);
    showAlert('Email verified successfully! Redirecting to home...', 'success');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
    showAlert('Please verify your email before logging in. You can complete verification from the login page.', 'warning');
    // Redirect to login page
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  // Only redirect if user is verified and logged in
  if (userInfo && userInfo.isEmailVerified) {
    navigate('/');
  }

  return (
    <div className="container my-5">
      {showOTPModal && (
        <OTPVerificationModal
          email={registeredEmail}
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
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Register</h2>
              
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="6"
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
                
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
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
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="091-9876543210"
                    pattern="\d{3}-\d{10}"
                    title="Phone format: XXX-XXXXXXXXXX (e.g., 091-9876543210)"
                  />
                  <small className="text-muted">Format: Country Code (3 digits) - Phone Number (10 digits)</small>
                </div>
                
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  Register
                </button>
              </form>
              
              <div className="text-center mt-3">
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
