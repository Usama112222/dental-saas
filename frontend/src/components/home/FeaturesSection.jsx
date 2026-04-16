// components/home/FeaturesSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaClock, FaHeart, FaTooth, FaSmile, 
  FaStethoscope, FaSyringe, FaHandHoldingHeart, FaStar, 
  FaArrowRight, FaMicroscope, FaRegSmile, FaPhone, FaUserMd,
  FaCalendarCheck, FaChartLine, FaAward, FaCheckCircle,
  FaShieldVirus
} from 'react-icons/fa';
import BookingForm from './BookingForm';

const FeaturesSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookAppointment = () => {
    if (isAuthenticated) {
      setShowBookingForm(true);
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security & data protection",
      color: "from-sky-500 to-blue-500",
      iconColor: "text-sky-600"
    },
    {
      icon: <FaSyringe />,
      title: "Pain-Free Care",
      description: "Advanced technology for comfortable treatment",
      color: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-600"
    },
    {
      icon: <FaUserMd />,
      title: "Expert Doctors",
      description: "Certified professionals with years of experience",
      color: "from-purple-500 to-indigo-500",
      iconColor: "text-purple-600"
    },
    {
      icon: <FaMicroscope />,
      title: "Modern Equipment",
      description: "Latest dental technology for precise care",
      color: "from-amber-500 to-orange-500",
      iconColor: "text-amber-600"
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Compassionate Care",
      description: "Patient-first approach with personalized attention",
      color: "from-rose-500 to-pink-500",
      iconColor: "text-rose-600"
    }
  ];

  const patientConcerns = [
    { icon: <FaShieldAlt className="text-sky-600" />, text: "Safe & Secure" },
    { icon: <FaStar className="text-yellow-500" />, text: "5-Star Rated" },
    { icon: <FaClock className="text-emerald-600" />, text: "No Waiting" },
    { icon: <FaSyringe className="text-purple-600" />, text: "Painless" }
  ];

  // Animation variants
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

  const featureCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div className="relative section-padding">
          <div className="container-custom">
            
            {/* Centered Header */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent pb-4 mb-4">
                Your Smile, Our Priority
              </h2>
              
              {/* Patient Concerns Quick Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {patientConcerns.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Image with Hero-Style Animations */}
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
                    
                    {/* Image Frame */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 p-3 rounded-3xl shadow-2xl"
                    >
                      <div className="relative overflow-hidden rounded-2xl">
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src="https://plus.unsplash.com/premium_photo-1681483455619-60be1f1af5f5?q=80&w=600&h=800&fit=crop"
                          alt="Happy patient with beautiful smile"
                          className="w-full h-[500px] object-cover rounded-2xl"
                        />
                        
                        {/* Gradient Overlay */}
                        <motion.div 
                          animate={{ opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"
                        ></motion.div>
                        
                        {/* Animated Border Corners */}
                        <motion.div 
                          variants={cornerVariants}
                          animate="animate"
                          transition={{ delay: 0 }}
                          className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/60 rounded-tl-2xl"
                        ></motion.div>
                        <motion.div 
                          variants={cornerVariants}
                          animate="animate"
                          transition={{ delay: 0.5 }}
                          className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/60 rounded-tr-2xl"
                        ></motion.div>
                        <motion.div 
                          variants={cornerVariants}
                          animate="animate"
                          transition={{ delay: 1 }}
                          className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/60 rounded-bl-2xl"
                        ></motion.div>
                        <motion.div 
                          variants={cornerVariants}
                          animate="animate"
                          transition={{ delay: 1.5 }}
                          className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/60 rounded-br-2xl"
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

                  {/* Decorative Circles */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-8 -right-8 w-32 h-32 bg-sky-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -z-10"
                  ></motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -z-10"
                  ></motion.div>
                </div>
              </motion.div>

              {/* Right Side - Features Cards with Animations */}
              <div className="order-2 lg:order-2">
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={featureCardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                      className="group bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-sky-200"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon with Solid Background */}
                        <motion.div 
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="flex-shrink-0"
                        >
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                            <div className="text-white text-2xl">
                              {feature.icon}
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-sky-600 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                        
                        {/* Arrow Indicator */}
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="flex-shrink-0"
                        >
                          <FaArrowRight className="text-sky-500 text-sm" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section with Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-sky-800 via-blue-800 to-indigo-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready for a Perfect Smile?
                </h3>
                <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
                  Join thousands of happy patients who trusted us with their dental care
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookAppointment}
                    className="bg-white text-sky-700 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group"
                  >
                    Book Your Appointment
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="tel:+15551234567"
                    className="bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/30 transition-all duration-300 inline-flex items-center justify-center gap-2 border border-white/30"
                  >
                    <FaPhone className="text-sm" />
                    Call Now: (555) 123-4567
                  </motion.a>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-sky-100">
                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    Free Consultation
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    Insurance Accepted
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    Flexible Payment Plans
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        onSuccess={() => {
          setShowBookingForm(false);
        }}
      />
    </>
  );
};

export default FeaturesSection;