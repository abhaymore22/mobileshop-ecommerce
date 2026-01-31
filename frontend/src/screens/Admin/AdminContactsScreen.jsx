import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllContacts,
  getContactStats,
  updateContact,
  deleteContact,
  clearContactSuccess,
  clearContactError
} from '../../redux/slices/contactSlice';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';

const AdminContactsScreen = () => {
  const dispatch = useDispatch();
  const { contacts, stats, loading, error, success, message } = useSelector((state) => state.contact);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: ''
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    priority: '',
    response: '',
    adminNotes: ''
  });

  useEffect(() => {
    dispatch(getAllContacts(filters));
    dispatch(getContactStats());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearContactSuccess());
        setShowModal(false);
        setSelectedContact(null);
        dispatch(getAllContacts(filters));
        dispatch(getContactStats());
      }, 2000);
    }
  }, [success, dispatch, filters]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearContactError());
      }, 5000);
    }
  }, [error, dispatch]);

  const handleFilterChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    dispatch(getAllContacts(newFilters));
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setUpdateData({
      status: contact.status,
      priority: contact.priority,
      response: contact.response || '',
      adminNotes: contact.adminNotes || ''
    });
    setShowModal(true);
  };

  const handleUpdateContact = () => {
    dispatch(updateContact({ id: selectedContact._id, updateData }));
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(id));
      dispatch(getContactStats());
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-primary';
      case 'In Progress': return 'bg-warning';
      case 'Resolved': return 'bg-success';
      case 'Closed': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-danger';
      case 'High': return 'bg-warning';
      case 'Medium': return 'bg-info';
      case 'Low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1 fw-bold">
              <i className="bi bi-envelope-check me-2"></i>
              Contact Management
            </h2>
            <p className="text-muted mb-0">Manage customer inquiries and support tickets</p>
          </div>
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => dispatch(getAllContacts(filters))}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => dispatch(clearContactError())}></button>
          </div>
        )}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle me-2"></i>
            {message}
            <button type="button" className="btn-close" onClick={() => dispatch(clearContactSuccess())}></button>
          </div>
        )}

        {/* Statistics Cards */}
        {stats && (
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">Total Contacts</p>
                      <h3 className="mb-0 fw-bold">{stats.total}</h3>
                    </div>
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                      <i className="bi bi-envelope-fill text-primary fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">Open</p>
                      <h3 className="mb-0 fw-bold text-primary">{stats.open}</h3>
                    </div>
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                      <i className="bi bi-inbox-fill text-primary fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">In Progress</p>
                      <h3 className="mb-0 fw-bold text-warning">{stats.inProgress}</h3>
                    </div>
                    <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                      <i className="bi bi-hourglass-split text-warning fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">Urgent</p>
                      <h3 className="mb-0 fw-bold text-danger">{stats.urgent}</h3>
                    </div>
                    <div className="bg-danger bg-opacity-10 rounded-circle p-3">
                      <i className="bi bi-exclamation-circle-fill text-danger fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search contacts..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="form-control border-start-0"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  name="priority"
                  value={filters.priority}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Priority</option>
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Categories</option>
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
          </div>
        </div>

        {/* Contacts Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-bottom">
            <h5 className="mb-0 fw-semibold">
              <i className="bi bi-list-ul me-2"></i>
              Contact Submissions
            </h5>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader />
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-inbox fs-1 text-muted"></i>
                <p className="text-muted mt-3 mb-0">No contacts found</p>
                <p className="text-muted small">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="border-0">
                        <i className="bi bi-person me-1"></i>Contact Info
                      </th>
                      <th className="border-0">
                        <i className="bi bi-chat-left-text me-1"></i>Subject
                      </th>
                      <th className="border-0">
                        <i className="bi bi-tag me-1"></i>Category
                      </th>
                      <th className="border-0">
                        <i className="bi bi-flag me-1"></i>Status
                      </th>
                      <th className="border-0">
                        <i className="bi bi-exclamation-triangle me-1"></i>Priority
                      </th>
                      <th className="border-0">
                        <i className="bi bi-calendar me-1"></i>Date
                      </th>
                      <th className="border-0 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                              <i className="bi bi-person-fill text-primary"></i>
                            </div>
                            <div>
                              <div className="fw-semibold">{contact.name}</div>
                              <small className="text-muted">{contact.email}</small>
                              {contact.isRegisteredUser && (
                                <span className="badge bg-purple ms-1" style={{ fontSize: '0.7rem' }}>
                                  <i className="bi bi-check-circle me-1"></i>Registered
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-truncate" style={{ maxWidth: '200px' }}>
                            {contact.subject}
                          </div>
                        </td>
                        <td>
                          <small className="text-muted">{contact.category}</small>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadgeColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${getPriorityBadgeColor(contact.priority)}`}>
                            {contact.priority}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {new Date(contact.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </small>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => handleViewContact(contact)}
                            className="btn btn-sm btn-outline-primary me-2"
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteContact(contact._id)}
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Contact Details Modal */}
        {showModal && selectedContact && (
          <div 
            className="modal show d-block" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setShowModal(false)}
          >
            <div 
              className="modal-dialog modal-lg modal-dialog-scrollable"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content border-0 shadow-lg">
                {/* Modal Header with Gradient */}
                <div 
                  className="modal-header border-0 text-white position-relative"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    paddingTop: '1.5rem',
                    paddingBottom: '1.5rem'
                  }}
                >
                  <div>
                    <h4 className="modal-title mb-1 fw-bold">
                      <i className="bi bi-envelope-open me-2"></i>
                      Contact Details
                    </h4>
                    <small className="opacity-75">
                      ID: {selectedContact._id}
                    </small>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body p-4">
                  {/* Contact Information Card */}
                  <div className="card border-0 bg-light mb-3">
                    <div className="card-body">
                      <h6 className="card-title text-primary mb-3">
                        <i className="bi bi-person-circle me-2"></i>
                        Contact Information
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="d-flex align-items-start">
                            <i className="bi bi-person-fill text-muted me-2 mt-1"></i>
                            <div>
                              <small className="text-muted d-block">Name</small>
                              <strong>{selectedContact.name}</strong>
                              {selectedContact.isRegisteredUser && (
                                <span className="badge bg-success ms-2" style={{ fontSize: '0.7rem' }}>
                                  <i className="bi bi-check-circle me-1"></i>Registered
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-start">
                            <i className="bi bi-envelope-fill text-muted me-2 mt-1"></i>
                            <div>
                              <small className="text-muted d-block">Email</small>
                              <strong>{selectedContact.email}</strong>
                            </div>
                          </div>
                        </div>
                        {selectedContact.phone && (
                          <div className="col-md-6">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-telephone-fill text-muted me-2 mt-1"></i>
                              <div>
                                <small className="text-muted d-block">Phone</small>
                                <strong>{selectedContact.phone}</strong>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="col-md-6">
                          <div className="d-flex align-items-start">
                            <i className="bi bi-tag-fill text-muted me-2 mt-1"></i>
                            <div>
                              <small className="text-muted d-block">Category</small>
                              <strong>{selectedContact.category}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex align-items-start">
                            <i className="bi bi-chat-left-text-fill text-muted me-2 mt-1"></i>
                            <div className="flex-grow-1">
                              <small className="text-muted d-block">Subject</small>
                              <strong>{selectedContact.subject}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-start">
                            <i className="bi bi-calendar-event text-muted me-2 mt-1"></i>
                            <div>
                              <small className="text-muted d-block">Submitted</small>
                              <strong>
                                {new Date(selectedContact.createdAt).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Card */}
                  <div className="card border-0 bg-light mb-3">
                    <div className="card-body">
                      <h6 className="card-title text-primary mb-3">
                        <i className="bi bi-chat-dots me-2"></i>
                        Message
                      </h6>
                      <div className="bg-white p-3 rounded border" style={{ whiteSpace: 'pre-line' }}>
                        {selectedContact.message}
                      </div>
                    </div>
                  </div>

                  {/* Update Form Card */}
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <h6 className="card-title text-primary mb-3">
                        <i className="bi bi-pencil-square me-2"></i>
                        Update Contact
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            <i className="bi bi-flag me-1"></i>Status
                          </label>
                          <select
                            value={updateData.status}
                            onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                            className="form-select"
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            <i className="bi bi-exclamation-triangle me-1"></i>Priority
                          </label>
                          <select
                            value={updateData.priority}
                            onChange={(e) => setUpdateData({ ...updateData, priority: e.target.value })}
                            className="form-select"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            <i className="bi bi-reply me-1"></i>Response to Customer
                          </label>
                          <textarea
                            value={updateData.response}
                            onChange={(e) => setUpdateData({ ...updateData, response: e.target.value })}
                            rows="4"
                            className="form-control"
                            placeholder="Enter your response to the customer..."
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            <i className="bi bi-lock me-1"></i>Admin Notes 
                            <small className="text-muted ms-2">(Internal only)</small>
                          </label>
                          <textarea
                            value={updateData.adminNotes}
                            onChange={(e) => setUpdateData({ ...updateData, adminNotes: e.target.value })}
                            rows="3"
                            className="form-control"
                            placeholder="Internal notes (not visible to customer)..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer border-0 bg-light">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowModal(false)}
                  >
                    <i className="bi bi-x-circle me-2"></i>Cancel
                  </button>
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    onClick={handleUpdateContact}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>Update Contact
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContactsScreen;
