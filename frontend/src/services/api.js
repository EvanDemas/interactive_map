import axios from 'axios';

// Resolve API base URL
// - Production: prefer VITE_API_URL unless it points to localhost, otherwise use relative ('')
// - Development: use VITE_API_URL if provided, else default to localhost
const isProd = import.meta.env.PROD;
const envApi = import.meta.env.VITE_API_URL;
const isLocalEnv = envApi && /localhost|127\.0\.0\.1/i.test(envApi);
const API_URL = isProd
  ? (envApi && !isLocalEnv ? envApi : '')
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
    console.error('Error fetching buildings:', error);
    throw new Error('Failed to fetch buildings. Please try again later.');
  }
};

export const fetchBuildingById = async (id) => {
  try {
    const response = await api.get(`/api/buildings/${id}`);
    return response.data.building || response.data;
  } catch (error) {
    console.error(`Error fetching building ${id}:`, error);
    throw new Error('Failed to fetch building details.');
  }
};

export default api;
