// components/home/BookingSection.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaTooth, 
  FaUserMd, 
  FaNotesMedical,
  FaArrowRight,
  FaCheckCircle,
  FaSpinner,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaShieldAlt,
  FaHeartbeat,
  FaSmile,
  FaUser
} from 'react-icons/fa';

const BookingSection = () => {
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    doctor: '',
    treatment: '',
    date: '',
    time: '09:00',
    symptoms: '',
    notes: '',
    name: '',
    email: '',
    phone: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [patientId, setPatientId] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchData();
    if (isAuthenticated && user) {
      fetchPatientProfile();
      // Auto-fill user data if logged in
      setFormData(prev => ({
        ...prev,
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
      }));
    }
  }, [isAuthenticated, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [doctorsRes, treatmentsRes] = await Promise.all([
        axios.get('/doctors'),
        axios.get('/treatments')
      ]);
      setDoctors(doctorsRes.data.data || []);
      setTreatments(treatmentsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientProfile = async () => {
    try {
      const response = await axios.get('/patients');
      const patients = response.data.data || [];
      const currentPatient = patients.find(p => {
        const patientUserId = p.user?._id || p.user;
        return patientUserId === user?._id;
      });
      
      if (currentPatient) {
        setPatientId(currentPatient._id);
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.doctor) {
      setError('Please select a doctor');
      return;
    }

    if (!formData.treatment) {
      setError('Please select a treatment');
      return;
    }

    if (!formData.date) {
      setError('Please select a date');
      return;
    }

    if (!formData.name || !formData.email) {
      setError('Please fill in your name and email');
      return;
    }

    setSubmitting(true);

    try {
      if (isAuthenticated && patientId) {
        // Authenticated user booking
        const appointmentData = {
          patient: patientId,
          doctor: formData.doctor,
          date: formData.date,
          time: formData.time,
          type: formData.treatment,
          symptoms: formData.symptoms,
          notes: formData.notes,
          status: 'Scheduled'
        };
        await axios.post('/appointments', appointmentData);
      } else {
        // Guest booking - store in localStorage or send to email
        const guestBooking = {
          ...formData,
          bookingDate: new Date().toISOString(),
          status: 'Pending'
        };
        
        // Store in localStorage
        const existingBookings = JSON.parse(localStorage.getItem('guestBookings') || '[]');
        existingBookings.push(guestBooking);
        localStorage.setItem('guestBookings', JSON.stringify(existingBookings));
        
        // Here you would typically send an email notification
        console.log('Guest booking:', guestBooking);
      }
      
      setSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          doctor: '',
          treatment: '',
          date: '',
          time: '09:00',
          symptoms: '',
          notes: '',
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError(error.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const selectedDoctorDetails = doctors.find(d => d._id === formData.doctor);
  const selectedTreatmentDetails = treatments.find(t => t.name === formData.treatment);

  return (
    <div id="booking" className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/85 via-blue-900/80 to-indigo-900/85 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1663151064065-cb334788f77d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dental clinic background"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: 'center 40%' }}
        />
        
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 z-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000 z-10"></div>

      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-4 border border-white/30">
            <FaCalendarAlt className="text-white text-sm" />
            <span className="text-white text-sm font-medium">Book Appointment</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Schedule Your Visit
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Book your appointment online and get the best dental care services
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Appointment Booked Successfully!</h3>
            <p className="text-green-600">
              {isAuthenticated 
                ? "We'll send you a confirmation email shortly." 
                : "Please check your email for confirmation details. Our team will contact you soon."}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Main Booking Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left Side - Info */}
            <div className="md:col-span-2 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600 p-6 text-white">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaHeartbeat className="text-3xl" />
                  <h3 className="text-2xl font-bold">Why Book With Us?</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-300" />
                    <span>Expert Dental Professionals</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-300" />
                    <span>State-of-the-art Equipment</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-300" />
                    <span>Pain-free Treatments</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-300" />
                    <span>Flexible Payment Plans</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-300" />
                    <span>24/7 Emergency Support</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h4 className="font-semibold mb-3">Contact Info</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-sky-200" />
                    <span>(555) 123-4567</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-sky-200" />
                    <span>booking@dentalcare.com</span>
                  </p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                  </div>
                  <span className="text-sm">4.9/5 from 500+ reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-green-300" />
                  <span className="text-sm">100% Secure Booking</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:col-span-3 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isAuthenticated && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaUser className="inline mr-2 text-sky-500" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaEnvelope className="inline mr-2 text-sky-500" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                {!isAuthenticated && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaPhone className="inline mr-2 text-sky-500" />
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaUserMd className="inline mr-2 text-sky-500" />
                      Select Doctor *
                    </label>
                    <select
                      name="doctor"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                      value={formData.doctor}
                      onChange={handleChange}
                    >
                      <option value="">Choose a doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaTooth className="inline mr-2 text-sky-500" />
                      Select Treatment *
                    </label>
                    <select
                      name="treatment"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                      value={formData.treatment}
                      onChange={handleChange}
                    >
                      <option value="">Choose treatment</option>
                      {treatments.map((treatment) => (
                        <option key={treatment._id} value={treatment.name}>
                          {treatment.name} - ${treatment.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Doctor Info Card */}
                {selectedDoctorDetails && (
                  <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-4 border border-sky-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUserMd className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">Dr. {selectedDoctorDetails.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{selectedDoctorDetails.bio?.substring(0, 100)}...</p>
                        <div className="flex items-center gap-2 mt-2">
                          <FaStar className="text-yellow-500 text-xs" />
                          <span className="text-xs text-gray-600">{selectedDoctorDetails.averageRating || 5.0} ({selectedDoctorDetails.totalReviews || 0} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Treatment Info Card */}
                {selectedTreatmentDetails && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <FaSmile className="text-emerald-500" />
                      <span className="text-sm text-emerald-800">
                        <strong>Treatment Details:</strong> {selectedTreatmentDetails.description} • Duration: {selectedTreatmentDetails.duration} min
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2 text-sky-500" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={minDate}
                      max={maxDateStr}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                      value={formData.date}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-400 mt-1">Available within next 30 days</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaClock className="inline mr-2 text-sky-500" />
                      Preferred Time *
                    </label>
                    <select
                      name="time"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    >
                      <option value="09:00">🕘 09:00 AM - Morning</option>
                      <option value="10:00">🕙 10:00 AM - Late Morning</option>
                      <option value="11:00">🕚 11:00 AM - Pre-Noon</option>
                      <option value="14:00">🕑 02:00 PM - Early Afternoon</option>
                      <option value="15:00">🕒 03:00 PM - Afternoon</option>
                      <option value="16:00">🕓 04:00 PM - Late Afternoon</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaNotesMedical className="inline mr-2 text-sky-500" />
                    Symptoms / Special Requests (Optional)
                  </label>
                  <textarea
                    name="symptoms"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50 resize-none"
                    placeholder="Describe your symptoms or any special requests..."
                    value={formData.symptoms}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Book Appointment Now
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex flex-wrap justify-center gap-4 pt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    Free Consultation
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    No Hidden Fees
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    Instant Confirmation
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default BookingSection;