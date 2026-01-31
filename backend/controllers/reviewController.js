import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productID: req.params.productId })
      .populate('userID', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { productID, rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      userID: req.user._id,
      productID
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      userID: req.user._id,
      productID,
      rating,
      comment
    });

    // Update product ratings
    const reviews = await Review.find({ productID });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    product.ratings = avgRating;
    product.reviewsCount = reviews.length;
    await product.save();

    const populatedReview = await Review.findById(review._id).populate('userID', 'name profileImage');
    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.userID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();

    // Recalculate product ratings
    const product = await Product.findById(review.productID);
    const reviews = await Review.find({ productID: review.productID });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    product.ratings = avgRating;
    await product.save();

    const populatedReview = await Review.findById(updatedReview._id).populate('userID', 'name profileImage');
    res.json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review or is admin/staff
    if (review.userID.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin' && 
        req.user.role !== 'staff') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    const productID = review.productID;
    await Review.deleteOne({ _id: req.params.id });

    // Recalculate product ratings
    const product = await Product.findById(productID);
    const reviews = await Review.find({ productID });

    if (reviews.length > 0) {
      const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
      product.ratings = avgRating;
      product.reviewsCount = reviews.length;
    } else {
      product.ratings = 0;
      product.reviewsCount = 0;
    }

    await product.save();

    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/myreviews
// @access  Private
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userID: req.user._id })
      .populate('productID', 'brand modelName images')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
