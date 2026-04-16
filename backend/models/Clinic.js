const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    subscription: {
        plan: {
            type: String,
            enum: ['Free', 'Basic', 'Premium', 'Enterprise'],
            default: 'Free'
        },
        status: {
            type: String,
            enum: ['Active', 'Trial', 'Expired', 'Cancelled'],
            default: 'Trial'
        },
        startDate: Date,
        endDate: Date,
        stripeCustomerId: String,
        stripeSubscriptionId: String
    },
    settings: {
        timezone: String,
        currency: {
            type: String,
            default: 'USD'
        },
        appointmentDuration: {
            type: Number,
            default: 30
        },
        workingHours: {
            monday: { start: String, end: String, enabled: Boolean },
            tuesday: { start: String, end: String, enabled: Boolean },
            wednesday: { start: String, end: String, enabled: Boolean },
            thursday: { start: String, end: String, enabled: Boolean },
            friday: { start: String, end: String, enabled: Boolean },
            saturday: { start: String, end: String, enabled: Boolean },
            sunday: { start: String, end: String, enabled: Boolean }
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Clinic', clinicSchema);