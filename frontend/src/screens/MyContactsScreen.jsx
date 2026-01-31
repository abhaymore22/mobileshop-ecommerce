import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyContacts } from '../redux/slices/contactSlice';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const MyContactsScreen = () => {
  const dispatch = useDispatch();
  const { myContacts, loading, error } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getMyContacts());
  }, [dispatch]);

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
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">My Contacts & Support Tickets</h1>
        <Link to="/contact" className="btn btn-primary">
          Submit New Contact
        </Link>
      </div>

      {error && <Alert type="error">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Loader />
        </div>
      ) : myContacts.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <svg className="mx-auto" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>No contacts yet</h3>
          <p className="text-muted">You haven't submitted any contact forms or support tickets.</p>
          <Link to="/contact" className="btn btn-primary mt-3">
            Submit Your First Contact
          </Link>
        </div>
      ) : (
        <div className="row">
          {myContacts.map((contact) => (
            <div key={contact._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-white border-bottom-0 pt-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <span className={`badge ${getStatusBadgeColor(contact.status)}`}>
                      {contact.status}
                    </span>
                    <span className={`badge ${getPriorityBadgeColor(contact.priority)}`}>
                      {contact.priority}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-truncate" title={contact.subject}>
                    {contact.subject}
                  </h5>
                  <p className="card-text">
                    <small className="text-muted">
                      <strong>Category:</strong> {contact.category}
                    </small>
                  </p>
                  <p className="card-text text-muted" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {contact.message}
                  </p>
                  
                  {contact.response && (
                    <div className="alert alert-success mt-3 mb-0">
                      <strong>Response:</strong>
                      <p className="mb-0 mt-2" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {contact.response}
                      </p>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-white border-top-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </small>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#contactModal${contact._id}`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal for full details */}
              <div className="modal fade" id={`contactModal${contact._id}`} tabIndex="-1">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{contact.subject}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                      <div className="row mb-3">
                        <div className="col-6">
                          <strong>Status:</strong>
                          <span className={`badge ${getStatusBadgeColor(contact.status)} ms-2`}>
                            {contact.status}
                          </span>
                        </div>
                        <div className="col-6">
                          <strong>Priority:</strong>
                          <span className={`badge ${getPriorityBadgeColor(contact.priority)} ms-2`}>
                            {contact.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Category:</strong> {contact.category}
                      </div>
                      
                      <div className="mb-3">
                        <strong>Submitted:</strong> {new Date(contact.createdAt).toLocaleString()}
                      </div>
                      
                      {contact.updatedAt !== contact.createdAt && (
                        <div className="mb-3">
                          <strong>Last Updated:</strong> {new Date(contact.updatedAt).toLocaleString()}
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <strong>Your Message:</strong>
                        <div className="border rounded p-3 mt-2 bg-light">
                          {contact.message}
                        </div>
                      </div>
                      
                      {contact.response && (
                        <div className="alert alert-success">
                          <strong>Our Response:</strong>
                          <div className="mt-2">
                            {contact.response}
                          </div>
                        </div>
                      )}
                      
                      {contact.resolvedAt && (
                        <div className="mb-3">
                          <strong>Resolved At:</strong> {new Date(contact.resolvedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContactsScreen;
