import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Alert from '../../components/Alert';

function AdminUsersScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const showAlert = (message, variant = 'info') => {
    setAlertInfo({ message, variant });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/users');
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosInstance.put(`/api/users/${userId}`, { role: newRole });
      fetchUsers();
      showAlert('User role updated successfully', 'success');
    } catch (err) {
      showAlert(err.response?.data?.message || 'Failed to update user', 'danger');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axiosInstance.delete(`/api/users/${userId}`);
        fetchUsers();
        showAlert('User deleted successfully', 'success');
      } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to delete user', 'danger');
      }
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortedUsers = () => {
    if (!sortField) return users;

    return [...users].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'createdAt') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue || '').toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-muted ms-1">⇅</span>;
    return sortOrder === 'asc' ? <span className="ms-1">↑</span> : <span className="ms-1">↓</span>;
  };

  if (userInfo?.role !== 'admin') {
    return (
      <AdminLayout>
        <Message variant="danger">Access denied. Admin only.</Message>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {alertInfo && (
        <Alert 
          message={alertInfo.message} 
          variant={alertInfo.variant} 
          onClose={() => setAlertInfo(null)} 
        />
      )}
      
      <h2 className="mb-4">Manage Users</h2>

      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="d-lg-none">
            {getSortedUsers().map((user) => (
              <div key={user._id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h6 className="card-title mb-1">{user.name}</h6>
                      <p className="text-muted small mb-1">{user.email}</p>
                      <p className="text-muted small mb-0">{user.phone || 'No phone'}</p>
                    </div>
                    <span className={`badge bg-${
                      user.role === 'admin' ? 'danger' :
                      user.role === 'staff' ? 'warning' :
                      'primary'
                    }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <small className="text-muted">Joined: {new Date(user.createdAt).toLocaleDateString()}</small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small mb-1">Change Role</label>
                    <select
                      className="form-select form-select-sm"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      disabled={user._id === userInfo._id}
                    >
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-sm btn-danger w-100"
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={user._id === userInfo._id}
                  >
                    {user._id === userInfo._id ? 'Cannot Delete Self' : (
                      <><i className="bi bi-trash"></i> Delete User</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="card d-none d-lg-block">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th 
                      onClick={() => handleSort('name')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Name <SortIcon field="name" />
                    </th>
                    <th 
                      onClick={() => handleSort('email')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Email <SortIcon field="email" />
                    </th>
                    <th 
                      onClick={() => handleSort('phone')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Phone <SortIcon field="phone" />
                    </th>
                    <th 
                      onClick={() => handleSort('role')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Role <SortIcon field="role" />
                    </th>
                    <th 
                      onClick={() => handleSort('createdAt')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Joined <SortIcon field="createdAt" />
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedUsers().map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || 'N/A'}</td>
                      <td>
                        <select
                          className={`form-select form-select-sm badge bg-${
                            user.role === 'admin' ? 'danger' :
                            user.role === 'staff' ? 'warning' :
                            'primary'
                          }`}
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          style={{ border: 'none' }}
                          disabled={user._id === userInfo._id}
                        >
                          <option value="user">User</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={user._id === userInfo._id}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      )}
    </AdminLayout>
  );
}

export default AdminUsersScreen;
