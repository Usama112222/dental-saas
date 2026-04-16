import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, FaUsers, FaStar, FaCalendarAlt, FaTooth, FaFileInvoiceDollar,
  FaUserMd, FaCalendarWeek, FaHospitalUser
} from 'react-icons/fa';
import Sidebar from '../components/dashboard/common/Sidebar';
import Header from '../components/dashboard/common/Header';
import LoadingSpinner from '../components/dashboard/common/LoadingSpinner';
import ErrorMessage from '../components/dashboard/common/ErrorMessage';
import AdminOverview from '../components/dashboard/admin/AdminOverview';
import AdminPatients from '../components/dashboard/admin/AdminPatients';
import AdminAppointments from '../components/dashboard/admin/AdminAppointments';
import AdminDoctors from '../components/dashboard/admin/AdminDoctors';
import AdminTreatments from '../components/dashboard/admin/AdminTreatments';
import AdminAvailability from '../components/dashboard/admin/AdminAvailability';
import AdminInvoices from '../components/dashboard/admin/AdminInvoices';
import InvoiceManagement from '../components/InvoiceManagement';
import AdminReviews from '../components/dashboard/admin/AdminReviews'

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [doctors, setDoctors] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    activeStaff: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [doctorsRes, treatmentsRes, availabilityRes, patientsRes, appointmentsRes] = await Promise.all([
        axios.get('/doctors'),
        axios.get('/treatments'),
        axios.get('/availability'),
        axios.get('/patients'),
        axios.get('/appointments')
      ]);
      
      setDoctors(doctorsRes.data.data || []);
      setTreatments(treatmentsRes.data.data || []);
      setAvailability(availabilityRes.data.data || []);
      setAllPatients(patientsRes.data.data || []);
      setAllAppointments(appointmentsRes.data.data || []);
      
      const invoicesRes = await axios.get('/invoices/stats').catch(() => ({ data: { data: { totalRevenue: 0 } } }));
      
      setStats({
        totalPatients: patientsRes.data.data?.length || 0,
        totalAppointments: appointmentsRes.data.data?.length || 0,
        totalRevenue: invoicesRes.data.data?.totalRevenue || 0,
        activeStaff: 0
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'Scheduled': 'bg-amber-100 text-amber-800',
      'Confirmed': 'bg-emerald-100 text-emerald-800',
      'In Progress': 'bg-sky-100 text-sky-800',
      'Completed': 'bg-gray-100 text-gray-800',
      'Cancelled': 'bg-rose-100 text-rose-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaHome },
    { id: 'all-patients', label: 'All Patients', icon: FaUsers, count: allPatients.length },
    { id: 'all-appointments', label: 'All Appointments', icon: FaCalendarAlt, count: allAppointments.length },
    { id: 'doctors', label: 'Doctors', icon: FaUserMd },
    { id: 'treatments', label: 'Treatments', icon: FaTooth },
    { id: 'reviews', label: 'Reviews', icon: FaStar }, // Added Reviews tab
    { id: 'availability', label: 'Availability', icon: FaCalendarWeek },
    { id: 'invoices', label: 'Invoices', icon: FaFileInvoiceDollar },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview stats={stats} doctors={doctors} allAppointments={allAppointments} setActiveTab={setActiveTab} />;
      case 'all-patients':
        return <AdminPatients allPatients={allPatients} fetchData={fetchDashboardData} />;
      case 'all-appointments':
        return <AdminAppointments 
          allAppointments={allAppointments} 
          getStatusBadgeClass={getStatusBadgeClass} 
          fetchData={fetchDashboardData} 
        />;
      case 'doctors':
        return <AdminDoctors doctors={doctors} fetchData={fetchDashboardData} />;
      case 'treatments':
        return <AdminTreatments treatments={treatments} fetchData={fetchDashboardData} />;
      case 'reviews': // Added Reviews case
        return <AdminReviews />;
      case 'availability':
        return <AdminAvailability availability={availability} doctors={doctors} fetchData={fetchDashboardData} />;
      case 'invoices':
        return <InvoiceManagement />;
      default:
        return null;
    }
  };

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;
  if (error) return <ErrorMessage error={error} onRetry={fetchDashboardData} />;

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 overflow-hidden">
      <Sidebar 
        user={user}
        logout={logout}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        logoIcon={FaHospitalUser}
        title="Admin Panel"
      />
      
      <main className="flex-1 overflow-y-auto relative">
        <Header title={`${activeTab.replace('-', ' ')} Management`} user={user} />
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;