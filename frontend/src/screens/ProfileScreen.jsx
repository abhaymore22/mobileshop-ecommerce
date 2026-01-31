import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { updateUserInfo } from '../redux/slices/authSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Alert from '../components/Alert';

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setError(null); // Clear any previous errors
      fetchProfile();
    }
  }, [userInfo, navigate]);

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

  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);
      setError(null);
      console.log('Fetching profile from /api/users/profile');
      const { data } = await axiosInstance.get('/api/users/profile');
      console.log('Profile data received:', data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        password: '',
        confirmPassword: ''
      });
      setLoadingProfile(false);
    } catch (err) {
      console.error('Profile fetch error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || 'Failed to load profile';
      setError(errorMessage);
      showAlert(errorMessage, 'danger');
      setLoadingProfile(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate password if provided
    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        showAlert(passwordError, 'warning');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        showAlert('Passwords do not match', 'warning');
        return;
      }
    }

    try {
      setLoading(true);
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const { data } = await axiosInstance.put('/api/users/profile', updateData);
      
      // Update userInfo in Redux store
      dispatch(updateUserInfo(data));
      
      showAlert('Profile updated successfully!', 'success');
      setFormData({ ...formData, password: '', confirmPassword: '' });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      showAlert(err.response?.data?.message || 'Failed to update profile', 'danger');
      setLoading(false);
    }
  };

  if (loadingProfile) {
    return <Loader />;
  }

  return (
    <div className="container my-5">
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
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="bi bi-person-circle me-2"></i>
                My Profile
              </h3>
            </div>
            <div className="card-body p-4">
              {error && <Message variant="danger">{error}</Message>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    <i className="bi bi-person me-1"></i>Full Name
                  </label>
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
                  <label htmlFor="email" className="form-label fw-bold">
                    <i className="bi bi-envelope me-1"></i>Email
                  </label>
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
                  <label htmlFor="phone" className="form-label fw-bold">
                    <i className="bi bi-telephone me-1"></i>Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-bold">
                    <i className="bi bi-geo-alt me-1"></i>Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <hr className="my-4" />
                
                <h5 className="mb-3">
                  <i className="bi bi-lock me-2"></i>Change Password
                  <small className="text-muted d-block mt-1" style={{fontSize: '0.85rem'}}>
                    Leave blank to keep current password
                  </small>
                </h5>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">New Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password (optional)"
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
                  <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm New Password</label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
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

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Update Profile
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="fw-bold">
                  <i className="bi bi-info-circle me-2"></i>Account Information
                </h6>
                <ul className="list-unstyled mb-0 mt-2">
                  <li><strong>Role:</strong> <span className="badge bg-secondary">{userInfo?.role || 'user'}</span></li>
                  {userInfo?.createdAt && (
                    <li className="mt-2">
                      <strong>Account Created:</strong> {new Date(userInfo.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
