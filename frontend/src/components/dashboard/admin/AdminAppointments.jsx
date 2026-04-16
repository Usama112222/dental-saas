import React, { useState } from 'react';
import axios from '../../../api/axios';
import { 
  FaCalendarAlt, FaClock, FaUserCircle, FaTooth, FaStethoscope, 
  FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaSpinner, 
  FaRegClock, FaFilter, FaCheck, FaPlay, FaUserCheck
} from 'react-icons/fa';

const AdminAppointments = ({ allAppointments, getStatusBadgeClass, fetchData }) => {
  const [appointmentFilter, setAppointmentFilter] = useState('all');
  const [updating, setUpdating] = useState(false);

  const updateAppointmentStatus = async (id, status) => {
    if (!window.confirm(`Are you sure you want to mark this appointment as ${status}?`)) return;
    
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/appointments/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Appointment marked as ${status} successfully!`);
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert(error.response?.data?.message || 'Failed to update appointment');
    } finally {
      setUpdating(false);
    }
  };

  const getFilteredAppointments = () => {
    if (appointmentFilter === 'all') return allAppointments;
    if (appointmentFilter === 'upcoming') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return allAppointments.filter(apt => new Date(apt.date) >= today);
    }
    if (appointmentFilter === 'past') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return allAppointments.filter(apt => new Date(apt.date) < today);
    }
    return allAppointments.filter(apt => apt.status === appointmentFilter);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <FaCheckCircle className="text-xs" />;
      case 'Cancelled': return <FaTimesCircle className="text-xs" />;
      case 'In Progress': return <FaSpinner className="text-xs animate-spin" />;
      case 'Scheduled': return <FaRegClock className="text-xs" />;
      case 'Confirmed': return <FaCheckCircle className="text-xs" />;
      default: return <FaRegClock className="text-xs" />;
    }
  };

  const getStatusActions = (appointment) => {
    switch(appointment.status) {
      case 'Scheduled':
        return (
          <button
            onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}
            disabled={updating}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1"
          >
            <FaCheck /> Confirm
          </button>
        );
      case 'Confirmed':
        return (
          <button
            onClick={() => updateAppointmentStatus(appointment._id, 'In Progress')}
            disabled={updating}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1"
          >
            <FaPlay /> Start
          </button>
        );
      case 'In Progress':
        return (
          <button
            onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}
            disabled={updating}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1"
          >
            <FaUserCheck /> Complete
          </button>
        );
      case 'Completed':
        return (
          <span className="text-green-600 text-xs font-medium flex items-center gap-1">
            <FaCheckCircle /> Done
          </span>
        );
      case 'Cancelled':
        return (
          <span className="text-red-600 text-xs font-medium flex items-center gap-1">
            <FaTimesCircle /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl">
            <FaCalendarAlt className="text-sky-600 text-xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">All Appointments</h3>
        </div>
        <div className="flex items-center space-x-3">
          <FaFilter className="text-gray-400" />
          <select
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={appointmentFilter}
            onChange={(e) => setAppointmentFilter(e.target.value)}
          >
            <option value="all">All Appointments</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredAppointments.map((apt) => (
          <div key={apt._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2 text-sky-600">
                    <FaCalendarAlt className="text-lg" />
                    <span className="font-semibold text-lg">
                      {new Date(apt.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaClock className="text-lg" />
                    <span className="font-medium">{apt.time}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-r from-sky-100 to-blue-100 rounded-lg">
                      <FaUserCircle className="text-sky-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Patient</p>
                      <p className="font-medium text-gray-800">{apt.patient?.user?.name || 'Unknown'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
                      <FaTooth className="text-emerald-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Treatment</p>
                      <p className="font-medium text-gray-800">{apt.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                      <FaUserCircle className="text-amber-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Doctor</p>
                      <p className="font-medium text-gray-800">{apt.doctor?.name || 'Not assigned'}</p>
                    </div>
                  </div>
                </div>
                
                {apt.symptoms && (
                  <div className="flex items-start space-x-2 mb-2">
                    <div className="p-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                      <FaStethoscope className="text-amber-600 text-sm" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Symptoms:</span> {apt.symptoms}
                    </p>
                  </div>
                )}
                
                {apt.notes && (
                  <div className="flex items-start space-x-2 mb-2">
                    <div className="p-1.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                      <FaStethoscope className="text-gray-600 text-sm" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Notes:</span> {apt.notes}
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
              
              <div className="flex items-center">
                {getStatusActions(apt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCalendarAlt className="text-gray-400 text-4xl" />
          </div>
          <p className="text-gray-500">No appointments found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;