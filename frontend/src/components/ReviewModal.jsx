import React, { useState } from 'react';
import { FaStar, FaTimes, FaUserMd, FaClock, FaSmile, FaSpinner, FaSyringe } from 'react-icons/fa';
import axios from '../api/axios';

const ReviewModal = ({ isOpen, onClose, appointment, doctor, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [treatmentRating, setTreatmentRating] = useState(0);
  const [waitTimeRating, setWaitTimeRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [staffRating, setStaffRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get doctor ID from multiple possible sources
  const getDoctorId = () => {
    // From direct doctor prop
    if (doctor?._id) return doctor._id;
    if (doctor?.id) return doctor.id;
    
    // From appointment object
    if (appointment?.doctor?._id) return appointment.doctor._id;
    if (appointment?.doctor?.id) return appointment.doctor.id;
    if (appointment?.doctorId) return appointment.doctorId;
    
    // From appointment's doctor field (might be just the ID string)
    if (appointment?.doctor && typeof appointment.doctor === 'string') return appointment.doctor;
    
    // From appointment's doctorName (can't use this - need ID)
    console.error('Could not find doctor ID in:', { appointment, doctor });
    return null;
  };

  const getDoctorName = () => {
    if (doctor?.name) return doctor.name;
    if (appointment?.doctor?.name) return appointment.doctor.name;
    if (appointment?.doctorName) return appointment.doctorName;
    return 'the doctor';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please enter your review comment');
      return;
    }
    
    const doctorId = getDoctorId();
    
    if (!doctorId) {
      setError('Doctor information is missing. Please contact support.');
      console.error('Missing doctor ID. Appointment data:', appointment);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const reviewData = {
        doctor: doctorId,
        appointment: appointment?._id,
        rating,
        title,
        comment,
        treatmentRating: treatmentRating || rating,
        waitTimeRating: waitTimeRating || rating,
        cleanlinessRating: cleanlinessRating || rating,
        staffRating: staffRating || rating
      };
      
      console.log('Submitting review:', reviewData); // Debug log
      
      const response = await axios.post('/reviews', reviewData);
      
      if (response.data.success) {
        onSuccess && onSuccess();
        onClose();
        // Reset form
        setRating(0);
        setTitle('');
        setComment('');
        setTreatmentRating(0);
        setWaitTimeRating(0);
        setCleanlinessRating(0);
        setStaffRating(0);
      }
    } catch (error) {
      console.error('Review error:', error);
      setError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Rate Your Experience</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes className="text-2xl" />
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Share your experience with Dr. {getDoctorName()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Overall Rating */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating *
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <FaStar
                    className={`text-4xl transition ${
                      (hoverRating || rating) >= star
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {rating === 5 && "Excellent! I'm very satisfied"}
              {rating === 4 && "Good experience"}
              {rating === 3 && "Average experience"}
              {rating === 2 && "Below expectations"}
              {rating === 1 && "Poor experience"}
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Title *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Excellent experience!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review *
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share details about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          {/* Detailed Ratings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaUserMd className="mr-2 text-blue-500" />
                Treatment Quality
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setTreatmentRating(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`text-xl ${
                        treatmentRating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaClock className="mr-2 text-blue-500" />
                Wait Time
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setWaitTimeRating(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`text-xl ${
                        waitTimeRating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaSmile className="mr-2 text-blue-500" />
                Staff Behavior
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStaffRating(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`text-xl ${
                        staffRating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaSyringe className="mr-2 text-blue-500" />
                Cleanliness
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setCleanlinessRating(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`text-xl ${
                        cleanlinessRating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your review will be reviewed by our team before being published. Thank you for your feedback!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <><FaSpinner className="animate-spin" /> Submitting...</> : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;