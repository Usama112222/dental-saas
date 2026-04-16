import React from 'react';
import { FaFileInvoiceDollar, FaEye } from 'react-icons/fa';

const PatientInvoices = ({ invoices }) => {
  const getStatusBadge = (status) => {
    const badges = {
      'Paid': 'bg-emerald-100 text-emerald-700',
      'Partially Paid': 'bg-yellow-100 text-yellow-700',
      'Sent': 'bg-blue-100 text-blue-700',
      'Draft': 'bg-gray-100 text-gray-700',
      'Overdue': 'bg-red-100 text-red-700'
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
          My Invoices
        </h2>
        <p className="text-gray-600 mt-1">View and manage your billing history</p>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaFileInvoiceDollar className="text-gray-400 text-4xl" />
          </div>
          <p className="text-gray-500 text-lg">No invoices found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(inv.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(inv.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">${inv.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600">${inv.paid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-orange-600">${inv.balance}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-sky-600 hover:text-sky-700 font-medium text-sm flex items-center gap-1">
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientInvoices;