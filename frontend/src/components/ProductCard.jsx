import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlist?.products?.some(p => p._id === product._id);
  
  const handleAddToCart = () => {
    if (!userInfo) {
      alert('Please login to add items to cart');
      return;
    }
    if (product.stock === 0) {
      alert('Product is out of stock');
      return;
    }
    dispatch(addToCart({ productID: product._id, qty: 1 }));
  };

  const handleWishlistToggle = () => {
    if (!userInfo) {
      alert('Please login to add items to wishlist');
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const discountedPrice = product.price - (product.price * product.discount / 100);
  
  // Handle both Cloudinary URLs (absolute) and local paths (relative)
  const imageUrl = product.images?.[0] 
    ? (product.images[0].startsWith('http') ? product.images[0] : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.images[0]}`)
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className={`card h-100 shadow-sm ${product.stock === 0 ? 'opacity-75' : ''}`}>
      <div className="position-relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt={product.modelName}
            style={{ height: '250px', objectFit: 'cover' }}
          />
        </Link>
        {product.stock === 0 && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <span className="badge bg-danger fs-5">OUT OF STOCK</span>
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title mb-0">{product.brand}</h6>
          {userInfo && (
            <button
              className="btn btn-sm btn-link p-0"
              onClick={handleWishlistToggle}
              style={{ fontSize: '1.2rem' }}
            >
              {isInWishlist ? '❤️' : '🤍'}
            </button>
          )}
        </div>
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
          <p className="card-text mb-2">{product.modelName}</p>
        </Link>
        
        <div className="mb-2">
          <span className="text-warning">
            {'⭐'.repeat(Math.round(product.ratings))}
          </span>
          <small className="text-muted ms-1">({product.reviewsCount})</small>
        </div>
        
        <div className="mb-2">
          {product.discount > 0 ? (
            <>
              <span className="h5 text-success mb-0">RS {discountedPrice.toFixed(2)}</span>
              <span className="text-muted text-decoration-line-through ms-2">
                RS {product.price.toFixed(2)}
              </span>
              <span className="badge bg-danger ms-2">{product.discount}% OFF</span>
            </>
          ) : (
            <span className="h5 text-success mb-0">RS {product.price.toFixed(2)}</span>
          )}
        </div>
        
        <div className="mb-2">
          {product.stock > 0 ? (
            <span className="badge bg-success">In Stock ({product.stock})</span>
          ) : (
            <span className="badge bg-danger">Out of Stock</span>
          )}
        </div>
        
        <div className="mt-auto">
          <button
            className="btn btn-primary w-100"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
