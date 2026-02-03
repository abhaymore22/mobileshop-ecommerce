import sgMail from '@sendgrid/mail';

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Verify SendGrid configuration
if (process.env.SENDGRID_API_KEY) {
  console.log('✅ SendGrid is configured');
  console.log('📧 Sending from:', process.env.EMAIL_USER || 'moreacademyabhaymore@gmail.com');
} else {
  console.error('❌ SENDGRID_API_KEY is not set');
}

// Send OTP verification email
export const sendVerificationEmail = async (email, name, otp) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_USER || 'moreacademyabhaymore@gmail.com',
    subject: 'Verify Your Email - MobileShop',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
          }
          .otp-box {
            background: white;
            padding: 25px;
            text-align: center;
            border: 2px dashed #667eea;
            border-radius: 10px;
            margin: 25px 0;
          }
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #667eea;
            font-family: 'Courier New', monospace;
          }
          .footer {
            background: #f0f0f0;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 10px 10px;
          }
          .info-box {
            background: white;
            padding: 15px;
            border-left: 4px solid #667eea;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📱 MobileShop</h1>
          <p>Welcome to our community!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name}! 👋</h2>
          <p>Thank you for registering with MobileShop. We're excited to have you on board!</p>
          
          <p>To complete your registration, please use the following One-Time Password (OTP):</p>
          
          <div class="otp-box">
            <p style="margin: 0; color: #666; font-size: 14px;">Your Verification Code</p>
            <div class="otp-code">${otp}</div>
          </div>
          
          <div class="info-box">
            <strong>⏰ Important:</strong> This OTP will expire in 10 minutes for security reasons.
          </div>
          
          <div class="info-box" style="border-left-color: #f44336;">
            <strong>🔒 Security Tips:</strong>
            <ul style="margin: 10px 0;">
              <li>Never share this OTP with anyone</li>
              <li>MobileShop will never ask for your OTP via phone or email</li>
              <li>If you didn't request this code, please ignore this email</li>
            </ul>
          </div>
          
          <p>If you didn't create an account with MobileShop, please ignore this email.</p>
        </div>
        
        <div class="footer">
          <p><strong>MobileShop</strong> - Your trusted mobile shopping destination</p>
          <p>This is an automated email, please do not reply to this message.</p>
          <p>&copy; ${new Date().getFullYear()} MobileShop. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ OTP verification email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send OTP verification email:', error);
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    throw error;
  }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_USER || 'moreacademyabhaymore@gmail.com',
    subject: 'Welcome to MobileShop! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
          }
          .button {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            background: #f0f0f0;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Welcome to MobileShop!</h1>
        </div>
        
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Your email has been successfully verified. Welcome to the MobileShop family! 🎊</p>
          
          <p>You can now enjoy all the features of MobileShop:</p>
          <ul>
            <li>✅ Browse our latest mobile phones</li>
            <li>✅ Add products to cart and wishlist</li>
            <li>✅ Track your orders</li>
            <li>✅ Leave reviews and ratings</li>
            <li>✅ Get exclusive deals and offers</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/products" class="button">Start Shopping</a>
          </div>
          
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
        
        <div class="footer">
          <p><strong>MobileShop</strong> - Your trusted mobile shopping destination</p>
          <p>&copy; ${new Date().getFullYear()} MobileShop. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Welcome email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    throw error;
  }
};

// Send password reset OTP email
export const sendPasswordResetOTP = async (email, name, otp) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_USER || 'moreacademyabhaymore@gmail.com',
    subject: 'Password Reset Request - MobileShop',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
          }
          .otp-box {
            background: white;
            padding: 25px;
            text-align: center;
            border: 2px dashed #667eea;
            border-radius: 10px;
            margin: 25px 0;
          }
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #667eea;
            font-family: 'Courier New', monospace;
          }
          .footer {
            background: #f0f0f0;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 10px 10px;
          }
          .info-box {
            background: white;
            padding: 15px;
            border-left: 4px solid #667eea;
            margin: 20px 0;
          }
          .warning-box {
            background: #fff3cd;
            padding: 15px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
          <p>MobileShop</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>We received a request to reset your password. Use the following One-Time Password (OTP) to reset your password:</p>
          
          <div class="otp-box">
            <p style="margin: 0; color: #666; font-size: 14px;">Your Password Reset Code</p>
            <div class="otp-code">${otp}</div>
          </div>
          
          <div class="info-box">
            <strong>⏰ Important:</strong> This OTP will expire in 10 minutes for security reasons.
          </div>
          
          <div class="warning-box">
            <strong>⚠️ Security Alert:</strong>
            <ul style="margin: 10px 0;">
              <li>Never share this OTP with anyone</li>
              <li>If you didn't request a password reset, please ignore this email and your password will remain unchanged</li>
              <li>For security reasons, change your password immediately if you suspect unauthorized access</li>
            </ul>
          </div>
          
          <p>After entering the OTP, you'll be able to set a new password for your account.</p>
        </div>
        
        <div class="footer">
          <p><strong>MobileShop</strong> - Your trusted mobile shopping destination</p>
          <p>This is an automated email, please do not reply to this message.</p>
          <p>&copy; ${new Date().getFullYear()} MobileShop. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Password reset OTP email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending password reset OTP email:', error);
    throw error;
  }
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (order) => {
  const email = order.userID?.email;
  const name = order.userID?.name;
  
  if (!email || !name) {
    throw new Error('User email or name not found in order');
  }
  
  const orderUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders/${order._id}`;
  
  const msg = {
    from: {
      name: 'MobileShop',
      address: process.env.EMAIL_USER || 'moreacademyabhaymore@gmail.com'
    },
    to: email,
    subject: `Order Confirmation - Order #${order._id.toString().slice(-8).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
          .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
          .item { padding: 10px 0; border-bottom: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📱 Order Confirmed!</h1>
          <p>Thank you for your order</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name}! 🎉</h2>
          <p>We've received your order and are getting it ready. You'll receive another email when your order has been shipped.</p>
          
          <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p><strong>Total Amount:</strong> RS ${order.totalAmount.toLocaleString()}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            <p><strong>Order Status:</strong> ${order.orderStatus}</p>
            
            <h4>Items Ordered:</h4>
            ${order.items.map(item => `
              <div class="item">
                <strong>${item.productID?.brand || 'Product'} ${item.productID?.modelName || ''}</strong><br>
                Quantity: ${item.qty} × RS ${item.price.toLocaleString()} = RS ${(item.qty * item.price).toLocaleString()}
              </div>
            `).join('')}
            
            <h4>Shipping Address:</h4>
            <p>${order.shippingAddress}</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${orderUrl}" class="button">Track Your Order</a>
          </div>
          
          <p>If you have any questions about your order, please don't hesitate to contact us.</p>
        </div>
        
        <div class="footer">
          <p><strong>MobileShop</strong> - Your trusted mobile shopping destination</p>
          <p>&copy; ${new Date().getFullYear()} MobileShop. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Order confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending order confirmation email:', error);
    throw error;
  }
};

// Send order status update email
export const sendOrderStatusUpdateEmail = async (order, oldStatus, newStatus) => {
  const email = order.userID?.email;
  const name = order.userID?.name;
  
  if (!email || !name) {
    throw new Error('User email or name not found in order');
  }
  
  const orderUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders/${order._id}`;
  
  const statusMessages = {
    'Processing': 'We are processing your order and will ship it soon.',
    'Shipped': 'Your order has been shipped! You should receive it within 3-5 business days.',
    'Delivered': 'Your order has been delivered! We hope you enjoy your purchase.',
    'Cancelled': 'Your order has been cancelled. If you did not request this, please contact us immediately.'
  };
  
  const msg = {
    from: {
      name: 'MobileShop',
      address: process.env.EMAIL_USER || 'moreacademyabhaymore@gmail.com'
    },
    to: email,
    subject: `Order Status Update - #${order._id.toString().slice(-8).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
          .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
          .status-update { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📦 Order Status Updated</h1>
        </div>
        
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Your order status has been updated.</p>
          
          <div class="status-update">
            <p style="font-size: 14px; color: #666;">Order #${order._id.toString().slice(-8).toUpperCase()}</p>
            <h3 style="margin: 10px 0;">
              <span style="text-decoration: line-through; color: #999;">${oldStatus}</span>
              →
              <span style="color: #667eea;">${newStatus}</span>
            </h3>
            <p>${statusMessages[newStatus] || 'Your order status has been updated.'}</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${orderUrl}" class="button">View Order Details</a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>MobileShop</strong> - Your trusted mobile shopping destination</p>
          <p>&copy; ${new Date().getFullYear()} MobileShop. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Order status update email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending order status update email:', error);
    throw error;
  }
};

// Send contact query acknowledgment email
export const sendContactAcknowledgmentEmail = async (contact) => {
  const email = contact.email;
  const name = contact.name;
  
  const msg = {
    from: {
      name: 'MobileShop Support',
      address: process.env.EMAIL_USER || 'moreacademyabhaymore@gmail.com'
    },
    to: email,
    subject: `We received your query - Ticket #${contact._id.toString().slice(-6).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
          .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
          .query-box { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📧 Query Received</h1>
          <p>We're here to help!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Thank you for contacting MobileShop. We've received your query and our team will respond as soon as possible.</p>
          
          <div class="query-box">
            <p><strong>Ticket ID:</strong> #${contact._id.toString().slice(-6).toUpperCase()}</p>
            <p><strong>Category:</strong> ${contact.category}</p>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Status:</strong> ${contact.status}</p>
            <p><strong>Priority:</strong> ${contact.priority}</p>
            
            <h4>Your Message:</h4>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${contact.message}</p>
          </div>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our support team will review your query</li>
            <li>You'll receive a response via email within 24-48 hours</li>
            <li>We'll keep you updated on any status changes</li>
          </ul>
          
          <p>If this is urgent, please reply to this email and mention "URGENT" in the subject line.</p>
        </div>
        
        <div class="footer">
          <p><strong>MobileShop Support</strong></p>
          <p>&copy; ${new Date().getFullYear()} MobileShop. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Contact acknowledgment email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending contact acknowledgment email:', error);
    throw error;
  }
};

// Send contact status update email
export const sendContactStatusUpdateEmail = async (contact, oldStatus) => {
  const email = contact.email;
  const name = contact.name;
  const response = contact.response;
  
  const msg = {
    from: {
      name: 'MobileShop Support',
      address: process.env.EMAIL_USER || 'moreacademyabhaymore@gmail.com'
    },
    to: email,
    subject: `Update on your query - Ticket #${contact._id.toString().slice(-6).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
          .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
          .query-box { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
          .response-box { background: #e8f4f8; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>💬 Query Update</h1>
          <p>We've responded to your query</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Your support ticket has been updated.</p>
          
          <div class="query-box">
            <p><strong>Ticket ID:</strong> #${contact._id.toString().slice(-6).toUpperCase()}</p>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Status:</strong> <span style="color: ${contact.status === 'Resolved' ? '#28a745' : '#667eea'};">${contact.status}</span></p>
            <p><strong>Priority:</strong> ${contact.priority}</p>
          </div>
          
          ${response ? `
          <div class="response-box">
            <h3 style="margin-top: 0;">Our Response:</h3>
            <p>${response}</p>
          </div>
          ` : ''}
          
          <div class="query-box">
            <h4>Your Original Message:</h4>
            <p style="color: #666;">${contact.message}</p>
          </div>
          
          ${contact.status === 'Resolved' ? `
          <p style="background: #d4edda; padding: 15px; border-radius: 5px; color: #155724;">
            ✅ <strong>This ticket has been marked as resolved.</strong><br>
            If you need further assistance, please submit a new query or reply to this email.
          </p>
          ` : `
          <p>If you have any additional questions or concerns, please reply to this email.</p>
          `}
        </div>
        
        <div class="footer">
          <p><strong>MobileShop Support</strong></p>
          <p>&copy; ${new Date().getFullYear()} MobileShop. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Contact status update email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending contact status update email:', error);
    throw error;
  }
};

export default transporter;
