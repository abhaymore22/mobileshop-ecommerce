import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchRelatedProducts } from '../redux/slices/productSlice';
import { addToCart, getCart } from '../redux/slices/cartSlice';
import { getProductReviews, createReview, deleteReview } from '../redux/slices/reviewSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Alert from '../components/Alert';

function ProductDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, relatedProducts, loading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.reviews);
  
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [alertInfo, setAlertInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchRelatedProducts(id));
    dispatch(getProductReviews(id));
  }, [dispatch, id]);

  const showAlert = (message, variant = 'info') => {
    setAlertInfo({ message, variant });
  };

  const handleAddToCart = async () => {
    if (!userInfo) {
      showAlert('Please login to add items to cart', 'warning');
      return;
    }
    
    try {
      await dispatch(addToCart({ productID: id, qty })).unwrap();
      showAlert('Added to cart!', 'success');
      // Refresh cart to update count
      dispatch(getCart());
    } catch (error) {
      showAlert(error || 'Failed to add to cart', 'danger');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      showAlert('Please login to write a review', 'warning');
      return;
    }
    
    if (!comment.trim()) {
      showAlert('Please write a comment', 'warning');
      return;
    }
    
    try {
      await dispatch(createReview({ productID: id, rating, comment })).unwrap();
      setRating(5);
      setComment('');
      showAlert('Review submitted successfully!', 'success');
      dispatch(fetchProductById(id)); // Refresh product to update ratings
    } catch (error) {
      showAlert(error || 'Failed to submit review. You may have already reviewed this product.', 'danger');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await dispatch(deleteReview(reviewId)).unwrap();
        showAlert('Review deleted successfully', 'success');
        dispatch(fetchProductById(id)); // Refresh product to update ratings
      } catch (error) {
        showAlert(error || 'Failed to delete review', 'danger');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-warning fs-5">★</span>);
      } else {
        stars.push(<span key={i} className="text-muted fs-5">☆</span>);
      }
    }
    return stars;
  };

  if (loading || !product) {
    return <Loader />;
  }

  const discountedPrice = product.price - (product.price * product.discount / 100);
  const images = product.images?.length > 0 
    ? product.images.map(img => `http://localhost:5000${img}`)
    : ['https://via.placeholder.com/500x500?text=No+Image'];

  return (
    <div className="container my-4">
      {alertInfo && (
        <Alert 
          message={alertInfo.message} 
          variant={alertInfo.variant} 
          onClose={() => setAlertInfo(null)} 
        />
      )}
      
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
          <li className="breadcrumb-item active">{product.modelName}</li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Images */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <img
              src={images[activeImage]}
              className="card-img-top"
              alt={product.modelName}
              style={{ height: '400px', objectFit: 'contain' }}
            />
          </div>
          {images.length > 1 && (
            <div className="d-flex gap-2 mt-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.modelName} ${idx + 1}`}
                  className={`img-thumbnail ${activeImage === idx ? 'border-primary' : ''}`}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => setActiveImage(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2>{product.brand} {product.modelName}</h2>
          
          <div className="mb-3">
            <span className="text-warning">
              {'⭐'.repeat(Math.round(product.ratings))}
            </span>
            <span className="text-muted ms-2">({product.reviewsCount} reviews)</span>
          </div>
          
          <div className="mb-3">
            {product.discount > 0 ? (
              <>
                <h3 className="text-success mb-0">RS {discountedPrice.toFixed(2)}</h3>
                <span className="text-muted text-decoration-line-through">
                  RS {product.price.toFixed(2)}
                </span>
                <span className="badge bg-danger ms-2">{product.discount}% OFF</span>
              </>
            ) : (
              <h3 className="text-success">RS {product.price.toFixed(2)}</h3>
            )}
          </div>
          
          <div className="mb-3">
            {product.stock > 0 ? (
              <span className="badge bg-success">In Stock ({product.stock} available)</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </div>
          
          <p className="mb-4">{product.description}</p>
          
          {/* Specifications */}
          {product.specs && (
            <div className="mb-4">
              <h5>Specifications</h5>
              <table className="table table-sm table-bordered">
                <tbody>
                  {product.specs.ram && (
                    <tr>
                      <th style={{ width: '30%' }}>RAM</th>
                      <td>{product.specs.ram}</td>
                    </tr>
                  )}
                  {product.specs.storage && (
                    <tr>
                      <th>Storage</th>
                      <td>{product.specs.storage}</td>
                    </tr>
                  )}
                  {product.specs.color && (
                    <tr>
                      <th>Color</th>
                      <td>{product.specs.color}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Add to Cart */}
          {product.stock > 0 ? (
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <select
                className="form-select mb-3"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                style={{ maxWidth: '100px' }}
              >
                {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              
              <button className="btn btn-primary btn-lg w-100" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              <strong>Out of Stock</strong> - This product is currently unavailable
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">
            <i className="bi bi-star-fill text-warning me-2"></i>
            Customer Reviews & Ratings
          </h3>
          
          {/* Average Rating Display */}
          {reviews.length > 0 && (
            <div className="card mb-4 border-warning">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center border-end">
                    <h1 className="display-4 fw-bold text-warning mb-0">{product.ratings?.toFixed(1)}</h1>
                    <div className="mb-2">{renderStars(Math.round(product.ratings))}</div>
                    <p className="text-muted mb-0">{product.reviewsCount} Reviews</p>
                  </div>
                  <div className="col-md-9">
                    <p className="mb-2 text-muted">Based on {product.reviewsCount} customer reviews</p>
                    <div className="d-flex align-items-center mb-1">
                      <span className="me-2" style={{minWidth: '60px'}}>5 Stars</span>
                      <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                        <div 
                          className="progress-bar bg-warning" 
                          style={{width: `${(reviews.filter(r => r.rating === 5).length / reviews.length) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-muted">{reviews.filter(r => r.rating === 5).length}</span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <span className="me-2" style={{minWidth: '60px'}}>4 Stars</span>
                      <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                        <div 
                          className="progress-bar bg-warning" 
                          style={{width: `${(reviews.filter(r => r.rating === 4).length / reviews.length) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-muted">{reviews.filter(r => r.rating === 4).length}</span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <span className="me-2" style={{minWidth: '60px'}}>3 Stars</span>
                      <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                        <div 
                          className="progress-bar bg-warning" 
                          style={{width: `${(reviews.filter(r => r.rating === 3).length / reviews.length) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-muted">{reviews.filter(r => r.rating === 3).length}</span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <span className="me-2" style={{minWidth: '60px'}}>2 Stars</span>
                      <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                        <div 
                          className="progress-bar bg-warning" 
                          style={{width: `${(reviews.filter(r => r.rating === 2).length / reviews.length) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-muted">{reviews.filter(r => r.rating === 2).length}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-2" style={{minWidth: '60px'}}>1 Star</span>
                      <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                        <div 
                          className="progress-bar bg-warning" 
                          style={{width: `${(reviews.filter(r => r.rating === 1).length / reviews.length) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-muted">{reviews.filter(r => r.rating === 1).length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {userInfo && (
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0"><i className="bi bi-pencil-square me-2"></i>Write Your Review</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Your Rating</label>
                    <div className="d-flex align-items-center gap-3">
                      <select
                        className="form-select"
                        style={{maxWidth: '200px'}}
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Good</option>
                        <option value="3">⭐⭐⭐ Average</option>
                        <option value="2">⭐⭐ Poor</option>
                        <option value="1">⭐ Terrible</option>
                      </select>
                      <span className="text-muted">Select a rating</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Your Review</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about this product..."
                      required
                    ></textarea>
                    <small className="text-muted">Minimum 10 characters</small>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <i className="bi bi-send me-2"></i>Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
          
          {!userInfo && (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              Please <Link to="/login" className="alert-link">login</Link> to write a review
            </div>
          )}
          
          <h4 className="mb-3">All Reviews ({reviews.length})</h4>
          
          {reviews.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-chat-left-text display-1 text-muted mb-3"></i>
                <p className="text-muted mb-0">No reviews yet. Be the first to review this product!</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {reviews.map((review) => (
                <div key={review._id} className="col-12 mb-3">
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                               style={{width: '50px', height: '50px', fontSize: '1.5rem'}}>
                            {review.userID?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{review.userID?.name || 'Anonymous'}</h6>
                            <small className="text-muted">
                              <i className="bi bi-clock me-1"></i>
                              {formatDate(review.createdAt)}
                            </small>
                          </div>
                        </div>
                        {(userInfo?._id === review.userID?._id || 
                          userInfo?.role === 'admin' || 
                          userInfo?.role === 'staff') && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteReview(review._id)}
                            title="Delete review"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex align-items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="badge bg-warning text-dark ms-2">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                      
                      <p className="mb-0 text-dark" style={{lineHeight: '1.6'}}>
                        {review.comment}
                      </p>
                      
                      {(userInfo?.role === 'admin' || userInfo?.role === 'staff') && (
                        <div className="mt-3 pt-3 border-top">
                          <span className="badge bg-secondary">
                            <i className="bi bi-shield-check me-1"></i>
                            Admin/Staff can delete this review
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="mb-4">Related Products</h3>
            <div className="row g-4">
              {relatedProducts.map((prod) => (
                <div key={prod._id} className="col-6 col-md-3">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailScreen;
