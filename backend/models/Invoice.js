const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: false
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    treatments: [{
        treatment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Treatment'
        },
        amount: Number,
        discount: Number
    }],
    subtotal: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    paid: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Draft', 'Sent', 'Paid', 'Partially Paid', 'Overdue', 'Cancelled'],
        default: 'Draft'
    },
    dueDate: {
        type: Date,
        required: true
    },
    paymentDate: Date,
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'Insurance', 'Online', 'Bank Transfer'],
        default: null
    },
    paymentDetails: {
        transactionId: String,
        paymentGateway: String,
        notes: String
    },
    notes: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Fix: Remove 'next' parameter - use async function without next
invoiceSchema.pre('save', async function() {
    // Generate invoice number if not exists
    if (!this.invoiceNumber) {
        const year = new Date().getFullYear();
        const count = await mongoose.model('Invoice').countDocuments();
        this.invoiceNumber = `INV-${year}-${(count + 1).toString().padStart(5, '0')}`;
    }
    
    // Calculate balance
    this.balance = (this.total || 0) - (this.paid || 0);
});

module.exports = mongoose.model('Invoice', invoiceSchema);