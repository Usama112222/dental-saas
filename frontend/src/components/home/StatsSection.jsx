// components/home/StatsSection.jsx
import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendarCheck, FaUserMd, FaSmile, FaTooth, FaClinicMedical, FaChartLine } from 'react-icons/fa';

const StatsSection = () => {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    doctors: 0,
    treatments: 0,
    happyPatients: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats/public');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setStats({
            patients: data.data.patients || 0,
            appointments: data.data.appointments || 0,
            doctors: data.data.doctors || 0,
            treatments: data.data.treatments || 0,
            happyPatients: data.data.patients || 0
          });
        }
      } else {
        await fetchAlternativeStats();
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        patients: 1248,
        appointments: 3420,
        doctors: 12,
        treatments: 24,
        happyPatients: 1248
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAlternativeStats = async () => {
    try {
      const [doctorsRes, treatmentsRes] = await Promise.all([
        fetch('http://localhost:5000/api/doctors'),
        fetch('http://localhost:5000/api/treatments')
      ]);
      
      let doctorsCount = 0;
      let treatmentsCount = 0;
      
      if (doctorsRes.ok) {
        const doctorsData = await doctorsRes.json();
        doctorsCount = doctorsData.data?.length || 0;
      }
      
      if (treatmentsRes.ok) {
        const treatmentsData = await treatmentsRes.json();
        treatmentsCount = treatmentsData.data?.length || 0;
      }
      
      setStats({
        patients: 1248,
        appointments: 3420,
        doctors: doctorsCount || 12,
        treatments: treatmentsCount || 24,
        happyPatients: 1248
      });
    } catch (error) {
      console.error('Error fetching alternative stats:', error);
    }
  };

  const statCards = [
    { 
      label: 'Happy Patients', 
      value: stats.happyPatients.toLocaleString(), 
      icon: FaSmile, 
      gradient: 'from-rose-400 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-200',
      trend: '+15%',
      trendColor: 'text-rose-600'
    },
    { 
      label: 'Expert Doctors', 
      value: stats.doctors, 
      icon: FaUserMd, 
      gradient: 'from-sky-400 to-blue-500',
      bgGradient: 'from-sky-50 to-blue-50',
      borderColor: 'border-sky-200',
      trend: '+8%',
      trendColor: 'text-sky-600'
    },
    { 
      label: 'Appointments', 
      value: stats.appointments.toLocaleString(), 
      icon: FaCalendarCheck, 
      gradient: 'from-emerald-400 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      trend: '+22%',
      trendColor: 'text-emerald-600'
    },
    { 
      label: 'Treatments', 
      value: stats.treatments, 
      icon: FaTooth, 
      gradient: 'from-purple-400 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-200',
      trend: '+12%',
      trendColor: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="py-12 bg-white">
        <div className="container-custom text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          <p className="mt-3 text-gray-500 text-sm">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-sky-50 via-blue-50 py-12 bg-white relative">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full blur-2xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-2xl opacity-30"></div>
      
      <div className="container-custom">
        
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${card.bgGradient} rounded-xl p-4 border ${card.borderColor} shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${card.gradient} shadow-sm transform group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold text-gray-800`}>
                    {card.value}
                  </span>
                  <span className="text-gray-400 text-xs ml-0.5">+</span>
                </div>
              </div>
              <h3 className="text-gray-700 font-semibold text-sm mb-1">{card.label}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs font-medium ${card.trendColor}`}>
                  ↑ {card.trend}
                </span>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;