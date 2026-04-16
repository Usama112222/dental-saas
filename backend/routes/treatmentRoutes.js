const express = require('express');
const router = express.Router();
const {
    getTreatments,
    getTreatment,
    createTreatment,
    updateTreatment,
    deleteTreatment
} = require('../controllers/treatmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { uploadTreatment } = require('../middleware/upload');

// Public routes (no authentication needed for viewing)
router.get('/', getTreatments);
router.get('/:id', getTreatment);

// Admin only routes with image upload
router.post('/', protect, authorizeRoles('admin'), uploadTreatment.single('image'), createTreatment);
router.put('/:id', protect, authorizeRoles('admin'), uploadTreatment.single('image'), updateTreatment);
router.delete('/:id', protect, authorizeRoles('admin'), deleteTreatment);

module.exports = router;