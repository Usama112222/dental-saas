const mongoose = require('mongoose');

const treatmentServiceSchema = new mongoose.Schema({
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
        type: Number, // in minutes
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
    isActive: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: ''
    },
    benefits: [String],
    preparation: String,
    aftercare: String
}, { timestamps: true });

module.exports = mongoose.model('TreatmentService', treatmentServiceSchema);