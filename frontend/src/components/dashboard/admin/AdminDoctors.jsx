import React, { useState } from 'react';
import axios from '../../../api/axios';
import { FaUserMd, FaPlus, FaStar, FaTrash } from 'react-icons/fa';

const AdminDoctors = ({ doctors, fetchData }) => {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [selectedDoctorImage, setSelectedDoctorImage] = useState(null);
  const [doctorImagePreview, setDoctorImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    experience: '',
    bio: '',
  });

  const handleDoctorImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedDoctorImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDoctorImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('specialization', formData.specialization);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('bio', formData.bio);
      if (selectedDoctorImage) {
        formDataToSend.append('image', selectedDoctorImage);
      }
      
      await axios.post('/doctors', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Doctor added successfully!');
      setShowAddDoctor(false);
      setSelectedDoctorImage(null);
      setDoctorImagePreview(null);
      setFormData({
        name: '',
        specialization: '',
        email: '',
        phone: '',
        experience: '',
        bio: '',
      });
      fetchData();
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert(error.response?.data?.message || 'Failed to add doctor');
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await axios.delete(`/doctors/${id}`);
        alert('Doctor deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Failed to delete doctor');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl">
            <FaUserMd className="text-sky-600 text-xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Manage Doctors</h3>
        </div>
        <button
          onClick={() => setShowAddDoctor(true)}
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-sky-600 hover:to-blue-700 transition flex items-center space-x-2 shadow-md"
        >
          <FaPlus className="text-xs" />
          <span>Add Doctor</span>
        </button>
      </div>

      {showAddDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Doctor</h3>
            <form onSubmit={handleAddDoctor}>
              <input
                type="text"
                placeholder="Doctor Name *"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Specialization *"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email *"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Years of Experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
              <textarea
                placeholder="Bio"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                rows="3"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  onChange={handleDoctorImageSelect}
                />
                {doctorImagePreview && (
                  <div className="mt-2">
                    <img src={doctorImagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-sky-500" />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDoctor(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-sky-600 hover:to-blue-700 transition shadow-md"
                >
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex space-x-4">
              <img 
                src={doctor.image ? `http://localhost:5000${doctor.image}` : 'https://randomuser.me/api/portraits/men/1.jpg'} 
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => { e.target.src = 'https://randomuser.me/api/portraits/men/1.jpg'; }}
              />
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-800">{doctor.name}</h4>
                <p className="text-sky-600 text-sm font-medium">{doctor.specialization}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <FaStar className="text-amber-500 text-sm" />
                  <span className="text-sm text-gray-600">{doctor.experience || '5'} years exp.</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">{doctor.email}</p>
              </div>
              <button
                onClick={() => handleDeleteDoctor(doctor._id)}
                className="text-rose-500 hover:text-rose-700 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDoctors;