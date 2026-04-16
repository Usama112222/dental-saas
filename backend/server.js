const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const billingRoutes = require('./routes/billingRoutes');
const statsRoutes = require('./routes/statsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== DATABASE CONNECTION ==========
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dental-saas';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Local successfully!');
    console.log('📊 Database: dental-saas');
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

  // Add this right after mongoose.connect
app.get('/api/check-db', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const dbName = db.databaseName;
        
        // Get all collections
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        
        // Check doctors in raw collection
        const doctors = await db.collection('doctors').find({}).toArray();
        
        res.json({
            connectedDatabase: dbName,
            collections: collectionNames,
            doctorsFound: doctors.length,
            sampleDoctor: doctors[0] ? doctors[0].name : 'none'
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// ========== ROUTES ==========
console.log('\n📋 Loading routes...');

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/invoices', billingRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reviews', reviewRoutes);
// ========== HEALTH CHECK ==========
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB Atlas: Connected`);
  console.log(`\n📝 Available endpoints:`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   POST   /api/auth/register`);
  console.log(`   GET    /api/doctors`);
  console.log(`   GET    /api/treatments`);
  console.log(`   GET    /api/patients`);
  console.log(`   GET    /api/appointments`);
  console.log(`   GET    /api/availability`);
  console.log(`   GET    /api/invoices`);
  console.log(`   GET    /api/stats`);
  console.log(`   GET    /api/health`);
  console.log(`\n🔐 Test Credentials:`);
  console.log(`   Admin:  admin@test.com / admin123`);
  console.log(`   Staff:  staff@test.com / staff123`);
  console.log(`   Patient: patient@test.com / patient123`);
});