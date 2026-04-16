const express = require('express');
const router = express.Router();

// In-memory storage
let availability = [];

// GET all availability
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: availability.length,
        data: availability
    });
});

// GET availability by doctor
router.get('/doctor/:doctorId', (req, res) => {
    const doctorAvailability = availability.filter(a => a.doctorId === req.params.doctorId);
    res.json({
        success: true,
        count: doctorAvailability.length,
        data: doctorAvailability
    });
});

// POST new availability
router.post('/', (req, res) => {
    const newAvailability = {
        _id: Date.now().toString(),
        ...req.body,
        createdAt: new Date()
    };
    availability.push(newAvailability);
    res.status(201).json({ success: true, data: newAvailability });
});

// DELETE availability
router.delete('/:id', (req, res) => {
    const index = availability.findIndex(a => a._id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Availability not found' });
    }
    availability.splice(index, 1);
    res.json({ success: true, message: 'Availability deleted successfully' });
});

module.exports = router;
