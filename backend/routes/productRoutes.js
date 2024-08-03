const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProductReview,
  getHomePageData
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/home', getHomePageData);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, createProductReview);

module.exports = router;
