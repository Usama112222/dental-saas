// src/services/invoiceService.js
import axios from '../api/axios';

const invoiceService = {
  // Get all invoices
  getInvoices: async () => {
    try {
      const response = await axios.get('/invoices');
      return response.data;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  },

  // Get single invoice
  getInvoice: async (id) => {
    try {
      const response = await axios.get(`/invoices/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching invoice:', error);
      throw error;
    }
  },

  // Create new invoice
  createInvoice: async (invoiceData) => {
    try {
      const response = await axios.post('/invoices', invoiceData);
      return response.data;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  // Update invoice
  updateInvoice: async (id, updateData) => {
    try {
      const response = await axios.put(`/invoices/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  // Process payment
  processPayment: async (id, paymentData) => {
    try {
      const response = await axios.put(`/invoices/${id}/pay`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  },

  // Get revenue stats
  getRevenueStats: async () => {
    try {
      const response = await axios.get('/invoices/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue stats:', error);
      throw error;
    }
  }
};

export default invoiceService;