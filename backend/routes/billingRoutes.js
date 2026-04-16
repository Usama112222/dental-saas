const express = require('express');
const router = express.Router();
const {
    getInvoices,
    getSingleInvoice,
    createInvoice,
    updateInvoice,
    processPayment,
    getRevenueStats
} = require('../controllers/billingController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// ========== SPECIFIC ROUTES (must come before parameterized routes) ==========
// Stats route
router.get('/stats', authorizeRoles('admin'), getRevenueStats);

// ========== COLLECTION ROUTES ==========
router.route('/')
    .get(getInvoices)
    .post(authorizeRoles('admin', 'staff'), createInvoice);

// ========== SINGLE INVOICE ROUTES (parameterized) ==========
router.route('/:id')
    .get(getSingleInvoice)
    .put(authorizeRoles('admin'), updateInvoice);

// Payment route
router.put('/:id/pay', processPayment);

module.exports = router;