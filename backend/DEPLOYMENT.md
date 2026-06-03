# 🔴 FastBack - Security Backend Deployment Guide

## 🐛 Bugs Fixed

1. **app/modules/alerts/router.py** - Fixed `get_db` not being called as function
2. **app/core/event_manager.py** - Fixed datetime serialization for WebSocket JSON broadcast

## 🚀 Deployment Instructions

### Local Development

```bash
cd fastback
python -m venv myenv
myenv\Scripts\activate  # Windows
source myenv/bin/activate  # Linux/Mac

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Deployment

#### Option 1: Docker

Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t fastback .
docker run -p 8000:8000 -e MONGODB_URL=mongodb://your-mongo:27017 fastback
```

#### Option 2: Linux Server with Systemd

Create `/etc/systemd/system/fastback.service`:
```ini
[Unit]
Description=FastBack Security API
After=network.target

[Service]
User=www-data
WorkingDirectory=/opt/fastback
Environment="MONGODB_URL=mongodb://localhost:27017"
ExecStart=/opt/fastback/myenv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable fastback
sudo systemctl start fastback
```

#### Option 3: AWS/Cloud

Deploy using:
- **AWS Elastic Beanstalk** - Easy Python deployment
- **AWS ECS/Fargate** - Docker containers
- **DigitalOcean App Platform** - Simple deployment
- **Heroku** - Quick deployment

### Environment Variables

Create `.env` file:
```env
MONGODB_URL=mongodb://your-mongo-host:27017
DB_NAME=security_db
APP_NAME=Enterprise Security Backend
VERSION=1.0.0
```

### MongoDB Setup

Ensure MongoDB is running and accessible:
```bash
# Local
mongod --dbpath /data/db

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Cloud
# Use MongoDB Atlas: https://www.mongodb.com/cloud/atlas
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### CORS Configuration

Already configured in `app/main.py` to allow all origins. For production, restrict to your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔌 API Endpoints

- `GET /` - Health check
- `GET /events?limit=50` - Get security events
- `GET /alerts?limit=50` - Get security alerts
- `POST /antivirus/scan?file_name=<name>` - Scan file
- `WS /ws/soc` - WebSocket for real-time events

## 📊 Testing

```bash
# Health check
curl http://localhost:8000/

# Get events
curl http://localhost:8000/events

# Scan file
curl -X POST "http://localhost:8000/antivirus/scan?file_name=test.exe"

# WebSocket test (using wscat)
npm install -g wscat
wscat -c ws://localhost:8000/ws/soc
```

## 🔒 Security Recommendations

1. Use environment variables for sensitive data
2. Enable HTTPS in production
3. Restrict CORS to specific domains
4. Implement authentication/authorization
5. Use MongoDB authentication
6. Set up firewall rules
7. Regular security updates

## 📦 Requirements

See `requirements.txt` for all dependencies. Key packages:
- fastapi
- uvicorn
- motor (async MongoDB)
- pydantic-settings
