// Return Policy Modal
export const ReturnPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-arrow-repeat me-2"></i>
                Return & Refund Policy
              </h4>
              <p className="mb-0 small opacity-90">Easy returns within 7 days</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="mb-4">
              <div className="alert alert-info border-0">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Customer satisfaction is our priority!</strong> We offer hassle-free returns and refunds.
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-calendar-check me-2 text-primary"></i>
              Return Window
            </h5>
            <p className="mb-4">You can return your mobile phone within <strong>7 days</strong> from the date of delivery. The product must be unused, in its original packaging, with all accessories, manuals, and warranty cards intact.</p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-check-circle me-2 text-success"></i>
              Eligible for Return
            </h5>
            <ul className="mb-4">
              <li className="mb-2">Product received is damaged or defective</li>
              <li className="mb-2">Wrong product delivered</li>
              <li className="mb-2">Product not as described on website</li>
              <li className="mb-2">Missing accessories or parts</li>
              <li className="mb-2">Product has manufacturing defects</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-x-circle me-2 text-danger"></i>
              Not Eligible for Return
            </h5>
            <ul className="mb-4">
              <li className="mb-2">Physical damage caused by user (cracks, dents, water damage)</li>
              <li className="mb-2">Product has been used or accessories are missing</li>
              <li className="mb-2">Original packaging, invoice, or warranty card is missing</li>
              <li className="mb-2">Return request made after 7 days</li>
              <li className="mb-2">Unauthorized repairs or modifications</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-arrow-clockwise me-2 text-primary"></i>
              Return Process
            </h5>
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <ol className="mb-0 ps-3">
                  <li className="mb-2"><strong>Step 1:</strong> Login to your account and go to "My Orders"</li>
                  <li className="mb-2"><strong>Step 2:</strong> Select the order you wish to return</li>
                  <li className="mb-2"><strong>Step 3:</strong> Click on "Return" button and choose reason</li>
                  <li className="mb-2"><strong>Step 4:</strong> Our team will verify and approve your request</li>
                  <li className="mb-2"><strong>Step 5:</strong> Pack the product securely in original packaging</li>
                  <li className="mb-2"><strong>Step 6:</strong> Our courier partner will pick up the product</li>
                  <li className="mb-2"><strong>Step 7:</strong> Once received, we'll inspect and process refund</li>
                </ol>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-cash-coin me-2 text-success"></i>
              Refund Process
            </h5>
            <p className="mb-2">After we receive and inspect your returned item:</p>
            <ul className="mb-4">
              <li className="mb-2"><strong>Refund Timeline:</strong> 5-7 business days</li>
              <li className="mb-2"><strong>Refund Method:</strong> Original payment method used during purchase</li>
              <li className="mb-2"><strong>Processing Time:</strong> 2-3 business days after inspection</li>
              <li className="mb-2"><strong>Bank Processing:</strong> Additional 3-5 days depending on your bank</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-repeat me-2 text-info"></i>
              Exchange Policy
            </h5>
            <p className="mb-4">We offer exchanges for defective products within 7 days. The replacement will be the same model or equivalent value product. Exchanges are subject to stock availability.</p>

            <div className="alert alert-warning border-0">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Important Notes
              </h6>
              <ul className="mb-0 ps-3">
                <li>Please do not accept tampered or opened packages during delivery</li>
                <li>Open the package in front of delivery person and check for damages</li>
                <li>Keep the invoice safe - it's required for returns and warranty claims</li>
                <li>Take unboxing video as proof (recommended but not mandatory)</li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <p className="text-muted mb-2">Need assistance with returns?</p>
              <button className="btn btn-primary" onClick={onClose}>
                <i className="bi bi-headset me-2"></i>Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Warranty Info Modal
export const WarrantyInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-shield-check me-2"></i>
                Warranty Information
              </h4>
              <p className="mb-0 small opacity-90">Comprehensive warranty coverage</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="mb-4">
              <div className="alert alert-success border-0">
                <i className="bi bi-shield-fill-check me-2"></i>
                <strong>All our mobile phones come with official manufacturer warranty!</strong>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-calendar3 me-2 text-primary"></i>
              Warranty Period
            </h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card border-primary">
                  <div className="card-body">
                    <h6 className="fw-bold text-primary">Mobile Phone</h6>
                    <p className="fs-4 fw-bold mb-1">1 Year</p>
                    <small className="text-muted">Manufacturer Warranty</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-warning">
                  <div className="card-body">
                    <h6 className="fw-bold text-warning">Battery</h6>
                    <p className="fs-4 fw-bold mb-1">6 Months</p>
                    <small className="text-muted">Limited Warranty</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-info">
                  <div className="card-body">
                    <h6 className="fw-bold text-info">Charger & Cable</h6>
                    <p className="fs-4 fw-bold mb-1">6 Months</p>
                    <small className="text-muted">Accessory Warranty</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-secondary">
                  <div className="card-body">
                    <h6 className="fw-bold text-secondary">Earphones</h6>
                    <p className="fs-4 fw-bold mb-1">3 Months</p>
                    <small className="text-muted">Limited Coverage</small>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-check2-square me-2 text-success"></i>
              What's Covered
            </h5>
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <ul className="mb-0">
                  <li className="mb-2">Manufacturing defects in materials and workmanship</li>
                  <li className="mb-2">Hardware malfunctions not caused by user</li>
                  <li className="mb-2">Display issues (dead pixels, lines, ghosting)</li>
                  <li className="mb-2">Button and port failures</li>
                  <li className="mb-2">Software issues (bootloop, system crashes)</li>
                  <li className="mb-2">Battery performance degradation beyond normal</li>
                  <li className="mb-2">Speaker, microphone, and camera defects</li>
                  <li className="mb-2">Charging issues (port or charging circuit)</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-x-square me-2 text-danger"></i>
              What's NOT Covered
            </h5>
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <ul className="mb-0 text-danger">
                  <li className="mb-2"><strong>Physical Damage:</strong> Cracked screen, dents, scratches, bent frame</li>
                  <li className="mb-2"><strong>Liquid Damage:</strong> Water, moisture, or any liquid ingress</li>
                  <li className="mb-2"><strong>Unauthorized Repairs:</strong> Opened by non-authorized service centers</li>
                  <li className="mb-2"><strong>Software Modifications:</strong> Rooting, custom ROMs, jailbreaking</li>
                  <li className="mb-2"><strong>Normal Wear & Tear:</strong> Gradual deterioration of paint, buttons</li>
                  <li className="mb-2"><strong>Lost or Stolen:</strong> Warranty doesn't cover lost/stolen devices</li>
                  <li className="mb-2"><strong>Misuse:</strong> Damage due to misuse, abuse, or negligence</li>
                  <li className="mb-2"><strong>Missing Warranty Seal:</strong> If warranty stickers are removed/damaged</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-tools me-2 text-primary"></i>
              Warranty Claim Process
            </h5>
            <div className="card border-primary mb-4">
              <div className="card-body">
                <ol className="mb-0 ps-3">
                  <li className="mb-2"><strong>Contact Support:</strong> Reach out via email or phone with issue details</li>
                  <li className="mb-2"><strong>Provide Information:</strong> Order ID, serial number, and problem description</li>
                  <li className="mb-2"><strong>Diagnosis:</strong> Our team may guide you through basic troubleshooting</li>
                  <li className="mb-2"><strong>Service Center Visit:</strong> Visit authorized service center with invoice</li>
                  <li className="mb-2"><strong>Inspection:</strong> Technician will inspect and diagnose the issue</li>
                  <li className="mb-2"><strong>Repair/Replace:</strong> Device will be repaired or replaced if eligible</li>
                  <li className="mb-2"><strong>Timeline:</strong> 7-14 business days for repair completion</li>
                </ol>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-geo-alt me-2 text-danger"></i>
              Authorized Service Centers
            </h5>
            <p className="mb-3">We have authorized service centers in all major cities. Find your nearest service center:</p>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="fw-bold">Major Cities</h6>
                    <p className="small mb-0">Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="fw-bold">Contact</h6>
                    <p className="small mb-1"><i className="bi bi-telephone me-2"></i>Toll Free: 1800-XXX-XXXX</p>
                    <p className="small mb-0"><i className="bi bi-envelope me-2"></i>warranty@mobileshop.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info border-0">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-lightbulb me-2"></i>
                Important Tips
              </h6>
              <ul className="mb-0 ps-3">
                <li>Keep your original invoice safe - it's your warranty proof</li>
                <li>Register your device on manufacturer website for faster service</li>
                <li>Do not remove or tamper with warranty seal stickers</li>
                <li>Use only authorized service centers for repairs during warranty</li>
                <li>Check warranty status before visiting service center</li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <p className="text-muted mb-2">Questions about warranty?</p>
              <button className="btn btn-primary" onClick={onClose}>
                <i className="bi bi-headset me-2"></i>Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Options Modal
export const PaymentOptionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-credit-card me-2"></i>
                Payment Options
              </h4>
              <p className="mb-0 small opacity-90">Safe, secure, and convenient payment methods</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="mb-4">
              <div className="alert alert-success border-0">
                <i className="bi bi-shield-lock me-2"></i>
                <strong>100% Secure Payments!</strong> All transactions are encrypted and PCI DSS compliant.
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-cash-stack me-2 text-success"></i>
              Cash on Delivery (COD)
            </h5>
            <div className="card border-success mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-9">
                    <p className="mb-2"><strong>Pay when you receive your order</strong></p>
                    <ul className="small mb-0">
                      <li>Available on orders up to ₹50,000</li>
                      <li>Additional ₹50 handling fee</li>
                      <li>Available in most serviceable areas</li>
                      <li>Inspect product before payment</li>
                    </ul>
                  </div>
                  <div className="col-md-3 text-end">
                    <i className="bi bi-wallet2 text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-credit-card-2-front me-2 text-primary"></i>
              Credit & Debit Cards
            </h5>
            <div className="card border-primary mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-9">
                    <p className="mb-2"><strong>All major cards accepted</strong></p>
                    <div className="d-flex gap-2 mb-2">
                      <span className="badge bg-primary">Visa</span>
                      <span className="badge bg-warning text-dark">Mastercard</span>
                      <span className="badge bg-info">Rupay</span>
                      <span className="badge bg-secondary">American Express</span>
                    </div>
                    <ul className="small mb-0">
                      <li>Instant payment confirmation</li>
                      <li>EMI options available</li>
                      <li>3D Secure authentication</li>
                      <li>No hidden charges</li>
                    </ul>
                  </div>
                  <div className="col-md-3 text-end">
                    <i className="bi bi-credit-card text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-phone me-2 text-info"></i>
              UPI & Digital Wallets
            </h5>
            <div className="card border-info mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-9">
                    <p className="mb-2"><strong>Quick & seamless digital payments</strong></p>
                    <div className="d-flex gap-2 mb-2 flex-wrap">
                      <span className="badge bg-success">Google Pay</span>
                      <span className="badge bg-primary">PhonePe</span>
                      <span className="badge bg-info">Paytm</span>
                      <span className="badge bg-warning text-dark">Amazon Pay</span>
                      <span className="badge bg-secondary">UPI</span>
                    </div>
                    <ul className="small mb-0">
                      <li>Instant payment processing</li>
                      <li>No additional charges</li>
                      <li>Cashback offers available</li>
                      <li>24/7 availability</li>
                    </ul>
                  </div>
                  <div className="col-md-3 text-end">
                    <i className="bi bi-qr-code text-info" style={{ fontSize: '3rem' }}></i>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-bank me-2 text-warning"></i>
              Net Banking
            </h5>
            <div className="card border-warning mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-9">
                    <p className="mb-2"><strong>Direct bank account transfer</strong></p>
                    <ul className="small mb-0">
                      <li>All major banks supported</li>
                      <li>Secure bank gateway</li>
                      <li>Instant confirmation</li>
                      <li>No transaction limit</li>
                    </ul>
                  </div>
                  <div className="col-md-3 text-end">
                    <i className="bi bi-bank2 text-warning" style={{ fontSize: '3rem' }}></i>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-calculator me-2 text-danger"></i>
              EMI (Easy Monthly Installments)
            </h5>
            <div className="card border-danger mb-4">
              <div className="card-body">
                <p className="mb-2"><strong>Buy now, pay later with easy EMI options</strong></p>
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <div className="text-center p-2 bg-light rounded">
                      <small className="text-muted d-block">Minimum Order</small>
                      <strong>₹10,000</strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-2 bg-light rounded">
                      <small className="text-muted d-block">Tenure Options</small>
                      <strong>3, 6, 9, 12 months</strong>
                    </div>
                  </div>
                </div>
                <p className="mb-2"><strong>No Cost EMI Available On:</strong></p>
                <div className="d-flex gap-2 mb-3 flex-wrap">
                  <span className="badge bg-primary">HDFC Bank</span>
                  <span className="badge bg-primary">ICICI Bank</span>
                  <span className="badge bg-primary">SBI</span>
                  <span className="badge bg-primary">Axis Bank</span>
                  <span className="badge bg-primary">Kotak Bank</span>
                </div>
                <ul className="small mb-0">
                  <li>Interest rates vary by bank and tenure</li>
                  <li>No cost EMI on orders ₹15,000+</li>
                  <li>Pre-approved EMI for eligible cards</li>
                  <li>Instant approval</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-shield-check me-2 text-success"></i>
              Payment Security
            </h5>
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-lock-fill text-success me-2 mt-1"></i>
                      <div>
                        <strong className="d-block">SSL Encryption</strong>
                        <small className="text-muted">256-bit encrypted connection</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-shield-check text-success me-2 mt-1"></i>
                      <div>
                        <strong className="d-block">PCI DSS Compliant</strong>
                        <small className="text-muted">Industry standard security</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-eye-slash-fill text-success me-2 mt-1"></i>
                      <div>
                        <strong className="d-block">Privacy Protected</strong>
                        <small className="text-muted">We never store card details</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                      <div>
                        <strong className="d-block">Verified Merchant</strong>
                        <small className="text-muted">Trusted by thousands</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-warning border-0">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-info-circle me-2"></i>
                Important Information
              </h6>
              <ul className="mb-0 ps-3">
                <li>Payment must be completed within 15 minutes of order creation</li>
                <li>Failed payments will be automatically refunded in 5-7 business days</li>
                <li>For COD orders, exact change is appreciated</li>
                <li>EMI option visibility depends on card eligibility</li>
                <li>Contact your bank for payment-related issues</li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <p className="text-muted mb-2">Payment issues or queries?</p>
              <button className="btn btn-primary" onClick={onClose}>
                <i className="bi bi-headset me-2"></i>Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ Modal
export const FAQModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "Login to your account, go to 'My Orders' section, and click on any order to see real-time tracking information. You'll also receive tracking updates via email and SMS."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Cash on Delivery (COD), Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and EMI options on orders above ₹10,000."
    },
    {
      question: "Is Cash on Delivery available?",
      answer: "Yes, COD is available on orders up to ₹50,000 with an additional ₹50 handling fee. COD is available in most serviceable areas."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 5-7 business days. Express delivery (2-3 days) is available for ₹99. Same-day delivery is available in select metro cities for ₹199."
    },
    {
      question: "Can I return or exchange my phone?",
      answer: "Yes, we offer 7-day return policy. Products must be unused, in original packaging with all accessories. Exchanges are available for defective products only."
    },
    {
      question: "Are the products genuine?",
      answer: "Absolutely! All our products are 100% genuine with official manufacturer warranty. We source directly from authorized distributors and never sell refurbished or grey market products."
    },
    {
      question: "What is the warranty period?",
      answer: "Mobile phones come with 1-year manufacturer warranty. Batteries have 6-month warranty, and accessories have 3-6 month warranty depending on the item."
    },
    {
      question: "Do you offer EMI options?",
      answer: "Yes, EMI is available on orders above ₹10,000 with tenure options of 3, 6, 9, and 12 months. No-cost EMI is available on select cards for orders above ₹15,000."
    },
    {
      question: "How can I cancel my order?",
      answer: "You can cancel your order anytime before it's shipped. Go to 'My Orders', select the order, and click 'Cancel'. Refund will be processed within 5-7 business days."
    },
    {
      question: "Is it safe to pay online?",
      answer: "Yes, absolutely! All online transactions are secured with 256-bit SSL encryption and are PCI DSS compliant. We never store your card details."
    }
  ];

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-question-circle me-2"></i>
                Frequently Asked Questions
              </h4>
              <p className="mb-0 small opacity-90">Find answers to common questions</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="accordion" id="faqModalAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item border-0 shadow-sm mb-3" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faqModal${index}`}
                      style={{ background: 'linear-gradient(to right, #f8f9fa, #ffffff)' }}
                    >
                      <i className="bi bi-patch-question me-2 text-primary"></i>
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`faqModal${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqModalAccordion"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <p className="text-muted mb-2">Didn't find your answer?</p>
              <button className="btn btn-primary" onClick={onClose}>
                <i className="bi bi-headset me-2"></i>Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Us Modal
export const AboutUsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-building me-2"></i>
                About MobileShop
              </h4>
              <p className="mb-0 small opacity-90">Your trusted mobile phone partner since 2015</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <div className="mb-3">
                <i className="bi bi-phone" style={{ fontSize: '4rem', color: '#667eea' }}></i>
              </div>
              <h5 className="fw-bold">India's Premier Mobile Phone Destination</h5>
              <p className="text-muted">Connecting millions of customers with their perfect mobile phone</p>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-star-fill me-2 text-warning"></i>
              Our Story
            </h5>
            <p className="mb-4">
              Founded in 2015, MobileShop began with a simple mission: to make the latest smartphones accessible to everyone across India. 
              What started as a small retail store in Mumbai has grown into one of India's most trusted online mobile phone retailers, 
              serving over <strong>500,000+ satisfied customers</strong> nationwide.
            </p>
            <p className="mb-4">
              Our journey has been driven by a passion for technology and an unwavering commitment to customer satisfaction. 
              We've built our reputation on three core principles: <strong>genuine products</strong>, <strong>competitive pricing</strong>, 
              and <strong>exceptional service</strong>.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-bullseye me-2 text-danger"></i>
              Our Mission
            </h5>
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <p className="mb-0 fst-italic">
                  "To empower every Indian with access to the latest mobile technology through transparent pricing, 
                  genuine products, and unmatched customer service. We believe technology should be accessible, 
                  affordable, and backed by trust."
                </p>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-eye me-2 text-primary"></i>
              Our Vision
            </h5>
            <p className="mb-4">
              To become India's most trusted and customer-centric mobile phone retailer, setting industry standards 
              for quality, service, and innovation. We envision a future where every Indian has access to the mobile 
              technology they need to succeed in the digital age.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-award me-2 text-success"></i>
              Why Choose Us?
            </h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-patch-check-fill text-success fs-3 me-3"></i>
                      <div>
                        <h6 className="fw-bold mb-2">100% Genuine Products</h6>
                        <p className="small text-muted mb-0">All products sourced directly from authorized distributors with official warranty</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-currency-rupee text-primary fs-3 me-3"></i>
                      <div>
                        <h6 className="fw-bold mb-2">Best Prices Guaranteed</h6>
                        <p className="small text-muted mb-0">Competitive pricing with regular deals, offers, and no-cost EMI options</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-truck text-warning fs-3 me-3"></i>
                      <div>
                        <h6 className="fw-bold mb-2">Fast & Secure Delivery</h6>
                        <p className="small text-muted mb-0">Pan-India delivery with real-time tracking and secure packaging</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-headset text-info fs-3 me-3"></i>
                      <div>
                        <h6 className="fw-bold mb-2">24/7 Customer Support</h6>
                        <p className="small text-muted mb-0">Dedicated support team ready to assist with any queries or concerns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-graph-up-arrow me-2 text-success"></i>
              Our Achievements
            </h5>
            <div className="row g-3 mb-4 text-center">
              <div className="col-6 col-md-3">
                <div className="p-3 bg-light rounded">
                  <h3 className="fw-bold text-primary mb-1">500K+</h3>
                  <small className="text-muted">Happy Customers</small>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-light rounded">
                  <h3 className="fw-bold text-success mb-1">50+</h3>
                  <small className="text-muted">Top Brands</small>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-light rounded">
                  <h3 className="fw-bold text-warning mb-1">1000+</h3>
                  <small className="text-muted">Products</small>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-light rounded">
                  <h3 className="fw-bold text-danger mb-1">4.8★</h3>
                  <small className="text-muted">Average Rating</small>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-people me-2 text-info"></i>
              Our Team
            </h5>
            <p className="mb-4">
              Behind MobileShop is a dedicated team of technology enthusiasts, customer service professionals, 
              and logistics experts working tirelessly to ensure your shopping experience is seamless. From our 
              tech specialists who help you choose the right phone to our delivery partners who ensure safe delivery, 
              every team member is committed to your satisfaction.
            </p>

            <div className="alert alert-primary border-0">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-heart-fill me-2"></i>
                Our Commitment to You
              </h6>
              <ul className="mb-0 ps-3">
                <li>Transparency in pricing with no hidden charges</li>
                <li>Authentic products with manufacturer warranty</li>
                <li>Easy returns and hassle-free refunds</li>
                <li>Secure payments with multiple options</li>
                <li>Expert guidance to help you choose the perfect phone</li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <h6 className="fw-bold mb-2">Join the MobileShop Family</h6>
              <p className="text-muted mb-3">Experience the difference of shopping with India's most trusted mobile retailer</p>
              <button className="btn btn-primary me-2" onClick={onClose}>
                <i className="bi bi-shop me-2"></i>Start Shopping
              </button>
              <button className="btn btn-outline-primary" onClick={onClose}>
                <i className="bi bi-envelope me-2"></i>Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Careers Modal
export const CareersModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-briefcase me-2"></i>
                Careers at MobileShop
              </h4>
              <p className="mb-0 small opacity-90">Build your career with India's leading mobile retailer</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <div className="mb-3">
                <i className="bi bi-people-fill" style={{ fontSize: '4rem', color: '#667eea' }}></i>
              </div>
              <h5 className="fw-bold">Join Our Growing Team!</h5>
              <p className="text-muted">Be part of a dynamic team that's revolutionizing mobile retail in India</p>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-rocket-takeoff me-2 text-primary"></i>
              Why Work With Us?
            </h5>
            <p className="mb-4">
              At MobileShop, we believe our people are our greatest asset. We foster a culture of innovation, 
              growth, and collaboration where every team member can thrive and make a real impact. Join us 
              in our mission to connect India with the latest mobile technology.
            </p>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card border-0 bg-light h-100">
                  <div className="card-body">
                    <h6 className="fw-bold text-primary mb-2">
                      <i className="bi bi-graph-up me-2"></i>
                      Career Growth
                    </h6>
                    <p className="small mb-0">Clear career progression paths, regular training, and opportunities to upskill</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 bg-light h-100">
                  <div className="card-body">
                    <h6 className="fw-bold text-success mb-2">
                      <i className="bi bi-currency-rupee me-2"></i>
                      Competitive Pay
                    </h6>
                    <p className="small mb-0">Industry-leading salaries with performance bonuses and incentives</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 bg-light h-100">
                  <div className="card-body">
                    <h6 className="fw-bold text-warning mb-2">
                      <i className="bi bi-heart-pulse me-2"></i>
                      Work-Life Balance
                    </h6>
                    <p className="small mb-0">Flexible work arrangements, paid time off, and wellness programs</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 bg-light h-100">
                  <div className="card-body">
                    <h6 className="fw-bold text-info mb-2">
                      <i className="bi bi-people me-2"></i>
                      Team Culture
                    </h6>
                    <p className="small mb-0">Collaborative environment with team events and celebration of success</p>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-briefcase-fill me-2 text-success"></i>
              Current Openings
            </h5>
            
            <div className="accordion mb-4" id="jobAccordion">
              <div className="accordion-item border-0 shadow-sm mb-2">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#job1">
                    <div>
                      <strong>Senior Full Stack Developer</strong>
                      <div className="small text-muted">Technology • Mumbai • Full-time</div>
                    </div>
                  </button>
                </h2>
                <div id="job1" className="accordion-collapse collapse" data-bs-parent="#jobAccordion">
                  <div className="accordion-body">
                    <p><strong>Requirements:</strong> 5+ years experience in React, Node.js, MongoDB. Experience with e-commerce platforms preferred.</p>
                    <p><strong>Responsibilities:</strong> Design and develop scalable web applications, mentor junior developers, optimize performance.</p>
                    <span className="badge bg-primary">React</span>
                    <span className="badge bg-success">Node.js</span>
                    <span className="badge bg-info">MongoDB</span>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 shadow-sm mb-2">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#job2">
                    <div>
                      <strong>Customer Support Specialist</strong>
                      <div className="small text-muted">Support • Bangalore • Full-time</div>
                    </div>
                  </button>
                </h2>
                <div id="job2" className="accordion-collapse collapse" data-bs-parent="#jobAccordion">
                  <div className="accordion-body">
                    <p><strong>Requirements:</strong> 2+ years in customer service, excellent communication skills, tech-savvy.</p>
                    <p><strong>Responsibilities:</strong> Handle customer queries, resolve issues, maintain high satisfaction ratings.</p>
                    <span className="badge bg-warning text-dark">Communication</span>
                    <span className="badge bg-info">Problem Solving</span>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 shadow-sm mb-2">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#job3">
                    <div>
                      <strong>Digital Marketing Manager</strong>
                      <div className="small text-muted">Marketing • Remote • Full-time</div>
                    </div>
                  </button>
                </h2>
                <div id="job3" className="accordion-collapse collapse" data-bs-parent="#jobAccordion">
                  <div className="accordion-body">
                    <p><strong>Requirements:</strong> 4+ years in digital marketing, SEO/SEM expertise, e-commerce experience.</p>
                    <p><strong>Responsibilities:</strong> Plan and execute marketing campaigns, manage social media, analyze metrics.</p>
                    <span className="badge bg-danger">SEO</span>
                    <span className="badge bg-primary">Social Media</span>
                    <span className="badge bg-success">Analytics</span>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 shadow-sm mb-2">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#job4">
                    <div>
                      <strong>Warehouse Operations Manager</strong>
                      <div className="small text-muted">Logistics • Delhi • Full-time</div>
                    </div>
                  </button>
                </h2>
                <div id="job4" className="accordion-collapse collapse" data-bs-parent="#jobAccordion">
                  <div className="accordion-body">
                    <p><strong>Requirements:</strong> 3+ years in warehouse management, inventory control experience.</p>
                    <p><strong>Responsibilities:</strong> Oversee warehouse operations, manage inventory, ensure timely dispatch.</p>
                    <span className="badge bg-secondary">Logistics</span>
                    <span className="badge bg-warning text-dark">Management</span>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-gift me-2 text-danger"></i>
              Benefits & Perks
            </h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-shield-check text-success me-2 mt-1"></i>
                  <div>
                    <strong className="d-block">Health Insurance</strong>
                    <small className="text-muted">Comprehensive coverage for you and family</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-book text-primary me-2 mt-1"></i>
                  <div>
                    <strong className="d-block">Learning & Development</strong>
                    <small className="text-muted">Training programs and certifications</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-laptop text-info me-2 mt-1"></i>
                  <div>
                    <strong className="d-block">Work from Home</strong>
                    <small className="text-muted">Flexible remote work options</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="bi bi-trophy text-warning me-2 mt-1"></i>
                  <div>
                    <strong className="d-block">Performance Bonus</strong>
                    <small className="text-muted">Quarterly and annual bonuses</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info border-0">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-info-circle me-2"></i>
                How to Apply
              </h6>
              <p className="mb-2">Send your resume and cover letter to: <strong>careers@mobileshop.com</strong></p>
              <p className="mb-0">Subject line: [Position Name] - [Your Name]</p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-muted mb-3">Don't see a position that fits? Send us your resume anyway!</p>
              <button className="btn btn-primary" onClick={onClose}>
                <i className="bi bi-envelope me-2"></i>Email Your Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog Modal
export const BlogModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const blogPosts = [
    {
      title: "Top 10 Smartphones Under ₹20,000 in 2026",
      date: "January 25, 2026",
      category: "Buying Guide",
      excerpt: "Discover the best budget smartphones offering flagship features without breaking the bank. From powerful processors to stunning cameras...",
      image: "📱"
    },
    {
      title: "5G vs 4G: Is It Worth the Upgrade?",
      date: "January 20, 2026",
      category: "Technology",
      excerpt: "A comprehensive comparison of 5G and 4G networks in India. Learn about speed differences, coverage, and whether you should upgrade now...",
      image: "📡"
    },
    {
      title: "How to Maximize Your Phone's Battery Life",
      date: "January 15, 2026",
      category: "Tips & Tricks",
      excerpt: "Expert tips to extend your smartphone's battery life. From screen settings to app management, discover what really works...",
      image: "🔋"
    },
    {
      title: "iPhone 15 Pro Max vs Samsung S24 Ultra: Which to Buy?",
      date: "January 10, 2026",
      category: "Comparison",
      excerpt: "An in-depth comparison of 2026's flagship smartphones. Camera, performance, battery, and value for money analyzed...",
      image: "⚡"
    },
    {
      title: "Protecting Your Phone: Best Cases and Screen Guards",
      date: "January 5, 2026",
      category: "Accessories",
      excerpt: "The ultimate guide to phone protection. Review of top cases and screen protectors that actually work...",
      image: "🛡️"
    },
    {
      title: "Understanding Phone Specifications: A Beginner's Guide",
      date: "December 30, 2025",
      category: "Education",
      excerpt: "Confused by tech jargon? Learn what RAM, processor, mAh, and other specifications really mean for your daily usage...",
      image: "📊"
    }
  ];

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-newspaper me-2"></i>
                MobileShop Blog
              </h4>
              <p className="mb-0 small opacity-90">Latest news, reviews, and tips about mobile phones</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <h5 className="fw-bold">Stay Updated with Mobile Technology</h5>
              <p className="text-muted">Expert reviews, buying guides, and tech insights</p>
            </div>

            <div className="row g-4 mb-4">
              {blogPosts.map((post, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card h-100 border-0 shadow-sm hover-card" style={{ cursor: 'pointer' }}>
                    <div className="card-body">
                      <div className="d-flex align-items-start mb-3">
                        <div className="me-3" style={{ fontSize: '3rem' }}>{post.image}</div>
                        <div className="flex-grow-1">
                          <span className="badge bg-primary mb-2">{post.category}</span>
                          <h6 className="fw-bold mb-2">{post.title}</h6>
                          <small className="text-muted d-block mb-2">
                            <i className="bi bi-calendar me-1"></i>{post.date}
                          </small>
                        </div>
                      </div>
                      <p className="small text-muted mb-3">{post.excerpt}</p>
                      <a href="#" className="btn btn-sm btn-outline-primary">
                        Read More <i className="bi bi-arrow-right ms-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="alert alert-light border">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-envelope-heart me-2 text-primary"></i>
                    Subscribe to Our Newsletter
                  </h6>
                  <p className="small text-muted mb-0">Get the latest articles, reviews, and exclusive deals delivered to your inbox</p>
                </div>
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <button className="btn btn-primary">
                    <i className="bi bi-bell me-2"></i>Subscribe Now
                  </button>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-tags me-2 text-warning"></i>
              Popular Topics
            </h5>
            <div className="mb-4">
              <span className="badge bg-primary me-2 mb-2">Buying Guides</span>
              <span className="badge bg-success me-2 mb-2">Reviews</span>
              <span className="badge bg-info me-2 mb-2">Comparisons</span>
              <span className="badge bg-warning text-dark me-2 mb-2">Tips & Tricks</span>
              <span className="badge bg-danger me-2 mb-2">News</span>
              <span className="badge bg-secondary me-2 mb-2">Accessories</span>
              <span className="badge bg-dark me-2 mb-2">Technology</span>
            </div>

            <div className="mt-4 text-center">
              <p className="text-muted mb-2">Want to see more articles?</p>
              <button className="btn btn-primary" onClick={onClose}>
                <i className="bi bi-journal-text me-2"></i>View All Articles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Modal
export const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-shield-lock me-2"></i>
                Privacy Policy
              </h4>
              <p className="mb-0 small opacity-90">Your privacy is our priority</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="alert alert-info border-0 mb-4">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Last Updated:</strong> January 1, 2026
            </div>

            <p className="mb-4">
              At MobileShop, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              or make a purchase.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-collection me-2 text-primary"></i>
              1. Information We Collect
            </h5>
            <p className="mb-2"><strong>Personal Information:</strong></p>
            <ul className="mb-3">
              <li>Name, email address, phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through payment gateways)</li>
              <li>Order history and preferences</li>
            </ul>
            <p className="mb-2"><strong>Automatically Collected Information:</strong></p>
            <ul className="mb-4">
              <li>IP address, browser type, and device information</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referral source and exit pages</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-gear me-2 text-success"></i>
              2. How We Use Your Information
            </h5>
            <p className="mb-2">We use the collected information to:</p>
            <ul className="mb-4">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our website and user experience</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
              <li>Analyze website traffic and usage patterns</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-share me-2 text-warning"></i>
              3. Information Sharing
            </h5>
            <p className="mb-2">We do NOT sell your personal information. We may share your information with:</p>
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <ul className="mb-0">
                  <li><strong>Service Providers:</strong> Payment processors, shipping companies, email services</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-cookie me-2 text-info"></i>
              4. Cookies and Tracking
            </h5>
            <p className="mb-2">We use cookies and similar technologies to:</p>
            <ul className="mb-3">
              <li>Remember your preferences and settings</li>
              <li>Keep you logged in securely</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Provide personalized content and advertisements</li>
            </ul>
            <p className="mb-4">
              You can control cookies through your browser settings. However, disabling cookies may affect 
              website functionality.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-lock me-2 text-danger"></i>
              5. Data Security
            </h5>
            <div className="card border-danger mb-4">
              <div className="card-body">
                <p className="mb-2">We implement industry-standard security measures:</p>
                <ul className="mb-0">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure payment gateways (PCI DSS compliant)</li>
                  <li>Regular security audits and updates</li>
                  <li>Restricted access to personal information</li>
                  <li>Encrypted database storage</li>
                  <li>Firewall protection and intrusion detection</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-person-check me-2 text-success"></i>
              6. Your Rights
            </h5>
            <p className="mb-2">You have the right to:</p>
            <ul className="mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing emails anytime</li>
              <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Withdraw Consent:</strong> Revoke consent for data processing</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-clock-history me-2 text-primary"></i>
              7. Data Retention
            </h5>
            <p className="mb-4">
              We retain your personal information only as long as necessary for the purposes outlined in this policy 
              or as required by law. Order information is typically retained for 7 years for accounting and legal purposes.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-people me-2 text-info"></i>
              8. Third-Party Links
            </h5>
            <p className="mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices 
              or content of these external sites. Please review their privacy policies before sharing any information.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-person-badge me-2 text-warning"></i>
              9. Children's Privacy
            </h5>
            <p className="mb-4">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
              personal information from children. If you believe a child has provided us with personal information, 
              please contact us immediately.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-arrow-repeat me-2 text-danger"></i>
              10. Changes to Privacy Policy
            </h5>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an 
              updated "Last Updated" date. We encourage you to review this policy periodically.
            </p>

            <div className="alert alert-primary border-0">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-envelope me-2"></i>
                Contact Us About Privacy
              </h6>
              <p className="mb-1">If you have questions or concerns about our privacy practices:</p>
              <p className="mb-1"><strong>Email:</strong> privacy@mobileshop.com</p>
              <p className="mb-1"><strong>Phone:</strong> +91 1234 567 890</p>
              <p className="mb-0"><strong>Address:</strong> 123 Business Street, Mumbai, India 400001</p>
            </div>

            <div className="mt-4 text-center">
              <button className="btn btn-primary" onClick={onClose}>
                <i className="bi bi-check-circle me-2"></i>I Understand
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Terms of Service Modal
export const TermsOfServiceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title mb-1 fw-bold">
                <i className="bi bi-file-text me-2"></i>
                Terms of Service
              </h4>
              <p className="mb-0 small opacity-90">Please read these terms carefully</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="alert alert-warning border-0 mb-4">
              <i className="bi bi-exclamation-triangle me-2"></i>
              <strong>Last Updated:</strong> January 1, 2026
            </div>

            <p className="mb-4">
              Welcome to MobileShop! These Terms of Service ("Terms") govern your use of our website and services. 
              By accessing or using our website, you agree to be bound by these Terms. If you do not agree with 
              any part of these Terms, please do not use our services.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-1-circle me-2 text-primary"></i>
              1. Acceptance of Terms
            </h5>
            <p className="mb-4">
              By creating an account, placing an order, or using any part of our website, you acknowledge that you 
              have read, understood, and agree to be bound by these Terms, along with our Privacy Policy. These Terms 
              apply to all users, including browsers, vendors, customers, and contributors of content.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-2-circle me-2 text-success"></i>
              2. Account Registration
            </h5>
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <p className="mb-2">When you create an account with us, you must:</p>
                <ul className="mb-0">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Be at least 18 years of age</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-3-circle me-2 text-info"></i>
              3. Products and Pricing
            </h5>
            <p className="mb-2"><strong>Product Information:</strong></p>
            <ul className="mb-3">
              <li>We strive to provide accurate product descriptions and images</li>
              <li>Colors may vary slightly due to monitor settings</li>
              <li>We reserve the right to discontinue products without notice</li>
              <li>Product availability is subject to stock</li>
            </ul>
            <p className="mb-2"><strong>Pricing:</strong></p>
            <ul className="mb-4">
              <li>All prices are in Indian Rupees (₹) and include GST</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to correct pricing errors</li>
              <li>Promotional offers have specific terms and validity</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-4-circle me-2 text-warning"></i>
              4. Orders and Payment
            </h5>
            <div className="card border-warning mb-4">
              <div className="card-body">
                <p className="mb-2"><strong>Order Process:</strong></p>
                <ul className="mb-3">
                  <li>Orders are subject to acceptance and availability</li>
                  <li>We reserve the right to refuse or cancel any order</li>
                  <li>Order confirmation does not guarantee product availability</li>
                  <li>Cancellation before shipment may incur processing fees</li>
                </ul>
                <p className="mb-2"><strong>Payment Terms:</strong></p>
                <ul className="mb-0">
                  <li>Payment must be completed at time of purchase (or on delivery for COD)</li>
                  <li>We accept credit cards, debit cards, UPI, net banking, and COD</li>
                  <li>All transactions are processed through secure payment gateways</li>
                  <li>Failed payments may result in order cancellation</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-5-circle me-2 text-danger"></i>
              5. Shipping and Delivery
            </h5>
            <p className="mb-2">Shipping terms:</p>
            <ul className="mb-4">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Risk of loss passes to you upon delivery</li>
              <li>Inspect packages upon delivery and report damages immediately</li>
              <li>Undeliverable packages due to incorrect address are customer's responsibility</li>
              <li>Shipping charges are non-refundable</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-6-circle me-2 text-primary"></i>
              6. Returns and Refunds
            </h5>
            <p className="mb-4">
              Our return and refund policy is detailed in our Return Policy document. Generally, we accept returns 
              within 7 days of delivery for unused products in original packaging. Refunds are processed within 
              5-7 business days of receiving the returned product.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-7-circle me-2 text-success"></i>
              7. Warranty and Disclaimers
            </h5>
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <p className="mb-2"><strong>Warranty:</strong></p>
                <ul className="mb-3">
                  <li>Products carry manufacturer's warranty as specified</li>
                  <li>Warranty claims must be made directly with authorized service centers</li>
                  <li>We are not responsible for warranty service quality</li>
                </ul>
                <p className="mb-2"><strong>Disclaimers:</strong></p>
                <ul className="mb-0">
                  <li>Products are sold "AS IS" beyond manufacturer warranty</li>
                  <li>We make no guarantees about product performance</li>
                  <li>We are not liable for consequential or incidental damages</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-8-circle me-2 text-info"></i>
              8. User Conduct
            </h5>
            <p className="mb-2">You agree NOT to:</p>
            <ul className="mb-4">
              <li>Use our website for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Upload viruses or malicious code</li>
              <li>Harass, abuse, or harm others</li>
              <li>Post false, inaccurate, or misleading content</li>
              <li>Impersonate any person or entity</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-9-circle me-2 text-warning"></i>
              9. Intellectual Property
            </h5>
            <p className="mb-4">
              All content on our website, including text, graphics, logos, images, and software, is the property of 
              MobileShop or its content suppliers and is protected by copyright, trademark, and other intellectual 
              property laws. You may not reproduce, distribute, modify, or create derivative works without our 
              express written permission.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-exclamation-triangle me-2 text-danger"></i>
              10. Limitation of Liability
            </h5>
            <div className="card border-danger mb-4">
              <div className="card-body">
                <p className="mb-0">
                  To the fullest extent permitted by law, MobileShop shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                  directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="mt-2 mb-0">
                  <li>Your use or inability to use our services</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>Any bugs, viruses, or similar transmitted to or through our service</li>
                  <li>Any errors or omissions in any content</li>
                </ul>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-shield-check me-2 text-success"></i>
              11. Indemnification
            </h5>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless MobileShop and its officers, directors, employees, 
              and agents from any claims, liabilities, damages, losses, and expenses arising out of or related to 
              your violation of these Terms or your use of our services.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-globe me-2 text-primary"></i>
              12. Governing Law
            </h5>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes 
              arising out of or relating to these Terms or your use of our services shall be subject to the 
              exclusive jurisdiction of the courts in Mumbai, India.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-arrow-repeat me-2 text-info"></i>
              13. Changes to Terms
            </h5>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
              posting to the website. Your continued use of our services after changes are posted constitutes 
              acceptance of the modified Terms.
            </p>

            <h5 className="fw-bold mb-3">
              <i className="bi bi-slash-circle me-2 text-warning"></i>
              14. Termination
            </h5>
            <p className="mb-4">
              We may terminate or suspend your account and access to our services immediately, without prior notice, 
              for any breach of these Terms. Upon termination, your right to use our services will immediately cease.
            </p>

            <div className="alert alert-primary border-0">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-question-circle me-2"></i>
                Questions About Terms?
              </h6>
              <p className="mb-1">If you have any questions about these Terms of Service:</p>
              <p className="mb-1"><strong>Email:</strong> legal@mobileshop.com</p>
              <p className="mb-1"><strong>Phone:</strong> +91 1234 567 890</p>
              <p className="mb-0"><strong>Address:</strong> 123 Business Street, Mumbai, India 400001</p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-muted mb-3">By using our services, you agree to these Terms</p>
              <button className="btn btn-primary" onClick={onClose}>
                <i className="bi bi-check-circle me-2"></i>I Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
