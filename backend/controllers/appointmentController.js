const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Invoice = require('../models/Invoice');

// Helper function for status colors
function getStatusColor(status) {
    switch(status) {
        case 'Scheduled': return 'blue';
        case 'Confirmed': return 'green';
        case 'Completed': return 'purple';
        case 'Cancelled': return 'red';
        case 'No Show': return 'orange';
        default: return 'gray';
    }
}

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
    try {
        let query = {};
        
        // For patients, only show their own appointments
        if (req.user.role === 'patient') {
            const patient = await Patient.findOne({ user: req.user.id });
            if (patient) {
                query.patient = patient._id;
            } else {
                return res.json({ success: true, count: 0, data: [] });
            }
        }
        
        // Filter by date
        if (req.query.date) {
            const startDate = new Date(req.query.date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(req.query.date);
            endDate.setHours(23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        }
        
        // Filter by doctor
        if (req.query.doctor) {
            query.doctor = req.query.doctor;
        }
        
        // Filter by status
        if (req.query.status) {
            query.status = req.query.status;
        }
        
        // Filter by patient (for admin/staff)
        if (req.query.patient && req.user.role !== 'patient') {
            query.patient = req.query.patient;
        }
        
        // Get appointments with proper population
        const appointments = await Appointment.find(query)
            .populate({
                path: 'patient',
                model: 'Patient',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email phone'
                }
            })
            .populate({
                path: 'doctor',
                model: 'Doctor',
                select: 'name specialization email image'
            })
            .sort({ date: 1, time: 1 });
        
        // Format the response
        const formattedAppointments = appointments.map(app => {
            const appObj = app.toObject();
            return {
                ...appObj,
                patientId: appObj.patient?._id,
                patientName: appObj.patient?.user?.name || 'Unknown',
                patientEmail: appObj.patient?.user?.email || '',
                patientPhone: appObj.patient?.user?.phone || '',
                doctorId: appObj.doctor?._id,
                doctorName: appObj.doctor?.name || 'Not Assigned',
                doctorSpecialization: appObj.doctor?.specialization || '',
                doctorEmail: appObj.doctor?.email || '',
                formattedDate: appObj.date ? new Date(appObj.date).toLocaleDateString() : '',
                formattedTime: appObj.time,
                statusColor: getStatusColor(appObj.status)
            };
        });
        
        console.log(`Found ${formattedAppointments.length} appointments`);
        
        res.json({
            success: true,
            count: formattedAppointments.length,
            data: formattedAppointments
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate({
                path: 'patient',
                model: 'Patient',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email phone'
                }
            })
            .populate({
                path: 'doctor',
                model: 'Doctor',
                select: 'name specialization email'
            });
        
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        
        // Check if user has permission
        if (req.user.role === 'patient') {
            const patient = await Patient.findOne({ user: req.user.id });
            if (patient && appointment.patient?._id.toString() !== patient._id.toString()) {
                return res.status(403).json({ success: false, message: 'Access denied' });
            }
        }
        
        const formattedAppointment = {
            ...appointment.toObject(),
            patientName: appointment.patient?.user?.name || 'Unknown',
            patientEmail: appointment.patient?.user?.email || '',
            doctorName: appointment.doctor?.name || 'Not Assigned',
            doctorSpecialization: appointment.doctor?.specialization || ''
        };
        
        res.json({ success: true, data: formattedAppointment });
    } catch (error) {
        console.error('Error fetching appointment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
    try {
        console.log('Creating appointment with data:', req.body);
        
        const requiredFields = ['patient', 'doctor', 'date', 'time', 'type'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ 
                    success: false, 
                    message: `${field} is required` 
                });
            }
        }
        
        const appointmentData = {
            patient: req.body.patient,
            doctor: req.body.doctor,
            date: new Date(req.body.date),
            time: req.body.time,
            duration: req.body.duration || 30,
            type: req.body.type,
            symptoms: req.body.symptoms || '',
            notes: req.body.notes || '',
            status: 'Scheduled',
            paymentStatus: 'Pending'
        };
        
        const appointment = await Appointment.create(appointmentData);
        
        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate({
                path: 'patient',
                model: 'Patient',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email'
                }
            })
            .populate({
                path: 'doctor',
                model: 'Doctor',
                select: 'name specialization'
            });
        
        const formattedAppointment = {
            ...populatedAppointment.toObject(),
            patientName: populatedAppointment.patient?.user?.name || 'Unknown',
            patientEmail: populatedAppointment.patient?.user?.email || '',
            doctorName: populatedAppointment.doctor?.name || 'Not Assigned',
            doctorSpecialization: populatedAppointment.doctor?.specialization || ''
        };
        
        res.status(201).json({
            success: true,
            data: formattedAppointment,
            message: 'Appointment booked successfully'
        });
        
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        
        res.json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
exports.cancelAppointment = async (req, res) => {
    try {
        const { reason } = req.body;
        
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                status: 'Cancelled',
                cancelledBy: req.user.role === 'patient' ? 'Patient' : 'Staff',
                cancellationReason: reason || 'No reason provided'
            },
            { new: true }
        );
        
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        
        res.json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get appointment statistics
// @route   GET /api/appointments/stats
// @access  Private
exports.getAppointmentStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let query = {};
        
        if (req.user.role === 'patient') {
            const patient = await Patient.findOne({ user: req.user.id });
            if (patient) {
                query.patient = patient._id;
            } else {
                return res.json({ success: true, data: { today: 0, upcoming: 0, completed: 0, cancelled: 0 } });
            }
        }
        
        const stats = {
            today: await Appointment.countDocuments({
                ...query,
                date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
            }),
            upcoming: await Appointment.countDocuments({
                ...query,
                date: { $gt: today },
                status: { $nin: ['Cancelled', 'Completed'] }
            }),
            completed: await Appointment.countDocuments({
                ...query,
                status: 'Completed'
            }),
            cancelled: await Appointment.countDocuments({
                ...query,
                status: 'Cancelled'
            })
        };
        
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error('Error getting appointment stats:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};