import ChatMessage from '../models/ChatMessage.js';

// Comprehensive knowledge base for mobile shop chatbot
const chatbotKnowledge = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'hii', 'helo', 'hola', 'namaste'],
    response: "👋 Hello! Welcome to MobileShop! I'm your virtual assistant here to help you find the perfect mobile phone and answer any questions.\n\n🔍 I can help you with:\n• Finding the right mobile phone\n• Comparing features and prices\n• Order tracking & delivery\n• Returns & refunds\n• Technical specifications\n\nWhat would you like to know?"
  },
  
  mobilePhones: {
    keywords: ['mobile', 'phone', 'smartphone', 'cell phone', 'cellphone', 'handset', 'device', 'iphone', 'samsung', 'android', 'which phone', 'recommend phone', 'best phone', 'good phone', 'latest phone', 'new phone'],
    response: "📱 We have a wide range of smartphones from top brands!\n\n🏆 Popular Brands:\n• Apple iPhone (Latest iOS devices)\n• Samsung Galaxy (Android flagship)\n• OnePlus (Performance leaders)\n• Xiaomi, Realme, Vivo, Oppo\n• Google Pixel\n\n💰 Price Range: ₹3,000 - ₹85,000\n\n🎯 To help you better, tell me:\n• Your budget range?\n• Preferred brand?\n• Key features you need (camera, battery, gaming)?\n\nYou can browse all phones in the Products section or use the search feature!"
  },
  
  features: {
    keywords: ['feature', 'specification', 'spec', 'camera', 'battery', 'storage', 'ram', 'processor', 'display', 'screen', '5g', '4g', 'wifi', 'bluetooth', 'fast charging', 'wireless charging'],
    response: "📊 Our phones come with various specifications:\n\n📸 Camera: From 12MP to 108MP, with AI features\n🔋 Battery: 3000mAh to 6000mAh with fast charging\n💾 Storage: 32GB to 512GB (expandable on some models)\n🧠 RAM: 2GB to 16GB for smooth performance\n⚡ Processor: Latest Snapdragon, MediaTek, Apple chips\n📱 Display: HD+ to AMOLED, 6\" to 7\" screens\n📡 Connectivity: 4G, 5G, WiFi 6, Bluetooth 5.0+\n\n💡 Visit the product page for detailed specifications of each model. You can also use filters to find phones with specific features!"
  },
  
  pricing: {
    keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'budget', 'affordable', 'discount', 'offer', 'sale', 'coupon', 'deal', 'promotion'],
    response: "💰 Our Price Range: ₹3,000 - ₹85,000\n\n📱 Budget Categories:\n• Entry Level: ₹3,000 - ₹15,000\n• Mid Range: ₹15,000 - ₹35,000\n• Premium: ₹35,000 - ₹60,000\n• Flagship: ₹60,000 - ₹85,000\n\n🎁 Special Offers:\n• Check homepage for current deals\n• Festival season discounts\n• Exchange offers available\n• EMI options for purchases above ₹10,000\n\n💳 All prices include GST. Free shipping on orders above ₹500!"
  },
  
  shipping: {
    keywords: ['shipping', 'delivery', 'ship', 'deliver', 'shipment', 'tracking', 'when will i get', 'how long', 'delivery time', 'courier', 'track order', 'where is my order'],
    response: "🚚 Delivery Options:\n\n📦 Standard Delivery: 5-7 business days (Free on orders ₹500+)\n⚡ Express Delivery: 2-3 business days (₹99)\n🏃 Same Day Delivery: Available in metro cities (₹199)\n\n📍 Shipping to: All major cities and towns in India\n\n🔍 Track Your Order:\n1. Login to your account\n2. Go to 'My Orders'\n3. Click on the order to see tracking details\n\n📧 You'll receive tracking number via email and SMS once your order is dispatched!"
  },
  
  returns: {
    keywords: ['return', 'refund', 'exchange', 'money back', 'replace', 'replacement', 'not satisfied', 'defective', 'damaged', 'wrong product', 'cancel order'],
    response: "🔄 Return & Refund Policy:\n\n✅ Return Window: 7 days from delivery\n📦 Conditions:\n• Product must be unused and in original packaging\n• All accessories, manuals, and warranty cards included\n• Original invoice required\n\n💰 Refund Process:\n1. Go to 'My Orders' in your account\n2. Select the order and click 'Return'\n3. Choose reason and submit request\n4. Our team will verify and approve\n5. Refund processed in 5-7 business days\n\n🔄 Exchange: Available for defective products within 7 days\n⚠️ Note: Phone must not have physical damage or water damage"
  },
  
  payment: {
    keywords: ['payment', 'pay', 'card', 'cod', 'cash on delivery', 'credit card', 'debit card', 'upi', 'paytm', 'gpay', 'phonepe', 'netbanking', 'emi', 'installment', 'payment method', 'how to pay'],
    response: "💳 Payment Methods Available:\n\n✅ Cash on Delivery (COD)\n• Available on orders up to ₹50,000\n• Pay when you receive the product\n• Additional ₹50 handling fee\n\n💰 Online Payment:\n• Credit/Debit Cards (Visa, Mastercard, RuPay)\n• UPI (Google Pay, PhonePe, Paytm)\n• Net Banking (All major banks)\n• Digital Wallets\n\n🏦 EMI Options:\n• Available on orders above ₹10,000\n• 3, 6, 9, 12 month plans\n• No cost EMI on select cards\n\n🔒 All transactions are 100% secure and encrypted!"
  },
  
  account: {
    keywords: ['account', 'register', 'sign up', 'signup', 'login', 'signin', 'password', 'profile', 'forgot password', 'reset password', 'email verification', 'verify email', 'create account', 'new account'],
    response: "👤 Account Management:\n\n📝 Create Account:\n1. Click 'Register' in the top menu\n2. Fill in your details (name, email, password, phone)\n3. Verify your email with OTP\n4. Start shopping!\n\n🔐 Login:\n• Use your registered email and password\n• 'Remember Me' for quick access\n\n🔑 Forgot Password?\n1. Click 'Forgot Password' on login page\n2. Enter your registered email\n3. Check email for reset link\n4. Create new password\n\n✏️ Update Profile:\n• Go to 'Profile' after login\n• Update name, address, phone number\n• Change password anytime\n\n✅ Benefits of Account:\n• Track orders easily\n• Save addresses for quick checkout\n• Wishlist your favorite phones\n• View order history"
  },
  
  orders: {
    keywords: ['order', 'my order', 'order status', 'order history', 'past orders', 'previous orders', 'track', 'order tracking', 'placed order', 'pending order'],
    response: "📦 Order Management:\n\n🔍 Check Order Status:\n1. Login to your account\n2. Click 'My Orders' in the menu\n3. View all your orders with status\n\n📊 Order Statuses:\n• Processing: Order received, preparing for shipment\n• Shipped: Order dispatched, tracking available\n• Delivered: Order successfully delivered\n• Cancelled: Order cancelled (refund initiated)\n\n📱 Order Details Include:\n• Product information\n• Payment status (Pending/Paid/Failed)\n• Delivery address\n• Invoice download\n• Tracking number\n\n📧 Email & SMS notifications sent for every status update!"
  },
  
  cart: {
    keywords: ['cart', 'shopping cart', 'add to cart', 'remove from cart', 'bag', 'basket', 'checkout', 'buy now'],
    response: "🛒 Shopping Cart Guide:\n\n➕ Add to Cart:\n1. Browse products or search for phones\n2. Click on product to view details\n3. Click 'Add to Cart' button\n4. Continue shopping or proceed to checkout\n\n🎯 Cart Features:\n• View all selected items\n• Adjust quantities\n• Remove unwanted items\n• See total price with taxes\n• Apply coupon codes\n\n💳 Checkout Process:\n1. Review cart items\n2. Click 'Proceed to Checkout'\n3. Enter/select delivery address\n4. Choose payment method\n5. Confirm and place order\n\n⚠️ Note: Stock is not reserved until payment is completed. Out of stock items cannot be added to cart."
  },
  
  wishlist: {
    keywords: ['wishlist', 'wish list', 'favorite', 'favourite', 'save for later', 'bookmark', 'like', 'heart'],
    response: "❤️ Wishlist Feature:\n\n💝 Add to Wishlist:\n• Click the heart icon on any product\n• Save phones you're interested in\n• Compare later before buying\n\n✨ Benefits:\n• Access from 'Wishlist' menu after login\n• Get notified when price drops\n• Track price changes\n• Quick add to cart from wishlist\n• Share wishlist with friends/family\n\n🔔 Stock Alerts:\n• If a product is out of stock, add to wishlist\n• We'll notify you when it's back in stock!\n\n📱 Wishlist is synced across all your devices when logged in."
  },
  
  brands: {
    keywords: ['brand', 'manufacturer', 'company', 'apple', 'samsung', 'oneplus', 'xiaomi', 'realme', 'vivo', 'oppo', 'google', 'pixel', 'motorola', 'nokia', 'poco', 'redmi', 'mi'],
    response: "🏆 Top Mobile Brands Available:\n\n📱 Premium Brands:\n• Apple iPhone - iOS ecosystem\n• Samsung Galaxy - Android flagship\n• Google Pixel - Pure Android experience\n• OnePlus - Fast & smooth performance\n\n💰 Value Brands:\n• Xiaomi (Mi, Redmi) - Feature packed\n• Realme - Young & trendy\n• POCO - Performance focused\n• Vivo - Camera specialists\n• Oppo - Stylish designs\n• Motorola - Stock Android\n\n🔍 Find by Brand:\n• Use category dropdown in menu\n• Filter by brand on Products page\n• Search brand name directly\n\n🌟 All products are 100% genuine with official warranty!"
  },
  
  warranty: {
    keywords: ['warranty', 'guarantee', 'insurance', 'protection', 'brand warranty', 'manufacturer warranty', 'extended warranty', 'service center', 'repair'],
    response: "🛡️ Warranty Information:\n\n✅ Standard Warranty:\n• 1 year manufacturer warranty on all phones\n• Covers manufacturing defects\n• Battery: 6 months warranty\n• Accessories: 3-6 months\n\n📋 Warranty Includes:\n• Free repairs for manufacturing defects\n• Replacement if not repairable\n• Service center support\n\n❌ Warranty Does NOT Cover:\n• Physical damage or cracks\n• Water/liquid damage\n• Unauthorized repairs or modifications\n• Normal wear and tear\n\n🔧 Service Centers:\n• Authorized service centers in all major cities\n• Visit product page for service center locations\n• Keep invoice for warranty claims\n\n📞 For warranty claims, contact support with:\n• Order ID\n• Product serial number\n• Description of issue\n• Purchase invoice"
  },
  
  comparison: {
    keywords: ['compare', 'comparison', 'difference', 'vs', 'versus', 'better', 'which is better', 'which one', 'choose', 'decide'],
    response: "⚖️ Comparing Phones:\n\n🔍 How to Compare:\n1. Visit product pages of phones you're interested in\n2. Check specifications side by side\n3. Compare prices, features, reviews\n\n📊 Key Comparison Points:\n• Processor & Performance\n• Camera quality (MP, features)\n• Battery life & charging speed\n• Display quality (AMOLED vs LCD)\n• RAM & Storage options\n• 5G vs 4G\n• Build quality & design\n• Brand reputation & service\n• Price & value for money\n\n💡 Tips for Choosing:\n• Set your budget first\n• List must-have features\n• Read customer reviews\n• Check latest models vs older (better deals)\n\n🤔 Need help comparing specific models? Tell me which phones you're considering!"
  },
  
  reviews: {
    keywords: ['review', 'rating', 'feedback', 'customer review', 'user review', 'opinion', 'experience', 'testimonial'],
    response: "⭐ Product Reviews:\n\n👀 View Reviews:\n• Each product page shows customer ratings\n• Read detailed reviews from verified buyers\n• See pros and cons mentioned by users\n• Filter by rating (5-star, 4-star, etc.)\n\n✍️ Write a Review:\n1. Login to your account\n2. Go to 'My Orders'\n3. Click on delivered order\n4. Rate and review the product\n5. Help other customers make decisions!\n\n🌟 Review Benefits:\n• Share your experience\n• Help others choose wisely\n• Influence product improvements\n• Build community trust\n\n🎁 Top reviewers may get special offers!\n\n✅ Only verified purchases can leave reviews to ensure authenticity."
  },
  
  technical: {
    keywords: ['technical', 'tech support', 'not working', 'issue', 'problem', 'error', 'bug', 'crash', 'hang', 'slow', 'freeze', 'restart', 'battery drain', 'heating', 'charging issue'],
    response: "🔧 Technical Support:\n\n⚠️ Common Issues & Solutions:\n\n📱 Phone Not Turning On:\n• Charge for 30 minutes\n• Try different charger\n• Hold power button for 15 seconds\n\n🔋 Battery Draining Fast:\n• Check battery usage in settings\n• Close background apps\n• Reduce screen brightness\n• Turn off unused features (GPS, Bluetooth)\n\n🌡️ Phone Heating:\n• Remove phone case while charging\n• Close heavy apps/games\n• Avoid using while charging\n• Keep software updated\n\n📶 Network Issues:\n• Toggle airplane mode\n• Restart phone\n• Check SIM card properly inserted\n• Contact network provider\n\n🆘 Still Having Issues?\n• Contact our support team\n• May require service center visit\n• Warranty covers manufacturing defects\n\n💬 For technical help, use our Contact Form with:\n• Order ID\n• Phone model\n• Detailed issue description\n• Photos/videos if applicable"
  },
  
  contact: {
    keywords: ['contact', 'support', 'help', 'customer service', 'customer care', 'talk to human', 'agent', 'representative', 'call', 'email', 'phone number', 'reach you', 'get in touch'],
    response: "📞 Contact Us:\n\n💬 Multiple Ways to Reach:\n\n📧 Email Support:\n• support@mobileshop.com\n• Response within 24 hours\n• Attach order details for faster resolution\n\n📱 Customer Care:\n• Toll Free: 1800-XXX-XXXX\n• Mon-Sat: 9 AM - 6 PM\n• Closed on Sundays & public holidays\n\n💻 Contact Form:\n• Click 'Contact Us' in footer\n• Fill details and submit query\n• Track your ticket in 'My Contacts' section\n\n💬 Live Chat:\n• You're already using it! 😊\n• Available 24/7 for basic queries\n\n🏢 Office Address:\n• Corporate Office details on Contact page\n\n🎫 For Support, Please Provide:\n• Your name and registered email\n• Order ID (if order related)\n• Detailed description of issue\n• Screenshots if applicable\n\n⏰ Average Response Time: 2-4 hours during business hours"
  },
  
  stock: {
    keywords: ['stock', 'available', 'availability', 'in stock', 'out of stock', 'when available', 'restock', 'notify', 'sold out'],
    response: "📦 Stock & Availability:\n\n✅ Check Stock Status:\n• Product page shows real-time stock status\n• Green badge = In Stock\n• Red badge = Out of Stock\n\n🔴 Out of Stock?\n• Add to Wishlist\n• Enable stock alerts\n• Get notified via email/SMS when back in stock\n\n📊 Stock Updates:\n• Updated real-time\n• Popular phones sell fast\n• Stock reserved only after payment\n\n⚠️ Limited Stock:\n• Some models have limited quantities\n• First come, first served\n• Complete checkout quickly\n\n🔔 Notifications:\n• Turn on stock alerts for your favorite phones\n• We'll inform you immediately when restocked\n\n💡 Tip: Check similar models from same brand if preferred model is out of stock!"
  },
  
  emi: {
    keywords: ['emi', 'installment', 'monthly payment', 'easy payment', 'no cost emi', 'bajaj', 'finance', 'loan'],
    response: "💳 EMI & Financing Options:\n\n📊 EMI Available:\n• Minimum purchase: ₹10,000\n• Tenure: 3, 6, 9, 12 months\n• Interest rates vary by bank\n\n🎁 No Cost EMI:\n• Select credit/debit cards\n• Pay same as product price\n• No interest charged\n• Available on orders ₹15,000+\n\n🏦 Partner Banks:\n• HDFC, ICICI, SBI, Axis\n• Citibank, Standard Chartered\n• Kotak, HSBC, American Express\n\n📱 How to Use EMI:\n1. Add product to cart\n2. Proceed to checkout\n3. Select 'EMI' payment option\n4. Choose your bank & tenure\n5. Enter card details\n6. Complete payment\n\n📋 Documents Required:\n• Valid credit/debit card\n• OTP verification\n• Some banks may need additional docs\n\n💰 EMI Calculator:\n• View monthly installment on product page\n• Compare different tenure options\n\n✅ Pre-approved by your bank? Even easier checkout!"
  },
  
  accessories: {
    keywords: ['accessory', 'accessories', 'case', 'cover', 'screen protector', 'tempered glass', 'charger', 'cable', 'earphone', 'headphone', 'power bank'],
    response: "🎧 Mobile Accessories:\n\n📱 Available Accessories:\n• Phone Cases & Covers\n• Tempered Glass & Screen Protectors\n• Fast Chargers & Cables\n• Earphones & Headphones\n• Power Banks\n• Car Chargers & Mounts\n• Memory Cards\n• Bluetooth Speakers\n\n💡 Recommendations:\n• Check 'You may also like' on product page\n• Accessories matched to your phone model\n• Combo offers available\n\n🎁 Bundle Deals:\n• Phone + Case + Screen Guard combos\n• Save up to 20% on bundles\n• Add during checkout\n\n🔍 Find Accessories:\n• Browse by category\n• Filter by phone model\n• Compatible accessories listed on each phone's page\n\n✅ All accessories are:\n• High quality\n• Brand warranty included\n• Tested for compatibility\n\n📦 Free shipping on accessory orders above ₹299!"
  }
};

// Find best matching response
const findBestResponse = (message) => {
  const messageLower = message.toLowerCase();
  
  // Check for greetings first
  for (const keyword of chatbotKnowledge.greeting.keywords) {
    if (messageLower.includes(keyword)) {
      return { response: chatbotKnowledge.greeting.response, intent: 'greeting' };
    }
  }

  // Check other categories
  let bestMatch = null;
  let maxMatches = 0;

  for (const [intent, data] of Object.entries(chatbotKnowledge)) {
    if (intent === 'greeting') continue;

    let matches = 0;
    for (const keyword of data.keywords) {
      if (messageLower.includes(keyword)) {
        matches++;
      }
    }

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = { response: data.response, intent };
    }
  }

  if (bestMatch) {
    return bestMatch;
  }

  // Default response
  return {
    response: "🤔 I'm not sure I understood that completely.\n\n💬 I can help you with:\n\n📱 Products & Shopping:\n• Mobile phone recommendations\n• Features & specifications\n• Pricing & offers\n• Brand information\n• Stock availability\n• Accessories\n\n🛒 Orders & Cart:\n• Shopping cart help\n• Checkout process\n• Order tracking\n• Order history\n\n🚚 Delivery & Returns:\n• Shipping options & time\n• Delivery tracking\n• Return & refund policy\n• Exchange process\n\n💳 Payment & Account:\n• Payment methods\n• EMI options\n• Account creation\n• Login issues\n• Password reset\n\n🛡️ Support:\n• Warranty information\n• Technical issues\n• Customer support contact\n• Reviews & ratings\n\n💡 Try asking questions like:\n• \"What phones are available?\"\n• \"How do I track my order?\"\n• \"What is the return policy?\"\n• \"Which payment methods do you accept?\"\n• \"How can I contact support?\"\n\nOr simply type your question, and I'll do my best to help! 😊",
    intent: 'default'
  };
};

// @desc    Send message to chatbot
// @route   POST /api/chatbot/message
// @access  Public
export const sendMessage = async (req, res) => {
  try {
    const { message, sessionID } = req.body;

    if (!message || !sessionID) {
      return res.status(400).json({
        success: false,
        message: 'Message and sessionID are required'
      });
    }

    // Get user ID if authenticated
    const userID = req.user ? req.user._id : null;

    // Find best response
    const { response, intent } = findBestResponse(message);

    // Save chat message
    const chatMessage = await ChatMessage.create({
      sessionID,
      userID,
      message,
      response,
      intent
    });

    res.json({
      success: true,
      response,
      intent,
      messageId: chatMessage._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get chat history for a session
// @route   GET /api/chatbot/history/:sessionID
// @access  Public
export const getChatHistory = async (req, res) => {
  try {
    const { sessionID } = req.params;
    const { limit = 50 } = req.query;

    const messages = await ChatMessage.find({ sessionID })
      .sort({ createdAt: 1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all chat sessions (for admin)
// @route   GET /api/chatbot/sessions
// @access  Private/Admin
export const getAllChatSessions = async (req, res) => {
  try {
    const sessions = await ChatMessage.aggregate([
      {
        $group: {
          _id: '$sessionID',
          userID: { $first: '$userID' },
          messageCount: { $sum: 1 },
          lastMessage: { $last: '$message' },
          lastResponse: { $last: '$response' },
          createdAt: { $first: '$createdAt' },
          lastActivity: { $last: '$createdAt' }
        }
      },
      { $sort: { lastActivity: -1 } },
      { $limit: 100 }
    ]);

    res.json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get chatbot analytics
// @route   GET /api/chatbot/analytics
// @access  Private/Admin
export const getChatbotAnalytics = async (req, res) => {
  try {
    const totalMessages = await ChatMessage.countDocuments();
    const totalSessions = await ChatMessage.distinct('sessionID').then(arr => arr.length);
    const registeredUserMessages = await ChatMessage.countDocuments({ userID: { $ne: null } });
    const guestMessages = await ChatMessage.countDocuments({ userID: null });

    // Get most common intents
    const intentStats = await ChatMessage.aggregate([
      {
        $group: {
          _id: '$intent',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get messages by date (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const messagesByDate = await ChatMessage.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      analytics: {
        totalMessages,
        totalSessions,
        registeredUserMessages,
        guestMessages,
        averageMessagesPerSession: totalSessions > 0 ? (totalMessages / totalSessions).toFixed(2) : 0,
        intentStats,
        messagesByDate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
