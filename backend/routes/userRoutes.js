const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  getUserOrders,
  updateUserPreferences,
  getFavoriteProducts,
  addFavoriteProduct,
  removeFavoriteProduct
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get('/orders', protect, getUserOrders);
router.put('/preferences', protect, updateUserPreferences);
router.get('/favorites', protect, getFavoriteProducts);
router.post('/favorites/:id', protect, addFavoriteProduct);
router.delete('/favorites/:id', protect, removeFavoriteProduct);

module.exports = router;
