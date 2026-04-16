const Availability = require('../models/Availability');
const Doctor = require('../models/Doctor');

// @desc    Get all availability slots
// @route   GET /api/availability
// @access  Public
exports.getAvailability = async (req, res) => {
    try {
        let query = {};
        
        if (req.query.doctorId) {
            query.doctorId = req.query.doctorId;
        }
        
        if (req.query.day) {
            query.day = req.query.day;
        }
        
        const availability = await Availability.find(query)
            .populate('doctorId', 'name specialization');
        
        res.json({
            success: true,
            count: availability.length,
            data: availability
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create availability slot
// @route   POST /api/availability
// @access  Private (Admin only)
exports.createAvailability = async (req, res) => {
    try {
        const availability = await Availability.create(req.body);
        res.status(201).json({ success: true, data: availability });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update availability slot
// @route   PUT /api/availability/:id
// @access  Private (Admin only)
exports.updateAvailability = async (req, res) => {
    try {
        const availability = await Availability.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!availability) {
            return res.status(404).json({ success: false, message: 'Availability not found' });
        }
        res.json({ success: true, data: availability });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete availability slot
// @route   DELETE /api/availability/:id
// @access  Private (Admin only)
exports.deleteAvailability = async (req, res) => {
    try {
        const availability = await Availability.findByIdAndDelete(req.params.id);
        if (!availability) {
            return res.status(404).json({ success: false, message: 'Availability not found' });
        }
        res.json({ success: true, message: 'Availability deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};