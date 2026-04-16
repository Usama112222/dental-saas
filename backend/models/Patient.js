const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: false
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: false  // Make it optional
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);