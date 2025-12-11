import axios from 'axios';

// Resolve API base URL
// - Production (Vercel): use relative path to hit the same origin
// - Development: use VITE_API_URL if provided, else localhost
const isProd = import.meta.env.PROD;
const envApi = import.meta.env.VITE_API_URL;
const API_URL = isProd
  ? ''
  : (envApi || 'http://localhost:3001');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchBuildings = async () => {
  try {
    const response = await api.get('/api/buildings');
    // API returns { buildings: [...] }, so access buildings directly
    return response.data.buildings || response.data || [];
  } catch (error) {
    const status = error?.response?.status;
    const data = error?.response?.data;
    console.error('Error fetching buildings:', { status, data, message: error.message });
    throw new Error(`Failed to fetch buildings${status ? ` (status ${status})` : ''}.`);
  }
};

export const fetchBuildingById = async (id) => {
  try {
    const response = await api.get(`/api/buildings/${id}`);
    return response.data.building || response.data;
  } catch (error) {
    const status = error?.response?.status;
    const data = error?.response?.data;
    console.error(`Error fetching building ${id}:`, { status, data, message: error.message });
    throw new Error(`Failed to fetch building details${status ? ` (status ${status})` : ''}.`);
  }
};

export default api;
