// StaffDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { 
//   FaHome, 
//   FaCalendarAlt, 
//   FaTooth, 
//   FaBell,
//   FaSignOutAlt,
//   FaChevronRight,
//   FaClock,
//   FaCheckCircle,
//   FaUsers,
//   FaSpinner,
//   FaTimesCircle,
//   FaArrowRight,
//   FaUserMd,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaHistory,
//   FaStar,
//   FaRegClock,
//   FaPlus,
//   FaUserPlus,
//   FaRefresh,
//   FaCheck,
//   FaPlay,
//   FaUserCheck
// } from 'react-icons/fa';

const StaffDashboard = () => {
  // const { user, logout } = useAuth();
  // const [todayAppointments, setTodayAppointments] = useState([]);
  // const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  // const [stats, setStats] = useState({ today: 0, upcoming: 0, completed: 0 });
  // const [loading, setLoading] = useState(true);
  // const [patients, setPatients] = useState([]);
  // const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const [activeTab, setActiveTab] = useState('dashboard');
  // const [showNotifications, setShowNotifications] = useState(false);

  // useEffect(() => {
  //   fetchDashboardData();
  // }, []);

  // const fetchDashboardData = async () => {
  //   try {
  //     setLoading(true);
  //     const today = new Date().toISOString().split('T')[0];
      
  //     // Get today's appointments
  //     const todayRes = await axios.get(`/appointments?date=${today}`);
  //     setTodayAppointments(todayRes.data.data || []);
      
  //     // Get upcoming appointments
  //     const upcomingRes = await axios.get('/appointments');
  //     const upcoming = (upcomingRes.data.data || []).filter(
  //       apt => new Date(apt.date) > new Date() && apt.status !== 'Cancelled' && apt.status !== 'Completed'
  //     );
  //     setUpcomingAppointments(upcoming);
      
  //     // Get stats
  //     const statsRes = await axios.get('/appointments/stats');
  //     setStats(statsRes.data.data);
      
  //     // Get patients
  //     const patientsRes = await axios.get('/patients');
  //     setPatients(patientsRes.data.data || []);
      
  //   } catch (error) {
  //     console.error('Error fetching dashboard data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateAppointmentStatus = async (id, status) => {
  //   try {
  //     await axios.put(`/appointments/${id}`, { status });
  //     fetchDashboardData();
  //     alert(`Appointment status updated to ${status}`);
  //   } catch (error) {
  //     console.error('Error updating appointment:', error);
  //     alert(error.response?.data?.message || 'Failed to update appointment');
  //   }
  // };

  // const getStatusBadgeClass = (status) => {
  //   const classes = {
  //     'Scheduled': 'bg-amber-100 text-amber-800',
  //     'Confirmed': 'bg-emerald-100 text-emerald-800',
  //     'In Progress': 'bg-sky-100 text-sky-800',
  //     'Completed': 'bg-gray-100 text-gray-800',
  //     'Cancelled': 'bg-rose-100 text-rose-800'
  //   };
  //   return classes[status] || 'bg-gray-100 text-gray-800';
  // };

  // const getStatusButton = (status, id) => {
  //   switch(status) {
  //     case 'Scheduled':
  //       return (
  //         <button
  //           onClick={() => updateAppointmentStatus(id, 'Confirmed')}
  //           className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition shadow-md flex items-center space-x-2"
  //         >
  //           <FaCheck className="text-xs" />
  //           <span>Confirm</span>
  //         </button>
  //       );
  //     case 'Confirmed':
  //       return (
  //         <button
  //           onClick={() => updateAppointmentStatus(id, 'In Progress')}
  //           className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-sky-600 hover:to-blue-700 transition shadow-md flex items-center space-x-2"
  //         >
  //           <FaPlay className="text-xs" />
  //           <span>Start</span>
  //         </button>
  //       );
  //     case 'In Progress':
  //       return (
  //         <button
  //           onClick={() => updateAppointmentStatus(id, 'Completed')}
  //           className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition shadow-md flex items-center space-x-2"
  //         >
  //           <FaUserCheck className="text-xs" />
  //           <span>Complete</span>
  //         </button>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  // const navItems = [
  //   { id: 'dashboard', label: 'Dashboard', icon: FaHome },
  //   { id: 'appointments', label: 'Appointments', icon: FaCalendarAlt },
  //   { id: 'patients', label: 'Patients', icon: FaUsers },
  //   { id: 'treatments', label: 'Treatments', icon: FaTooth },
  // ];

  // const completedCount = todayAppointments.filter(apt => apt.status === 'Completed').length;
  // const inProgressCount = todayAppointments.filter(apt => apt.status === 'In Progress').length;

  // if (loading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
  //       <div className="text-center">
  //         <FaSpinner className="animate-spin h-16 w-16 text-sky-600 mx-auto mb-4" />
  //         <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="flex h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 overflow-hidden">
  //     {/* Sidebar */}
  //     <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 flex flex-col relative z-20`}>
  //       {/* Logo Area */}
  //       <div className="p-6 border-b border-gray-200 flex items-center justify-between">
  //         {!sidebarCollapsed && (
  //           <div className="flex items-center space-x-3">
  //             <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-xl shadow-md">
  //               <FaUserMd className="text-white text-2xl" />
  //             </div>
  //             <span className="font-bold text-xl bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
  //               Staff Panel
  //             </span>
  //           </div>
  //         )}
  //         {sidebarCollapsed && (
  //           <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-xl mx-auto shadow-md">
  //             <FaUserMd className="text-white text-2xl" />
  //           </div>
  //         )}
  //         <button
  //           onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
  //           className="text-gray-400 hover:text-gray-600 transition-transform"
  //         >
  //           <FaChevronRight className={`transform transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
  //         </button>
  //       </div>

  //       {/* Navigation */}
  //       <nav className="flex-1 p-4 space-y-2">
  //         {navItems.map((item) => (
  //           <button
  //             key={item.id}
  //             onClick={() => setActiveTab(item.id)}
  //             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
  //               activeTab === item.id
  //                 ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
  //                 : 'text-gray-600 hover:bg-sky-50'
  //             }`}
  //           >
  //             <item.icon className={`text-xl ${activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-sky-600'}`} />
  //             {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
  //           </button>
  //         ))}
  //       </nav>

  //       {/* User Section */}
  //       <div className="p-4 border-t border-gray-200">
  //         <div className="flex items-center space-x-3 mb-4">
  //           <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
  //             {user?.name?.charAt(0).toUpperCase()}
  //           </div>
  //           {!sidebarCollapsed && (
  //             <div className="flex-1">
  //               <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
  //               <p className="text-xs text-gray-500">Staff Member</p>
  //             </div>
  //           )}
  //         </div>
          
  //         <button
  //           onClick={logout}
  //           className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium hover:from-rose-600 hover:to-rose-700 transition shadow-md"
  //         >
  //           <FaSignOutAlt className="text-lg" />
  //           {!sidebarCollapsed && <span>Logout</span>}
  //         </button>
  //       </div>
  //     </aside>

  //     {/* Main Content */}
  //     <main className="flex-1 overflow-y-auto relative">
  //       {/* Header */}
  //       <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
  //         <div className="px-8 py-4 flex justify-between items-center">
  //           <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent capitalize">
  //             Staff Dashboard
  //           </h1>
            
  //           <div className="flex items-center space-x-4">
  //             <div className="relative">
  //               <button 
  //                 onClick={() => setShowNotifications(!showNotifications)}
  //                 className="relative text-gray-600 hover:text-sky-600 transition"
  //               >
  //                 <FaBell className="text-2xl" />
  //                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-md">
  //                   3
  //                 </span>
  //               </button>
                
  //               {showNotifications && (
  //                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-20">
  //                   <div className="p-4 border-b border-gray-100">
  //                     <h3 className="font-semibold text-gray-800">Notifications</h3>
  //                   </div>
  //                   <div className="max-h-96 overflow-y-auto">
  //                     <div className="p-4 hover:bg-sky-50 transition cursor-pointer">
  //                       <p className="text-sm font-medium text-gray-800">New Appointment</p>
  //                       <p className="text-xs text-gray-500 mt-1">John Doe booked an appointment at 2:00 PM</p>
  //                       <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
  //                     </div>
  //                     <div className="p-4 hover:bg-sky-50 transition cursor-pointer">
  //                       <p className="text-sm font-medium text-gray-800">Patient Waiting</p>
  //                       <p className="text-xs text-gray-500 mt-1">Jane Smith is waiting for checkup</p>
  //                       <p className="text-xs text-gray-400 mt-1">25 minutes ago</p>
  //                     </div>
  //                     <div className="p-4 hover:bg-sky-50 transition cursor-pointer">
  //                       <p className="text-sm font-medium text-gray-800">Supply Alert</p>
  //                       <p className="text-xs text-gray-500 mt-1">Dental supplies need reordering</p>
  //                       <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
  //                     </div>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
              
  //             <div className="flex items-center space-x-3">
  //               <div className="text-right hidden sm:block">
  //                 <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
  //                 <p className="text-xs text-gray-500">Staff</p>
  //               </div>
  //               <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
  //                 {user?.name?.charAt(0).toUpperCase()}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </header>

  //       {/* Dashboard Content */}
  //       <div className="p-8">
  //         {/* Welcome Card */}
  //         <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-8">
  //           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
  //           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
  //           <div className="relative z-10">
  //             <div className="flex items-center space-x-3 mb-3">
  //               <FaUserMd className="text-4xl" />
  //               <h2 className="text-3xl font-bold">Staff Dashboard</h2>
  //             </div>
  //             <p className="text-sky-100 text-lg">Welcome back, {user?.name}! Manage today's appointments efficiently</p>
  //           </div>
  //         </div>

  //         {/* Stats Cards */}
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  //           <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
  //             <div className="flex items-center justify-between mb-4">
  //               <div className="p-3 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl">
  //                 <FaCalendarAlt className="text-sky-600 text-2xl" />
  //               </div>
  //               <span className="text-3xl font-bold text-gray-800">{stats.today}</span>
  //             </div>
  //             <h3 className="text-gray-600 font-semibold">Today's Appointments</h3>
  //             <p className="text-sm text-emerald-600 mt-1">{completedCount} completed</p>
  //           </div>

  //           <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
  //             <div className="flex items-center justify-between mb-4">
  //               <div className="p-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
  //                 <FaClock className="text-emerald-600 text-2xl" />
  //               </div>
  //               <span className="text-3xl font-bold text-gray-800">{stats.upcoming}</span>
  //             </div>
  //             <h3 className="text-gray-600 font-semibold">Upcoming</h3>
  //             <p className="text-sm text-amber-600 mt-1">Next 7 days</p>
  //           </div>

  //           <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
  //             <div className="flex items-center justify-between mb-4">
  //               <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
  //                 <FaUsers className="text-purple-600 text-2xl" />
  //               </div>
  //               <span className="text-3xl font-bold text-gray-800">{patients.length}</span>
  //             </div>
  //             <h3 className="text-gray-600 font-semibold">Total Patients</h3>
  //             <Link to="/patients" className="text-sm text-sky-600 hover:text-sky-700 font-medium inline-flex items-center mt-2 group">
  //               View all <FaArrowRight className="ml-1 text-xs group-hover:translate-x-1 transition" />
  //             </Link>
  //           </div>

  //           <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
  //             <div className="flex items-center justify-between mb-4">
  //               <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
  //                 <FaCheckCircle className="text-amber-600 text-2xl" />
  //               </div>
  //               <span className="text-3xl font-bold text-gray-800">{stats.completed}</span>
  //             </div>
  //             <h3 className="text-gray-600 font-semibold">Completed</h3>
  //             <p className="text-sm text-emerald-600 mt-1">This month</p>
  //           </div>
  //         </div>

  //         {/* Today's Progress Bar */}
  //         {todayAppointments.length > 0 && (
  //           <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
  //             <div className="flex justify-between items-center mb-4">
  //               <div className="flex items-center space-x-3">
  //                 <div className="p-2 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl">
  //                   <FaRegClock className="text-sky-600 text-xl" />
  //                 </div>
  //                 <h3 className="text-xl font-bold text-gray-800">Today's Progress</h3>
  //               </div>
  //               <span className="text-sm text-gray-600">{completedCount}/{todayAppointments.length} completed</span>
  //             </div>
  //             <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
  //               <div 
  //                 className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500"
  //                 style={{ width: `${(completedCount / todayAppointments.length) * 100}%` }}
  //               ></div>
  //             </div>
  //           </div>
  //         )}

  //         {/* Today's Schedule */}
  //         <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
  //           <div className="flex justify-between items-center mb-6">
  //             <div className="flex items-center space-x-3">
  //               <div className="p-2 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl">
  //                 <FaCalendarAlt className="text-sky-600 text-xl" />
  //               </div>
  //               <h3 className="text-xl font-bold text-gray-800">Today's Schedule</h3>
  //             </div>
  //             <button 
  //               onClick={fetchDashboardData}
  //               className="text-gray-500 hover:text-sky-600 transition"
  //             >
  //               <FaRefresh />
  //             </button>
  //           </div>
            
  //           {todayAppointments.length === 0 ? (
  //             <div className="text-center py-12">
  //               <div className="bg-gradient-to-r from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
  //                 <FaCalendarAlt className="text-gray-400 text-4xl" />
  //               </div>
  //               <p className="text-gray-500">No appointments scheduled for today</p>
  //               <Link to="/appointments/new" className="inline-block mt-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-sky-600 hover:to-blue-700 transition shadow-md">
  //                 Book New Appointment
  //               </Link>
  //             </div>
  //           ) : (
  //             <div className="space-y-4">
  //               {todayAppointments.map((apt) => (
  //                 <div key={apt._id} className="border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-sky-200">
  //                   <div className="flex flex-wrap justify-between items-start gap-4">
  //                     <div className="flex-1">
  //                       <div className="flex items-center space-x-3 mb-3">
  //                         <div className={`w-2 h-2 rounded-full ${
  //                           apt.status === 'Completed' ? 'bg-emerald-500' : 
  //                           apt.status === 'In Progress' ? 'bg-sky-500 animate-pulse' : 'bg-amber-500'
  //                         }`}></div>
  //                         <p className="font-bold text-lg text-gray-800">
  //                           {apt.time} - {apt.type}
  //                         </p>
  //                         <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadgeClass(apt.status)}`}>
  //                           {apt.status}
  //                         </span>
  //                       </div>
  //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
  //                         <p className="text-gray-600">
  //                           <span className="font-medium">Patient:</span> {apt.patient?.user?.name || apt.patient}
  //                         </p>
  //                         {apt.symptoms && (
  //                           <p className="text-gray-600">
  //                             <span className="font-medium">Symptoms:</span> {apt.symptoms}
  //                           </p>
  //                         )}
  //                         {apt.notes && (
  //                           <p className="text-gray-600 col-span-2">
  //                             <span className="font-medium">Notes:</span> {apt.notes}
  //                           </p>
  //                         )}
  //                       </div>
  //                     </div>
                      
  //                     {getStatusButton(apt.status, apt._id)}
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //         </div>

  //         {/* Two Column Layout */}
  //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //           {/* Upcoming Appointments */}
  //           {upcomingAppointments.length > 0 && (
  //             <div className="bg-white rounded-2xl shadow-md p-6">
  //               <div className="flex items-center space-x-3 mb-6">
  //                 <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
  //                   <FaHistory className="text-emerald-600 text-xl" />
  //                 </div>
  //                 <h3 className="text-xl font-bold text-gray-800">Upcoming Appointments</h3>
  //               </div>
  //               <div className="space-y-3">
  //                 {upcomingAppointments.slice(0, 5).map((apt) => (
  //                   <div key={apt._id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-sky-50 hover:to-blue-50 transition">
  //                     <div>
  //                       <p className="font-semibold text-gray-800">
  //                         {new Date(apt.date).toLocaleDateString()} at {apt.time}
  //                       </p>
  //                       <p className="text-sm text-gray-600 mt-1">{apt.type}</p>
  //                     </div>
  //                     <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusBadgeClass(apt.status)}`}>
  //                       {apt.status}
  //                     </span>
  //                   </div>
  //                 ))}
  //               </div>
  //               {upcomingAppointments.length > 5 && (
  //                 <Link to="/appointments" className="text-sm text-sky-600 hover:text-sky-700 font-medium inline-flex items-center mt-4 group">
  //                   View all {upcomingAppointments.length} appointments
  //                   <FaArrowRight className="ml-1 text-xs group-hover:translate-x-1 transition" />
  //                 </Link>
  //               )}
  //             </div>
  //           )}

  //           {/* Quick Actions */}
  //           <div className="bg-white rounded-2xl shadow-md p-6">
  //             <div className="flex items-center space-x-3 mb-6">
  //               <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
  //                 <FaStar className="text-purple-600 text-xl" />
  //               </div>
  //               <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
  //             </div>
              
  //             <div className="grid grid-cols-1 gap-4">
  //               <Link 
  //                 to="/appointments/new" 
  //                 className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl hover:from-sky-100 hover:to-blue-100 transition group"
  //               >
  //                 <div className="flex items-center space-x-3">
  //                   <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
  //                     <FaPlus className="text-white" />
  //                   </div>
  //                   <div>
  //                     <p className="font-semibold text-gray-800">Book New Appointment</p>
  //                     <p className="text-xs text-gray-500">Schedule appointment for patient</p>
  //                   </div>
  //                 </div>
  //                 <FaArrowRight className="text-gray-400 group-hover:text-sky-600 transition" />
  //               </Link>
                
  //               <Link 
  //                 to="/patients" 
  //                 className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition group"
  //               >
  //                 <div className="flex items-center space-x-3">
  //                   <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
  //                     <FaUserPlus className="text-white" />
  //                   </div>
  //                   <div>
  //                     <p className="font-semibold text-gray-800">View All Patients</p>
  //                     <p className="text-xs text-gray-500">Manage patient records</p>
  //                   </div>
  //                 </div>
  //                 <FaArrowRight className="text-gray-400 group-hover:text-emerald-600 transition" />
  //               </Link>
                
  //               <button 
  //                 onClick={fetchDashboardData}
  //                 className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition group"
  //               >
  //                 <div className="flex items-center space-x-3">
  //                   <div className="p-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg">
  //                     <FaRefresh className="text-white" />
  //                   </div>
  //                   <div>
  //                     <p className="font-semibold text-gray-800">Refresh Data</p>
  //                     <p className="text-xs text-gray-500">Update dashboard information</p>
  //                   </div>
  //                 </div>
  //                 <FaArrowRight className="text-gray-400 group-hover:text-gray-600 transition" />
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   </div>
  // );
};

export default StaffDashboard;