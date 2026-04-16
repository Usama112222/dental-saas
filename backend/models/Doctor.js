const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add doctor name'],
        trim: true
    },
    specialization: {
        type: String,
        required: [true, 'Please add specialization'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        default: '0'
    },
    bio: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    qualifications: [{
        degree: String,
        institution: String,
        year: Number
    }],
    // Rating fields
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    ratingDistribution: {
        1: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        5: { type: Number, default: 0 }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);