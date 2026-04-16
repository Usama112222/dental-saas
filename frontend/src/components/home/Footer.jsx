// components/home/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTooth, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeartbeat, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-sky-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>

      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="0.1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                <FaTooth className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  DentalCare
                </h3>
                <p className="text-xs text-gray-400">SaaS Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Modern dental practice management platform for clinics of all sizes. Streamline operations and enhance patient care.
            </p>
            
            {/* Trust Badge */}
            <div className="flex items-center gap-2 mb-4 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
              <FaShieldAlt className="text-green-400 text-xs" />
              <span className="text-xs text-gray-300">HIPAA Compliant</span>
            </div>
            
            <div className="flex space-x-3">
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full p-2 transition-all duration-300 hover:scale-110">
                <FaFacebook className="text-gray-300 text-lg" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full p-2 transition-all duration-300 hover:scale-110">
                <FaTwitter className="text-gray-300 text-lg" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full p-2 transition-all duration-300 hover:scale-110">
                <FaInstagram className="text-gray-300 text-lg" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full p-2 transition-all duration-300 hover:scale-110">
                <FaLinkedin className="text-gray-300 text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Home
                </Link>
              </li>
              <li>
                <a href="#doctors" className="text-gray-400 hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Doctors
                </a>
              </li>
              <li>
                <a href="#treatments" className="text-gray-400 hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Treatments
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full"></span>
              Working Hours
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 group">
                <div className="bg-white/10 rounded-full p-2 group-hover:bg-sky-500/20 transition-all">
                  <FaClock className="text-sky-400 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Monday - Friday</p>
                  <p className="text-xs text-gray-400">9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <div className="bg-white/10 rounded-full p-2 group-hover:bg-sky-500/20 transition-all">
                  <FaClock className="text-sky-400 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Saturday</p>
                  <p className="text-xs text-gray-400">10:00 AM - 4:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <div className="bg-white/10 rounded-full p-2 group-hover:bg-red-500/20 transition-all">
                  <FaClock className="text-red-400 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Sunday</p>
                  <p className="text-xs text-gray-400">Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full"></span>
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 group">
                <div className="bg-white/10 rounded-full p-2 group-hover:bg-sky-500/20 transition-all">
                  <FaPhone className="text-sky-400 text-sm" />
                </div>
                <span className="text-sm group-hover:text-sky-400 transition-colors">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <div className="bg-white/10 rounded-full p-2 group-hover:bg-sky-500/20 transition-all">
                  <FaEnvelope className="text-sky-400 text-sm" />
                </div>
                <span className="text-sm group-hover:text-sky-400 transition-colors">info@dentalcare.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="bg-white/10 rounded-full p-2 group-hover:bg-sky-500/20 transition-all mt-0.5">
                  <FaMapMarkerAlt className="text-sky-400 text-sm" />
                </div>
                <span className="text-sm group-hover:text-sky-400 transition-colors leading-relaxed">
                  123 Dental Street, New York, NY 10001
                </span>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 border border-white/20 focus:outline-none focus:border-sky-400 transition-colors"
                />
                <button className="bg-gradient-to-r from-sky-500 to-indigo-600 px-3 py-2 rounded-lg hover:shadow-lg transition-all hover:scale-105">
                  <FaArrowRight className="text-white text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2024 DentalCare SaaS. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-sky-400 text-sm transition-all duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-sky-400 text-sm transition-all duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-sky-400 text-sm transition-all duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;