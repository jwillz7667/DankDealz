const express = require('express');
const router = express.Router();
const { 
  registerSupplier, 
  updateSupplierProfile, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getSupplierProducts,
  getSupplierDashboard,
  getSupplierOrders,
  updateOrderStatus
} = require('../controllers/supplierController');
const { protect, supplierOnly } = require('../middleware/authMiddleware');

router.post('/register', protect, registerSupplier);
router.put('/profile', protect, supplierOnly, updateSupplierProfile);
router.route('/products')
  .post(protect, supplierOnly, addProduct)
  .get(protect, supplierOnly, getSupplierProducts);
router.route('/products/:id')
  .put(protect, supplierOnly, updateProduct)
  .delete(protect, supplierOnly, deleteProduct);
router.get('/dashboard', protect, supplierOnly, getSupplierDashboard);
router.get('/orders', protect, supplierOnly, getSupplierOrders);
router.put('/orders/:id', protect, supplierOnly, updateOrderStatus);

// Add this line to export the router
module.exports = router;

module.exports = router;
