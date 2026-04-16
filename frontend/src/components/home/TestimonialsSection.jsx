// components/home/TestimonialsSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaQuoteRight, FaUserCircle, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaHeartbeat, FaPause, FaPlay } from 'react-icons/fa';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef(null);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Lead Dentist",
      practice: "Smile Bright Dental Clinic",
      rating: 5,
      text: "DentalCare SaaS has transformed how we manage our practice. The scheduling system is intuitive, and the analytics help us make data-driven decisions.",
      date: "March 15, 2024",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      practice: "Perfect Smile Orthodontics",
      rating: 5,
      text: "The automated billing and insurance integration have saved us countless hours of administrative work. The platform is user-friendly and the support team is incredible.",
      date: "February 28, 2024",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Pediatric Dentist",
      practice: "Little Teeth Dental Care",
      rating: 5,
      text: "Our practice has seen remarkable improvements in patient engagement and retention. The patient management features are comprehensive and easy to use.",
      date: "April 5, 2024",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      role: "Cosmetic Dentist",
      practice: "Elite Dental Arts",
      rating: 4,
      text: "Excellent platform with all the features we need. The cloud-based system allows us to access patient information from anywhere at any time.",
      date: "January 20, 2024",
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      role: "Periodontist",
      practice: "Advanced Periodontal Care",
      rating: 5,
      text: "The best investment we've made for our practice. The appointment reminders have significantly reduced no-shows and improved our efficiency.",
      date: "March 10, 2024",
      image: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      id: 6,
      name: "Dr. Robert Martinez",
      role: "General Dentist",
      practice: "Family Dental Center",
      rating: 5,
      text: "From implementation to daily use, the experience has been seamless. The analytics dashboard provides real-time insights that help us grow.",
      date: "February 14, 2024",
      image: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      id: 7,
      name: "Dr. Amanda Lee",
      role: "Endodontist",
      practice: "Root Canal Specialists",
      rating: 5,
      text: "The treatment planning tools are exceptional. This platform has streamlined our entire workflow from patient intake to follow-up care.",
      date: "March 28, 2024",
      image: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    {
      id: 8,
      name: "Dr. David Kim",
      role: "Prosthodontist",
      practice: "Advanced Restorative Dentistry",
      rating: 5,
      text: "Outstanding platform with incredible support. The reporting tools give us valuable insights into our business performance and patient outcomes.",
      date: "April 12, 2024",
      image: "https://randomuser.me/api/portraits/men/8.jpg"
    }
  ];

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 768) {
        setCardsPerView(2);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else if (width < 1280) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };
    
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / cardsPerView);
  const maxIndex = Math.max(0, totalSlides - 1);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, totalSlides]);

  // Reset timer when manually changing slide
  const resetAutoPlay = () => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
    if (isAutoPlaying && totalSlides > 1) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 5000);
    }
  };

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    resetAutoPlay();
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(maxIndex);
    }
    resetAutoPlay();
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) {
      resetAutoPlay();
    } else {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`} />
    ));
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const ratingSummaryVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.3 } }
  };

  const starVariants = {
    animate: { 
      scale: [1, 1.2, 1],
      transition: { duration: 1, repeat: Infinity, delay: 0.2 }
    }
  };

  return (
    <div className="relative py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 overflow-hidden">
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
        {/* Section Header with Animation */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 rounded-full shadow-md mb-4 backdrop-blur-sm">
            <FaQuoteLeft className="text-white text-sm" />
            <span className="text-white text-sm font-medium">Testimonials</span>
            <FaQuoteRight className="text-white text-sm" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by dental professionals worldwide
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative px-12">
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-sky-50 group"
          >
            <FaChevronLeft className="text-sky-600 text-xl group-hover:-translate-x-0.5 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-sky-50 group"
          >
            <FaChevronRight className="text-sky-600 text-xl group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          {/* Auto-Play Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAutoPlay}
            className="absolute -top-12 right-0 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-sky-50 text-sky-600 text-sm flex items-center gap-1"
          >
            {isAutoPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs" />}
            <span className="text-xs">{isAutoPlaying ? 'Pause' : 'Play'}</span>
          </motion.button>

          {/* Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                  <div 
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))`
                    }}
                  >
                    {testimonials
                      .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                      .map((testimonial, idx) => (
                        <motion.div 
                          key={testimonial.id}
                          variants={cardVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -8 }}
                          className="group p-[1.5px] bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-2xl hover:shadow-2xl transition-all duration-500 h-full"
                        >
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 h-full flex flex-col relative overflow-hidden">
                            
                            {/* Quote Icon Background */}
                            <div className="absolute top-3 right-3 opacity-5">
                              <FaQuoteRight className="text-5xl text-gray-800" />
                            </div>
                            
                            {/* Rating Stars */}
                            <div className="flex items-center gap-1 mb-3">
                              {renderStars(testimonial.rating)}
                              <span className="text-gray-500 text-xs ml-2">({testimonial.rating}.0)</span>
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3 text-sm flex-1">
                              "{testimonial.text}"
                            </p>

                            {/* Doctor Info */}
                            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                              {testimonial.image ? (
                                <motion.div 
                                  whileHover={{ scale: 1.1 }}
                                  className="relative"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full p-[2px]">
                                    <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
                                      <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
                                    }}
                                  />
                                </motion.div>
                              ) : (
                                <FaUserCircle className="text-gray-400 text-3xl" />
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-xs group-hover:text-sky-600 transition-colors truncate">
                                  {testimonial.name}
                                </h4>
                                <p className="text-xs text-sky-600 truncate">{testimonial.role}</p>
                                <p className="text-xs text-gray-500 truncate">{testimonial.practice}</p>
                              </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                              <FaCalendarAlt className="text-gray-400 text-xs" />
                              <span className="text-xs text-gray-500">{testimonial.date}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex gap-1 bg-gray-200/50 rounded-full p-1">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.div
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => goToSlide(index)}
                >
                  <div className="w-16 h-1.5 bg-gray-300 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: index === currentIndex ? '100%' : 0 }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'w-8 h-2 bg-gradient-to-r from-sky-500 to-indigo-500' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Overall Rating Summary with Animation */}
        <motion.div 
          variants={ratingSummaryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-white/30">
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent"
              >
                4.9
              </motion.div>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={starVariants}
                      animate="animate"
                      transition={{ delay: i * 0.1 }}
                    >
                      <FaStar className="text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Based on 500+ reviews</span>
              </div>
            </div>
            <div className="h-10 w-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">98%</div>
              <div className="text-xs text-gray-500">Satisfaction Rate</div>
            </motion.div>
            <div className="h-10 w-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">10K+</div>
              <div className="text-xs text-gray-500">Happy Patients</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;