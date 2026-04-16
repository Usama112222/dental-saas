const express = require('express');
const router = express.Router();
const {
    getAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    getAppointmentStats
} = require('../controllers/appointmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getAppointments)
    .post(createAppointment);

router.get('/stats', authorizeRoles('admin', 'staff'), getAppointmentStats);

router.route('/:id')
    .get(getAppointment)
    .put(updateAppointment);

router.put('/:id/cancel', cancelAppointment);

module.exports = router;