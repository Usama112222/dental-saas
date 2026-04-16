import React from 'react';
import { 
  FaSmile, FaCalendarAlt, FaClock, FaFileInvoiceDollar, FaCheck, 
  FaArrowRight, FaPhoneAlt, FaEnvelope, FaCheckCircle, FaPlus, FaTooth
} from 'react-icons/fa';

const PatientOverview = ({ user, patient, appointments, invoices, upcomingAppointments, totalOutstanding, setActiveTab }) => {
  return (
    <>
      {/* Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <FaSmile className="text-4xl" />
            <h2 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h2>
          </div>
          <p className="text-sky-100 text-lg mb-4">Your dental health is our priority</p>
          <div className="flex flex-wrap gap-3">
            {patient?.phone && (
              <div className="bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm flex items-center space-x-2">
                <FaPhoneAlt className="text-sm" />
                <span className="text-sm">{patient.phone}</span>
              </div>
            )}
            {user?.email && (
              <div className="bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm flex items-center space-x-2">
                <FaEnvelope className="text-sm" />
                <span className="text-sm">{user.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl">
              <FaCalendarAlt className="text-sky-600 text-2xl" />
            </div>
            <span className="text-3xl font-bold text-gray-800">{appointments.length}</span>
          </div>
          <h3 className="text-gray-600 font-semibold mb-1">Total Appointments</h3>
          {upcomingAppointments.length > 0 && (
            <p className="text-sm text-emerald-600 font-medium">
              {upcomingAppointments.length} upcoming
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
              <FaClock className="text-emerald-600 text-2xl" />
            </div>
            <span className="text-3xl font-bold text-gray-800">{upcomingAppointments.length}</span>
          </div>
          <h3 className="text-gray-600 font-semibold mb-1">Upcoming Appointments</h3>
          <button 
            onClick={() => setActiveTab('appointments')}
            className="text-sm text-sky-600 hover:text-sky-700 font-medium inline-flex items-center group"
          >
            View all 
            <FaArrowRight className="ml-1 text-xs group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
              <FaFileInvoiceDollar className="text-amber-600 text-2xl" />
            </div>
            <span className="text-3xl font-bold text-rose-600">
              ${totalOutstanding.toLocaleString()}
            </span>
          </div>
          <h3 className="text-gray-600 font-semibold mb-1">Outstanding Balance</h3>
          {totalOutstanding === 0 && (
            <p className="text-sm text-emerald-600 font-medium flex items-center">
              <FaCheck className="mr-1" /> All paid
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <FaCheckCircle className="text-purple-600 text-2xl" />
            </div>
            <span className="text-3xl font-bold text-gray-800">{invoices.length}</span>
          </div>
          <h3 className="text-gray-600 font-semibold mb-1">Total Invoices</h3>
          <p className="text-sm text-gray-500">
            {invoices.filter(i => i.status === 'Paid').length} paid
          </p>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Upcoming Appointments</h3>
          <button 
            onClick={() => setActiveTab('appointments')}
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-sky-600 hover:to-blue-700 transition flex items-center space-x-2 shadow-md"
          >
            <FaPlus className="text-xs" />
            <span>Book New</span>
          </button>
        </div>
        
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-sky-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-sky-600 text-4xl" />
            </div>
            <p className="text-gray-500 mb-4">No upcoming appointments.</p>
            <button 
              onClick={() => setActiveTab('appointments')}
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl inline-block font-medium hover:from-sky-600 hover:to-blue-700 transition shadow-md"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {upcomingAppointments.slice(0, 3).map((apt) => (
              <div key={apt._id} className="border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-sky-200 hover:bg-sky-50/30">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <p className="font-bold text-lg text-gray-800">
                        {new Date(apt.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaClock className="text-sky-500" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaTooth className="text-sky-500" />
                        <span>{apt.type}</span>
                      </div>
                      {apt.symptoms && (
                        <p className="text-gray-600 col-span-2 flex items-start space-x-2">
                          <span className="font-medium">Symptoms:</span>
                          <span>{apt.symptoms}</span>
                        </p>
                      )}
                    </div>
                    <div className="mt-3">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        apt.status === 'Scheduled' ? 'bg-amber-100 text-amber-800' :
                        apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Invoices */}
      {invoices.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
                <FaFileInvoiceDollar className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Recent Invoices</h3>
            </div>
            <button 
              onClick={() => setActiveTab('invoices')}
              className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center space-x-1 group"
            >
              <span>View all</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition" />
            </button>
          </div>
          <div className="space-y-3">
            {invoices.slice(0, 5).map((inv) => (
              <div key={inv._id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-sky-50 hover:to-blue-50 transition">
                <div>
                  <p className="font-semibold text-gray-800">{inv.invoiceNumber}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(inv.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">${inv.total}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PatientOverview;