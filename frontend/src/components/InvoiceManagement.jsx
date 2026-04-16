// src/components/InvoiceManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { 
  FaFileInvoice, FaSearch, FaEye, FaMoneyBillWave, 
  FaCheckCircle, FaTimesCircle, FaClock, FaUser, 
  FaDollarSign, FaPrint, FaPlus, FaSpinner,
  FaTimes, FaTrash
} from 'react-icons/fa';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalInvoices: 0,
    paidInvoices: 0,
    pendingInvoices: 0
  });
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    method: 'Cash',
    transactionId: '',
    notes: ''
  });
  const [newInvoice, setNewInvoice] = useState({
    patient: '',
    treatments: [],
    dueDate: '',
    notes: ''
  });
  const [selectedTreatment, setSelectedTreatment] = useState({ treatment: '', amount: 0, discount: 0 });
  const [creating, setCreating] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const [invoicesRes, patientsRes, treatmentsRes] = await Promise.all([
        axios.get('/invoices', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/patients', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/treatments', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      setInvoices(invoicesRes.data.data || []);
      setPatients(patientsRes.data.data || []);
      setTreatments(treatmentsRes.data.data || []);
      
      const paidInvoices = (invoicesRes.data.data || []).filter(i => i.status === 'Paid');
      const totalRevenue = paidInvoices.reduce((sum, inv) => sum + (inv.paid || inv.total || 0), 0);
      
      setStats({
        totalRevenue: totalRevenue,
        totalInvoices: invoicesRes.data.data?.length || 0,
        paidInvoices: paidInvoices.length,
        pendingInvoices: (invoicesRes.data.data || []).filter(i => i.status !== 'Paid').length || 0
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayment = async (invoiceId) => {
    if (!paymentData.amount || paymentData.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    setProcessingPayment(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/invoices/${invoiceId}/pay`, paymentData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        alert('Payment processed successfully!');
        setShowPaymentModal(false);
        fetchData();
        setPaymentData({ amount: 0, method: 'Cash', transactionId: '', notes: '' });
      }
    } catch (error) {
      alert('Error processing payment: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleCreateInvoice = async () => {
    if (!newInvoice.patient || !newInvoice.dueDate) {
      alert('Please select patient and due date');
      return;
    }
    
    if (newInvoice.treatments.length === 0) {
      alert('Please add at least one treatment');
      return;
    }
    
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const invoiceData = {
        patient: newInvoice.patient,
        treatments: newInvoice.treatments,
        dueDate: newInvoice.dueDate,
        notes: newInvoice.notes,
        status: 'Sent'
      };
      
      const response = await axios.post('/invoices', invoiceData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        alert('Invoice created successfully!');
        setShowCreateModal(false);
        setNewInvoice({ patient: '', treatments: [], dueDate: '', notes: '' });
        fetchData();
      }
    } catch (error) {
      alert('Error creating invoice: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setCreating(false);
    }
  };

  const addTreatmentToInvoice = () => {
    if (!selectedTreatment.treatment || selectedTreatment.amount <= 0) {
      alert('Please select a treatment and enter amount');
      return;
    }
    
    setNewInvoice({
      ...newInvoice,
      treatments: [...newInvoice.treatments, { ...selectedTreatment }]
    });
    setSelectedTreatment({ treatment: '', amount: 0, discount: 0 });
  };

  const removeTreatmentFromInvoice = (index) => {
    const updatedTreatments = newInvoice.treatments.filter((_, i) => i !== index);
    setNewInvoice({ ...newInvoice, treatments: updatedTreatments });
  };

  const getTotalAmount = () => {
    return newInvoice.treatments.reduce((sum, t) => sum + (t.amount - (t.discount || 0)), 0);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Paid': 'bg-green-100 text-green-800',
      'Partially Paid': 'bg-yellow-100 text-yellow-800',
      'Sent': 'bg-blue-100 text-blue-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Overdue': 'bg-red-100 text-red-800',
      'Cancelled': 'bg-gray-100 text-gray-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Paid': return <FaCheckCircle className="text-green-600" />;
      case 'Partially Paid': return <FaClock className="text-yellow-600" />;
      case 'Overdue': return <FaTimesCircle className="text-red-600" />;
      default: return <FaFileInvoice className="text-blue-600" />;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter !== 'all' && invoice.status !== filter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        invoice.invoiceNumber?.toLowerCase().includes(search) ||
        invoice.patient?.user?.name?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const getPatientName = (patient) => {
    if (!patient) return 'N/A';
    if (patient.user?.name) return patient.user.name;
    if (patient.name) return patient.name;
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Invoice Management</h2>
          <p className="text-gray-500">Manage patient invoices and payments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
        >
          <FaPlus />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <FaDollarSign className="text-3xl text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Total Invoices</p>
              <p className="text-3xl font-bold mt-2">{stats.totalInvoices}</p>
            </div>
            <FaFileInvoice className="text-3xl text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Paid Invoices</p>
              <p className="text-3xl font-bold mt-2">{stats.paidInvoices}</p>
            </div>
            <FaCheckCircle className="text-3xl text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Pending</p>
              <p className="text-3xl font-bold mt-2">{stats.pendingInvoices}</p>
            </div>
            <FaClock className="text-3xl text-orange-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by invoice # or patient..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'Sent', 'Paid', 'Partially Paid'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    No invoices found
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{invoice.invoiceNumber || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-2" />
                        <span className="text-gray-900">{getPatientName(invoice.patient)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">${invoice.total}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-green-600 font-medium">${invoice.paid || 0}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-orange-600 font-medium">${invoice.balance || invoice.total}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setShowInvoiceModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        {invoice.status !== 'Paid' && (
                          <button
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setPaymentData({ ...paymentData, amount: invoice.balance || invoice.total });
                              setShowPaymentModal(true);
                            }}
                            className="text-green-600 hover:text-green-800"
                            title="Process Payment"
                          >
                            <FaMoneyBillWave />
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-800" title="Print" onClick={() => window.print()}>
                          <FaPrint />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Invoice</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Select Patient */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newInvoice.patient}
                  onChange={(e) => setNewInvoice({ ...newInvoice, patient: e.target.value })}
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {getPatientName(patient)} - {patient.phone || 'No phone'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Add Treatments */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Add Treatments</h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    value={selectedTreatment.treatment}
                    onChange={(e) => setSelectedTreatment({ ...selectedTreatment, treatment: e.target.value })}
                  >
                    <option value="">Select Treatment</option>
                    {treatments.map((treatment) => (
                      <option key={treatment._id} value={treatment._id}>
                        {treatment.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    value={selectedTreatment.amount}
                    onChange={(e) => setSelectedTreatment({ ...selectedTreatment, amount: parseFloat(e.target.value) })}
                  />
                  <input
                    type="number"
                    placeholder="Discount"
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    value={selectedTreatment.discount}
                    onChange={(e) => setSelectedTreatment({ ...selectedTreatment, discount: parseFloat(e.target.value) })}
                  />
                </div>
                <button
                  type="button"
                  onClick={addTreatmentToInvoice}
                  className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Add Treatment
                </button>

                {/* Treatment List */}
                {newInvoice.treatments.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-medium mb-2">Added Treatments:</h4>
                    <div className="space-y-2">
                      {newInvoice.treatments.map((t, index) => {
                        const treatment = treatments.find(tr => tr._id === t.treatment);
                        return (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium">{treatment?.name || 'Unknown'}</p>
                              <p className="text-sm text-gray-500">Amount: ${t.amount} | Discount: ${t.discount}</p>
                            </div>
                            <button
                              onClick={() => removeTreatmentFromInvoice(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 text-right font-bold">
                      Total: ${getTotalAmount()}
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Additional notes..."
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                disabled={creating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Invoice'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Process Payment</h2>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Invoice: {selectedInvoice.invoiceNumber}</p>
              <p className="text-gray-600">Total Amount: ${selectedInvoice.total}</p>
              <p className="text-gray-600 font-semibold">Remaining Balance: ${selectedInvoice.balance || selectedInvoice.total}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Pay</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: parseFloat(e.target.value) })}
                  max={selectedInvoice.balance || selectedInvoice.total}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={paymentData.method}
                  onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
                >
                  <option value="Cash">💵 Cash</option>
                  <option value="Card">💳 Card</option>
                  <option value="Online">🌐 Online</option>
                  <option value="Bank Transfer">🏦 Bank Transfer</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleProcessPayment(selectedInvoice._id)}
                disabled={processingPayment}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {processingPayment ? 'Processing...' : 'Process Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Invoice Details</h2>
              <button onClick={() => setShowInvoiceModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceNumber}</p>
                <p><strong>Patient:</strong> {getPatientName(selectedInvoice.patient)}</p>
                <p><strong>Date:</strong> {new Date(selectedInvoice.createdAt).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Summary</h3>
                <p>Subtotal: ${selectedInvoice.subtotal}</p>
                <p>Tax: ${selectedInvoice.tax}</p>
                <p>Discount: ${selectedInvoice.discount}</p>
                <p className="text-lg font-bold mt-2">Total: ${selectedInvoice.total}</p>
                <p className="text-green-600">Paid: ${selectedInvoice.paid || 0}</p>
                <p className="text-orange-600">Balance: ${selectedInvoice.balance || selectedInvoice.total}</p>
              </div>
              {selectedInvoice.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-gray-600">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagement;