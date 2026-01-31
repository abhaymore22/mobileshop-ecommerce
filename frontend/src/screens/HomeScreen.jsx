import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts, fetchLatestProducts } from '../redux/slices/productSlice';
import { fetchActiveCategories } from '../redux/slices/categorySlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import ContactModal from '../components/ContactModal';

function HomeScreen() {
  const dispatch = useDispatch();
  const { featuredProducts, latestProducts, loading } = useSelector((state) => state.products);
  const { activeCategories } = useSelector((state) => state.categories);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchLatestProducts());
    dispatch(fetchActiveCategories());
  }, [dispatch]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and Cash on Delivery (COD) for your convenience."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days. Express delivery is available for select locations and products, typically within 1-2 business days."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for all products. Items must be in original condition with all accessories and packaging intact."
    },
    {
      question: "Do you provide warranty on products?",
      answer: "Yes! All products come with manufacturer's warranty. Extended warranty options are also available at checkout."
    },
    {
      question: "Is Cash on Delivery available?",
      answer: "Yes, Cash on Delivery (COD) is available for orders across India. Some high-value products may require advance payment."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track your order from the 'My Orders' section in your account."
    }
  ];

  return (
    <>
      {/* Hero Carousel Section */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="position-relative" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height: '500px' }}>
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-lg-6 text-white">
                    <h1 className="display-3 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                      Latest Smartphones
                    </h1>
                    <p className="lead mb-4" style={{ fontSize: '1.5rem' }}>
                      Discover cutting-edge technology at unbeatable prices
                    </p>
                    <Link to="/products" className="btn btn-warning btn-lg px-5 py-3 fw-bold" style={{ borderRadius: '30px' }}>
                      Shop Now 🛒
                    </Link>
                  </div>
                  <div className="col-lg-6 text-center">
                    <div style={{ fontSize: '15rem', textShadow: '4px 4px 8px rgba(0,0,0,0.2)' }}>📱</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="position-relative" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', height: '500px' }}>
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-lg-6 text-white">
                    <h1 className="display-3 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                      Special Offers
                    </h1>
                    <p className="lead mb-4" style={{ fontSize: '1.5rem' }}>
                      Up to 50% off on selected models
                    </p>
                    <Link to="/products" className="btn btn-light btn-lg px-5 py-3 fw-bold" style={{ borderRadius: '30px' }}>
                      View Deals 🔥
                    </Link>
                  </div>
                  <div className="col-lg-6 text-center">
                    <div style={{ fontSize: '15rem', textShadow: '4px 4px 8px rgba(0,0,0,0.2)' }}>💎</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="position-relative" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', height: '500px' }}>
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-lg-6 text-white">
                    <h1 className="display-3 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                      Premium Collection
                    </h1>
                    <p className="lead mb-4" style={{ fontSize: '1.5rem' }}>
                      Flagship devices with exclusive features
                    </p>
                    <Link to="/products" className="btn btn-warning btn-lg px-5 py-3 fw-bold" style={{ borderRadius: '30px' }}>
                      Explore Now ✨
                    </Link>
                  </div>
                  <div className="col-lg-6 text-center">
                    <div style={{ fontSize: '15rem', textShadow: '4px 4px 8px rgba(0,0,0,0.2)' }}>⚡</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container my-5">
        {/* Categories Section */}
        <section className="mb-5">
          <h2 className="mb-4">Shop by Category</h2>
          <div className="row g-3">
            {activeCategories.map((category) => {
              const imageUrl = category.imagePath 
                ? `http://localhost:5000${category.imagePath}` 
                : 'https://via.placeholder.com/200x150?text=Category';
              
              return (
                <div key={category._id} className="col-6 col-md-3">
                  <Link to={`/products?category=${category._id}`} className="text-decoration-none">
                    <div className="card text-center h-100 shadow-sm">
                      <img
                        src={imageUrl}
                        className="card-img-top"
                        alt={category.name}
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{category.name}</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Products</h2>
            <Link to="/products" className="btn btn-outline-primary">View All</Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="row g-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <div key={product._id} className="col-6 col-md-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Latest Arrivals */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Latest Arrivals</h2>
            <Link to="/products?sort=latest" className="btn btn-outline-primary">View All</Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="row g-4">
              {latestProducts.slice(0, 4).map((product) => (
                <div key={product._id} className="col-6 col-md-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-5 py-5" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', borderRadius: '15px' }}>
          <div className="container">
            <h2 className="text-center mb-5 fw-bold">Why Choose MobileShop?</h2>
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <div className="mb-3" style={{ fontSize: '4rem' }}>🚚</div>
                <h5 className="fw-bold">Fast Delivery</h5>
                <p className="text-muted">Express shipping available across India</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="mb-3" style={{ fontSize: '4rem' }}>✅</div>
                <h5 className="fw-bold">Genuine Products</h5>
                <p className="text-muted">100% authentic with manufacturer warranty</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="mb-3" style={{ fontSize: '4rem' }}>💰</div>
                <h5 className="fw-bold">Best Prices</h5>
                <p className="text-muted">Competitive pricing with special offers</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-5">
          <h2 className="text-center mb-5 fw-bold">Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div className="accordion-item border-0 mb-3 shadow-sm" key={index} style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button fw-bold ${activeAccordion === index ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        style={{ 
                          background: activeAccordion === index ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#fff',
                          color: activeAccordion === index ? '#fff' : '#000'
                        }}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeAccordion === index ? 'show' : ''}`}>
                      <div className="accordion-body bg-light">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* Sticky Contact Button */}
      <button
        onClick={() => setIsContactModalOpen(true)}
        className="btn btn-lg shadow-lg position-fixed"
        style={{
          bottom: '30px',
          right: '30px',
          zIndex: 1040,
          borderRadius: '50px',
          padding: '15px 25px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        }}
      >
        <i className="bi bi-chat-dots-fill me-2"></i>
        Contact Us
      </button>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      </div>
    </>
  );
}

export default HomeScreen;
