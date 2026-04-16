const Treatment = require('../models/Treatment');
const fs = require('fs');
const path = require('path');

// @desc    Get all treatments
exports.getTreatments = async (req, res) => {
    try {
        // Get ALL treatments - no filters
        const treatments = await Treatment.find({}).sort('name');
        
        console.log(`✅ Found ${treatments.length} treatments`);
        
        res.json({
            success: true,
            count: treatments.length,
            data: treatments
        });
    } catch (error) {
        console.error('Error in getTreatments:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single treatment
exports.getTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findById(req.params.id);
        if (!treatment) {
            return res.status(404).json({ success: false, message: 'Treatment not found' });
        }
        res.json({ success: true, data: treatment });
    } catch (error) {
        console.error('Error in getTreatment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create treatment with image upload
exports.createTreatment = async (req, res) => {
    try {
        const treatmentData = { ...req.body };
        
        // Parse numeric fields
        if (treatmentData.duration) treatmentData.duration = parseInt(treatmentData.duration);
        if (treatmentData.price) treatmentData.price = parseFloat(treatmentData.price);
        
        // If image was uploaded, add the file path
        if (req.file) {
            treatmentData.image = `/uploads/treatments/${req.file.filename}`;
        }
        
        const treatment = await Treatment.create(treatmentData);
        res.status(201).json({ success: true, data: treatment });
    } catch (error) {
        // If there's an error and file was uploaded, delete it
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update treatment with image upload
exports.updateTreatment = async (req, res) => {
    try {
        const existingTreatment = await Treatment.findById(req.params.id);
        if (!existingTreatment) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ success: false, message: 'Treatment not found' });
        }
        
        const treatmentData = { ...req.body };
        
        // Parse numeric fields
        if (treatmentData.duration) treatmentData.duration = parseInt(treatmentData.duration);
        if (treatmentData.price) treatmentData.price = parseFloat(treatmentData.price);
        
        // If new image was uploaded, delete old image and update
        if (req.file) {
            if (existingTreatment.image) {
                const oldImagePath = path.join(__dirname, '..', existingTreatment.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            treatmentData.image = `/uploads/treatments/${req.file.filename}`;
        }
        
        const treatment = await Treatment.findByIdAndUpdate(
            req.params.id,
            treatmentData,
            { new: true, runValidators: true }
        );
        
        res.json({ success: true, data: treatment });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete treatment with image
exports.deleteTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findById(req.params.id);
        if (!treatment) {
            return res.status(404).json({ success: false, message: 'Treatment not found' });
        }
        
        // Delete associated image
        if (treatment.image) {
            const imagePath = path.join(__dirname, '..', treatment.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        await Treatment.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Treatment deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};