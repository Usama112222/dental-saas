const Patient = require('../models/Patient');
const User = require('../models/User');

// Get all patients - Admin/Staff only
exports.getPatients = async (req, res) => {
    try {
        // If user is patient, only return their own record
        if (req.user.role === 'patient') {
            const patient = await Patient.findOne({ user: req.user.id })
                .populate('user', 'name email phone');
            
            if (!patient) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Patient profile not found' 
                });
            }
            
            return res.json({
                success: true,
                count: 1,
                data: [patient]
            });
        }
        
        // Admin and staff can see all patients
        const patients = await Patient.find()
            .populate('user', 'name email phone');
        
        res.json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single patient
exports.getPatient = async (req, res) => {
    try {
        let patient;
        
        // If patient is trying to access their own record
        if (req.user.role === 'patient') {
            patient = await Patient.findOne({ user: req.user.id })
                .populate('user', 'name email phone');
            
            if (!patient) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Patient profile not found' 
                });
            }
            
            // Check if the patient is trying to access their own record
            if (patient._id.toString() !== req.params.id && patient.user._id.toString() !== req.params.id) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Access denied' 
                });
            }
        } else {
            // Admin/staff can access any patient
            patient = await Patient.findById(req.params.id)
                .populate('user', 'name email phone');
        }
        
        if (!patient) {
            return res.status(404).json({ 
                success: false, 
                message: 'Patient not found' 
            });
        }
        
        res.json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create patient - Admin/Staff only (or auto-create for patient registration)
exports.createPatient = async (req, res) => {
    try {
        const { user, dateOfBirth, gender, phone, address } = req.body;
        
        // Allow patients to create their own profile during registration
        if (req.user.role === 'patient') {
            // Check if patient is creating profile for themselves
            if (user !== req.user.id) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Access denied. You can only create your own profile.' 
                });
            }
        }
        
        // Check if user exists
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        // Check if patient already exists
        const existingPatient = await Patient.findOne({ user });
        if (existingPatient) {
            return res.status(400).json({ 
                success: false, 
                message: 'Patient already exists for this user' 
            });
        }
        
        const patient = await Patient.create({
            user,
            dateOfBirth,
            gender,
            phone,
            address
        });
        
        res.status(201).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update patient
exports.updatePatient = async (req, res) => {
    try {
        let patient;
        
        // If patient is updating their own profile
        if (req.user.role === 'patient') {
            patient = await Patient.findOne({ user: req.user.id });
            
            if (!patient) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Patient profile not found' 
                });
            }
            
            // Check if patient is updating their own record
            if (patient._id.toString() !== req.params.id) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Access denied. You can only update your own profile.' 
                });
            }
            
            patient = await Patient.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
        } else {
            // Admin/staff can update any patient
            patient = await Patient.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
        }
        
        if (!patient) {
            return res.status(404).json({ 
                success: false, 
                message: 'Patient not found' 
            });
        }
        
        res.json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete patient - Admin only
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        
        if (!patient) {
            return res.status(404).json({ 
                success: false, 
                message: 'Patient not found' 
            });
        }
        
        res.json({ success: true, message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};