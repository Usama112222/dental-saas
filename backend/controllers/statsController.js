const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Treatment = require('../models/Treatment');
const Invoice = require('../models/Invoice');

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res) => {
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
                    scheduled: await Appointment.countDocuments({ status: 'Scheduled' }),
                    confirmed: await Appointment.countDocuments({ status: 'Confirmed' }),
                    inProgress: await Appointment.countDocuments({ status: 'In Progress' }),
                    completed: completedAppointments,
                    cancelled: await Appointment.countDocuments({ status: 'Cancelled' })
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
};

// @desc    Get appointment trends for charts
// @route   GET /api/stats/trends
// @access  Private (Admin only)
exports.getAppointmentTrends = async (req, res) => {
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
};

// @desc    Get treatment distribution
// @route   GET /api/stats/treatments
// @access  Private (Admin only)
exports.getTreatmentDistribution = async (req, res) => {
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
};

// @desc    Get monthly revenue
// @route   GET /api/stats/revenue
// @access  Private (Admin only)
exports.getMonthlyRevenue = async (req, res) => {
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
};