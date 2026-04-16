const Doctor = require('../models/Doctor');
const fs = require('fs');
const path = require('path');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
    try {
        // Get ALL doctors - no filters
        const doctors = await Doctor.find({});
        
        console.log(`✅ Found ${doctors.length} doctors`);
        
        res.json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        console.error('Error in getDoctors:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.json({ success: true, data: doctor });
    } catch (error) {
        console.error('Error in getDoctor:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create doctor with image upload
// @route   POST /api/doctors
// @access  Private (Admin only)
exports.createDoctor = async (req, res) => {
    try {
        const doctorData = { ...req.body };
        
        // If image was uploaded, add the file path
        if (req.file) {
            doctorData.image = `/uploads/doctors/${req.file.filename}`;
        }
        
        const doctor = await Doctor.create(doctorData);
        res.status(201).json({ success: true, data: doctor });
    } catch (error) {
        // If there's an error and file was uploaded, delete it
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update doctor with image upload
// @route   PUT /api/doctors/:id
// @access  Private (Admin only)
exports.updateDoctor = async (req, res) => {
    try {
        const existingDoctor = await Doctor.findById(req.params.id);
        if (!existingDoctor) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        
        const doctorData = { ...req.body };
        
        // If new image was uploaded
        if (req.file) {
            // Delete old image if exists
            if (existingDoctor.image) {
                const oldImagePath = path.join(__dirname, '..', existingDoctor.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            doctorData.image = `/uploads/doctors/${req.file.filename}`;
        }
        
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            doctorData,
            { new: true, runValidators: true }
        );
        
        res.json({ success: true, data: doctor });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete doctor with image
// @route   DELETE /api/doctors/:id
// @access  Private (Admin only)
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        
        // Delete associated image
        if (doctor.image) {
            const imagePath = path.join(__dirname, '..', doctor.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};