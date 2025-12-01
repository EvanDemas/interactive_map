import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load buildings data
const buildingsPath = join(__dirname, '../data/buildings.json');
let buildingsData;

try {
  const data = readFileSync(buildingsPath, 'utf8');
  buildingsData = JSON.parse(data);
} catch (error) {
  console.error('Error loading buildings data:', error);
  buildingsData = { buildings: [] };
}

// GET all buildings
router.get('/', (req, res) => {
  try {
    res.json(buildingsData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buildings' });
  }
});

// GET single building by ID
router.get('/:id', (req, res) => {
  try {
    const building = buildingsData.buildings.find(b => b.id === req.params.id);
    
    if (!building) {
      return res.status(404).json({ 
        error: 'Building not found',
        message: `No building with ID ${req.params.id}` 
      });
    }
    
    res.json({ building });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch building' });
  }
});

export default router;
