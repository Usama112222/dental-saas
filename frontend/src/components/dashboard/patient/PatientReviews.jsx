// src/components/dashboard/patient/PatientReviews.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { FaStar, FaSpinner, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaUserMd } from 'react-icons/fa';

const PatientReviews = ({ patientId }) => {
  const [myReviews, setMyReviews] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    comment: '',
    treatmentRating: 5,
    waitTimeRating: 4,
    cleanlinessRating: 5,
    staffRating: 5
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Get patient's appointments
      const appointmentsRes = await axios.get(`/appointments?patient=${patientId}`);
      const allAppointments = appointmentsRes.data.data || [];
      
      // Filter completed appointments that are not reviewed
      const completed = allAppointments.filter(
        apt => apt.status === 'Completed' && !apt.hasReviewed
      );
      setCompletedAppointments(completed);
      
      // Get existing reviews
      const reviewsRes = await axios.get('/reviews/my-reviews');
      setMyReviews(reviewsRes.data.data || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const doctorId = selectedAppointment.doctor?._id || selectedAppointment.doctor;
      
      const reviewPayload = {
        doctor: doctorId,
        appointment: selectedAppointment._id,
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
        treatmentRating: reviewData.treatmentRating,
        waitTimeRating: reviewData.waitTimeRating,
        cleanlinessRating: reviewData.cleanlinessRating,
        staffRating: reviewData.staffRating
      };
      
      await axios.post('/reviews', reviewPayload);
      
      setSuccess('Review submitted successfully! Thank you for your feedback.');
      setShowReviewForm(false);
      setSelectedAppointment(null);
      setReviewData({
        rating: 5,
        title: '',
        comment: '',
        treatmentRating: 5,
        waitTimeRating: 4,
        cleanlinessRating: 5,
        staffRating: 5
      });
      fetchData();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange, label }) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <FaStar
              className={`text-xl ${
                star <= value ? 'text-yellow-400' : 'text-gray-300'
              } hover:scale-110 transition-transform`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-sky-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      
      {success && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <FaCheckCircle /> {success}
        </div>
      )}
      
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <FaTimesCircle /> {error}
        </div>
      )}
      
      {/* Appointments Waiting for Review */}
      {completedAppointments.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Appointments to Review</h3>
          <div className="grid gap-4">
            {completedAppointments.map((apt) => (
              <div key={apt._id} className="bg-white rounded-xl shadow-md p-4 border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaCalendarAlt className="text-sky-500" />
                      <span className="font-medium">
                        {new Date(apt.date).toLocaleDateString()}
                      </span>
                      <span className="text-gray-500">at {apt.time}</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Treatment:</span> {apt.type}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Doctor:</span> {apt.doctor?.name || apt.doctorName}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAppointment(apt);
                      setShowReviewForm(true);
                    }}
                    className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
                  >
                    Write Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Review Form Modal */}
      {showReviewForm && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Write a Review</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <p className="text-white/80 text-sm mt-1">
                Dr. {selectedAppointment.doctor?.name || selectedAppointment.doctorName} - {selectedAppointment.type}
              </p>
            </div>
            
            <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
              <StarRating
                value={reviewData.rating}
                onChange={(val) => setReviewData({...reviewData, rating: val})}
                label="Overall Rating *"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g., Excellent experience!"
                  value={reviewData.title}
                  onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review *
                </label>
                <textarea
                  required
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                  placeholder="Share your experience with the doctor..."
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <StarRating
                  value={reviewData.treatmentRating}
                  onChange={(val) => setReviewData({...reviewData, treatmentRating: val})}
                  label="Treatment Quality"
                />
                <StarRating
                  value={reviewData.waitTimeRating}
                  onChange={(val) => setReviewData({...reviewData, waitTimeRating: val})}
                  label="Wait Time"
                />
                <StarRating
                  value={reviewData.cleanlinessRating}
                  onChange={(val) => setReviewData({...reviewData, cleanlinessRating: val})}
                  label="Clinic Cleanliness"
                />
                <StarRating
                  value={reviewData.staffRating}
                  onChange={(val) => setReviewData({...reviewData, staffRating: val})}
                  label="Staff Friendliness"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* My Existing Reviews */}
      <div>
        <h3 className="text-xl font-semibold mb-4">My Previous Reviews</h3>
        {myReviews.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No reviews yet. Share your experience!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {myReviews.map((review) => (
              <div key={review._id} className="bg-white rounded-xl shadow-md p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FaUserMd className="text-sky-500" />
                    <span className="font-medium">Dr. {review.doctor?.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800">{review.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientReviews;