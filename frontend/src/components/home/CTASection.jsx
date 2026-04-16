// components/home/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaArrowRight, FaCalendarCheck, FaStar, FaShieldAlt, FaHeartbeat, FaCheckCircle, FaPhone, FaEnvelope } from 'react-icons/fa';

const CTASection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative py-24 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 overflow-hidden">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white/30 rounded-full animate-ping delay-700"></div>
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ready to Transform Your
          <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
            Dental Practice?
          </span>
        </h2>

        {/* Description */}
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join hundreds of dental clinics already using DentalCare SaaS to streamline their operations and provide better patient care
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                J
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                O
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                I
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                N
              </div>
            </div>
            <span className="text-sm font-medium">Trusted by 1000+ clinics</span>
          </div>
          
          <div className="flex items-center gap-1 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <span className="text-sm ml-2 font-medium">4.9/5 from 500+ reviews</span>
          </div>

          <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <FaShieldAlt className="text-green-400 text-sm" />
            <span className="text-sm font-medium">HIPAA Compliant</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            to={isAuthenticated ? "/appointments/new" : "/register"} 
            className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            Get Started Today
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <a 
            href="tel:+15551234567"
            className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 border border-white/30 group"
          >
            <FaPhone className="text-sm" />
            Call Now: (555) 123-4567
            <FaArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </a>
        </div>

        {/* Additional Info */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-400 text-xs" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-400 text-xs" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-400 text-xs" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-400 text-xs" />
            <span>24/7 customer support</span>
          </div>
        </div>

        {/* Email Contact */}
        <div className="mt-8">
          <a 
            href="mailto:sales@dentalcaresaas.com"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <FaEnvelope className="text-xs" />
            sales@dentalcaresaas.com
          </a>
        </div>
      </div>

      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="0.1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="0.1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default CTASection;