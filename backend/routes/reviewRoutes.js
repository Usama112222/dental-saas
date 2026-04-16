const express = require('express');
const router = express.Router();
const {
    createReview,
    getDoctorReviews,
    getAllReviews,
    getReview,
    getMyReviews,
    updateReviewStatus,
    approveReview,
    replyToReview,
    deleteReview,
    getPendingReviewsCount
} = require('../controllers/reviewController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes (no authentication required)
router.get('/doctor/:doctorId', getDoctorReviews);

// Protected routes (authentication required)
router.use(protect);

// Patient routes
router.post('/', authorizeRoles('patient'), createReview);
router.get('/my-reviews', getMyReviews);

// Admin routes
router.get('/', authorizeRoles('admin', 'staff'), getAllReviews);
router.get('/pending/count', authorizeRoles('admin'), getPendingReviewsCount);
router.get('/:id', authorizeRoles('admin', 'staff'), getReview);
router.put('/:id/status', authorizeRoles('admin', 'staff'), updateReviewStatus);
router.put('/:id/approve', authorizeRoles('admin'), approveReview);
router.post('/:id/reply', authorizeRoles('admin'), replyToReview);
router.delete('/:id', authorizeRoles('admin', 'staff'), deleteReview);

module.exports = router;