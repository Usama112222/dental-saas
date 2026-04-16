import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBell } from 'react-icons/fa';

const Header = ({ title, user }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent capitalize">
          {title}
        </h1>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-sky-600 transition p-2 hover:bg-sky-50 rounded-xl"
            title="Go to Home"
          >
            <FaHome className="text-2xl" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-600 hover:text-sky-600 transition"
            >
              <FaBell className="text-2xl" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-md">
                3
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-20">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-sky-50 transition cursor-pointer">
                    <p className="text-sm font-medium text-gray-800">New Patient Registered</p>
                    <p className="text-xs text-gray-500 mt-1">New patient just registered</p>
                    <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;