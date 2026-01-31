import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from '../config/emailConfig.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    console.log('Creating order:', { items, shippingAddress, paymentMethod, userID: req.user._id });

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    // Validate products and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productID);

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productID} not found` });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({ message: `Insufficient stock for ${product.modelName}` });
      }

      const price = product.price - (product.price * product.discount / 100);
      totalAmount += price * item.qty;

      orderItems.push({
        productID: item.productID,
        qty: item.qty,
        price
      });

      // Deduct stock
      product.stock -= item.qty;
      await product.save();
    }

    const order = await Order.create({
      userID: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid'
    });

    console.log('Order created successfully:', order._id);

    // Clear cart after order
    await Cart.findOneAndUpdate(
      { userID: req.user._id },
      { items: [], updatedAt: Date.now() }
    );

    // Send order confirmation email
    try {
      const populatedOrder = await Order.findById(order._id)
        .populate('items.productID', 'brand modelName')
        .populate('userID', 'name email');
      
      await sendOrderConfirmationEmail(populatedOrder);
      console.log('Order confirmation email sent to:', populatedOrder.userID.email);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError.message);
      // Don't block order creation if email fails
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.user._id })
      .populate('items.productID')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userID', 'name email phone')
      .populate('items.productID');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userID._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userID', 'name email')
      .populate('items.productID', 'brand modelName')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id)
      .populate('items.productID', 'brand modelName')
      .populate('userID', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const oldOrderStatus = order.orderStatus;
    const oldPaymentStatus = order.paymentStatus;

    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    order.updatedAt = Date.now();
    const updatedOrder = await order.save();

    // Send status update email if status changed
    try {
      if (orderStatus && orderStatus !== oldOrderStatus) {
        await sendOrderStatusUpdateEmail(updatedOrder, oldOrderStatus, orderStatus);
        console.log('Order status update email sent to:', updatedOrder.userID.email);
      }
    } catch (emailError) {
      console.error('Failed to send order status update email:', emailError.message);
      // Don't block order update if email fails
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mock payment with Stripe
// @route   POST /api/orders/:id/pay
// @access  Private
export const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Mock Stripe payment
    order.paymentStatus = 'Paid';
    order.updatedAt = Date.now();
    await order.save();

    res.json({ message: 'Payment successful', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
