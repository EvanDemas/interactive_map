import { readFileSync } from 'fs';
import { join } from 'path';

let buildingsData = null;

function loadBuildingsData() {
  if (!buildingsData) {
    try {
      const filePath = join(process.cwd(), 'backend', 'src', 'data', 'buildings.json');
      const data = readFileSync(filePath, 'utf8');
      buildingsData = JSON.parse(data);
    } catch (error) {
      console.error('Error loading buildings data:', error);
      buildingsData = { buildings: [] };
    }
  }
  return buildingsData;
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const data = loadBuildingsData();
    const { id } = req.query;

    if (id) {
      // Get single building by ID
      const building = data.buildings.find(b => b.id === id);
      if (building) {
        res.status(200).json(building);
      } else {
        res.status(404).json({ error: 'Building not found' });
      }
    } else {
      // Get all buildings
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error in buildings API:', error);
    res.status(500).json({ error: 'Failed to fetch buildings', message: error.message });
  }
}
