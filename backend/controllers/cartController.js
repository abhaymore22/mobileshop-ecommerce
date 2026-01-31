import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.user._id }).populate('items.productID');

    if (cart) {
      res.json(cart);
    } else {
      res.json({ userID: req.user._id, items: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productID, qty } = req.body;

    console.log('Add to cart request:', { productID, qty, userID: req.user._id });

    // Validate input
    if (!productID || !qty) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    // Check if product exists and has stock
    const product = await Product.findById(productID);
    if (!product) {
      console.log('Product not found:', productID);
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is active
    if (!product.isActive) {
      return res.status(400).json({ message: 'Product is not available' });
    }

    console.log('Product found:', { name: product.modelName, stock: product.stock });

    if (product.stock === 0) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    if (product.stock < qty) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ userID: req.user._id });

    if (cart) {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(item => item.productID.toString() === productID);

      if (itemIndex > -1) {
        // Update quantity
        const newQty = cart.items[itemIndex].qty + qty;
        if (product.stock < newQty) {
          return res.status(400).json({ message: 'Insufficient stock' });
        }
        cart.items[itemIndex].qty = newQty;
        console.log('Updated existing item quantity to:', newQty);
      } else {
        // Add new item
        cart.items.push({ productID, qty });
        console.log('Added new item to cart');
      }

      cart.updatedAt = Date.now();
      await cart.save();
    } else {
      // Create new cart
      console.log('Creating new cart');
      cart = await Cart.create({
        userID: req.user._id,
        items: [{ productID, qty }]
      });
    }

    const populatedCart = await Cart.findById(cart._id).populate('items.productID');
    console.log('Cart saved successfully, items count:', populatedCart.items.length);
    res.json(populatedCart);
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;
    const productID = req.params.productId;

    const cart = await Cart.findOne({ userID: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productID.toString() === productID);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Check stock
    const product = await Product.findById(productID);
    if (product.stock < qty) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    cart.items[itemIndex].qty = qty;
    cart.updatedAt = Date.now();
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productID');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const productID = req.params.productId;

    const cart = await Cart.findOne({ userID: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productID.toString() !== productID);
    cart.updatedAt = Date.now();
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productID');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.user._id });

    if (cart) {
      cart.items = [];
      cart.updatedAt = Date.now();
      await cart.save();
      res.json({ message: 'Cart cleared' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
