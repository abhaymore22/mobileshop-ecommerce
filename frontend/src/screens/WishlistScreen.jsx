import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

function WishlistScreen() {
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      dispatch(getWishlist());
    }
  }, [dispatch, userInfo]);

  if (!userInfo) {
    return (
      <div className="container my-5">
        <Message variant="info">
          Please <Link to="/login">login</Link> to view your wishlist
        </Message>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Wishlist</h2>
      
      {loading ? (
        <Loader />
      ) : !wishlist.products || wishlist.products.length === 0 ? (
        <Message variant="info">
          Your wishlist is empty. <Link to="/products">Browse products</Link>
        </Message>
      ) : (
        <div className="row g-4">
          {wishlist.products.map((product) => (
            <div key={product._id} className="col-6 col-md-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistScreen;
