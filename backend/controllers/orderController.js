const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// @desc    Get current orders
// @route   GET /api/orders/current
// @access  Private
const getCurrentOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id, isDelivered: false }).sort('-createdAt');
  res.json(orders);
};

// @desc    Reorder a previous order
// @route   POST /api/orders/reorder/:id
// @access  Private
const reorder = async (req, res) => {
  const oldOrder = await Order.findById(req.params.id);

  if (oldOrder && oldOrder.user.toString() === req.user._id.toString()) {
    const newOrder = new Order({
      user: req.user._id,
      orderItems: oldOrder.orderItems,
      shippingAddress: oldOrder.shippingAddress,
      paymentMethod: oldOrder.paymentMethod,
    });

    // Recalculate prices in case they've changed
    let itemsPrice = 0;
    for (const item of newOrder.orderItems) {
      const product = await Product.findById(item.product);
      item.price = product.price;
      itemsPrice += item.price * item.qty;
    }

    newOrder.itemsPrice = itemsPrice;
    newOrder.taxPrice = itemsPrice * 0.15; // Assuming 15% tax
    newOrder.shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
    newOrder.totalPrice = newOrder.itemsPrice + newOrder.taxPrice + newOrder.shippingPrice;

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  } else {
    res.status(404);
    throw new Error('Order not found or unauthorized');
  }
};

module.exports = { createOrder, getOrderById, updateOrderToPaid, getMyOrders, getCurrentOrders, reorder };
