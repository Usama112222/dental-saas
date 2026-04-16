const Review = require('../models/Review');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// @desc    Get my reviews (for logged-in patient)
// @route   GET /api/reviews/my-reviews
// @access  Private
exports.getMyReviews = async (req, res) => {
    try {
        // Get patient from user
        const patient = await Patient.findOne({ user: req.user.id });
        if (!patient) {
            return res.json({ success: true, count: 0, data: [] });
        }
        
        const reviews = await Review.find({ patient: patient._id })
            .populate('doctor', 'name specialization')
            .populate('appointment', 'type date')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        console.error('Get my reviews error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private (Patient only)
exports.createReview = async (req, res) => {
    try {
        const { doctor, appointment, rating, title, comment, treatmentRating, waitTimeRating, cleanlinessRating, staffRating } = req.body;
        
        // Get patient from user
        const patient = await Patient.findOne({ user: req.user.id });
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        
        // Check if appointment belongs to this patient and is completed
        const appointmentExists = await Appointment.findOne({
            _id: appointment,
            patient: patient._id,
            status: 'Completed'
        });
        
        if (!appointmentExists) {
            return res.status(403).json({ success: false, message: 'You can only review completed appointments' });
        }
        
        // Check if already reviewed
        const existingReview = await Review.findOne({ appointment, patient: patient._id });
        if (existingReview) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this appointment' });
        }
        
        const review = await Review.create({
            patient: patient._id,
            doctor,
            appointment,
            rating,
            title,
            comment,
            treatmentRating: treatmentRating || rating,
            waitTimeRating: waitTimeRating || rating,
            cleanlinessRating: cleanlinessRating || rating,
            staffRating: staffRating || rating,
            status: 'Pending'
        });
        
        // Update appointment hasReviewed flag
        await Appointment.findByIdAndUpdate(appointment, { hasReviewed: true });
        
        const populatedReview = await Review.findById(review._id)
            .populate('patient', 'user')
            .populate('doctor', 'name specialization');
        
        res.status(201).json({ success: true, data: populatedReview });
    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get reviews for a doctor
// @route   GET /api/reviews/doctor/:doctorId
// @access  Public
exports.getDoctorReviews = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
        
        // Fix: Properly populate patient with user data
        const reviews = await Review.find({ doctor: doctorId, status: 'Approved' })
            .populate({
                path: 'patient',
                model: 'Patient',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email'
                }
            })
            .populate('doctor', 'name specialization')
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await Review.countDocuments({ doctor: doctorId, status: 'Approved' });
        
        // Format reviews with patient names
        const formattedReviews = reviews.map(review => {
            const reviewObj = review.toObject();
            return {
                ...reviewObj,
                patientName: review.patient?.user?.name || 'Anonymous',
                patientInitial: review.patient?.user?.name?.charAt(0).toUpperCase() || 'A'
            };
        });
        
        // Calculate average rating
        const avgResult = await Review.aggregate([
            { $match: { doctor: doctorId, status: 'Approved' } },
            { $group: { _id: null, average: { $avg: '$rating' }, total: { $sum: 1 } } }
        ]);
        
        res.json({
            success: true,
            data: formattedReviews,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            stats: {
                averageRating: avgResult[0]?.average || 0,
                totalReviews: avgResult[0]?.total || 0
            }
        });
    } catch (error) {
        console.error('Get doctor reviews error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all reviews (Admin only)
// @route   GET /api/reviews
// @access  Private/Admin
exports.getAllReviews = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        let query = {};
        
        if (status === 'pending') {
            query.status = 'Pending';
        } else if (status === 'approved') {
            query.status = 'Approved';
        } else if (status === 'rejected') {
            query.status = 'Rejected';
        }
        
        const reviews = await Review.find(query)
            .populate('patient', 'user')
            .populate('doctor', 'name specialization')
            .sort('-createdAt')
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        // Format patient names
        const formattedReviews = await Promise.all(reviews.map(async (review) => {
            let patientName = 'Anonymous';
            if (review.patient) {
                const patient = await Patient.findById(review.patient).populate('user');
                patientName = patient?.user?.name || 'Anonymous';
            }
            return {
                ...review.toObject(),
                patientName
            };
        }));
        
        const total = await Review.countDocuments(query);
        
        res.json({
            success: true,
            count: formattedReviews.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: formattedReviews
        });
    } catch (error) {
        console.error('Get all reviews error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Private/Admin
exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('doctor', 'name specialization')
            .populate('patient', 'user')
            .populate('appointment', 'type date');
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        
        let patientName = 'Anonymous';
        if (review.patient) {
            const patient = await Patient.findById(review.patient).populate('user');
            patientName = patient?.user?.name || 'Anonymous';
        }
        
        res.json({
            success: true,
            data: {
                ...review.toObject(),
                patientName
            }
        });
    } catch (error) {
        console.error('Get review error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update review status (Approve/Reject)
// @route   PUT /api/reviews/:id/status
// @access  Private/Admin
exports.updateReviewStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        
        // Update doctor's average rating if approved
        if (status === 'Approved') {
            const stats = await Review.aggregate([
                { $match: { doctor: review.doctor, status: 'Approved' } },
                { $group: { _id: null, average: { $avg: '$rating' }, total: { $sum: 1 } } }
            ]);
            
            await Doctor.findByIdAndUpdate(review.doctor, {
                averageRating: stats[0]?.average || 0,
                totalReviews: stats[0]?.total || 0
            });
        }
        
        res.json({ 
            success: true, 
            data: review,
            message: `Review ${status.toLowerCase()} successfully` 
        });
    } catch (error) {
        console.error('Update review status error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get pending reviews count
// @route   GET /api/reviews/admin/pending/count
// @access  Private/Admin
exports.getPendingReviewsCount = async (req, res) => {
    try {
        const count = await Review.countDocuments({ status: 'Pending' });
        res.json({ success: true, count });
    } catch (error) {
        console.error('Get pending reviews count error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Approve review (Admin only)
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
exports.approveReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { status: 'Approved' },
            { new: true }
        );
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        
        // Update doctor's average rating
        const stats = await Review.aggregate([
            { $match: { doctor: review.doctor, status: 'Approved' } },
            { $group: { _id: null, average: { $avg: '$rating' }, total: { $sum: 1 } } }
        ]);
        
        await Doctor.findByIdAndUpdate(review.doctor, {
            averageRating: stats[0]?.average || 0,
            totalReviews: stats[0]?.total || 0
        });
        
        res.json({ success: true, data: review });
    } catch (error) {
        console.error('Approve review error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Reply to review (Admin only)
// @route   POST /api/reviews/:id/reply
// @access  Private/Admin
exports.replyToReview = async (req, res) => {
    try {
        const { replyText } = req.body;
        
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            {
                reply: {
                    text: replyText,
                    repliedBy: req.user.id,
                    repliedAt: new Date()
                }
            },
            { new: true }
        );
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        
        res.json({ success: true, data: review });
    } catch (error) {
        console.error('Reply to review error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete review (Admin only)
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        
        // Update appointment hasReviewed flag
        await Appointment.findByIdAndUpdate(review.appointment, { hasReviewed: false });
        
        // Update doctor's average rating
        const stats = await Review.aggregate([
            { $match: { doctor: review.doctor, status: 'Approved' } },
            { $group: { _id: null, average: { $avg: '$rating' }, total: { $sum: 1 } } }
        ]);
        
        await Doctor.findByIdAndUpdate(review.doctor, {
            averageRating: stats[0]?.average || 0,
            totalReviews: stats[0]?.total || 0
        });
        
        res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Delete review error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};