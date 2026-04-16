import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  FaArrowRight, FaShieldAlt, FaUsers, FaCalendarCheck, FaStar, 
  FaTooth, FaSmile, FaAward, FaClock, FaCheckCircle, FaHandHoldingHeart,
  FaStethoscope, FaMicroscope, FaSyringe, FaHeartbeat
} from 'react-icons/fa';
import { MdCloudDone } from 'react-icons/md';
import mainImage from '../../images/main.png';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/85 via-blue-900/80 to-indigo-900/85 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1616391182219-e080b4d1043a?q=80&w=783&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dental clinic background"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: 'center 30%' }}
        />
        
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 z-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
      </div>

      {/* Decorative elements - Enhanced with lighter colors for better visibility */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000 z-10"></div>
      <div className="absolute top-40 right-1/3 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-10"></div>
      <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-sky-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-10"></div>

      <div className="container-custom min-h-screen flex items-center relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            
            {/* Animated Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Your Smile,
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent block"
              >
                Our Passion
              </motion.span>
            </motion.h1>

            {/* Description - Lighter text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg text-blue-100 max-w-2xl mx-auto lg:mx-0"
            >
              Experience world-class dental care with our team of expert professionals. 
              Book appointments, manage treatments, and track your dental health journey all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 font-semibold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 group"
                  >
                    Get Started
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/register" 
                    className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 group"
                  >
                    Sign Up Free
                  </Link>
                </>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 group"
                >
                  Go to Dashboard
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </motion.div>

            {/* Features Grid - Transparent Glass Card Style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500/30 to-blue-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform border border-white/30">
                  <FaStethoscope className="text-white text-xl" />
                </div>
                <h3 className="font-semibold text-white text-sm">Experienced Dentists</h3>
                <p className="text-xs text-blue-100 mt-1">Certified professionals</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform border border-white/30">
                  <FaMicroscope className="text-white text-xl" />
                </div>
                <h3 className="font-semibold text-white text-sm">Modern Equipment</h3>
                <p className="text-xs text-blue-100 mt-1">Latest technology</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform border border-white/30">
                  <FaSyringe className="text-white text-xl" />
                </div>
                <h3 className="font-semibold text-white text-sm">Pain-Free Care</h3>
                <p className="text-xs text-blue-100 mt-1">Comfort focused</p>
              </div>
            </motion.div>

            {/* Additional Info - Pill Badges with glass effect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white shadow-sm border border-white/30">
                <FaClock className="text-sky-200 text-xs" />
                <span>Flexible Hours</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white shadow-sm border border-white/30">
                <FaShieldAlt className="text-green-300 text-xs" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white shadow-sm border border-white/30">
                <MdCloudDone className="text-sky-200 text-xs" />
                <span>Cloud Based</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white shadow-sm border border-white/30">
                <FaCalendarCheck className="text-sky-200 text-xs" />
                <span>Easy Booking</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white shadow-sm border border-white/30">
                <FaCheckCircle className="text-green-300 text-xs" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image with Enhanced Animated Border */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative lg:ml-8"
          >
            <div className="relative">
              {/* Animated Outer Glow - Pulsing + Rotating */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.9, 0.5],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute -inset-6 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl blur-2xl"
              ></motion.div>
              
              {/* Multiple Border Layers with Individual Animations */}
              <div className="relative rounded-3xl">
                {/* Animated Border Layer 1 - Rotating Gradient */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.03, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute -inset-3 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl"
                >
                  <motion.div 
                    animate={{ 
                      background: [
                        "linear-gradient(to right, #0EA5E9, #2563EB, #4F46E5)",
                        "linear-gradient(to right, #4F46E5, #0EA5E9, #2563EB)",
                        "linear-gradient(to right, #2563EB, #4F46E5, #0EA5E9)",
                        "linear-gradient(to right, #0EA5E9, #2563EB, #4F46E5)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl"
                  />
                </motion.div>
                
                {/* Border Layer 2 - Pulsing Border */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.02, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.3
                  }}
                  className="absolute -inset-2 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl"
                ></motion.div>
                
                {/* Border Layer 3 - Glowing Border */}
                <motion.div 
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    backdropFilter: ["blur(4px)", "blur(8px)", "blur(4px)"]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute -inset-1 bg-white/30 backdrop-blur-sm rounded-3xl"
                ></motion.div>
                
                {/* Main Image Container with Hover Animation */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 p-3 rounded-3xl shadow-2xl"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    {/* Main Image */}
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={mainImage}
                      alt="Professional dental care"
                      className="w-full h-auto max-h-[550px] min-h-[450px] object-cover rounded-2xl"
                      style={{ objectPosition: 'center' }}
                    />
                    
                    {/* Animated Gradient Overlay */}
                    <motion.div 
                      animate={{ 
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"
                    ></motion.div>
                    
                    {/* Animated Border Corners with Individual Animations */}
                    <motion.div 
                      animate={{ 
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 border-white/60 rounded-tl-2xl"
                    ></motion.div>
                    
                    <motion.div 
                      animate={{ 
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/60 rounded-tr-2xl"
                    ></motion.div>
                    
                    <motion.div 
                      animate={{ 
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/60 rounded-bl-2xl"
                    ></motion.div>
                    
                    <motion.div 
                      animate={{ 
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 border-white/60 rounded-br-2xl"
                    ></motion.div>
                    
                    {/* Rotating Shine Effect */}
                    <motion.div 
                      animate={{ 
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent rounded-2xl"
                      style={{ 
                        background: "linear-gradient(45deg, transparent 0%, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%, transparent 100%)"
                      }}
                    ></motion.div>
                    
                    {/* Floating Particles on Image */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -20, 0],
                          x: [0, Math.sin(i) * 10, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={{
                          top: `${20 + (i * 10)}%`,
                          left: `${30 + (i * 8)}%`
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              
              {/* Animated Floating Card */}
              <motion.div 
                animate={{ 
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/30 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <motion.div 
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                    >
                      <FaSmile className="text-white text-base" />
                    </motion.div>
                    <motion.div 
                      animate={{ rotate: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                    >
                      <FaTooth className="text-white text-base" />
                    </motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                    >
                      <FaStar className="text-white text-base" />
                    </motion.div>
                  </div>
                  
                </div>
              </motion.div>

             

              {/* Decorative Circles */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-40 h-40 bg-sky-400/30 rounded-full mix-blend-multiply filter blur-2xl -z-10"
              ></motion.div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-2xl -z-10"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      
    </div>
  );
};

export default HeroSection;