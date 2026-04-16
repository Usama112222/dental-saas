import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { 
  FaTimes, 
  FaCalendarAlt, 
  FaClock, 
  FaTooth, 
  FaStethoscope, 
  FaNotesMedical, 
  FaUserMd,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaSpinner,
  FaArrowRight,
  FaStar,
  FaShieldAlt,
  FaHeartbeat
} from 'react-icons/fa';

const BookingForm = ({ isOpen, onClose, selectedDoctor, selectedTreatment, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [formData, setFormData] = useState({
    doctor: selectedDoctor?._id || '',
    treatment: selectedTreatment?.name || '',
    date: '',
    time: '09:00',
    symptoms: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchData();
      fetchPatientProfile();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const [doctorsRes, treatmentsRes] = await Promise.all([
        axios.get('/doctors'),
        axios.get('/treatments')
      ]);
      setDoctors(doctorsRes.data.data || []);
      setTreatments(treatmentsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPatientProfile = async () => {
    try {
      setLoadingProfile(true);
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
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const mapTreatmentToAppointmentType = (treatmentName) => {
    const typeMapping = {
      'Dental Checkup': 'Checkup',
      'Teeth Whitening': 'Teeth Whitening',
      'Root Canal': 'Root Canal',
      'Dental Implants': 'Dental Implants',
      'Braces': 'Braces',
      'Wisdom Teeth Removal': 'Wisdom Teeth Removal',
      'Veneers': 'Veneers',
      'Dental Crown': 'Crown',
      'Invisalign': 'Invisalign',
      'Gum Treatment': 'Gum Treatment',
      'Cleaning': 'Cleaning',
      'Filling': 'Filling',
      'Extraction': 'Extraction',
      'Consultation': 'Consultation',
      'Emergency': 'Emergency',
      'Follow-up': 'Follow-up'
    };
    return typeMapping[treatmentName] || 'Checkup';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!user) {
      setError('Please login to book an appointment');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }

    if (!patientId) {
      setError('Patient profile not found. Please complete your profile.');
      return;
    }

    if (!formData.date) {
      setError('Please select a date');
      return;
    }

    if (!formData.doctor) {
      setError('Please select a doctor');
      return;
    }

    setLoading(true);

    try {
      const treatmentName = formData.treatment || selectedTreatment?.name || 'Checkup';
      const appointmentType = mapTreatmentToAppointmentType(treatmentName);
      
      const appointmentData = {
        patient: patientId,
        doctor: formData.doctor,
        date: formData.date,
        time: formData.time,
        type: appointmentType,
        symptoms: formData.symptoms,
        notes: formData.notes,
        status: 'Scheduled'
      };

      console.log('Sending appointment data:', appointmentData);
      await axios.post('/appointments', appointmentData);
      
      setSuccess('Appointment booked successfully!');
      
      setTimeout(() => {
        setFormData({
          doctor: '',
          treatment: '',
          date: '',
          time: '09:00',
          symptoms: '',
          notes: ''
        });
        onSuccess && onSuccess();
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  if (!isOpen) return null;

  const selectedDoctorDetails = doctors.find(d => d._id === formData.doctor);
  const selectedTreatmentDetails = treatments.find(t => t.name === formData.treatment);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-6 py-5">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaHeartbeat className="text-white/80 text-sm" />
                  <span className="text-white/80 text-xs font-medium">DentalCare SaaS</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Book an Appointment</h2>
                <p className="text-blue-100 text-sm mt-1">
                  Fill in the details to schedule your dental appointment
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Success Message */}
            {success && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <FaCheckCircle className="text-white text-sm" />
                </div>
                <div>
                  <p className="font-semibold">{success}</p>
                  <p className="text-sm text-green-600">Redirecting to dashboard...</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Selected Info Banner */}
            {(selectedDoctor || selectedTreatment) && (
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-4">
                <p className="text-sm text-sky-800 flex items-start gap-2">
                  <FaCheckCircle className="text-sky-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Booking for:</strong>
                    {selectedDoctor && ` Dr. ${selectedDoctor.name} (${selectedDoctor.specialization})`}
                    {selectedTreatment && ` • ${selectedTreatment.name}`}
                  </span>
                </p>
              </div>
            )}

            {/* Login Warning */}
            {!user && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-800 text-sm mb-2">
                  <strong>Please login to book an appointment.</strong>
                </p>
                <button
                  type="button"
                  onClick={() => window.location.href = '/login'}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm flex items-center gap-2"
                >
                  Login Now
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            )}

            {/* Loading Profile */}
            {loadingProfile ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSpinner className="animate-spin h-8 w-8 text-sky-600" />
                </div>
                <p className="text-gray-500">Loading profile...</p>
              </div>
            ) : !patientId && user ? (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-800 font-semibold mb-2">Profile Required!</p>
                <p className="text-sm text-yellow-700 mb-3">Please complete your patient profile before booking appointments.</p>
                <button
                  type="button"
                  onClick={() => window.location.href = '/profile'}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm"
                >
                  Complete Profile
                </button>
              </div>
            ) : (
              <>
                {/* Doctor Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaUserMd className="inline mr-2 text-sky-500" />
                    Select Doctor *
                  </label>
                  <select
                    name="doctor"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                    value={formData.doctor}
                    onChange={handleChange}
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name} - {doctor.specialization} ({doctor.experience}+ years)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Details Card */}
                {selectedDoctorDetails && (
                  <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-4 border border-sky-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUserMd className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">About Dr. {selectedDoctorDetails.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{selectedDoctorDetails.bio}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                          {selectedDoctorDetails.email && (
                            <span className="flex items-center gap-1"><FaEnvelope className="text-sky-500" /> {selectedDoctorDetails.email}</span>
                          )}
                          {selectedDoctorDetails.phone && (
                            <span className="flex items-center gap-1"><FaPhone className="text-sky-500" /> {selectedDoctorDetails.phone}</span>
                          )}
                          <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" />
                            {selectedDoctorDetails.averageRating || 5.0} ({selectedDoctorDetails.totalReviews || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      <FaCalendarAlt className="inline mr-2 text-sky-500" />
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={minDate}
                      max={maxDateStr}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                      value={formData.date}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-400">Available within next 30 days</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      <FaClock className="inline mr-2 text-sky-500" />
                      Time *
                    </label>
                    <select
                      name="time"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
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

                {/* Treatment Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaTooth className="inline mr-2 text-sky-500" />
                    Treatment Type *
                  </label>
                  <select
                    name="treatment"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                    value={formData.treatment}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select treatment</option>
                    {treatments.map((treatment) => (
                      <option key={treatment._id} value={treatment.name}>
                        {treatment.name} - ${treatment.price} ({treatment.duration} min)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Treatment Details */}
                {selectedTreatmentDetails && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-emerald-500 text-sm" />
                      <span className="text-sm text-emerald-800">
                        <strong>Treatment Details:</strong> {selectedTreatmentDetails.description}
                      </span>
                    </div>
                  </div>
                )}

                {/* Symptoms */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaStethoscope className="inline mr-2 text-sky-500" />
                    Symptoms (Optional)
                  </label>
                  <textarea
                    name="symptoms"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none bg-gray-50 hover:bg-white"
                    placeholder="Describe your symptoms (e.g., tooth pain, sensitivity, swelling)..."
                    value={formData.symptoms}
                    onChange={handleChange}
                  />
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    <FaNotesMedical className="inline mr-2 text-sky-500" />
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none bg-gray-50 hover:bg-white"
                    placeholder="Any additional information for the doctor..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                {/* Important Note */}
                <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-4 border border-sky-100">
                  <div className="flex items-start gap-2">
                    <FaShieldAlt className="text-sky-500 text-lg mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-sky-800">Important Information</p>
                      <p className="text-xs text-sky-700 mt-1">
                        The estimated cost will be confirmed after consultation. Please arrive 15 minutes before your scheduled time.
                        Bring any relevant medical records or X-rays if available.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <FaCalendarAlt />
                        <span>Confirm Appointment</span>
                        <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;