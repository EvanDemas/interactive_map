import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { path } = req.query;
  const pathParts = Array.isArray(path)
    ? path
    : (typeof path === 'string' ? path.split('/').filter(Boolean) : null);
  
  if (!pathParts || pathParts.length === 0) {
    res.status(400).json({ error: 'Invalid path' });
    return;
  }

  try {
    const filePath = join(__dirname, '..', '..', 'backend', 'public', ...pathParts);
    const fileContent = readFileSync(filePath);
    
    // Set appropriate content type based on file extension
    const ext = pathParts[pathParts.length - 1].split('.').pop().toLowerCase();
    const contentTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'glb': 'model/gltf-binary',
      'gltf': 'model/gltf+json'
    };
    
    res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
    res.status(200).send(fileContent);
  } catch (error) {
    console.error('Error serving static file:', error);
    res.status(404).json({ error: 'File not found' });
  }
}
