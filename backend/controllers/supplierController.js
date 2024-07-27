const User = require('../models/userModel');
const Product = require('../models/productModel');

// @desc    Register as a supplier
// @route   POST /api/suppliers/register
// @access  Private
const registerSupplier = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.isSupplier) {
    res.status(400);
    throw new Error('User is already registered as a supplier');
  }

  user.isSupplier = true;
  await user.save();

  res.json({ message: 'Successfully registered as a supplier' });
};

// @desc    Add a new product
// @route   POST /api/suppliers/products
// @access  Private
const addProduct = async (req, res) => {
  const { name, description, price, category, stockQuantity } = req.body;

  const product = new Product({
    supplier: req.user._id,
    name,
    description,
    price,
    category,
    stockQuantity
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Get supplier's products
// @route   GET /api/suppliers/products
// @access  Private
const getSupplierProducts = async (req, res) => {
  const products = await Product.find({ supplier: req.user._id });
  res.json(products);
};

module.exports = { registerSupplier, addProduct, getSupplierProducts };
