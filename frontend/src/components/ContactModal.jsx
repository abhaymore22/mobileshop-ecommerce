import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContact, clearContactSuccess, clearContactError } from '../redux/slices/contactSlice';
import Loader from './Loader';

const ContactModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error, success, message } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'General Inquiry'
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen && userInfo) {
      setFormData((prev) => ({
        ...prev,
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || ''
      }));
    }
  }, [isOpen, userInfo]);

  useEffect(() => {
    if (success) {
      // Reset form after successful submission
      setFormData({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        phone: userInfo?.phone || '',
        subject: '',
        message: '',
        category: 'General Inquiry'
      });
      setFormErrors({});

      // Close modal after 2 seconds
      setTimeout(() => {
        dispatch(clearContactSuccess());
        onClose();
      }, 2000);
    }
  }, [success, dispatch, userInfo, onClose]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearContactError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
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
    
    // Clear error for phone field
    if (formErrors.phone) {
      setFormErrors({
        ...formErrors,
        phone: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    // Phone validation (if provided)
    if (formData.phone && !/^\d{3}-\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone format: XXX-XXXXXXXXXX (e.g., 091-9876543210)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(createContact(formData));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          {/* Header */}
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-envelope-heart me-2"></i>
                Get in Touch
              </h4>
              <p className="mb-0 small opacity-90">
                {userInfo ? 'We\'re here to help you!' : 'Send us a message and we\'ll respond shortly'}
              </p>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                <i className="bi bi-check-circle me-2"></i>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Name */}
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control border-start-0 ${formErrors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!!userInfo || loading}
                      placeholder="John Doe"
                    />
                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className={`form-control border-start-0 ${formErrors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!!userInfo || loading}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                  </div>
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label fw-semibold">
                    Phone Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-telephone"></i>
                    </span>
                    <input
                      type="tel"
                      className={`form-control border-start-0 ${formErrors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      disabled={loading}
                      placeholder="091-9876543210"
                      pattern="\d{3}-\d{10}"
                      title="Phone format: XXX-XXXXXXXXXX (e.g., 091-9876543210)"
                    />
                    {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
                  </div>
                  <small className="text-muted">Format: Country Code (3 digits) - Phone Number (10 digits)</small>
                </div>

                {/* Category */}
                <div className="col-md-6">
                  <label htmlFor="category" className="form-label fw-semibold">
                    Category <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-tag"></i>
                    </span>
                    <select
                      className="form-select border-start-0"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Issue">Order Issue</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="col-12">
                  <label htmlFor="subject" className="form-label fw-semibold">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-chat-left-text"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control border-start-0 ${formErrors.subject ? 'is-invalid' : ''}`}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="How can we help you?"
                    />
                    {formErrors.subject && <div className="invalid-feedback">{formErrors.subject}</div>}
                  </div>
                </div>

                {/* Message */}
                <div className="col-12">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                  {formErrors.message && <div className="invalid-feedback">{formErrors.message}</div>}
                  <div className="form-text">
                    <small className="text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      Please provide as much detail as possible (minimum 10 characters)
                    </small>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer border-0 bg-light">
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={onClose}
              disabled={loading}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4"
              onClick={handleSubmit}
              disabled={loading || success}
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : success ? (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Sent!
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
