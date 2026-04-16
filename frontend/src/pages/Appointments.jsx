// Appointments.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaTooth, 
  FaPlus, 
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaRegClock,
  FaStethoscope,
  FaFileMedical,
  FaMoneyBillWave,
  FaSpinner
} from 'react-icons/fa';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    fetchPatientAndAppointments();
  }, [filter]);

  const fetchPatientAndAppointments = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching appointments for user:', user?._id);
      
      const patientsRes = await axios.get('/patients');
      console.log('Patients response:', patientsRes.data);
      
      const allPatients = patientsRes.data.data || [];
      const currentPatient = allPatients.find(p => {
        const patientUserId = p.user?._id || p.user;
        return patientUserId === user?._id;
      });
      
      console.log('Current patient found:', currentPatient);
      
      if (currentPatient) {
        setPatientId(currentPatient._id);
        await fetchAppointments(currentPatient._id);
      } else {
        console.log('No patient profile found');
        setAppointments([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      setLoading(false);
    }
  };

  const fetchAppointments = async (patientId) => {
    try {
      console.log('Fetching appointments for patient ID:', patientId);
      
      const response = await axios.get(`/appointments?patient=${patientId}`);
      console.log('Appointments response:', response.data);
      
      let filteredAppointments = response.data.data || [];
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (filter === 'upcoming') {
        filteredAppointments = filteredAppointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= today && apt.status !== 'Cancelled' && apt.status !== 'Completed';
        });
      } else if (filter === 'past') {
        filteredAppointments = filteredAppointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate < today || apt.status === 'Completed' || apt.status === 'Cancelled';
        });
      }
      
      if (filter === 'upcoming') {
        filteredAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        filteredAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await axios.put(`/appointments/${id}/cancel`, {
          reason: 'Cancelled by patient'
        });
        if (patientId) {
          await fetchAppointments(patientId);
        }
        alert('Appointment cancelled successfully');
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        alert(error.response?.data?.message || 'Failed to cancel appointment');
      }
    }
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
      case 'Scheduled':
        return <FaRegClock className="text-amber-600" />;
      case 'Confirmed':
        return <FaCheckCircle className="text-emerald-600" />;
      case 'In Progress':
        return <FaStethoscope className="text-sky-600" />;
      case 'Completed':
        return <FaCheckCircle className="text-gray-600" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-rose-600" />;
      default:
        return <FaRegClock className="text-gray-600" />;
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-sky-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              My Appointments
            </h1>
            <p className="text-gray-600 mt-1">Manage and track your dental appointments</p>
          </div>
          <Link 
            to="/appointments/new" 
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-sky-600 hover:to-blue-700 transition flex items-center space-x-2 shadow-md"
          >
            <FaPlus className="text-xs" />
            <span>Book New</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setFilter('upcoming')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                filter === 'upcoming'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Appointments
              {filter === 'upcoming' && appointments.length > 0 && (
                <span className="ml-2 bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full text-xs">
                  {appointments.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                filter === 'past'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past Appointments
              {filter === 'past' && appointments.length > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {appointments.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCalendarAlt className="text-gray-400 text-4xl" />
          </div>
          <p className="text-gray-500 mb-4 text-lg">
            {filter === 'upcoming' 
              ? 'No upcoming appointments found.' 
              : 'No past appointments found.'}
          </p>
          {filter === 'upcoming' && (
            <Link 
              to="/appointments/new" 
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-sky-600 hover:to-blue-700 transition inline-flex items-center space-x-2 shadow-md"
            >
              <FaPlus className="text-sm" />
              <span>Book Your First Appointment</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  {/* Date and Time */}
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
                  
                  {/* Appointment Type */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-1.5 bg-gradient-to-r from-sky-100 to-blue-100 rounded-lg">
                      <FaTooth className="text-sky-600 text-sm" />
                    </div>
                    <p className="text-gray-800">
                      <span className="font-medium">Type:</span> {apt.type}
                    </p>
                  </div>
                  
                  {/* Symptoms */}
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
                  
                  {/* Notes */}
                  {apt.notes && (
                    <div className="flex items-start space-x-2 mb-3">
                      <div className="p-1.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                        <FaStethoscope className="text-gray-600 text-sm" />
                      </div>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Notes:</span> {apt.notes}
                      </p>
                    </div>
                  )}
                  
                  {/* Status and Amount */}
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
                
                {/* Cancel Button */}
                {apt.status !== 'Cancelled' && apt.status !== 'Completed' && filter === 'upcoming' && (
                  <button
                    onClick={() => cancelAppointment(apt._id)}
                    className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:from-rose-600 hover:to-rose-700 transition shadow-md flex items-center space-x-2"
                  >
                    <FaTimesCircle className="text-sm" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Dashboard Link */}
      <div className="mt-8 text-center">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition group"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default Appointments;