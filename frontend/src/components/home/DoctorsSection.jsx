// components/home/DoctorsSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';
import { 
  FaStar, FaEnvelope, FaPhone, FaCalendarCheck, FaUserMd, 
  FaStethoscope, FaTimes, FaStarHalfAlt, FaRegStar,
  FaArrowRight, FaHeartbeat, FaAward, FaClock, FaQuoteLeft,
  FaShieldAlt, FaVideo, FaMapMarkerAlt, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const DoctorsSection = ({ doctors = [], onBookDoctor }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef(null);

  // Fixed to 3 cards per view on all screen sizes
  useEffect(() => {
    setCardsPerView(3);
  }, []);

  const doctorsList = Array.isArray(doctors) ? doctors : [];
  const totalSlides = Math.ceil(doctorsList.length / cardsPerView);
  const maxIndex = Math.max(0, totalSlides - 1);

  const handleBookAppointment = (doctor) => {
    if (onBookDoctor) {
      onBookDoctor(doctor);
    } else {
      isAuthenticated ? navigate('/appointments/new') : navigate('/login');
    }
  };

  const fetchDoctorReviews = async (doctor) => {
    setSelectedDoctor(doctor);
    setLoadingReviews(true);
    try {
      const response = await axios.get(`/reviews/doctor/${doctor._id}`);
      if (response.data.success) {
        setReviews(response.data.data);
        setReviewStats(response.data.stats);
        setShowReviewsModal(true);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />
        ))}
      </>
    );
  };

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(maxIndex);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 rounded-full shadow-md mb-4 backdrop-blur-sm">
            <FaHeartbeat className="text-white text-sm" />
            <span className="text-white text-sm font-medium">Expert Dental Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Meet Our Expert Dentists
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of experienced professionals is dedicated to your dental health
          </p>
        </div>

        {/* HORIZONTAL SLIDER - 3 CARDS */}
        {doctorsList.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <FaUserMd className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-500">No doctors added yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Slider Container with Navigation */}
            <div className="relative px-12">
              {/* Left Navigation Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-sky-50 group"
              >
                <FaChevronLeft className="text-sky-600 text-xl group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Right Navigation Arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-sky-50 group"
              >
                <FaChevronRight className="text-sky-600 text-xl group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Slider */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {doctorsList
                          .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                          .map((doctor) => (
                            // Gradient Border Card - Increased Size
                            <div 
                              key={doctor._id} 
                              className="group p-[2px] bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                              {/* Glass Card Content - Larger padding */}
                              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
                                
                                {/* Doctor Image - Larger */}
                                <div className="relative mb-5 -mt-2">
                                  <div className="relative w-full h-56 rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img 
                                      src={doctor.image ? `http://localhost:5000${doctor.image}` : `https://ui-avatars.com/api/?background=0EA5E9&color=fff&size=200&name=${encodeURIComponent(doctor.name)}`} 
                                      alt={doctor.name}
                                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                      onError={(e) => { 
                                        e.target.src = `https://ui-avatars.com/api/?background=0EA5E9&color=fff&size=200&name=${encodeURIComponent(doctor.name)}`;
                                      }}
                                    />
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3">
                                      <div className="flex items-center gap-1 bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                        Available
                                      </div>
                                    </div>

                                    {/* Experience Badge - Bottom Left */}
                                    <div className="absolute bottom-3 left-3">
                                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-sky-600 px-2.5 py-1 rounded-full text-xs font-medium">
                                        <FaAward className="text-[10px]" />
                                        <span>{doctor.experience || '5'}+ Years</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Doctor Info - Larger text */}
                                <div className="text-center">
                                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                                  <div className="flex items-center justify-center gap-2 mb-3">
                                    <FaStethoscope className="text-sky-500 text-base" />
                                    <p className="text-sky-600 font-medium text-base">{doctor.specialization}</p>
                                  </div>

                                  {/* Rating - Larger */}
                                  <div className="flex items-center justify-center gap-2 mb-4">
                                    <div className="flex gap-1">
                                      {renderStars(doctor.averageRating || 0)}
                                    </div>
                                    <button 
                                      onClick={() => fetchDoctorReviews(doctor)}
                                      className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors"
                                    >
                                      ({doctor.totalReviews || 0} reviews)
                                    </button>
                                  </div>

                                  {/* Bio - More lines */}
                                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 px-2">
                                    {doctor.bio || "Experienced dental professional dedicated to providing exceptional patient care with a gentle touch. Specializing in modern dental techniques and patient comfort."}
                                  </p>

                                  {/* Pill Badges - Larger */}
                                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 rounded-full text-sm text-sky-600">
                                      <FaShieldAlt className="text-xs" />
                                      <span>Verified</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full text-sm text-purple-600">
                                      <FaVideo className="text-xs" />
                                      <span>Online Consultation</span>
                                    </div>
                                  </div>

                                  {/* Contact Icons - Larger */}
                                  <div className="flex justify-center gap-4 mb-4 pt-3 border-t border-gray-100">
                                    <div className="group/tooltip relative">
                                      <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-sky-50 transition-colors cursor-pointer">
                                        <FaEnvelope className="text-gray-500 hover:text-sky-500 transition-colors text-sm" />
                                      </div>
                                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                                        {doctor.email || "doctor@dentalcare.com"}
                                      </span>
                                    </div>
                                    <div className="group/tooltip relative">
                                      <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-sky-50 transition-colors cursor-pointer">
                                        <FaPhone className="text-gray-500 hover:text-sky-500 transition-colors text-sm" />
                                      </div>
                                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                                        {doctor.phone || "+1 (555) 123-4567"}
                                      </span>
                                    </div>
                                    <div className="group/tooltip relative">
                                      <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-sky-50 transition-colors cursor-pointer">
                                        <FaClock className="text-gray-500 hover:text-sky-500 transition-colors text-sm" />
                                      </div>
                                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                                        Mon-Fri, 9AM-6PM
                                      </span>
                                    </div>
                                    <div className="group/tooltip relative">
                                      <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-sky-50 transition-colors cursor-pointer">
                                        <FaMapMarkerAlt className="text-gray-500 hover:text-sky-500 transition-colors text-sm" />
                                      </div>
                                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                                        Downtown Medical Center
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Gradient CTA Button - Larger */}
                                <button 
                                  onClick={() => handleBookAppointment(doctor)}
                                  className="mt-auto w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn text-base"
                                >
                                  <FaCalendarCheck className="text-base" />
                                  Book Appointment
                                  <FaArrowRight className="text-base opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination Dots */}
            {totalSlides > 1 && (
              <div className="flex justify-center gap-3 mt-10">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex 
                        ? 'w-10 h-2.5 bg-gradient-to-r from-sky-500 to-indigo-500' 
                        : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Reviews Modal */}
      {showReviewsModal && selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                    Patient Reviews
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Dr. {selectedDoctor.name}</p>
                </div>
                <button 
                  onClick={() => setShowReviewsModal(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loadingReviews ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-sky-600">
                          {reviewStats.averageRating?.toFixed(1) || '0'}
                        </div>
                        <div className="flex text-yellow-400 justify-center mt-2 gap-0.5">
                          {renderStars(reviewStats.averageRating || 0)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Based on {reviewStats.totalReviews} reviews
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map(star => {
                          const count = selectedDoctor.ratingDistribution?.[star] || 0;
                          const percentage = reviewStats.totalReviews > 0 ? (count / reviewStats.totalReviews) * 100 : 0;
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-sm font-medium w-8">{star}★</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                              </div>
                              <span className="text-xs text-gray-500 w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaQuoteLeft className="text-gray-400 text-3xl" />
                      </div>
                      <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review._id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all hover:-translate-y-1">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                {review.patient?.user?.name?.charAt(0).toUpperCase() || 'P'}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{review.patient?.user?.name || 'Anonymous'}</p>
                                <div className="flex text-yellow-400 text-sm mt-1 gap-0.5">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400">
                              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}
                            </p>
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-2">{review.title || 'Patient Review'}</h4>
                          <p className="text-gray-600 text-sm mb-3">{review.comment}</p>
                          
                          <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100">
                            {review.treatmentRating && (
                              <div className="text-xs">
                                <span className="text-gray-500">Treatment:</span>
                                <div className="flex text-yellow-400 mt-1 gap-0.5">
                                  {renderStars(review.treatmentRating)}
                                </div>
                              </div>
                            )}
                            {review.waitTimeRating && (
                              <div className="text-xs">
                                <span className="text-gray-500">Wait Time:</span>
                                <div className="flex text-yellow-400 mt-1 gap-0.5">
                                  {renderStars(review.waitTimeRating)}
                                </div>
                              </div>
                            )}
                            {review.cleanlinessRating && (
                              <div className="text-xs">
                                <span className="text-gray-500">Cleanliness:</span>
                                <div className="flex text-yellow-400 mt-1 gap-0.5">
                                  {renderStars(review.cleanlinessRating)}
                                </div>
                              </div>
                            )}
                            {review.staffRating && (
                              <div className="text-xs">
                                <span className="text-gray-500">Staff:</span>
                                <div className="flex text-yellow-400 mt-1 gap-0.5">
                                  {renderStars(review.staffRating)}
                                </div>
                              </div>
                            )}
                          </div>

                          {review.reply?.text && (
                            <div className="mt-3 pl-3 border-l-2 border-sky-300 bg-sky-50 rounded-r-lg p-3">
                              <p className="text-xs font-semibold text-sky-600">Dr. Reply:</p>
                              <p className="text-xs text-gray-600 mt-1">{review.reply.text}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {review.reply.repliedAt ? new Date(review.reply.repliedAt).toLocaleDateString() : 'Recently'}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsSection;