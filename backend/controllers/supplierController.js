const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

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
  user.supplierInfo = {
    companyName: req.body.companyName,
    businessLicense: req.body.businessLicense,
    description: req.body.description
  };
  await user.save();

  res.json({ message: 'Successfully registered as a supplier', user });
};

// @desc    Get supplier dashboard data
// @route   GET /api/suppliers/dashboard
// @access  Private/Supplier
const getSupplierDashboard = async (req, res) => {
  const supplierId = req.user._id;

  // Get total sales and revenue
  const orders = await Order.find({ 'orderItems.product': { $in: await Product.find({ supplier: supplierId }).select('_id') } });
  const sales = orders.length;
  const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  // Get popular products
  const popularProducts = await Product.aggregate([
    { $match: { supplier: supplierId } },
    { $project: { name: 1, soldCount: { $size: '$sales' } } },
    { $sort: { soldCount: -1 } },
    { $limit: 5 }
  ]);

  // Get pending orders
  const pendingOrders = await Order.find({ 
    'orderItems.product': { $in: await Product.find({ supplier: supplierId }).select('_id') },
    status: 'pending'
  }).select('orderNumber totalPrice');

  // Get low stock alerts
  const lowStockThreshold = 10; // You can adjust this value as needed
  const lowStockAlerts = await Product.find({ 
    supplier: supplierId,
    stockQuantity: { $lt: lowStockThreshold }
  }).select('name stockQuantity');

  res.json({
    sales,
    revenue,
    popularProducts,
    pendingOrders,
    lowStockAlerts
  });
};

// @desc    Update supplier profile
// @route   PUT /api/suppliers/profile
// @access  Private
const updateSupplierProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user && user.isSupplier) {
    user.supplierInfo.companyName = req.body.companyName || user.supplierInfo.companyName;
    user.supplierInfo.businessLicense = req.body.businessLicense || user.supplierInfo.businessLicense;
    user.supplierInfo.description = req.body.description || user.supplierInfo.description;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isSupplier: updatedUser.isSupplier,
      supplierInfo: updatedUser.supplierInfo
    });
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
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

// @desc    Update a product
// @route   PUT /api/suppliers/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  const { name, description, price, category, stockQuantity } = req.body;

  const product = await Product.findById(req.params.id);

  if (product && product.supplier.toString() === req.user._id.toString()) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stockQuantity = stockQuantity || product.stockQuantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found or you are not authorized to update this product');
  }
};

// @desc    Delete a product
// @route   DELETE /api/suppliers/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.supplier.toString() === req.user._id.toString()) {
    await product.remove();
    res.json({ message: 'Product remove' });
  } else {
    res.status(404);
    throw new Error('Product not found or you are not authorized to delete this product');
  }
};

// @desc    Get supplier's products
// @route   GET /api/suppliers/products
// @access  Private
const getSupplierProducts = async (req, res) => {
  const products = await Product.find({ supplier: req.user._id });
  res.json(products);
};

module.exports = { 
  registerSupplier, 
  updateSupplierProfile, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getSupplierProducts 
};
