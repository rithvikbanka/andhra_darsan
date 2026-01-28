import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    const response = await axios.post(`${API}/auth/register`, userData);
    return response.data;
  },
  
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const response = await axios.post(`${API}/auth/login`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  getMe: async () => {
    const response = await axios.get(`${API}/auth/me`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

// Experience APIs
export const experienceAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    if (filters.min_price) params.append('min_price', filters.min_price);
    if (filters.max_price) params.append('max_price', filters.max_price);
    
    const response = await axios.get(`${API}/experiences?${params.toString()}`);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API}/experiences/${id}`);
    return response.data;
  },
  
  create: async (experienceData) => {
    const response = await axios.post(`${API}/experiences`, experienceData, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  update: async (id, experienceData) => {
    const response = await axios.put(`${API}/experiences/${id}`, experienceData, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API}/experiences/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

// Booking APIs
export const bookingAPI = {
  create: async (bookingData) => {
    const response = await axios.post(`${API}/bookings`, bookingData, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  getAll: async () => {
    const response = await axios.get(`${API}/bookings`, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API}/bookings/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  update: async (id, updateData) => {
    const response = await axios.put(`${API}/bookings/${id}`, updateData, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  cancel: async (id) => {
    const response = await axios.delete(`${API}/bookings/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

// Admin APIs
export const adminAPI = {
  getStats: async () => {
    const response = await axios.get(`${API}/admin/stats`, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  getAllBookings: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.experience_id) params.append('experience_id', filters.experience_id);
    
    const response = await axios.get(`${API}/admin/bookings?${params.toString()}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};
