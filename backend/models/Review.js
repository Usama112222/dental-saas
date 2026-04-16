// backend/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    treatmentRating: Number,
    waitTimeRating: Number,
    cleanlinessRating: Number,
    staffRating: Number,
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    reply: {
        text: String,
        repliedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        repliedAt: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);