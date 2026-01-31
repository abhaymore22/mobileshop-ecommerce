import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Contact from '../models/Contact.js';

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
export const getDashboardAnalytics = async (req, res) => {
  try {
    // Total revenue
    const orders = await Order.find({}).populate('items.productID');
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    console.log('Total orders found:', orders.length);
    
    // Orders by status (case-insensitive)
    const pendingOrders = orders.filter(o => o.orderStatus?.toLowerCase() === 'pending').length;
    const processingOrders = orders.filter(o => o.orderStatus?.toLowerCase() === 'processing').length;
    const shippedOrders = orders.filter(o => o.orderStatus?.toLowerCase() === 'shipped').length;
    const deliveredOrders = orders.filter(o => o.orderStatus?.toLowerCase() === 'delivered').length;
    const cancelledOrders = orders.filter(o => o.orderStatus?.toLowerCase() === 'cancelled').length;

    console.log('Order status breakdown:', { pendingOrders, processingOrders, shippedOrders, deliveredOrders, cancelledOrders });

    // Payment status (case-insensitive)
    const paidOrders = orders.filter(o => o.paymentStatus?.toLowerCase() === 'paid').length;
    const unpaidOrders = orders.filter(o => o.paymentStatus?.toLowerCase() === 'unpaid').length;

    // Monthly revenue (last 6 months)
    const monthlyRevenue = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const nextDate = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
      
      const monthOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= date && orderDate < nextDate;
      });
      
      const revenue = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      monthlyRevenue.push({
        month: monthNames[date.getMonth()],
        revenue: revenue,
        orders: monthOrders.length
      });
    }

    // Product-wise sales
    const productSales = {};
    orders.forEach(order => {
      if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
          if (item.productID) {
            const productId = item.productID._id ? item.productID._id.toString() : item.productID.toString();
            if (!productSales[productId]) {
              productSales[productId] = {
                productID: productId,
                productName: item.productID.brand && item.productID.modelName 
                  ? `${item.productID.brand} ${item.productID.modelName}`
                  : 'Product',
                totalQty: 0,
                totalRevenue: 0
              };
            }
            productSales[productId].totalQty += item.qty;
            productSales[productId].totalRevenue += item.price * item.qty;
          }
        });
      }
    });

    // Get top 5 products
    const productSalesArray = Object.values(productSales);
    const topProducts = productSalesArray
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5)
      .map(ps => ({
        productName: ps.productName,
        totalQty: ps.totalQty,
        totalRevenue: ps.totalRevenue
      }));

    console.log('Top products:', topProducts);

    // User statistics
    const totalUsers = await User.countDocuments({});
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const staffUsers = await User.countDocuments({ role: 'staff' });
    const regularUsers = await User.countDocuments({ role: 'user' });

    // Contact statistics
    const totalContacts = await Contact.countDocuments({});
    const openContacts = await Contact.countDocuments({ status: 'Open' });
    const inProgressContacts = await Contact.countDocuments({ status: 'In Progress' });
    const resolvedContacts = await Contact.countDocuments({ status: 'Resolved' });
    const closedContacts = await Contact.countDocuments({ status: 'Closed' });
    const urgentContacts = await Contact.countDocuments({ priority: 'Urgent' });
    const registeredUserContacts = await Contact.countDocuments({ isRegisteredUser: true });
    const guestContacts = await Contact.countDocuments({ isRegisteredUser: false });

    // Contact category breakdown
    const contactsByCategory = await Contact.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const analyticsData = {
      totalRevenue,
      totalOrders: orders.length,
      ordersByStatus: {
        pending: pendingOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders
      },
      paymentStatus: {
        paid: paidOrders,
        unpaid: unpaidOrders
      },
      monthlyRevenue,
      topProducts,
      userStats: {
        total: totalUsers,
        admin: adminUsers,
        staff: staffUsers,
        regular: regularUsers
      },
      contactStats: {
        total: totalContacts,
        open: openContacts,
        inProgress: inProgressContacts,
        resolved: resolvedContacts,
        closed: closedContacts,
        urgent: urgentContacts,
        registeredUsers: registeredUserContacts,
        guests: guestContacts,
        byCategory: contactsByCategory
      }
    };

    console.log('Analytics response:', JSON.stringify(analyticsData, null, 2));
    res.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: error.message });
  }
};
