import React, { useState } from 'react';
import axios from '../../../api/axios';
import { FaTooth, FaPlus, FaTrash } from 'react-icons/fa';

const AdminTreatments = ({ treatments, fetchData }) => {
  const [showAddTreatment, setShowAddTreatment] = useState(false);
  const [selectedTreatmentImage, setSelectedTreatmentImage] = useState(null);
  const [treatmentImagePreview, setTreatmentImagePreview] = useState(null);
  const [treatmentForm, setTreatmentForm] = useState({
    name: '',
    description: '',
    duration: 30,
    price: 0,
    category: 'General',
  });

  const handleTreatmentImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedTreatmentImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTreatmentImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTreatment = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', treatmentForm.name);
      formDataToSend.append('description', treatmentForm.description);
      formDataToSend.append('duration', treatmentForm.duration);
      formDataToSend.append('price', treatmentForm.price);
      formDataToSend.append('category', treatmentForm.category);
      if (selectedTreatmentImage) {
        formDataToSend.append('image', selectedTreatmentImage);
      }
      
      await axios.post('/treatments', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Treatment added successfully!');
      setShowAddTreatment(false);
      setSelectedTreatmentImage(null);
      setTreatmentImagePreview(null);
      setTreatmentForm({
        name: '',
        description: '',
        duration: 30,
        price: 0,
        category: 'General',
      });
      fetchData();
    } catch (error) {
      console.error('Error adding treatment:', error);
      alert(error.response?.data?.message || 'Failed to add treatment');
    }
  };

  const handleDeleteTreatment = async (id) => {
    if (window.confirm('Are you sure you want to delete this treatment?')) {
      try {
        await axios.delete(`/treatments/${id}`);
        alert('Treatment deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting treatment:', error);
        alert('Failed to delete treatment');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
            <FaTooth className="text-emerald-600 text-xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Manage Treatments</h3>
        </div>
        <button
          onClick={() => setShowAddTreatment(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition flex items-center space-x-2 shadow-md"
        >
          <FaPlus className="text-xs" />
          <span>Add Treatment</span>
        </button>
      </div>

      {showAddTreatment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Treatment</h3>
            <form onSubmit={handleAddTreatment}>
              <input
                type="text"
                placeholder="Treatment Name *"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={treatmentForm.name}
                onChange={(e) => setTreatmentForm({ ...treatmentForm, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="3"
                value={treatmentForm.description}
                onChange={(e) => setTreatmentForm({ ...treatmentForm, description: e.target.value })}
              />
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={treatmentForm.category}
                onChange={(e) => setTreatmentForm({ ...treatmentForm, category: e.target.value })}
              >
                <option value="General">General</option>
                <option value="Cosmetic">Cosmetic</option>
                <option value="Surgical">Surgical</option>
                <option value="Orthodontic">Orthodontic</option>
              </select>
              <input
                type="number"
                placeholder="Duration (minutes)"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={treatmentForm.duration}
                onChange={(e) => setTreatmentForm({ ...treatmentForm, duration: parseInt(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Price ($) *"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={treatmentForm.price}
                onChange={(e) => setTreatmentForm({ ...treatmentForm, price: parseFloat(e.target.value) })}
                required
              />
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={handleTreatmentImageSelect}
                />
                {treatmentImagePreview && (
                  <div className="mt-2">
                    <img src={treatmentImagePreview} alt="Preview" className="w-32 h-24 object-cover rounded-lg border-2 border-emerald-500" />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTreatment(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition shadow-md"
                >
                  Add Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((treatment) => (
          <div key={treatment._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex space-x-4">
              <img 
                src={treatment.image ? `http://localhost:5000${treatment.image}` : 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=80'} 
                alt={treatment.name}
                className="w-20 h-20 rounded-lg object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=80'; }}
              />
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-800">{treatment.name}</h4>
                <p className="text-gray-500 text-sm">{treatment.description?.substring(0, 60)}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full">{treatment.category}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{treatment.duration} min</span>
                </div>
                <p className="text-lg font-bold text-emerald-600 mt-2">${treatment.price}</p>
              </div>
              <button
                onClick={() => handleDeleteTreatment(treatment._id)}
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

export default AdminTreatments;