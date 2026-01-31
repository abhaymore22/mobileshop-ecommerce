import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../redux/slices/categorySlice';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Alert from '../../components/Alert';

function AdminCategoriesScreen() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [formData, setFormData] = useState({
    name: '',
    isActive: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const showAlert = (message, variant = 'info') => {
    setAlertInfo({ message, variant });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('isActive', formData.isActive);
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      if (editMode) {
        await dispatch(updateCategory({ id: currentCategory._id, formData: formDataToSend })).unwrap();
        showAlert('Category updated successfully!', 'success');
      } else {
        await dispatch(createCategory(formDataToSend)).unwrap();
        showAlert('Category created successfully!', 'success');
      }
      
      dispatch(fetchCategories());
      resetForm();
    } catch (err) {
      console.error('Category operation failed:', err);
      showAlert(err || 'Failed to save category. Please try again.', 'danger');
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      isActive: category.isActive
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
        showAlert('Category deleted successfully!', 'success');
        dispatch(fetchCategories());
      } catch (err) {
        console.error('Delete failed:', err);
        showAlert(err || 'Failed to delete category. Please try again.', 'danger');
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

  const getSortedCategories = () => {
    if (!sortField) return categories;

    return [...categories].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'isActive') {
        aValue = a[sortField] ? 1 : 0;
        bValue = b[sortField] ? 1 : 0;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
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

  const resetForm = () => {
    setFormData({ name: '', isActive: true });
    setImageFile(null);
    setCurrentCategory(null);
    setEditMode(false);
    setShowModal(false);
  };

  return (
    <AdminLayout>
      {alertInfo && (
        <Alert 
          message={alertInfo.message} 
          variant={alertInfo.variant} 
          onClose={() => setAlertInfo(null)} 
        />
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Categories</h2>
        {userInfo?.role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New Category
          </button>
        )}
      </div>

      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th 
                      onClick={() => handleSort('name')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Name <SortIcon field="name" />
                    </th>
                    <th 
                      onClick={() => handleSort('isActive')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Status <SortIcon field="isActive" />
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedCategories().map((category) => (
                    <tr key={category._id}>
                      <td>
                        {category.imagePath && (
                          <img
                            src={`http://localhost:5000${category.imagePath}`}
                            alt={category.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        )}
                      </td>
                      <td>{category.name}</td>
                      <td>
                        <span className={`badge bg-${category.isActive ? 'success' : 'secondary'}`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        {userInfo?.role === 'admin' ? (
                          <>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEdit(category)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(category._id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className="badge bg-secondary">View Only</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? 'Edit Category' : 'Add New Category'}</h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Active
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editMode ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminCategoriesScreen;
