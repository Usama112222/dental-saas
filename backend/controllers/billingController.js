const Invoice = require('../models/Invoice');
const Patient = require('../models/Patient');
const User = require('../models/User');

// Get all invoices
exports.getInvoices = async (req, res) => {
    try {
        let query = {};
        
        if (req.query.patient) {
            query.patient = req.query.patient;
        }
        
        if (req.query.status) {
            query.status = req.query.status;
        }
        
        const invoices = await Invoice.find(query)
            .populate({
                path: 'patient',
                model: 'Patient',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email phone'
                }
            })
            .populate('createdBy', 'name')
            .sort('-createdAt');
        
        // Format the response to include patient name
        const formattedInvoices = invoices.map(invoice => {
            const invoiceObj = invoice.toObject();
            return {
                ...invoiceObj,
                patientName: invoice.patient?.user?.name || 'Unknown',
                patientEmail: invoice.patient?.user?.email || '',
                patientPhone: invoice.patient?.user?.phone || '',
                formattedDate: invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : '',
                formattedDueDate: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : ''
            };
        });
        
        res.json({
            success: true,
            count: formattedInvoices.length,
            data: formattedInvoices
        });
    } catch (error) {
        console.error('Get invoices error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single invoice
exports.getSingleInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate({
                path: 'patient',
                model: 'Patient',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email phone'
                }
            })
            .populate('createdBy', 'name');
        
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
        
        const formattedInvoice = {
            ...invoice.toObject(),
            patientName: invoice.patient?.user?.name || 'Unknown',
            patientEmail: invoice.patient?.user?.email || '',
            patientPhone: invoice.patient?.user?.phone || ''
        };
        
        res.json({ success: true, data: formattedInvoice });
    } catch (error) {
        console.error('Get single invoice error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create invoice
exports.createInvoice = async (req, res) => {
    try {
        console.log('Creating invoice with data:', req.body);
        
        // Calculate totals
        let subtotal = 0;
        
        // Calculate from treatments
        if (req.body.treatments && req.body.treatments.length > 0) {
            for (const item of req.body.treatments) {
                subtotal += (item.amount || 0) - (item.discount || 0);
            }
        }
        
        const tax = req.body.tax || 0;
        const discount = req.body.discount || 0;
        const total = subtotal + tax - discount;
        
        const invoiceData = {
            patient: req.body.patient,
            appointments: req.body.appointments || [],
            treatments: req.body.treatments || [],
            subtotal: subtotal,
            tax: tax,
            discount: discount,
            total: total,
            paid: 0,
            balance: total,
            dueDate: req.body.dueDate,
            notes: req.body.notes,
            status: req.body.status || 'Sent',
            createdBy: req.user.id
        };
        
        console.log('Invoice data to save:', invoiceData);
        
        const invoice = await Invoice.create(invoiceData);
        
        // Populate the created invoice
        const populatedInvoice = await Invoice.findById(invoice._id)
            .populate({
                path: 'patient',
                model: 'Patient',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email phone'
                }
            });
        
        const formattedInvoice = {
            ...populatedInvoice.toObject(),
            patientName: populatedInvoice.patient?.user?.name || 'Unknown',
            patientEmail: populatedInvoice.patient?.user?.email || ''
        };
        
        res.status(201).json({ 
            success: true, 
            data: formattedInvoice,
            message: 'Invoice created successfully'
        });
    } catch (error) {
        console.error('Create invoice error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const invoice = await Invoice.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate({
            path: 'patient',
            model: 'Patient',
            populate: {
                path: 'user',
                model: 'User',
                select: 'name email phone'
            }
        });
        
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
        
        // Recalculate balance
        invoice.balance = invoice.total - invoice.paid;
        await invoice.save();
        
        const formattedInvoice = {
            ...invoice.toObject(),
            patientName: invoice.patient?.user?.name || 'Unknown'
        };
        
        res.json({ success: true, data: formattedInvoice });
    } catch (error) {
        console.error('Update invoice error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Process payment
exports.processPayment = async (req, res) => {
    try {
        const { amount, method, transactionId, notes } = req.body;
        
        const invoice = await Invoice.findById(req.params.id);
        
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
        
        const newPaid = (invoice.paid || 0) + amount;
        
        invoice.paid = newPaid;
        invoice.balance = invoice.total - newPaid;
        
        if (newPaid >= invoice.total) {
            invoice.status = 'Paid';
            invoice.paymentDate = new Date();
        } else if (newPaid > 0) {
            invoice.status = 'Partially Paid';
        }
        
        invoice.paymentMethod = method;
        invoice.paymentDetails = {
            transactionId,
            notes,
            paymentGateway: method === 'Online' ? 'Stripe' : null
        };
        
        await invoice.save();
        
        // Populate the updated invoice
        const populatedInvoice = await Invoice.findById(invoice._id)
            .populate({
                path: 'patient',
                model: 'Patient',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email phone'
                }
            });
        
        const formattedInvoice = {
            ...populatedInvoice.toObject(),
            patientName: populatedInvoice.patient?.user?.name || 'Unknown'
        };
        
        res.json({ success: true, data: formattedInvoice });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get revenue statistics
exports.getRevenueStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        let dateQuery = {};
        if (startDate && endDate) {
            dateQuery = {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            };
        }
        
        // Get all paid invoices
        const invoices = await Invoice.find({
            status: 'Paid',
            ...dateQuery
        });
        
        const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.paid || inv.total || 0), 0);
        
        const stats = {
            totalRevenue: totalRevenue || 0,
            totalInvoices: await Invoice.countDocuments(),
            paidInvoices: await Invoice.countDocuments({ status: 'Paid' }),
            pendingInvoices: await Invoice.countDocuments({ status: { $in: ['Sent', 'Partially Paid'] } }),
            averageInvoice: invoices.length > 0 ? totalRevenue / invoices.length : 0,
            byMonth: {}
        };
        
        invoices.forEach(inv => {
            if (inv.createdAt) {
                const month = inv.createdAt.toISOString().slice(0, 7);
                if (!stats.byMonth[month]) {
                    stats.byMonth[month] = { revenue: 0, count: 0 };
                }
                stats.byMonth[month].revenue += (inv.paid || inv.total || 0);
                stats.byMonth[month].count++;
            }
        });
        
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error('Revenue stats error:', error);
        res.json({ 
            success: true, 
            data: {
                totalRevenue: 0,
                totalInvoices: 0,
                paidInvoices: 0,
                pendingInvoices: 0,
                averageInvoice: 0,
                byMonth: {}
            }
        });
    }
};