const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  createOrder, 
  getOrderById, 
  updateOrderToPaid, 
  getMyOrders, 
  getCurrentOrders, 
  reorder 
} = require('../controllers/orderController');

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/current').get(protect, getCurrentOrders);
router.route('/reorder/:id').post(protect, reorder);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;
