import React, { useState } from 'react';
import { FaUsers, FaSearch, FaUserCircle } from 'react-icons/fa';

const AdminPatients = ({ allPatients, fetchData }) => {
  const [patientSearchTerm, setPatientSearchTerm] = useState('');

  const getFilteredPatients = () => {
    if (!patientSearchTerm) return allPatients;
    return allPatients.filter(patient => 
      patient.user?.name?.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
      patient.user?.email?.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
      patient.phone?.includes(patientSearchTerm)
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl">
            <FaUsers className="text-sky-600 text-xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">All Patients</h3>
        </div>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 w-64"
            value={patientSearchTerm}
            onChange={(e) => setPatientSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredPatients().map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-sky-100 to-blue-100 rounded-full flex items-center justify-center">
                        <FaUserCircle className="text-sky-600 text-xl" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{patient.user?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-500">ID: {patient._id?.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{patient.user?.email || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{patient.phone || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(patient.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {getFilteredPatients().length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUsers className="text-gray-400 text-4xl" />
          </div>
          <p className="text-gray-500">No patients found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPatients;