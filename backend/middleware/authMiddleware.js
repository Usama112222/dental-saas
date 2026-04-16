const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error('Auth error:', error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }
    
    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

// Authorize roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `Role ${req.user.role} is not authorized to access this route` 
            });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };