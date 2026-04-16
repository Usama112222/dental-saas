import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaTooth, FaUserMd, FaSignInAlt, FaUserPlus, FaChartLine,
  FaChevronDown, FaSignOutAlt, FaCog, FaHome, FaTooth as FaToothIcon,
  FaBars, FaTimes, FaComments, FaInfoCircle, FaCalendarAlt, FaEnvelope,
  FaHeartbeat
} from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserDropdownOpen(false);
  };

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', icon: FaHome, action: 'home' },
    { label: 'About', icon: FaInfoCircle, action: 'scroll', section: 'about' },
    { label: 'Doctors', icon: FaUserMd, action: 'scroll', section: 'doctors' },
    { label: 'Treatments', icon: FaToothIcon, action: 'scroll', section: 'treatments' },
    { label: 'Appointments', icon: FaCalendarAlt, action: 'scroll', section: 'booking' },
    { label: 'Contact', icon: FaEnvelope, action: 'scroll', section: 'contact' },
    { label: 'Dashboard', icon: FaChartLine, action: 'dashboard', auth: true },
  ];

  const handleNavClick = (link) => {
    if (link.action === 'home') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (link.action === 'scroll') {
      handleScrollToSection(link.section);
    } else if (link.action === 'dashboard') {
      navigate('/dashboard');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-sky-600 to-blue-700 shadow-lg py-3' 
          : 'bg-gradient-to-r from-sky-500/90 to-blue-600/90 backdrop-blur-md py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button onClick={() => {
              if (location.pathname !== '/') navigate('/');
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }} className="group flex items-center space-x-2">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <FaTooth className="text-2xl text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">DentalCare</span>
                <span className="text-xs text-white/80">Dental Clinic</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                if (link.auth && !isAuthenticated) return null;
                if (!link.auth && link.label === 'Dashboard') return null;
                const Icon = link.icon;
                return (
                  <button 
                    key={link.label} 
                    onClick={() => handleNavClick(link)}
                    className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-white hover:text-white hover:bg-white/20"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="text-lg" />
                      <span>{link.label}</span>
                    </div>
                  </button>
                );
              })}

              {isAuthenticated ? (
                <div className="relative ml-4">
                  <button 
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-3 rounded-full pl-2 pr-3 py-1.5 transition-colors duration-200 bg-white/20 hover:bg-white/30 text-white"
                  >
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold">{user?.name?.split(' ')[0]}</span>
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)}></div>
                      <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                        <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-4 text-white">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                              {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold">{user?.name}</p>
                              <p className="text-xs text-sky-100">{user?.email}</p>
                              <span className="inline-block mt-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">Member</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <button onClick={() => { navigate('/dashboard'); setUserDropdownOpen(false); }}
                            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                            <FaChartLine className="text-sky-600" />
                            <span className="text-gray-700">Dashboard</span>
                          </button>
                          <button onClick={() => { navigate('/profile'); setUserDropdownOpen(false); }}
                            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                            <FaCog className="text-gray-600" />
                            <span className="text-gray-700">Settings</span>
                          </button>
                          <div className="border-t border-gray-100 my-2"></div>
                          <button onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Link to="/login" className="px-5 py-2 rounded-lg font-semibold transition-colors duration-200 border-2 border-white text-white hover:bg-white/20">
                    Login
                  </Link>
                  <Link to="/register" className="px-5 py-2 rounded-lg font-semibold transition-colors duration-200 bg-white text-sky-600 hover:bg-gray-100">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200 bg-white/20 text-white hover:bg-white/30">
              {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-x-0 top-[72px] transition-transform duration-300 transform z-40 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 shadow-xl max-h-[calc(100vh-72px)] overflow-y-auto p-4 space-y-2">
            {navLinks.map((link) => {
              if (link.auth && !isAuthenticated) return null;
              if (!link.auth && link.label === 'Dashboard') return null;
              const Icon = link.icon;
              return (
                <button key={link.label} onClick={() => handleNavClick(link)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 text-left text-white">
                  <Icon className="text-white text-lg" />
                  <span className="font-medium">{link.label}</span>
                </button>
              );
            })}
            {isAuthenticated ? (
              <>
                <div className="border-t border-white/20 my-3"></div>
                <div className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-lg">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user?.name}</p>
                    <p className="text-xs text-white/70">{user?.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition-colors duration-200 text-white">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="pt-4 space-y-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors duration-200">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-white text-sky-600 font-semibold hover:bg-gray-100 transition-colors duration-200">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;