// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const fetchStats = async () => {
    try {
        const response = await api.get('/stats/stats');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};

export const fetchDoctors = async () => {
    try {
        const response = await api.get('/doctors');
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
};

export const fetchTreatments = async () => {
    try {
        const response = await api.get('/treatments');
        return response.data;
    } catch (error) {
        console.error('Error fetching treatments:', error);
        throw error;
    }
};

export default api;