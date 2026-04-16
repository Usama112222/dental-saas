const express = require('express');
const router = express.Router();
const {
    getPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// GET /api/patients - Modified to allow patients to get their own record
router.get('/', getPatients);

// POST /api/patients - Modified to allow patients to create their own profile
router.post('/', createPatient);

router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.delete('/:id', authorizeRoles('admin'), deletePatient);

module.exports = router;