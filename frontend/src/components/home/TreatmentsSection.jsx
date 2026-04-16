// components/home/TreatmentsSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaClock, FaDollarSign, FaCalendarCheck, FaTag, FaShieldAlt, 
  FaTooth, FaHeartbeat, FaArrowRight, FaStar, FaCheckCircle,
  FaMicroscope, FaShieldVirus, FaSmile, FaAward, FaSyringe,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';

const TreatmentsSection = ({ treatments = [], onBookTreatment }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAllTreatments, setShowAllTreatments] = useState(false);

  const handleBookTreatment = (treatment) => {
    if (onBookTreatment) {
      onBookTreatment(treatment);
    } else {
      isAuthenticated ? navigate('/appointments/new') : navigate('/login');
    }
  };

  const treatmentsList = Array.isArray(treatments) ? treatments : [];
  const displayedTreatments = showAllTreatments ? treatmentsList : treatmentsList.slice(0, 4);

  // Get image URL (local or fallback)
  const getImageUrl = (treatment) => {
    if (treatment.image && treatment.image.startsWith('/uploads')) {
      return `http://localhost:5000${treatment.image}`;
    }
    if (treatment.image && treatment.image.startsWith('http')) {
      return treatment.image;
    }
    // Fallback images based on category
    const fallbackImages = {
      'Cleaning': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
      'Whitening': 'https://images.unsplash.com/photo-1629909613654-28e377c37b1a?w=400',
      'Root Canal': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
      'Crown': 'https://images.unsplash.com/photo-1629909613654-28e377c37b1a?w=400',
      'Implant': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
      'Braces': 'https://images.unsplash.com/photo-1629909613654-28e377c37b1a?w=400'
    };
    return fallbackImages[treatment.category] || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400';
  };

  return (
    <div className="relative py-10 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 rounded-full shadow-md mb-4 backdrop-blur-sm">
            <FaTooth className="text-white text-sm" />
            <span className="text-white text-sm font-medium">Our Treatments</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Our Treatments & Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive dental care services tailored to your needs with modern technology
          </p>
        </div>

        {treatmentsList.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <FaShieldAlt className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-500">No treatments added yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedTreatments.map((treatment) => (
                <div 
                  key={treatment._id} 
                  className="group p-[1.5px] bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={getImageUrl(treatment)}
                        alt={treatment.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { 
                          e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400';
                        }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                          <FaTag className="text-xs" />
                          {treatment.category || 'General'}
                        </span>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <FaClock className="text-sky-500 text-xs" />
                          {treatment.duration || 30} min
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-sky-600 transition-colors line-clamp-1">
                        {treatment.name}
                      </h3>
                      
                      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                        {treatment.description || "Professional dental treatment with advanced technology for optimal results."}
                      </p>

                      {/* Price Section */}
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-xs text-gray-500">Starting from</span>
                          <div className="flex items-baseline">
                            <FaDollarSign className="text-sky-500 text-base" />
                            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                              {treatment.price || 0}
                            </span>
                            <span className="text-gray-500 text-xs ml-1">/ session</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                          <FaSmile className="text-green-500 text-xs" />
                          <span className="text-xs font-medium text-green-600">Popular</span>
                        </div>
                      </div>

                      {/* Features Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 rounded-full text-xs text-sky-600">
                          <FaCheckCircle className="text-[8px]" />
                          Painless
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 rounded-full text-xs text-blue-600">
                          <FaCheckCircle className="text-[8px]" />
                          Expert Care
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 rounded-full text-xs text-purple-600">
                          <FaMicroscope className="text-[8px]" />
                          Modern Tech
                        </span>
                      </div>

                      {/* CTA Button */}
                      <button 
                        onClick={() => handleBookTreatment(treatment)}
                        className="mt-auto w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm"
                      >
                        <FaCalendarCheck className="text-sm" />
                        Book Now
                        <FaArrowRight className="text-sm opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See More / See Less Button */}
            {treatmentsList.length > 4 && (
              <div className="text-center mt-10">
                <button 
                  onClick={() => setShowAllTreatments(!showAllTreatments)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {showAllTreatments ? (
                    <>
                      Show Less Treatments
                      <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      See All Treatments ({treatmentsList.length})
                      <FaChevronDown className="group-hover:translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

     
    </div>
  );
};

export default TreatmentsSection;