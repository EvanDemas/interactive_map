import buildingsData from '../backend/src/data/buildings.json' assert { type: 'json' };

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
    const { id } = req.query;

    if (id) {
      // Get single building by ID
      const building = buildingsData.buildings.find(b => b.id === id);
      if (building) {
        res.status(200).json(building);
      } else {
        res.status(404).json({ error: 'Building not found' });
      }
    } else {
      // Get all buildings
      res.status(200).json(buildingsData);
    }
  } catch (error) {
    console.error('Error in buildings API:', error);
    res.status(500).json({ error: 'Failed to fetch buildings', message: error.message });
  }
}
