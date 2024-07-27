const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  addToCart, 
  getCartItems, 
  updateCartItem, 
  removeCartItem 
} = require('../controllers/cartController');

router.route('/')
  .get(protect, getCartItems)
  .post(protect, addToCart);

router.route('/:id')
  .put(protect, updateCartItem)
  .delete(protect, removeCartItem);

module.exports = router;
