# Vercel Deployment Guide

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Git repository connected to Vercel

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Your Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

2. **Configure Environment Variables**
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add the following:
     - `VITE_API_URL`: Set to your Vercel deployment URL (or leave empty, it will auto-detect)
     - `VITE_MAP_TILE_URL`: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Project Structure

```
interactive_map/
├── api/                    # Vercel Serverless Functions
│   ├── buildings.js       # Buildings API endpoint
│   ├── health.js          # Health check endpoint
│   └── static/            # Static file serving
│       └── [...path].js   # Dynamic static file handler
├── backend/               # Original Express backend (for local dev)
│   ├── public/           # Static assets (images, 3D models)
│   └── src/
│       └── data/         # Building data JSON
├── frontend/             # React frontend (Vite)
│   ├── src/
│   ├── .env              # Local development variables
│   └── .env.production   # Production variables template
├── vercel.json           # Vercel configuration
└── package.json          # Root package.json for build commands
```

## How It Works

### Production (Vercel)
- **Frontend**: Served as static files from `frontend/dist/`
- **API**: Runs as Vercel Serverless Functions in `/api` folder
- **Static Assets**: Images and 3D models served via `/api/static/[...path].js`
- **Routing**: 
  - `/api/*` → Serverless functions
  - `/images/*` → Static file handler
  - `/models/*` → Static file handler
  - `/*` → Frontend SPA

### Local Development
- **Backend**: Run Express server on port 3001
  ```bash
  cd backend && npm run dev
  ```
- **Frontend**: Run Vite dev server on port 5173
  ```bash
  cd frontend && npm run dev
  ```
- **Both**: Run concurrently from root
  ```bash
  npm run dev
  ```

## Environment Variables

### Development (`.env`)
```env
VITE_API_URL=http://localhost:3001
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

### Production (Vercel Dashboard)
```env
VITE_API_URL=https://your-project.vercel.app
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

Note: In production, if `VITE_API_URL` is empty, the app will use relative URLs (recommended for Vercel).

## Troubleshooting

### Build Fails
- Check that all dependencies are in `frontend/package.json`
- Ensure Node.js version is compatible (18.x or later)
- Verify `vercel.json` configuration is correct

### API Not Working
- Check Vercel function logs in the dashboard
- Ensure API routes in `vercel.json` are correct
- Verify CORS settings in API functions

### Static Files Not Loading
- Check that files exist in `backend/public/`
- Verify paths in `buildings.json` match actual file locations
- Check browser console for 404 errors

### Environment Variables Not Working
- Vite env vars must be prefixed with `VITE_`
- Set variables in Vercel dashboard, not in `.env` files
- Redeploy after changing environment variables

## Additional Notes

- **First Deploy**: May take 2-3 minutes to build
- **Subsequent Deploys**: Usually under 1 minute
- **Auto-Deploy**: Enabled by default on push to main branch
- **Preview Deploys**: Created automatically for pull requests
- **Custom Domain**: Can be added in Vercel dashboard under Settings → Domains

## Support

For issues:
1. Check Vercel deployment logs
2. Review function logs in Vercel dashboard
3. Test API endpoints directly (e.g., `/api/health`)
4. Check browser console for frontend errors
