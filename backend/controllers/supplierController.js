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
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    supplier: req.user._id
  });

  if (product) {
    res.json({ message: 'Product removed' });
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

const getSupplierOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'orderItems.product': { $in: await Product.find({ supplier: req.user._id }).select('_id') } })
      .populate('user', 'name email')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the supplier owns any product in the order
    const hasProduct = order.orderItems.some(item => 
      item.product.toString() === req.user._id.toString()
    );

    if (!hasProduct) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const supplierId = req.user._id;

    // Get sales data for the last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const salesData = await Order.aggregate([
      { $match: { 'orderItems.product': { $in: await Product.find({ supplier: supplierId }).select('_id') }, createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, totalSales: { $sum: "$totalPrice" } } },
      { $sort: { _id: 1 } }
    ]);

    // Get product performance data
    const productPerformance = await Product.aggregate([
      { $match: { supplier: supplierId } },
      { $project: { name: 1, soldCount: { $size: '$sales' } } },
      { $sort: { soldCount: -1 } },
      { $limit: 10 }
    ]);

    // Get customer feedback summary
    const customerFeedback = await Product.aggregate([
      { $match: { supplier: supplierId } },
      { $project: { name: 1, reviews: 1 } },
      { $unwind: '$reviews' },
      { $group: { _id: '$_id', productName: { $first: '$name' }, averageRating: { $avg: '$reviews.rating' }, totalReviews: { $sum: 1 } } },
      { $sort: { averageRating: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      salesData: {
        labels: salesData.map(item => item._id),
        datasets: [{
          label: 'Sales',
          data: salesData.map(item => item.totalSales),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      productPerformance: {
        labels: productPerformance.map(item => item.name),
        datasets: [{
          label: 'Units Sold',
          data: productPerformance.map(item => item.soldCount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      },
      customerFeedback
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get supplier dashboard data
// @route   GET /api/suppliers/dashboard
// @access  Private/Supplier
const getSupplierDashboard = async (req, res) => {
  const supplierId = req.user._id;

  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  registerSupplier, 
  updateSupplierProfile, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getSupplierProducts,
  getSupplierOrders,
  updateOrderStatus,
  getAnalytics,
  getSupplierDashboard
};
