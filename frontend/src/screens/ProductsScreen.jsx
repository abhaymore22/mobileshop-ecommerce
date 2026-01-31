import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productSlice';
import { fetchActiveCategories } from '../redux/slices/categorySlice';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductsScreen() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, page, pages, total, loading, error } = useSelector((state) => state.products);
  const { activeCategories } = useSelector((state) => state.categories);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '',
    page: searchParams.get('page') || 1
  });

  useEffect(() => {
    dispatch(fetchActiveCategories());
  }, [dispatch]);

  // Update filters when URL parameters change
  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || '',
      page: searchParams.get('page') || 1
    });
  }, [searchParams]);

  useEffect(() => {
    const params = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) params[key] = filters[key];
    });
    dispatch(fetchProducts(params));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    
    const params = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params[k] = newFilters[k];
    });
    setSearchParams(params);
  };

  const handlePageChange = (pageNum) => {
    const newFilters = { ...filters, page: pageNum };
    setFilters(newFilters);
    
    const params = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params[k] = newFilters[k];
    });
    setSearchParams(params);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Products</h2>
      
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Filters</h5>
            </div>
            <div className="card-body">
              {/* Search */}
              <div className="mb-3">
                <label className="form-label">Search</label>
                <input
                  type="text"
                  className="form-control"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search products..."
                />
              </div>
              
              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {activeCategories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <div className="row g-2">
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Sort */}
              <div className="mb-3">
                <label className="form-label">Sort By</label>
                <select
                  className="form-select"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sort: '', page: 1 });
                  setSearchParams({});
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="col-md-9">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="text-muted mb-0">{total} products found</p>
              </div>
              
              {products.length === 0 ? (
                <Message variant="info">No products found</Message>
              ) : (
                <>
                  <div className="row g-4">
                    {products.map((product) => (
                      <div key={product._id} className="col-sm-6 col-lg-4">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsScreen;
