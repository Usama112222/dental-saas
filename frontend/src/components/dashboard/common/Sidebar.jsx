import React from 'react';
import { FaSignOutAlt, FaChevronRight } from 'react-icons/fa';

const Sidebar = ({ 
  user, 
  logout, 
  navItems, 
  activeTab, 
  setActiveTab, 
  sidebarCollapsed, 
  setSidebarCollapsed,
  logoIcon: LogoIcon,
  title
}) => {
  return (
    <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 flex flex-col relative z-20`}>
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-xl shadow-md">
              <LogoIcon className="text-white text-2xl" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              {title}
            </span>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-xl mx-auto shadow-md">
            <LogoIcon className="text-white text-2xl" />
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="text-gray-400 hover:text-gray-600 transition-transform"
        >
          <FaChevronRight className={`transform transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-sky-50'
            }`}
          >
            <item.icon className={`text-xl ${activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-sky-600'}`} />
            {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            {!sidebarCollapsed && item.count !== undefined && (
              <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full ${
                activeTab === item.id ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-600'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium hover:from-rose-600 hover:to-rose-700 transition shadow-md"
        >
          <FaSignOutAlt className="text-lg" />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;