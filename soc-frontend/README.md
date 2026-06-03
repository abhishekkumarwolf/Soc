# 🔴 CYBER-SOC TERMINAL - Hardcore Hacker Frontend

A deadly red/black themed security operations center frontend with Matrix visualization, inspired by Nmap and cybersecurity tools.

## 🎨 Features

- **Matrix Rain Background** - Animated red matrix effect
- **Real-time Event Streaming** - WebSocket connection for live security events
- **Malware Scanner** - File scanning with visual feedback
- **Active Threats Panel** - Filterable alert system with severity levels
- **Hardcore Hacker Aesthetic** - Red/black color scheme with glowing effects

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Backend server running (FastAPI)

### Installation

```bash
cd frontend/soc-frontend
npm install
```

### Development

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔧 Configuration

### Connecting to Backend

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and set your backend URL:
```env
VITE_API_BASE_URL=http://your-backend-server:8000
```

### For Different Servers

If deploying frontend and backend on different servers:

1. **Update `.env` file** with your backend server URL
2. **Ensure CORS is enabled** on backend (already configured in main.py)
3. **Use HTTPS** for production deployments

Example for production:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

### Deploy Static Files

Upload the `dist/` folder to any static hosting:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Nginx/Apache server

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-frontend-domain.com;
    
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔌 Backend Connection

The frontend connects to these backend endpoints:

- `GET /events` - Fetch security events
- `GET /alerts` - Fetch active alerts
- `POST /antivirus/scan?file_name=<name>` - Scan files
- `WS /ws/soc` - WebSocket for real-time updates

## 🎯 Backend Bugs Fixed

1. **alerts/router.py** - Fixed `get_db` function call
2. **event_manager.py** - Fixed datetime serialization for WebSocket broadcast

## 🎨 Theme Customization

Edit `src/index.css` to customize colors:

```css
:root {
  --hacker-red: #ff0000;
  --blood-red: #8b0000;
  --neon-red: #ff3131;
  --matrix-green: #00ff41;
}
```

## 📱 Components

- **MatrixBackground** - Animated matrix rain effect
- **ScanForm** - File scanning interface
- **EventFeed** - Live security event stream
- **AlertPanel** - Active threats with filtering

## 🔒 Security Notes

- Never commit `.env` file with production credentials
- Use HTTPS in production
- Configure proper CORS settings on backend
- Implement authentication for production use

## 🐛 Troubleshooting

### WebSocket Connection Failed
- Check backend URL in `.env`
- Ensure backend is running
- Verify CORS settings
- Check firewall rules

### API Calls Failing
- Verify `VITE_API_BASE_URL` in `.env`
- Check backend server is accessible
- Inspect browser console for errors

## 📄 License

MIT
