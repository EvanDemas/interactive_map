# Kobe Architectural Renovations - Interactive Map

An interactive web application showcasing architectural renovation projects by a Japanese architectural firm in the Kobe area. Built with React, Leaflet.js, and Express, featuring a distinctive scrapbook aesthetic design.

![Project Preview](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=400&fit=crop)

## 🎨 Features

- **Interactive Map**: Leaflet.js-powered map centered on Kobe with custom markers
- **Building Details**: Rich modal displays with photos, videos, and 3D models
- **Scrapbook Design**: Unique handcrafted aesthetic with paper textures, polaroid frames, and handwritten fonts
- **Responsive**: Mobile-first design that works on all devices
- **10 Renovations**: Curated collection of heritage and modern renovation projects

## 🏗️ Tech Stack

### Frontend
- React 18
- Vite
- Leaflet.js & React-Leaflet
- React Image Gallery
- React Player
- Three.js & React Three Fiber (for 3D models)
- CSS Modules

### Backend
- Node.js
- Express.js
- CORS middleware
- JSON-based data storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🚀 Getting Started

Follow these steps to run the website locally on your machine.

### Step 1: Clone or Navigate to the Project

If you haven't already, navigate to the project directory:

```bash
cd c:\Users\kaito\Documents\GitHub\interactive_map
```

### Step 2: Install Backend Dependencies

Open a terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

This will install all the required backend dependencies including Express, CORS, and dotenv.

### Step 3: Install Frontend Dependencies

Open a **second terminal** (keep the first one open) and navigate to the frontend folder:

```bash
cd frontend
npm install
```

This will install React, Leaflet, and all other frontend dependencies. This may take a few minutes.

### Step 4: Start the Backend Server

In your **first terminal** (in the `backend` folder), start the backend server:

```bash
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:3001
📍 CORS enabled for: http://localhost:5173
```

**Keep this terminal running!** The backend must stay active.

### Step 5: Start the Frontend Development Server

In your **second terminal** (in the `frontend` folder), start the frontend:

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 6: Open the Website

Open your web browser and navigate to:

```
http://localhost:5173
```

You should now see the interactive map with all 10 building markers in the Kobe area! 🎉

## 🎯 Using the Website

1. **View the Map**: The map automatically centers on Kobe, Japan
2. **Click Markers**: Click any building marker (pin) to view details
3. **Explore Details**: Each modal shows:
   - Building name and location
   - Project description
   - Photo gallery (swipe or click arrows)
   - Video (where available)
   - 3D model (where available - drag to rotate, scroll to zoom)
4. **Close Modal**: Click the ✕ button or press ESC to close
5. **Navigate Map**: Zoom with scroll wheel, pan by dragging

## 📁 Project Structure

```
interactive_map/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   └── buildings.json      # Building data
│   │   ├── routes/
│   │   │   └── buildings.js        # API routes
│   │   └── server.js               # Express server
│   ├── public/                     # Static assets (images, videos, models)
│   ├── package.json
│   └── .env                        # Backend environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BuildingModal/      # Modal and media components
│   │   │   ├── Layout/             # Header and Footer
│   │   │   ├── Map/                # Map and markers
│   │   │   └── UI/                 # Reusable UI components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API service
│   │   ├── styles/                 # Global and theme styles
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── public/                     # Public assets
│   ├── package.json
│   └── .env                        # Frontend environment variables
│
├── PROJECT_REQUIREMENTS.md
├── SKILL.md
└── README.md
```

## 🛠️ Available Scripts

### Backend (in `backend/` folder)

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon (auto-restart)
```

### Frontend (in `frontend/` folder)

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🌐 API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/buildings` - Get all buildings
- `GET /api/buildings/:id` - Get a specific building by ID
- `GET /api/health` - Health check endpoint

## 🎨 Design Philosophy

This project follows a distinctive **scrapbook aesthetic**:

- **Typography**: Handwritten fonts (Reenie Beanie, Caveat) paired with elegant serif (Crimson Pro)
- **Colors**: Warm, aged paper tones with coral and sage accents
- **Effects**: Polaroid frames, washi tape decorations, paper textures, subtle rotations
- **Animations**: Smooth transitions, floating elements, staggered reveals

See `SKILL.md` for detailed design guidelines.

## 🔧 Troubleshooting

### Port Already in Use

If you see "Port 3001 is already in use":
```bash
# On Windows (PowerShell)
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Then restart the backend
```

### CORS Errors

Make sure:
1. Backend is running on port 3001
2. Frontend is running on port 5173
3. Both `.env` files have correct URLs

### Map Not Loading

1. Check browser console for errors
2. Ensure backend API is accessible at `http://localhost:3001/api/buildings`
3. Check internet connection (map tiles need to download)

### 3D Models Not Displaying

3D models require:
- WebGL support in browser
- Valid `.glb` or `.gltf` files in `/backend/public/models/`
- `hasModel: true` in building data

## 📱 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚢 Deployment

This project is designed to be deployed on Vercel:

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy frontend and backend separately (or use Vercel Serverless Functions)
4. Update environment variables in Vercel dashboard

See `PROJECT_REQUIREMENTS.md` Phase 8 for detailed deployment instructions.

## 📝 Adding New Buildings

To add a new building to the map:

1. Open `backend/src/data/buildings.json`
2. Add a new building object following the existing schema
3. Get accurate GPS coordinates for Kobe
4. Add building images to `backend/public/images/`
5. Restart the backend server
6. The new building will appear on the map automatically

### Building Data Schema

```json
{
  "id": "unique-id",
  "name": "Building Name",
  "location": {
    "lat": 34.xxxx,
    "lng": 135.xxxx,
    "address": "Full address"
  },
  "description": "Detailed description...",
  "images": [...],
  "video": {...},
  "model3d": {...},
  "metadata": {...}
}
```

## 🤝 Contributing

This is a showcase project for a Japanese architectural firm. For inquiries about the buildings or firm, please contact the project maintainer.

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- **OpenStreetMap** for map tiles
- **Unsplash** for placeholder images
- **Google Fonts** for typography
- **Leaflet.js** for mapping library
- **React** ecosystem for UI framework

---

**Built with ❤️ for Kobe's architectural heritage**

*December 2025*
