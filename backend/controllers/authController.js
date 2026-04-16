const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign(
        { id, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

// @desc    Register user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide name, email and password' 
            });
        }
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists' 
            });
        }
        
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'patient',
            phone: phone || ''
        });
        
        const token = generateToken(user._id, user.role);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                createdAt: user.createdAt
            },
            token
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// @desc    Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }
        
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }
        
        const isMatch = await user.matchPassword(password);
        
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }
        
        if (!user.isActive) {
            return res.status(401).json({ 
                success: false, 
                message: 'Account deactivated. Please contact support.' 
            });
        }
        
        await user.updateLastLogin();
        
        const token = generateToken(user._id, user.role);
        
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                lastLogin: user.lastLogin
            },
            token
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// @desc    Get current user
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// @desc    Update profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        
        const user = await User.findById(req.user.id);
        
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        
        await user.save();
        
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};