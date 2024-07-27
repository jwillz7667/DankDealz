const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// TODO: Implement order controller functions
// const { createOrder, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController');

// router.route('/').post(protect, createOrder);
// router.route('/myorders').get(protect, getMyOrders);
// router.route('/:id').get(protect, getOrderById);
// router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;
