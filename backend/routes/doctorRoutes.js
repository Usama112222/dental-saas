const express = require('express');
const router = express.Router();
const {
    getDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctorController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { uploadDoctor } = require('../middleware/upload');

// Public routes (no authentication required)
router.get('/', getDoctors);
router.get('/:id', getDoctor);

// Protected admin routes with image upload
router.post('/', protect, authorizeRoles('admin'), uploadDoctor.single('image'), createDoctor);
router.put('/:id', protect, authorizeRoles('admin'), uploadDoctor.single('image'), updateDoctor);
router.delete('/:id', protect, authorizeRoles('admin'), deleteDoctor);

module.exports = router;