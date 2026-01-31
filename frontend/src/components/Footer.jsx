import { Link } from 'react-router-dom';
import { useState } from 'react';
import ContactModal from './ContactModal';
import { 
  ReturnPolicyModal, 
  WarrantyInfoModal, 
  PaymentOptionsModal, 
  FAQModal,
  AboutUsModal,
  CareersModal,
  BlogModal,
  PrivacyPolicyModal,
  TermsOfServiceModal
} from './InfoModals';

function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);
  const [isWarrantyInfoOpen, setIsWarrantyInfoOpen] = useState(false);
  const [isPaymentOptionsOpen, setIsPaymentOptionsOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Modals */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
      <ReturnPolicyModal isOpen={isReturnPolicyOpen} onClose={() => setIsReturnPolicyOpen(false)} />
      <WarrantyInfoModal isOpen={isWarrantyInfoOpen} onClose={() => setIsWarrantyInfoOpen(false)} />
      <PaymentOptionsModal isOpen={isPaymentOptionsOpen} onClose={() => setIsPaymentOptionsOpen(false)} />      <AboutUsModal isOpen={isAboutUsOpen} onClose={() => setIsAboutUsOpen(false)} />
      <CareersModal isOpen={isCareersOpen} onClose={() => setIsCareersOpen(false)} />
      <BlogModal isOpen={isBlogOpen} onClose={() => setIsBlogOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
      <TermsOfServiceModal isOpen={isTermsOfServiceOpen} onClose={() => setIsTermsOfServiceOpen(false)} />
      <footer className="text-white mt-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container py-5">
        <div className="row g-4">
          {/* About Section */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3" style={{ borderBottom: '3px solid #ffc107', display: 'inline-block', paddingBottom: '5px' }}>
              <i className="ri-smartphone-line me-2"></i>MobileShop
            </h5>
            <p className="text-light mt-3" style={{ fontSize: '0.95rem' }}>
              Your trusted destination for the latest smartphones with genuine products, 
              competitive pricing, and exceptional customer service.
            </p>
            <div className="mt-3">
              <a href="https://facebook.com" className="text-white me-3" style={{ fontSize: '1.5rem' }}>
                <i className="ri-facebook-circle-fill"></i>
              </a>
              <a href="https://twitter.com" className="text-white me-3" style={{ fontSize: '1.5rem' }}>
                <i className="ri-twitter-x-fill"></i>
              </a>
              <a href="https://instagram.com" className="text-white me-3" style={{ fontSize: '1.5rem' }}>
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="https://youtube.com" className="text-white" style={{ fontSize: '1.5rem' }}>
                <i className="ri-youtube-fill"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3" style={{ borderBottom: '3px solid #ffc107', display: 'inline-block', paddingBottom: '5px' }}>
              Quick Links
            </h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <Link to="/products" onClick={scrollToTop} className="text-light text-decoration-none hover-link">
                  <i className="ri-shopping-bag-line me-2"></i>Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" onClick={scrollToTop} className="text-light text-decoration-none hover-link">
                  <i className="ri-shopping-cart-line me-2"></i>Shopping Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/wishlist" onClick={scrollToTop} className="text-light text-decoration-none hover-link">
                  <i className="ri-heart-line me-2"></i>Wishlist
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/orders" onClick={scrollToTop} className="text-light text-decoration-none hover-link">
                  <i className="ri-box-3-line me-2"></i>Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3" style={{ borderBottom: '3px solid #ffc107', display: 'inline-block', paddingBottom: '5px' }}>
              Support
            </h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-phone-line me-2"></i>Contact Us
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setIsFAQOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-question-line me-2"></i>FAQs
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setIsReturnPolicyOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-repeat-line me-2"></i>Return Policy
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setIsWarrantyInfoOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-shield-check-line me-2"></i>Warranty Info
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setIsPaymentOptionsOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-bank-card-line me-2"></i>Payment Options
                </button>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3" style={{ borderBottom: '3px solid #ffc107', display: 'inline-block', paddingBottom: '5px' }}>
              Information
            </h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <button 
                  onClick={() => setIsAboutUsOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-information-line me-2"></i>About Us
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setIsCareersOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-briefcase-line me-2"></i>Careers
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setIsBlogOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-file-text-line me-2"></i>Blog
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setIsPrivacyPolicyOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-lock-line me-2"></i>Privacy Policy
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setIsTermsOfServiceOpen(true)}
                  className="btn btn-link text-light text-decoration-none hover-link p-0 text-start"
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="ri-file-list-line me-2"></i>Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3" style={{ borderBottom: '3px solid #ffc107', display: 'inline-block', paddingBottom: '5px' }}>
              Contact Us
            </h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-3 d-flex align-items-start">
                <i className="ri-mail-line me-2" style={{ fontSize: '1.2rem', marginTop: '3px' }}></i>
                <div>
                  <strong>Email:</strong><br />
                  support@mobileshop.com
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="ri-smartphone-line me-2" style={{ fontSize: '1.2rem', marginTop: '3px' }}></i>
                <div>
                  <strong>Phone:</strong><br />
                  +91 1234 567 890
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="ri-map-pin-line me-2" style={{ fontSize: '1.2rem', marginTop: '3px' }}></i>
                <div>
                  <strong>Address:</strong><br />
                  123 Business Street,<br />
                  Mumbai, India 400001
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="ri-time-line me-2" style={{ fontSize: '1.2rem', marginTop: '3px' }}></i>
                <div>
                  <strong>Hours:</strong><br />
                  Mon - Sat: 9 AM - 9 PM<br />
                  Sunday: 10 AM - 6 PM
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="row mt-4 pt-4 border-top border-light">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h6 className="fw-bold mb-2">We Accept:</h6>
            <div>
              <i className="ri-visa-line me-2" style={{ fontSize: '2rem' }}></i>
              <i className="ri-mastercard-line me-2" style={{ fontSize: '2rem' }}></i>
              <i className="ri-bank-card-2-line me-2" style={{ fontSize: '2rem' }}></i>
              <i className="ri-wallet-3-line me-2" style={{ fontSize: '2rem' }}></i>
              <span className="text-light ms-2">Visa, Mastercard, UPI, Cash on Delivery</span>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <h6 className="fw-bold mb-2">Download Our App:</h6>
            <div>
              <a href="#" className="btn btn-outline-light btn-sm me-2 mb-2">
                <i className="ri-google-play-fill me-1"></i> Google Play
              </a>
              <a href="#" className="btn btn-outline-light btn-sm mb-2">
                <i className="ri-app-store-fill me-1"></i> App Store
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-3 text-center" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <p className="mb-0 text-light">
            &copy; 2026 MobileShop. All Rights Reserved. | Designed with <i className="ri-heart-fill text-danger"></i> for Mobile Enthusiasts
          </p>
        </div>
      </div>

      <style>{`
        .hover-link:hover {
          color: #ffc107 !important;
          transform: translateX(5px);
          transition: all 0.3s ease;
        }
      `}</style>
      </footer>
    </>
  );
}

export default Footer;
