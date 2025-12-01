import { useState, useEffect } from 'react';
import { fetchBuildings } from '../services/api';

export const useFetchBuildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBuildings = async () => {
      try {
        setLoading(true);
        const data = await fetchBuildings();
        setBuildings(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setBuildings([]);
      } finally {
        setLoading(false);
      }
    };

    loadBuildings();
  }, []);

  return { buildings, loading, error };
};
