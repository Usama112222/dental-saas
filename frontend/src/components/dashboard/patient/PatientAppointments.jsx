import React, { useState } from 'react';
import axios from '../../../api/axios';
import { 
  FaCalendarAlt, FaClock, FaTooth, FaPlus, FaTimesCircle, 
  FaCheckCircle, FaSpinner, FaRegClock, FaStethoscope, 
  FaFileMedical, FaMoneyBillWave, FaStar
} from 'react-icons/fa';
import ReviewModal from '../../ReviewModal';

const PatientAppointments = ({ appointments, patientId, fetchPatientData }) => {
  const [appointmentFilter, setAppointmentFilter] = useState('upcoming');
  const [loading, setLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const getUpcomingAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= today && apt.status !== 'Cancelled' && apt.status !== 'Completed';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getPastAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate < today || apt.status === 'Completed' || apt.status === 'Cancelled';
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const cancelAppointment = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setLoading(true);
      try {
        await axios.put(`/appointments/${id}/cancel`, {
          reason: 'Cancelled by patient'
        });
        alert('Appointment cancelled successfully');
        fetchPatientData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel appointment');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReviewClick = (appointment, doctor) => {
    setSelectedAppointment(appointment);
    setSelectedDoctor(doctor);
    setShowReviewModal(true);
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'Scheduled': 'bg-amber-100 text-amber-800',
      'Confirmed': 'bg-emerald-100 text-emerald-800',
      'In Progress': 'bg-sky-100 text-sky-800',
      'Completed': 'bg-gray-100 text-gray-800',
      'Cancelled': 'bg-rose-100 text-rose-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Scheduled': return <FaRegClock className="text-amber-600" />;
      case 'Confirmed': return <FaCheckCircle className="text-emerald-600" />;
      case 'In Progress': return <FaStethoscope className="text-sky-600" />;
      case 'Completed': return <FaCheckCircle className="text-gray-600" />;
      case 'Cancelled': return <FaTimesCircle className="text-rose-600" />;
      default: return <FaRegClock className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const upcomingAppointments = getUpcomingAppointments();
  const pastAppointments = getPastAppointments();
  const filteredAppointments = appointmentFilter === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
            My Appointments
          </h2>
          <p className="text-gray-600 mt-1">Manage and track your dental appointments</p>
        </div>
        <button 
          onClick={() => window.location.href = '/appointments/new'}
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-sky-600 hover:to-blue-700 transition flex items-center space-x-2 shadow-md"
        >
          <FaPlus className="text-xs" />
          <span>Book New</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setAppointmentFilter('upcoming')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
              appointmentFilter === 'upcoming'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming Appointments
            {upcomingAppointments.length > 0 && (
              <span className="ml-2 bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full text-xs">
                {upcomingAppointments.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setAppointmentFilter('past')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
              appointmentFilter === 'past'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past Appointments
            {pastAppointments.length > 0 && (
              <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {pastAppointments.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCalendarAlt className="text-gray-400 text-4xl" />
          </div>
          <p className="text-gray-500 mb-4 text-lg">
            {appointmentFilter === 'upcoming' 
              ? 'No upcoming appointments found.' 
              : 'No past appointments found.'}
          </p>
          {appointmentFilter === 'upcoming' && (
            <button 
              onClick={() => window.location.href = '/appointments/new'}
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-sky-600 hover:to-blue-700 transition inline-flex items-center space-x-2 shadow-md"
            >
              <FaPlus className="text-sm" />
              <span>Book Your First Appointment</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div key={apt._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2 text-sky-600">
                      <FaCalendarAlt className="text-lg" />
                      <span className="font-semibold text-lg">
                        {formatDate(apt.date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaClock className="text-lg" />
                      <span className="font-medium">{apt.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-1.5 bg-gradient-to-r from-sky-100 to-blue-100 rounded-lg">
                      <FaTooth className="text-sky-600 text-sm" />
                    </div>
                    <p className="text-gray-800">
                      <span className="font-medium">Type:</span> {apt.type}
                    </p>
                  </div>
                  
                  {apt.symptoms && (
                    <div className="flex items-start space-x-2 mb-3">
                      <div className="p-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                        <FaFileMedical className="text-amber-600 text-sm" />
                      </div>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Symptoms:</span> {apt.symptoms}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 mt-4">
                    <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(apt.status)}`}>
                      {getStatusIcon(apt.status)}
                      <span>{apt.status}</span>
                    </div>
                    {apt.amount > 0 && (
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                        <FaMoneyBillWave className="text-xs" />
                        <span>${apt.amount}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {apt.status === 'Completed' && !apt.hasReviewed && (
                    <button
                      onClick={() => handleReviewClick(apt, apt.doctor)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition shadow-md flex items-center gap-2"
                    >
                      <FaStar /> Rate Experience
                    </button>
                  )}
                  
                  {apt.status !== 'Cancelled' && apt.status !== 'Completed' && appointmentFilter === 'upcoming' && (
                    <button
                      onClick={() => cancelAppointment(apt._id)}
                      disabled={loading}
                      className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:from-rose-600 hover:to-rose-700 transition shadow-md flex items-center space-x-2"
                    >
                      <FaTimesCircle className="text-sm" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        appointment={selectedAppointment}
        doctor={selectedDoctor}
        onSuccess={() => {
          fetchPatientData();
          alert('Thank you for your feedback! Your review will be published after admin approval.');
        }}
      />
    </div>
  );
};

export default PatientAppointments;