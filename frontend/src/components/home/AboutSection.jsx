// components/home/AboutSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaTooth, FaSmile, FaShieldAlt, FaChartLine, FaClock, FaUsers, FaAward, FaHeart, FaStar, FaQuoteLeft, FaQuoteRight, FaArrowRight } from 'react-icons/fa';
import { MdAnalytics, MdCloudDone } from 'react-icons/md';

const AboutSection = () => {
  const stats = [
    { icon: FaUsers, value: "10,000+", label: "Happy Patients" },
    { icon: FaAward, value: "15+", label: "Years Experience" },
    { icon: FaTooth, value: "50+", label: "Expert Dentists" },
    { icon: FaSmile, value: "98%", label: "Satisfaction Rate" }
  ];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const imageContainerVariants = {
    initial: { opacity: 0, scale: 0.85, rotateY: 90 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: { duration: 1, type: "spring", stiffness: 100 }
    }
  };

  const glowVariants = {
    animate: { 
      scale: [1, 1.08, 1],
      opacity: [0.5, 0.9, 0.5],
      rotate: [0, 5, 0, -5, 0],
      transition: { 
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const borderLayerVariants = {
    animate: { 
      scale: [1, 1.03, 1],
      opacity: [0.8, 1, 0.8],
      transition: { duration: 2.5, repeat: Infinity, repeatType: "reverse" }
    }
  };

  const cornerVariants = {
    animate: { 
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity }
    }
  };

  const shineVariants = {
    animate: { 
      rotate: [0, 360],
      transition: { duration: 8, repeat: Infinity, ease: "linear" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
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
        {/* Section Header with Animation */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 rounded-full shadow-md mb-4 backdrop-blur-sm">
            <FaHeart className="text-white text-sm" />
            <span className="text-white text-sm font-medium">About Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Your Trusted Partner in
            <span className="block">
              Dental Healthcare
            </span>
          </h2>
        </motion.div>

        {/* Main Content - LEFT: Image, RIGHT: Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          
          {/* LEFT SIDE - Image with Hero-Style Animations */}
          <motion.div 
            variants={imageContainerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative">
              {/* Animated Outer Glow */}
              <motion.div 
                variants={glowVariants}
                animate="animate"
                className="absolute -inset-6 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl blur-2xl"
              ></motion.div>
              
              {/* Multiple Border Layers */}
              <div className="relative rounded-3xl">
                {/* Animated Border Layer 1 */}
                <motion.div 
                  variants={borderLayerVariants}
                  animate="animate"
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
                
                {/* Border Layer 2 - Medium Border */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.02, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
                  className="absolute -inset-2 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl"
                ></motion.div>
                
                {/* Border Layer 3 - Thin White Border */}
                <motion.div 
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    backdropFilter: ["blur(4px)", "blur(8px)", "blur(4px)"]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -inset-1 bg-white/30 backdrop-blur-sm rounded-3xl"
                ></motion.div>
                
                {/* Main Image Container */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 p-3 rounded-3xl shadow-2xl"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src="https://plus.unsplash.com/premium_photo-1664476419863-abc647c1d12f?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Professional woman dentist"
                      className="w-full h-auto max-h-[550px] min-h-[450px] object-cover rounded-2xl"
                      style={{ objectPosition: 'center' }}
                    />
                    
                    {/* Gradient Overlay */}
                    <motion.div 
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"
                    ></motion.div>
                    
                    {/* Animated Border Corners */}
                    <motion.div 
                      variants={cornerVariants}
                      animate="animate"
                      transition={{ delay: 0 }}
                      className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 border-white/60 rounded-tl-2xl"
                    ></motion.div>
                    <motion.div 
                      variants={cornerVariants}
                      animate="animate"
                      transition={{ delay: 0.5 }}
                      className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/60 rounded-tr-2xl"
                    ></motion.div>
                    <motion.div 
                      variants={cornerVariants}
                      animate="animate"
                      transition={{ delay: 1 }}
                      className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/60 rounded-bl-2xl"
                    ></motion.div>
                    <motion.div 
                      variants={cornerVariants}
                      animate="animate"
                      transition={{ delay: 1.5 }}
                      className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 border-white/60 rounded-br-2xl"
                    ></motion.div>
                    
                    {/* Rotating Shine Effect */}
                    <motion.div 
                      variants={shineVariants}
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent rounded-2xl"
                      style={{ 
                        background: "linear-gradient(45deg, transparent 0%, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%, transparent 100%)"
                      }}
                    ></motion.div>
                    
                    {/* Floating Particles */}
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
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/30 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <motion.div 
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                    >
                      <FaStar className="text-white text-base" />
                    </motion.div>
                    <motion.div 
                      animate={{ rotate: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                    >
                      <FaHeart className="text-white text-base" />
                    </motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                    >
                      <FaSmile className="text-white text-base" />
                    </motion.div>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-semibold text-gray-800">Trusted Since</p>
                    <p className="text-xs text-gray-500">2010</p>
                  </div>
                </div>
              </motion.div>

              {/* Animated Rating Badge */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/30 z-10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <FaStar className="text-yellow-400 text-sm" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-800">5.0</span>
                </div>
              </motion.div>

              {/* Decorative Circles */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-40 h-40 bg-sky-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -z-10"
              ></motion.div>
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -z-10"
              ></motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Content with Animations */}
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaQuoteLeft className="text-sky-500 text-sm" />
              <span className="text-gray-700 text-sm font-medium">Who We Are</span>
              <FaQuoteRight className="text-sky-500 text-sm" />
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Cutting-edge dental practice management platform streamlining operations and enhancing patient care.
            </p>
            
            {/* Highlights - Feature Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-50 to-blue-50 rounded-full shadow-sm border border-sky-100"
              >
                <MdCloudDone className="text-sky-600 text-base" />
                <span className="text-gray-700 text-sm font-medium">Cloud-Based</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full shadow-sm border border-blue-100"
              >
                <FaShieldAlt className="text-sky-600 text-base" />
                <span className="text-gray-700 text-sm font-medium">HIPAA Compliant</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full shadow-sm border border-indigo-100"
              >
                <MdAnalytics className="text-sky-600 text-base" />
                <span className="text-gray-700 text-sm font-medium">Analytics Driven</span>
              </motion.div>
            </div>
            
            {/* Mini Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 text-center border border-sky-100 hover:shadow-md transition-all"
              >
                <FaTooth className="text-sky-600 text-3xl mx-auto mb-2" />
                <div className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">50+</div>
                <div className="text-gray-600 text-xs">Expert Dentists</div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100 hover:shadow-md transition-all"
              >
                <FaSmile className="text-blue-600 text-3xl mx-auto mb-2" />
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">10K+</div>
                <div className="text-gray-600 text-xs">Happy Patients</div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <FaHeart className="text-sm" />
              Learn More About Us
              <FaArrowRight className="text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Banner with Animations */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={index} 
                    variants={statCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center group/stat"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="inline-block"
                    >
                      <Icon className="text-3xl mx-auto mb-2 text-white/80 group-hover/stat:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;