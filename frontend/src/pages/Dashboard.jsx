import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';
import PatientDashboard from './PatientDashboard';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/dashboard/common/LoadingSpinner';

const Dashboard = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'staff':
        return <StaffDashboard />;
      case 'patient':
        return <PatientDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return renderDashboard();
};

export default Dashboard;