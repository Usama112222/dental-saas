import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaSmile, FaCalendarAlt, FaFileInvoiceDollar, FaStar, FaHospitalUser } from 'react-icons/fa';
import Sidebar from '../components/dashboard/common/Sidebar';
import Header from '../components/dashboard/common/Header';
import LoadingSpinner from '../components/dashboard/common/LoadingSpinner';
import ErrorMessage from '../components/dashboard/common/ErrorMessage';
import PatientOverview from '../components/dashboard/patient/PatientOverview';
import PatientAppointments from '../components/dashboard/patient/PatientAppointments';
import PatientInvoices from '../components/dashboard/patient/PatientInvoices';
import PatientReviews from '../components/dashboard/patient/PatientReviews';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const patientsRes = await axios.get('/patients');
      const allPatients = patientsRes.data.data || [];
      
      let patientData = null;
      patientData = allPatients.find(p => {
        const patientUserId = p.user?._id || p.user;
        return patientUserId === user?._id;
      });
      
      if (!patientData) {
        setError('Patient profile not found. Please contact the administrator.');
        setLoading(false);
        return;
      }
      
      setPatient(patientData);
      
      const appointmentsRes = await axios.get(`/appointments?patient=${patientData._id}`);
      setAppointments(appointmentsRes.data.data || []);
      
      try {
        const invoicesRes = await axios.get(`/invoices?patient=${patientData._id}`);
        setInvoices(invoicesRes.data.data || []);
      } catch (err) {
        setInvoices([]);
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= today && apt.status !== 'Cancelled' && apt.status !== 'Completed';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getTotalOutstanding = () => {
    return invoices
      .filter(inv => inv.status !== 'Paid')
      .reduce((sum, inv) => sum + (inv.balance || inv.total - inv.paid), 0);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaSmile },
    { id: 'appointments', label: 'Appointments', icon: FaCalendarAlt },
    { id: 'invoices', label: 'Invoices', icon: FaFileInvoiceDollar },
    { id: 'reviews', label: 'My Reviews', icon: FaStar }, // Added Reviews tab
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <PatientOverview 
            user={user}
            patient={patient}
            appointments={appointments}
            invoices={invoices}
            upcomingAppointments={getUpcomingAppointments()}
            totalOutstanding={getTotalOutstanding()}
            setActiveTab={setActiveTab}
          />
        );
      case 'appointments':
        return (
          <PatientAppointments 
            appointments={appointments}
            patientId={patient?._id}
            fetchPatientData={fetchPatientData}
          />
        );
      case 'invoices':
        return <PatientInvoices invoices={invoices} />;
      case 'reviews': // Added Reviews case
        return <PatientReviews patientId={patient?._id} />;
      default:
        return null;
    }
  };

  if (loading) return <LoadingSpinner message="Loading your dashboard..." />;
  if (error) return <ErrorMessage error={error} onRetry={fetchPatientData} />;
  if (!patient) return <ErrorMessage error="Patient profile not found" onRetry={fetchPatientData} />;

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
        title="Patient Portal"
      />
      
      <main className="flex-1 overflow-y-auto relative">
        <Header title={activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'reviews' ? 'My Reviews' : activeTab} user={user} />
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;