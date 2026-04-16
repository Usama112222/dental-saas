const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Treatment = require('../models/Treatment');
const Invoice = require('../models/Invoice');

// ========== PUBLIC STATS (No authentication required) ==========
// This endpoint is for the home page - shows basic counts
router.get('/public', async (req, res) => {
    try {
        const [totalPatients, totalAppointments, totalDoctors, totalTreatments] = await Promise.all([
            Patient.countDocuments(),
            Appointment.countDocuments(),
            Doctor.countDocuments(),
            Treatment.countDocuments()
        ]);

        res.json({
            success: true,
            data: {
                patients: totalPatients || 0,
                appointments: totalAppointments || 0,
                doctors: totalDoctors || 0,
                treatments: totalTreatments || 0
            }
        });
    } catch (error) {
        console.error('Error fetching public stats:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// ========== PROTECTED STATS (Admin only) ==========
// All routes below this require authentication and admin role
router.use(protect);
router.use(authorizeRoles('admin'));

// Get dashboard statistics
router.get('/', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const [
            totalPatients,
            totalAppointments,
            totalDoctors,
            totalTreatments,
            todayAppointments,
            completedAppointments,
            pendingAppointments,
            revenueData
        ] = await Promise.all([
            Patient.countDocuments(),
            Appointment.countDocuments(),
            Doctor.countDocuments(),
            Treatment.countDocuments(),
            Appointment.countDocuments({ 
                date: { $gte: today, $lt: tomorrow },
                status: { $ne: 'Cancelled' }
            }),
            Appointment.countDocuments({ status: 'Completed' }),
            Appointment.countDocuments({ 
                status: { $in: ['Scheduled', 'Confirmed'] }
            }),
            Invoice.aggregate([
                { $match: { status: 'Paid' } },
                { $group: { _id: null, total: { $sum: '$total' } } }
            ])
        ]);

        // Get appointment status distribution
        const statusDistribution = await Appointment.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const statusMap = {};
        statusDistribution.forEach(item => {
            statusMap[item._id] = item.count;
        });

        res.json({
            success: true,
            data: {
                patients: totalPatients,
                appointments: totalAppointments,
                doctors: totalDoctors,
                treatments: totalTreatments,
                todayAppointments,
                completedAppointments,
                pendingAppointments,
                revenue: revenueData[0]?.total || 0,
                appointmentStats: {
                    scheduled: statusMap['Scheduled'] || 0,
                    confirmed: statusMap['Confirmed'] || 0,
                    inProgress: statusMap['In Progress'] || 0,
                    completed: statusMap['Completed'] || 0,
                    cancelled: statusMap['Cancelled'] || 0,
                    noShow: statusMap['No Show'] || 0
                }
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Get appointment trends for charts
router.get('/trends', async (req, res) => {
    try {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();
        const monthlyData = [];

        for (let i = 0; i < 6; i++) {
            const month = new Date(currentYear, i, 1);
            const nextMonth = new Date(currentYear, i + 1, 1);
            
            const count = await Appointment.countDocuments({
                date: { $gte: month, $lt: nextMonth },
                status: { $ne: 'Cancelled' }
            });
            
            monthlyData.push({
                name: months[i],
                appointments: count
            });
        }

        res.json({
            success: true,
            data: monthlyData
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get treatment distribution
router.get('/treatments', async (req, res) => {
    try {
        const distribution = await Appointment.aggregate([
            { $match: { status: 'Completed' } },
            { $group: { _id: '$type', value: { $sum: 1 } } },
            { $project: { name: '$_id', value: 1, _id: 0 } }
        ]);

        res.json({
            success: true,
            data: distribution
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get monthly revenue
router.get('/revenue', async (req, res) => {
    try {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();
        const monthlyRevenue = [];

        for (let i = 0; i < 6; i++) {
            const month = new Date(currentYear, i, 1);
            const nextMonth = new Date(currentYear, i + 1, 1);
            
            const result = await Invoice.aggregate([
                { 
                    $match: { 
                        status: 'Paid',
                        createdAt: { $gte: month, $lt: nextMonth }
                    } 
                },
                { $group: { _id: null, total: { $sum: '$total' } } }
            ]);
            
            monthlyRevenue.push({
                name: months[i],
                revenue: result[0]?.total || 0
            });
        }

        res.json({
            success: true,
            data: monthlyRevenue
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;