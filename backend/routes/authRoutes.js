const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getMe, 
    updateProfile 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

console.log('Auth routes loading...');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updateprofile', protect, updateProfile);

console.log('Auth routes loaded:');
console.log('  POST /api/auth/register');
console.log('  POST /api/auth/login');
console.log('  GET /api/auth/me');
console.log('  PUT /api/auth/updateprofile');

module.exports = router;