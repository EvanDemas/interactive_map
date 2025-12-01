# Interactive Map Project - Requirements & Development Plan

**Project:** Architectural Renovation Showcase for Japanese Firm  
**Date:** December 1, 2025  
**Location Focus:** Kobe Area, Japan

---

## 1. Project Overview

An interactive web application showcasing approximately 10 renovated buildings by a Japanese architectural firm in the Kobe area. The application features a Leaflet.js-based map with clickable building markers that display rich media content including photos, descriptions, videos, and 3D scans.

---

## 2. Technical Stack

### Frontend
- **Framework:** React 18+
- **Map Library:** Leaflet.js
- **Styling:** CSS Modules or Styled Components (scrapbook aesthetic)
- **Image Gallery:** React component library (e.g., react-image-gallery or Swiper)
- **3D Viewer:** Three.js or model-viewer for 3D scans
- **Video Player:** HTML5 video or react-player

### Backend
- **Runtime:** Node.js (LTS version)
- **Framework:** Express.js
- **Data Storage:** JSON files (static data) or MongoDB (if scalability needed)
- **API:** RESTful API for building data

### Deployment
- **Hosting:** Vercel
- **Frontend:** Vercel (static/SSR)
- **Backend:** Vercel Serverless Functions or separate Express server

---

## 3. Functional Requirements

### 3.1 Map Display
- **Map Coverage:** Kobe area (slightly smaller than full city bounds)
- **Map Style:** Modern, clean aesthetic
- **Base Map:** OpenStreetMap or Mapbox tiles
- **Initial View:** Centered on Kobe with appropriate zoom level to show all buildings
- **Mobile Responsive:** Full touch support and responsive layout

### 3.2 Building Markers
- **Total Buildings:** ~10 buildings (with capacity to add 1-2 more)
- **Marker Style:** Custom icons reflecting scrapbook aesthetic
- **Marker Interaction:** Click to open building detail panel
- **Hover Effect:** Optional hover state for desktop users

### 3.3 Building Detail Panel/Modal
Each building marker opens a modal/panel containing:

1. **Building Name & Location**
2. **Description:** Text overview of the renovation project
3. **Photo Gallery:** 
   - Multiple photos in a swipeable/clickable gallery
   - Thumbnail navigation
   - Fullscreen option
4. **Video:** 
   - Embedded video player
   - Optional: YouTube/Vimeo embed or self-hosted
5. **3D Scan (conditional):**
   - Interactive 3D model viewer
   - Only for buildings with available 3D scans
   - Rotate/zoom controls

### 3.4 User Interface
- **Design Theme:** Scrapbook style visual aesthetic
  - Handwritten-style fonts for accents
  - Paper textures
  - Polaroid/photo frame styles for images
  - Tape/pin decorative elements
  - Warm, inviting color palette
- **Navigation:** 
  - Simple header/logo
  - Close button on modals
  - Back to map functionality
- **Responsive Design:**
  - Mobile-first approach
  - Tablet and desktop optimizations
  - Touch-friendly controls

---

## 4. Data Structure

### Building Data Schema
```json
{
  "id": "string (unique identifier)",
  "name": "string",
  "location": {
    "lat": "number",
    "lng": "number",
    "address": "string"
  },
  "description": "string (markdown supported)",
  "images": [
    {
      "url": "string",
      "caption": "string",
      "thumbnail": "string"
    }
  ],
  "video": {
    "url": "string",
    "type": "youtube|vimeo|direct",
    "thumbnail": "string"
  },
  "model3d": {
    "url": "string (optional)",
    "format": "gltf|glb|obj",
    "hasModel": "boolean"
  },
  "metadata": {
    "yearCompleted": "number",
    "projectType": "string",
    "tags": ["array of strings"]
  }
}
```

---

## 5. API Endpoints

### GET /api/buildings
- Returns array of all building data
- Response: `{ buildings: [...] }`

### GET /api/buildings/:id
- Returns single building data by ID
- Response: `{ building: {...} }`

### POST /api/buildings (Future Enhancement)
- Admin endpoint to add new buildings
- Requires authentication (future feature)

---

## 6. Development Steps for AI Agent

### Phase 1: Project Initialization
**Goal:** Set up the complete project structure with frontend and backend folders

**Steps:**
1. Create root project directory structure:
   ```
   interactive_map/
   ├── frontend/
   └── backend/
   ```

2. Initialize Frontend (React + Vite):
   - Navigate to `frontend/` directory
   - Run: `npm create vite@latest . -- --template react`
   - Install dependencies: `npm install`
   - Install required packages:
     ```
     npm install leaflet react-leaflet axios react-image-gallery react-player
     npm install @react-three/fiber @react-three/drei three
     ```
   - Create folder structure as defined in section 9

3. Initialize Backend (Express):
   - Navigate to `backend/` directory
   - Run: `npm init -y`
   - Install dependencies:
     ```
     npm install express cors dotenv
     npm install --save-dev nodemon
     ```
   - Create folder structure:
     ```
     backend/
     ├── src/
     │   ├── routes/
     │   ├── data/
     │   ├── middleware/
     │   └── server.js
     └── public/
         ├── images/
         ├── videos/
         └── models/
     ```

4. Create environment files:
   - Frontend `.env`:
     ```
     VITE_API_URL=http://localhost:3001
     VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
     ```
   - Backend `.env`:
     ```
     PORT=3001
     NODE_ENV=development
     CORS_ORIGIN=http://localhost:5173
     ```

5. Update package.json scripts:
   - Frontend: Add standard Vite scripts
   - Backend: Add `"start": "node src/server.js"` and `"dev": "nodemon src/server.js"`

---

### Phase 2: Backend Development
**Goal:** Create a functional Express API serving building data

**Steps:**

1. Create `backend/src/server.js`:
   - Import express, cors, dotenv
   - Configure middleware (cors, express.json, static files)
   - Set up port from environment variables
   - Import and use building routes
   - Add error handling middleware
   - Start server with console log

2. Create `backend/src/middleware/cors.js`:
   - Export CORS configuration
   - Allow origin from environment variable
   - Set appropriate headers for API requests

3. Create `backend/src/data/buildings.json`:
   - Create array with 2-3 sample buildings following the schema in section 4
   - Include realistic Kobe coordinates (lat: ~34.69, lng: ~135.19)
   - Add sample image URLs (placeholder or test images)
   - Include sample video URLs (YouTube embeds acceptable)
   - Mark one building with 3D model, others without

4. Create `backend/src/routes/buildings.js`:
   - Import express Router
   - Load buildings data from JSON file
   - Implement GET `/api/buildings` - return all buildings
   - Implement GET `/api/buildings/:id` - return single building by ID
   - Add 404 handling for missing building IDs
   - Export router

5. Test the backend:
   - Run `npm run dev` in backend directory
   - Test endpoints using browser or Postman:
     - GET http://localhost:3001/api/buildings
     - GET http://localhost:3001/api/buildings/1
   - Verify CORS headers are present
   - Verify JSON responses match schema

---

### Phase 3: Frontend Foundation & Map Implementation
**Goal:** Create basic React app with working Leaflet map

**Steps:**

1. Create `frontend/src/services/api.js`:
   - Import axios
   - Set base URL from environment variable
   - Export functions:
     - `fetchBuildings()` - GET all buildings
     - `fetchBuildingById(id)` - GET single building
   - Add error handling for network failures

2. Create `frontend/src/hooks/useFetchBuildings.js`:
   - Custom hook for fetching building data
   - Return: `{ buildings, loading, error }`
   - Use useEffect to fetch on mount
   - Handle loading and error states

3. Create `frontend/src/components/Map/Map.jsx`:
   - Import MapContainer, TileLayer from react-leaflet
   - Import Leaflet CSS in main.jsx or component
   - Set initial center to Kobe (lat: 34.6901, lng: 135.1955)
   - Set initial zoom level to 13
   - Configure map bounds to focus on Kobe area
   - Use OpenStreetMap tiles or Mapbox tiles
   - Make container responsive with CSS

4. Create `frontend/src/components/Map/Map.module.css`:
   - Set map container to full viewport height minus header
   - Add responsive breakpoints
   - Ensure map renders properly on mobile

5. Create `frontend/src/components/Map/CustomMarker.jsx`:
   - Import Marker, Popup from react-leaflet
   - Accept building prop
   - Create custom icon using Leaflet.icon (scrapbook style)
   - Position marker at building coordinates
   - Add click handler to trigger modal
   - Include simple popup with building name

6. Update `frontend/src/App.jsx`:
   - Import Map component and useFetchBuildings hook
   - Fetch buildings data
   - Pass buildings to Map component
   - Show loading state while fetching
   - Show error state if fetch fails
   - Render Map with building markers

7. Test the map:
   - Run `npm run dev` in frontend directory
   - Verify map loads centered on Kobe
   - Verify markers appear at correct locations
   - Verify clicking marker shows popup
   - Test on different screen sizes

---

### Phase 4: Building Detail Modal
**Goal:** Create interactive modal showing building details with media

**Steps:**

1. Create `frontend/src/components/UI/Modal.jsx`:
   - Generic modal component with backdrop
   - Props: isOpen, onClose, children
   - Add close button (X icon)
   - Handle ESC key to close
   - Prevent body scroll when open
   - Add fade-in animation
   - Make mobile-responsive with full-screen on small devices

2. Create `frontend/src/components/BuildingModal/PhotoGallery.jsx`:
   - Import react-image-gallery or create custom gallery
   - Accept images array prop
   - Display images in swipeable gallery
   - Show thumbnails below main image
   - Add fullscreen mode
   - Show captions for each image
   - Add scrapbook-style photo frames with CSS

3. Create `frontend/src/components/BuildingModal/VideoPlayer.jsx`:
   - Import react-player
   - Accept video prop (url, type)
   - Support YouTube, Vimeo, and direct video URLs
   - Add responsive wrapper
   - Show placeholder if no video
   - Add controls and play button
   - Style with scrapbook aesthetic

4. Create `frontend/src/components/BuildingModal/Model3DViewer.jsx`:
   - Import @react-three/fiber and @react-three/drei
   - Accept model3d prop
   - Render only if hasModel is true
   - Load 3D model using useGLTF or useLoader
   - Add OrbitControls for rotation/zoom
   - Add loading state while model loads
   - Add fallback message for no WebGL support
   - Add instructions text (drag to rotate, scroll to zoom)

5. Create `frontend/src/components/BuildingModal/BuildingModal.jsx`:
   - Import Modal, PhotoGallery, VideoPlayer, Model3DViewer
   - Accept props: building, isOpen, onClose
   - Layout structure:
     - Header: building name and location
     - Description section
     - Photo gallery section
     - Video section (if exists)
     - 3D model section (if exists)
   - Make scrollable if content overflows
   - Add smooth transitions between sections

6. Create `frontend/src/components/BuildingModal/BuildingModal.module.css`:
   - Implement scrapbook aesthetic:
     - Paper texture background
     - Handwritten fonts for headings
     - Polaroid-style photo frames
     - Decorative tape/pins on elements
     - Warm color palette (#F5F2E8, #E8DCC4, etc.)
   - Make sections responsive
   - Add proper spacing and typography
   - Style scrollbar

7. Update `frontend/src/components/Map/CustomMarker.jsx`:
   - Add onClick handler to open modal
   - Pass building data to parent component

8. Update `frontend/src/App.jsx`:
   - Add state for selected building and modal open/close
   - Pass modal handlers to Map/Markers
   - Render BuildingModal with selected building
   - Handle closing modal (set selectedBuilding to null)

9. Test the modal:
   - Click each marker and verify modal opens
   - Verify all content displays correctly
   - Test photo gallery navigation
   - Test video playback
   - Test 3D model interaction (if available)
   - Test close button and ESC key
   - Test on mobile devices

---

### Phase 5: Styling & Scrapbook Design
**Goal:** Apply consistent scrapbook aesthetic throughout the application

**Steps:**

1. Create `frontend/src/styles/global.css`:
   - Import Google Fonts (e.g., "Caveat" for handwriting, "Poppins" for body)
   - Set CSS custom properties for colors:
     ```css
     :root {
       --paper-bg: #F5F2E8;
       --paper-dark: #E8DCC4;
       --accent: #C89B7B;
       --text-dark: #3D3D3D;
       --shadow: rgba(0,0,0,0.1);
     }
     ```
   - Reset default margins/padding
   - Set base typography
   - Add smooth transitions globally

2. Create `frontend/src/styles/scrapbook-theme.css`:
   - Define reusable scrapbook classes:
     - `.paper-texture` - background with noise/texture
     - `.polaroid-frame` - photo frame style
     - `.tape-decoration` - CSS tape elements
     - `.pin-decoration` - CSS pin elements
     - `.handwritten` - handwritten font style
   - Add texture overlays using pseudo-elements
   - Create decorative border styles

3. Find or create scrapbook assets:
   - Paper texture images (place in `public/assets/textures/`)
   - Optional: tape/pin PNG images for decorations
   - Custom marker icon (scrapbook pin or marker style)

4. Update `frontend/src/components/Layout/Header.jsx`:
   - Create simple header with logo/title
   - Apply scrapbook styling
   - Add subtle shadow and paper texture
   - Make sticky/fixed on scroll (optional)

5. Update `frontend/src/components/Layout/Footer.jsx`:
   - Create simple footer with credits
   - Apply scrapbook styling
   - Include architectural firm name

6. Apply scrapbook styles to all components:
   - Map popup - paper texture background
   - Modal sections - decorative borders
   - Buttons - handwritten labels with hover effects
   - Photo gallery - polaroid frames
   - Video player - framed appearance

7. Implement responsive breakpoints:
   - Mobile: < 768px - stack elements, full-width modal
   - Tablet: 768px - 1024px - adjust spacing
   - Desktop: > 1024px - multi-column layouts where appropriate

8. Add subtle animations:
   - Marker bounce on hover
   - Modal fade/slide in
   - Photo gallery transitions
   - Button hover effects

9. Test design consistency:
   - Check all pages maintain scrapbook aesthetic
   - Verify responsive behavior at all breakpoints
   - Test animations are smooth
   - Ensure readability and accessibility

---

### Phase 6: Content Integration
**Goal:** Add all 10 buildings with complete media content

**Steps:**

1. Prepare building data:
   - Gather information for all 10 buildings
   - Get accurate GPS coordinates for each building in Kobe
   - Write descriptions (150-300 words each)
   - Collect metadata (year completed, project type, tags)

2. Prepare images:
   - Collect 5-10 photos per building
   - Optimize images:
     - Resize to max 1920px width
     - Convert to WebP format for smaller file size
     - Create thumbnails (300px width)
   - Name files systematically: `building-1-image-1.webp`
   - Place in `backend/public/images/`

3. Prepare videos:
   - For YouTube/Vimeo: collect embed URLs
   - For self-hosted: optimize videos (H.264, 1080p max)
   - Place self-hosted videos in `backend/public/videos/`
   - Create thumbnails for each video

4. Prepare 3D models (for buildings that have them):
   - Convert models to GLTF/GLB format
   - Optimize models (reduce poly count if > 100k triangles)
   - Compress textures
   - Ensure models are < 10MB each
   - Place in `backend/public/models/`

5. Update `backend/src/data/buildings.json`:
   - Add all 10 building entries following the schema
   - Ensure IDs are unique (1-10)
   - Double-check all coordinates are correct
   - Verify all file paths are correct
   - Test that JSON is valid (no syntax errors)

6. Configure static file serving:
   - Update `server.js` to serve public folder
   - Test accessing images via URL: `http://localhost:3001/images/building-1-image-1.webp`
   - Verify all media files are accessible

7. Test all building data:
   - Restart backend server
   - Verify API returns all 10 buildings
   - Click each marker on map
   - Verify all content loads in modal
   - Check images display correctly
   - Check videos play correctly
   - Check 3D models load correctly

8. Handle missing content gracefully:
   - Add conditional rendering for buildings without videos
   - Add conditional rendering for buildings without 3D models
   - Show placeholder or hide section if content missing

---

### Phase 7: Testing & Optimization
**Goal:** Ensure performance, compatibility, and accessibility

**Steps:**

1. Performance optimization:
   - Implement lazy loading for images using `loading="lazy"`
   - Code split components using React.lazy() and Suspense
   - Lazy load 3D viewer component (only load when needed)
   - Optimize bundle size - check with `npm run build`
   - Implement caching headers on backend
   - Compress API responses (gzip)

2. Cross-browser testing:
   - Test on Chrome, Firefox, Safari, Edge
   - Check map functionality in all browsers
   - Verify CSS compatibility (use autoprefixer)
   - Test video playback in all browsers
   - Test 3D models in WebGL-capable browsers

3. Mobile testing:
   - Test on actual iOS device (iPhone)
   - Test on actual Android device
   - Verify touch interactions work correctly
   - Check map zoom/pan on mobile
   - Verify modal scrolling on mobile
   - Test photo gallery swipe gestures
   - Check performance on slower devices

4. Accessibility improvements:
   - Add alt text to all images
   - Add ARIA labels to interactive elements
   - Ensure keyboard navigation works (tab through interface)
   - Test with screen reader (NVDA or VoiceOver)
   - Check color contrast ratios (use browser tools)
   - Add focus indicators for keyboard users
   - Add skip-to-content link

5. Error handling:
   - Add error boundaries in React
   - Handle network errors gracefully
   - Show user-friendly error messages
   - Add retry mechanism for failed API calls
   - Handle missing images with placeholders
   - Handle 3D model loading failures

6. SEO optimization:
   - Add meta tags in index.html (title, description)
   - Add Open Graph tags for social sharing
   - Create robots.txt if needed
   - Add structured data (JSON-LD) for buildings
   - Ensure proper heading hierarchy (h1, h2, h3)

7. Performance testing:
   - Use Lighthouse to audit performance
   - Aim for score > 90 on performance
   - Check initial page load time (should be < 3s)
   - Monitor memory usage during navigation
   - Test with throttled network (3G simulation)

---

### Phase 8: Deployment
**Goal:** Deploy application to Vercel for production use

**Steps:**

1. Prepare for deployment:
   - Create `.gitignore` files (exclude node_modules, .env, build)
   - Create production environment variables
   - Test production build locally:
     - Frontend: `npm run build` then `npm run preview`
     - Backend: `NODE_ENV=production npm start`

2. Create Vercel configuration for frontend:
   - Create `vercel.json` in frontend directory:
     ```json
     {
       "buildCommand": "npm run build",
       "outputDirectory": "dist",
       "framework": "vite"
     }
     ```

3. Deploy backend to Vercel:
   - Option A: Serverless Functions
     - Create `api/` folder in root
     - Convert Express routes to Vercel serverless functions
     - Deploy as API routes
   - Option B: Separate deployment
     - Deploy backend as separate Vercel project
     - Update CORS settings for production domain

4. Deploy frontend to Vercel:
   - Push code to GitHub repository
   - Connect repository to Vercel
   - Configure environment variables in Vercel dashboard:
     - `VITE_API_URL` = production backend URL
   - Deploy from main branch
   - Verify build succeeds

5. Configure custom domain (optional):
   - Add domain in Vercel dashboard
   - Update DNS settings
   - Wait for SSL certificate provisioning
   - Test HTTPS access

6. Post-deployment testing:
   - Test all features on production URL
   - Verify API calls work correctly
   - Check all media loads from production
   - Test on multiple devices and browsers
   - Monitor for errors in Vercel dashboard

7. Create documentation:
   - Update README.md with:
     - Project overview
     - Setup instructions
     - How to add new buildings
     - Deployment process
     - Troubleshooting guide
   - Document environment variables needed
   - Add screenshots of application

---

## 7. Non-Functional Requirements

### Performance
- Initial page load < 3 seconds
- Map marker interactions < 100ms response
- Image lazy loading for gallery
- Video on-demand loading
- Optimized 3D models (< 10MB per model)

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Alt text for all images
- ARIA labels for interactive elements
- Sufficient color contrast

### Security
- HTTPS enabled
- Input validation on API
- CORS properly configured
- No exposed sensitive data

---

## 8. Future Enhancements (Post-Launch)

### Phase 2 Features
- [ ] Admin panel for adding/editing buildings
- [ ] Search functionality
- [ ] Filter by project type/year
- [ ] Analytics integration
- [ ] User authentication
- [ ] Before/after image comparison slider
- [ ] Share functionality for individual buildings
- [ ] Print-friendly version
- [ ] Multi-language support (Japanese/English)

---

## 9. File Structure

```
interactive_map/
├── frontend/
│   ├── public/
│   │   └── assets/
│   │       ├── textures/
│   │       └── fonts/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map/
│   │   │   │   ├── Map.jsx
│   │   │   │   ├── Map.module.css
│   │   │   │   └── CustomMarker.jsx
│   │   │   ├── BuildingModal/
│   │   │   │   ├── BuildingModal.jsx
│   │   │   │   ├── BuildingModal.module.css
│   │   │   │   ├── PhotoGallery.jsx
│   │   │   │   ├── VideoPlayer.jsx
│   │   │   │   └── Model3DViewer.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── UI/
│   │   │       ├── Button.jsx
│   │   │       ├── Modal.jsx
│   │   │       └── Loading.jsx
│   │   ├── hooks/
│   │   │   ├── useFetchBuildings.js
│   │   │   └── useMap.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── scrapbook-theme.css
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js / next.config.js
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── buildings.js
│   │   ├── data/
│   │   │   └── buildings.json
│   │   ├── middleware/
│   │   │   └── cors.js
│   │   └── server.js
│   ├── public/
│   │   ├── images/
│   │   ├── videos/
│   │   └── models/
│   └── package.json
│
├── PROJECT_REQUIREMENTS.md
└── README.md
```

---

## 10. Key Libraries & Dependencies

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "axios": "^1.6.0",
  "react-image-gallery": "^1.3.0",
  "react-player": "^2.13.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "three": "^0.158.0"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

---

## 11. Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

### Backend (.env)
```
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 12. Success Criteria

- [ ] All 10 buildings displayed on map with correct coordinates
- [ ] Smooth marker interactions on desktop and mobile
- [ ] All media (images, videos, 3D models) load correctly
- [ ] Scrapbook aesthetic consistently applied throughout
- [ ] Mobile responsive on devices 320px width and above
- [ ] Page load performance meets targets
- [ ] Successfully deployed to Vercel
- [ ] Client approval of design and functionality

---

## 13. Maintenance & Updates

### Adding New Buildings
1. Create new entry in `buildings.json`
2. Upload media files to appropriate folders
3. Test locally
4. Deploy to Vercel (automatic via Git push)

### Content Updates
- Building descriptions can be updated in JSON
- Images/videos can be replaced in public folders
- No code changes required for content updates

---

## 14. Contact & Resources

- **Leaflet.js Documentation:** https://leafletjs.com/
- **React Leaflet:** https://react-leaflet.js.org/
- **Vercel Documentation:** https://vercel.com/docs
- **Three.js Documentation:** https://threejs.org/docs/

---

## Notes for AI Coding Agents

- Prioritize component modularity and reusability
- Use TypeScript for type safety (optional but recommended)
- Implement proper error boundaries in React
- Add loading states for all async operations
- Optimize images before deployment (WebP format preferred)
- Use lazy loading for heavy components (3D viewer, galleries)
- Implement proper SEO meta tags
- Consider adding a fallback for browsers without WebGL (3D models)
- Test on actual mobile devices, not just browser dev tools
- Keep accessibility in mind throughout development

---

**Last Updated:** December 1, 2025  
**Version:** 1.0
