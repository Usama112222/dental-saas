import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { 
  FaStar, FaTrash, FaCheckCircle, FaTimesCircle, FaEye, 
  FaFilter, FaUserMd, FaCalendarAlt, FaComments, FaSpinner,
  FaRegStar
} from 'react-icons/fa';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    averageRating: 0
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, filterStatus, filterRating]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/reviews');
      const reviewsData = response.data.data || [];
      setReviews(reviewsData);
      
      // Calculate stats
      const approved = reviewsData.filter(r => r.status === 'Approved').length;
      const pending = reviewsData.filter(r => r.status === 'Pending').length;
      const rejected = reviewsData.filter(r => r.status === 'Rejected').length;
      const totalRating = reviewsData.filter(r => r.status === 'Approved').reduce((sum, r) => sum + r.rating, 0);
      const avgRating = approved > 0 ? (totalRating / approved).toFixed(1) : 0;
      
      setStats({
        total: reviewsData.length,
        approved,
        pending,
        rejected,
        averageRating: avgRating
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReviews = () => {
    let filtered = [...reviews];
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(r => r.status === filterStatus);
    }
    
    if (filterRating !== 'all') {
      filtered = filtered.filter(r => r.rating === parseInt(filterRating));
    }
    
    setFilteredReviews(filtered);
  };

  const updateReviewStatus = async (reviewId, status) => {
    try {
      await axios.put(`/reviews/${reviewId}/status`, { status });
      await fetchReviews();
      alert(`Review ${status.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review status');
    }
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await axios.delete(`/reviews/${reviewId}`);
      await fetchReviews();
      alert('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"><FaCheckCircle className="text-xs" /> Approved</span>;
      case 'Pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1"><FaSpinner className="text-xs animate-spin" /> Pending</span>;
      case 'Rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1"><FaTimesCircle className="text-xs" /> Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reviews Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and moderate patient reviews</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-gray-500 text-sm">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-gray-500 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-gray-500 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-gray-500 text-sm">Average Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-yellow-500">{stats.averageRating}</p>
            <div className="flex">{renderStars(Math.round(stats.averageRating))}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <select
            className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          
          <button
            onClick={() => { setFilterStatus('all'); setFilterRating('all'); }}
            className="text-sm text-sky-600 hover:text-sky-700"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <FaComments className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews found</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{review.title}</span>
                  </div>
                  
                  {/* Patient & Doctor Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <FaUserMd className="text-sky-500" />
                      <span className="text-gray-600">Patient:</span>
                      <span className="font-medium text-gray-800">{review.patientName || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaUserMd className="text-purple-500" />
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium text-gray-800">Dr. {review.doctor?.name || 'Unknown'}</span>
                    </div>
                  </div>
                  
                  {/* Comment */}
                  <p className="text-gray-600 text-sm mb-3">{review.comment}</p>
                  
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaCalendarAlt />
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  <div className="mb-2">{getStatusBadge(review.status)}</div>
                  
                  {review.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateReviewStatus(review._id, 'Approved')}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button
                        onClick={() => updateReviewStatus(review._id, 'Rejected')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedReview(review);
                      setShowModal(true);
                    }}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <FaEye /> View Details
                  </button>
                  
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="border border-red-300 text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Details Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Review Details</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">{renderStars(selectedReview.rating)}</div>
                <span className="text-lg font-bold text-gray-800">{selectedReview.rating}.0</span>
                {getStatusBadge(selectedReview.status)}
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{selectedReview.title}</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{selectedReview.patientName || 'Anonymous'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">Dr. {selectedReview.doctor?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(selectedReview.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Appointment</p>
                  <p className="font-medium">{selectedReview.appointment?.type || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Review</p>
                <p className="text-gray-700">{selectedReview.comment}</p>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                {selectedReview.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateReviewStatus(selectedReview._id, 'Approved');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Approve Review
                    </button>
                    <button
                      onClick={() => {
                        updateReviewStatus(selectedReview._id, 'Rejected');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Reject Review
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;