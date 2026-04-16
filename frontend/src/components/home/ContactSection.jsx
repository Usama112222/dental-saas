// components/home/ContactSection.jsx
import React, { useState } from 'react';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, 
  FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane, FaCheckCircle,
  FaUser, FaComment, FaRegEnvelope, FaRegClock, FaArrowRight,
  FaStar, FaHeartbeat, FaShieldAlt
} from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone Number",
      details: ["(555) 123-4567", "+1 (800) 555-0123"],
      color: "from-sky-500 to-blue-500",
      action: "tel:+15551234567"
    },
    {
      icon: FaEnvelope,
      title: "Email Address",
      details: ["info@dentalcare.com", "support@dentalcare.com"],
      color: "from-blue-500 to-indigo-500",
      action: "mailto:info@dentalcare.com"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: ["123 Dental Street", "New York, NY 10001"],
      color: "from-indigo-500 to-purple-500",
      action: "https://maps.google.com"
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: ["Mon-Fri: 9AM - 6PM", "Sat: 10AM - 4PM"],
      color: "from-purple-500 to-pink-500",
      action: null
    }
  ];

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 via-blue-900/85 to-indigo-900/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1522336572468-97b06e8ef143?q=80&w=1000&auto=format&fit=crop"
          alt="Dental care professional"
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

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000 z-10"></div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-4 border border-white/30">
            <FaHeartbeat className="text-white text-sm" />
            <span className="text-white text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 border border-white/20"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white text-xl" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-blue-100 text-sm">
                        {detail}
                      </p>
                    ))}
                    {info.action && (
                      <a 
                        href={info.action}
                        className="inline-flex items-center gap-1 text-white/70 hover:text-white text-xs mt-2 transition-colors"
                      >
                        Contact now
                        <FaArrowRight className="text-xs" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="bg-white/20 hover:bg-gradient-to-r from-sky-500 to-blue-500 rounded-full p-3 transition-all duration-300 hover:scale-110">
                  <FaFacebook className="text-white text-xl" />
                </a>
                <a href="#" className="bg-white/20 hover:bg-gradient-to-r from-sky-500 to-blue-500 rounded-full p-3 transition-all duration-300 hover:scale-110">
                  <FaTwitter className="text-white text-xl" />
                </a>
                <a href="#" className="bg-white/20 hover:bg-gradient-to-r from-sky-500 to-blue-500 rounded-full p-3 transition-all duration-300 hover:scale-110">
                  <FaInstagram className="text-white text-xl" />
                </a>
                <a href="#" className="bg-white/20 hover:bg-gradient-to-r from-sky-500 to-blue-500 rounded-full p-3 transition-all duration-300 hover:scale-110">
                  <FaLinkedin className="text-white text-xl" />
                </a>
              </div>
            </div>
            
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-white text-3xl" />
                </div>
                <h4 className="text-white text-xl font-semibold mb-2">Message Sent!</h4>
                <p className="text-blue-100">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <FaRegEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <FaRegClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FaComment className="absolute left-3 top-4 text-gray-400 text-sm" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="5"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Response Time Note */}
            <p className="text-center text-blue-100 text-xs mt-4 flex items-center justify-center gap-1">
              <FaCheckCircle className="text-green-400 text-xs" />
              Average response time: 2-4 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;