import axios from 'axios';

// In production (Vercel), use relative URLs. In development, use localhost
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001');

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
    return response.data.building;
  } catch (error) {
    console.error(`Error fetching building ${id}:`, error);
    throw new Error('Failed to fetch building details.');
  }
};

export default api;
