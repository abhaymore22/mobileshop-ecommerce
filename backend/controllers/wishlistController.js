import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userID: req.user._id }).populate('products');

    if (wishlist) {
      res.json(wishlist);
    } else {
      res.json({ userID: req.user._id, products: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { productID } = req.body;

    let wishlist = await Wishlist.findOne({ userID: req.user._id });

    if (wishlist) {
      // Check if product already in wishlist
      if (wishlist.products.includes(productID)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }

      wishlist.products.push(productID);
      wishlist.updatedAt = Date.now();
      await wishlist.save();
    } else {
      // Create new wishlist
      wishlist = await Wishlist.create({
        userID: req.user._id,
        products: [productID]
      });
    }

    const populatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
    res.json(populatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const productID = req.params.productId;

    const wishlist = await Wishlist.findOne({ userID: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(id => id.toString() !== productID);
    wishlist.updatedAt = Date.now();
    await wishlist.save();

    const populatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
    res.json(populatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear wishlist
// @route   DELETE /api/wishlist
// @access  Private
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userID: req.user._id });

    if (wishlist) {
      wishlist.products = [];
      wishlist.updatedAt = Date.now();
      await wishlist.save();
      res.json({ message: 'Wishlist cleared' });
    } else {
      res.status(404).json({ message: 'Wishlist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
