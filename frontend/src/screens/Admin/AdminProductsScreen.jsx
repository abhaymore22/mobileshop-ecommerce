import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct, approveProduct, toggleProductActivation } from '../../redux/slices/productSlice';
import { fetchCategories } from '../../redux/slices/categorySlice';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function AdminProductsScreen() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [formData, setFormData] = useState({
    brand: '',
    modelName: '',
    description: '',
    price: '',
    discount: 0,
    stock: '',
    categoryID: '',
    ram: '',
    storage: '',
    color: ''
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts({ showAll: true }));
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('modelName', formData.modelName);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('discount', formData.discount);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('categoryID', formData.categoryID);
    formDataToSend.append('specs', JSON.stringify({
      ram: formData.ram,
      storage: formData.storage,
      color: formData.color
    }));
    
    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        formDataToSend.append('images', imageFiles[i]);
      }
    }

    if (editMode) {
      await dispatch(updateProduct({ id: currentProduct._id, formData: formDataToSend }));
    } else {
      await dispatch(createProduct(formDataToSend));
    }
    
    dispatch(fetchProducts({ showAll: true }));
    resetForm();
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      brand: product.brand,
      modelName: product.modelName,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      categoryID: product.categoryID._id || product.categoryID,
      ram: product.specs?.ram || '',
      storage: product.specs?.storage || '',
      color: product.specs?.color || ''
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(id));
      dispatch(fetchProducts({ showAll: true }));
    }
  };

  const handleApprove = async (id) => {
    await dispatch(approveProduct(id));
    dispatch(fetchProducts({ showAll: true }));
  };

  const handleToggleActive = async (id) => {
    await dispatch(toggleProductActivation(id));
    dispatch(fetchProducts({ showAll: true }));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortedProducts = () => {
    if (!sortField) return products;

    return [...products].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle nested properties
      if (sortField === 'isApproved' || sortField === 'isActive') {
        aValue = a[sortField] ? 1 : 0;
        bValue = b[sortField] ? 1 : 0;
      }

      // Handle numeric fields
      if (sortField === 'price' || sortField === 'stock') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      // Handle string fields (case-insensitive)
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
    setFormData({
      brand: '',
      modelName: '',
      description: '',
      price: '',
      discount: 0,
      stock: '',
      categoryID: '',
      ram: '',
      storage: '',
      color: ''
    });
    setImageFiles([]);
    setCurrentProduct(null);
    setEditMode(false);
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Product
        </button>
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
                      onClick={() => handleSort('brand')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Brand <SortIcon field="brand" />
                    </th>
                    <th 
                      onClick={() => handleSort('modelName')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Model <SortIcon field="modelName" />
                    </th>
                    <th 
                      onClick={() => handleSort('price')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Price <SortIcon field="price" />
                    </th>
                    <th 
                      onClick={() => handleSort('stock')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Stock <SortIcon field="stock" />
                    </th>
                    <th 
                      onClick={() => handleSort('isApproved')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Approved <SortIcon field="isApproved" />
                    </th>
                    <th 
                      onClick={() => handleSort('isActive')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Active <SortIcon field="isActive" />
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedProducts().map((product) => (
                    <tr key={product._id}>
                      <td>
                        {product.images?.[0] && (
                          <img
                            src={`http://localhost:5000${product.images[0]}`}
                            alt={product.modelName}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        )}
                      </td>
                      <td>{product.brand}</td>
                      <td>{product.modelName}</td>
                      <td>RS {product.price}</td>
                      <td>
                        <span className={`badge ${product.stock === 0 ? 'bg-danger' : product.stock < 10 ? 'bg-warning' : 'bg-success'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${product.isApproved ? 'success' : 'warning'}`}>
                          {product.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${product.isActive ? 'success' : 'secondary'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          {userInfo?.role === 'admin' && !product.isApproved && (
                            <button
                              className="btn btn-success"
                              onClick={() => handleApprove(product._id)}
                            >
                              Approve
                            </button>
                          )}
                          {userInfo?.role === 'admin' && (
                            <>
                              <button
                                className={`btn ${product.isActive ? 'btn-secondary' : 'btn-info'}`}
                                onClick={() => handleToggleActive(product._id)}
                                title={product.isActive ? 'Deactivate' : 'Activate'}
                              >
                                {product.isActive ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(product._id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
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
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? 'Edit Product' : 'Add New Product'}</h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Model Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.modelName}
                        onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Discount (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={formData.categoryID}
                      onChange={(e) => setFormData({ ...formData, categoryID: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">RAM</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.ram}
                        onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                        placeholder="e.g., 8GB"
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Storage</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.storage}
                        onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                        placeholder="e.g., 256GB"
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Color</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        placeholder="e.g., Black"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Product Images (Max 5)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={(e) => setImageFiles(Array.from(e.target.files).slice(0, 5))}
                    />
                    <small className="text-muted">You can select up to 5 images</small>
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

export default AdminProductsScreen;
