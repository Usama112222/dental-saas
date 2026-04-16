import React, { useState } from 'react';
import axios from '../../../api/axios';
import { FaCalendarWeek, FaPlus, FaRegClock, FaTrash } from 'react-icons/fa';

const AdminAvailability = ({ availability, doctors, fetchData }) => {
  const [showAddAvailability, setShowAddAvailability] = useState(false);
  const [availabilityForm, setAvailabilityForm] = useState({
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:00',
    doctorId: ''
  });

  const handleAddAvailability = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/availability', availabilityForm);
      alert('Availability added successfully!');
      setShowAddAvailability(false);
      setAvailabilityForm({
        day: 'Monday',
        startTime: '09:00',
        endTime: '17:00',
        doctorId: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error adding availability:', error);
      alert('Failed to add availability');
    }
  };

  const handleDeleteAvailability = async (id) => {
    if (window.confirm('Are you sure you want to delete this availability slot?')) {
      try {
        await axios.delete(`/availability/${id}`);
        alert('Availability deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting availability:', error);
        alert('Failed to delete availability');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
            <FaCalendarWeek className="text-amber-600 text-xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Manage Doctor Availability</h3>
        </div>
        <button
          onClick={() => setShowAddAvailability(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition flex items-center space-x-2 shadow-md"
        >
          <FaPlus className="text-xs" />
          <span>Add Availability</span>
        </button>
      </div>

      {showAddAvailability && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Set Availability</h3>
            <form onSubmit={handleAddAvailability}>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={availabilityForm.doctorId}
                onChange={(e) => setAvailabilityForm({ ...availabilityForm, doctorId: e.target.value })}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                ))}
              </select>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={availabilityForm.day}
                onChange={(e) => setAvailabilityForm({ ...availabilityForm, day: e.target.value })}
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="time"
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={availabilityForm.startTime}
                  onChange={(e) => setAvailabilityForm({ ...availabilityForm, startTime: e.target.value })}
                />
                <input
                  type="time"
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={availabilityForm.endTime}
                  onChange={(e) => setAvailabilityForm({ ...availabilityForm, endTime: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddAvailability(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl hover:from-amber-600 hover:to-orange-700 transition shadow-md"
                >
                  Add Availability
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {availability.map((slot) => {
          const doctor = doctors.find(d => d._id === slot.doctorId);
          return (
            <div key={slot._id} className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <p className="font-bold text-lg text-gray-800">{doctor?.name || 'Unknown Doctor'}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaRegClock className="text-amber-500" />
                  <span>{slot.day}: {slot.startTime} - {slot.endTime}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteAvailability(slot._id)}
                className="text-rose-500 hover:text-rose-700 transition"
              >
                <FaTrash />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAvailability;