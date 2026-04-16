const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Doctor is a User with role 'doctor'
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 30
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled', 'No Show'],
        default: 'Scheduled'
    },
    symptoms: String,
    notes: String,
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Partial', 'Paid'],
        default: 'Pending'
    },
    amount: {
        type: Number,
        default: 0
    },
    treatmentPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    hasReviewed: {
        type: Boolean,
        default: false
    },
    cancelledBy: {
        type: String,
        enum: ['Patient', 'Staff', 'System'],
        default: null
    },
    cancellationReason: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);