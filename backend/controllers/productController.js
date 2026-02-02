import Product from '../models/Product.js';
import Review from '../models/Review.js';

// @desc    Get all products with filters, search, pagination
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;

    // Build query
    const query = {};

    // Search by brand or model
    if (req.query.search) {
      query.$or = [
        { brand: { $regex: req.query.search, $options: 'i' } },
        { modelName: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (req.query.category) {
      query.categoryID = req.query.category;
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Only show approved and active products for public (stock filter removed - will show products even if out of stock)
    if (!req.query.showAll) {
      query.isApproved = true;
      query.isActive = true;
    }

    const count = await Product.countDocuments(query);

    // Sorting
    let sortOption = {};
    if (req.query.sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (req.query.sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (req.query.sort === 'rating') {
      sortOption = { ratings: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const products = await Product.find(query)
      .populate('categoryID', 'name')
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryID', 'name');

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin/Staff
export const createProduct = async (req, res) => {
  try {
    const { brand, modelName, description, price, discount, stock, categoryID, specs } = req.body;

    const images = req.files ? req.files.map(file => file.path) : [];

    const product = await Product.create({
      brand,
      modelName,
      description,
      price,
      discount: discount || 0,
      stock,
      categoryID,
      images,
      specs: specs ? JSON.parse(specs) : {},
      createdByRole: req.user.role,
      isApproved: req.user.role === 'admin' ? true : false
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin/Staff
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.brand = req.body.brand || product.brand;
      product.modelName = req.body.modelName || product.modelName;
      product.description = req.body.description || product.description;
      product.price = req.body.price !== undefined ? req.body.price : product.price;
      product.discount = req.body.discount !== undefined ? req.body.discount : product.discount;
      product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
      product.categoryID = req.body.categoryID || product.categoryID;

      if (req.body.specs) {
        product.specs = typeof req.body.specs === 'string' ? JSON.parse(req.body.specs) : req.body.specs;
      }

      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(file => file.path);
        product.images = [...product.images, ...newImages];
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve a product
// @route   PUT /api/products/:id/approve
// @access  Private/Admin
export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isApproved = true;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle product activation/deactivation
// @route   PUT /api/products/:id/toggle-active
// @access  Private/Admin
export const toggleProductActivation = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isActive = !product.isActive;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured/list
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: true, isActive: true })
      .populate('categoryID', 'name')
      .sort({ ratings: -1 })
      .limit(8);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get latest products
// @route   GET /api/products/latest/list
// @access  Public
export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: true, isActive: true })
      .populate('categoryID', 'name')
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      categoryID: product.categoryID,
      _id: { $ne: product._id },
      isApproved: true,
      isActive: true
    })
      .populate('categoryID', 'name')
      .limit(4);

    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
