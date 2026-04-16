const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add treatment name'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 30
    },
    price: {
        type: Number,
        required: [true, 'Please add price'],
        min: 0
    },
    category: {
        type: String,
        enum: ['General', 'Cosmetic', 'Surgical', 'Orthodontic', 'Emergency', 'Preventive'],
        default: 'General'
    },
    image: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);