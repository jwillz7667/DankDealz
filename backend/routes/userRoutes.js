const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;

// Create a new file for supplier routes
const supplierRouter = express.Router();
const { registerSupplier, addProduct, getSupplierProducts } = require('../controllers/supplierController');

supplierRouter.post('/register', protect, registerSupplier);
supplierRouter.post('/products', protect, addProduct);
supplierRouter.get('/products', protect, getSupplierProducts);

module.exports = router;
