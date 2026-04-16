import React from 'react';
import { FaShieldAlt, FaUsers, FaCalendarAlt, FaDollarSign, FaUserMd } from 'react-icons/fa';
import StatsCard from '../common/StatsCard';

const AdminOverview = ({ stats, doctors, allAppointments, setActiveTab }) => {
  const completedCount = allAppointments.filter(a => a.status === 'Completed').length;
  const pendingCount = allAppointments.filter(a => a.status === 'Scheduled' || a.status === 'Confirmed').length;
  const completionRate = stats.totalAppointments > 0 ? Math.round((completedCount / stats.totalAppointments) * 100) : 0;

  return (
    <>
      {/* Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <FaShieldAlt className="text-4xl" />
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          </div>
          <p className="text-sky-100 text-lg">Welcome back! Manage your clinic efficiently</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Patients" 
          value={stats.totalPatients} 
          icon={FaUsers} 
          color="from-sky-500 to-blue-600"
          onClick={() => setActiveTab('all-patients')}
          buttonText="View all patients"
        />
        <StatsCard 
          title="Total Appointments" 
          value={stats.totalAppointments} 
          icon={FaCalendarAlt} 
          color="from-emerald-500 to-teal-600"
          onClick={() => setActiveTab('all-appointments')}
          buttonText="View all appointments"
        />
        <StatsCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue.toLocaleString()}`} 
          icon={FaDollarSign} 
          color="from-amber-500 to-orange-600"
        />
        <StatsCard 
          title="Active Doctors" 
          value={doctors.length} 
          icon={FaUserMd} 
          color="from-purple-500 to-pink-600"
          onClick={() => setActiveTab('doctors')}
          buttonText="Manage doctors"
        />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-sky-600">{stats.totalAppointments}</p>
          <p className="text-xs text-gray-600">Total Appointments</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
          <p className="text-xs text-gray-600">Completed</p>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          <p className="text-xs text-gray-600">Pending</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{completionRate}%</p>
          <p className="text-xs text-gray-600">Completion Rate</p>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;