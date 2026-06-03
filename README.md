# SOC — Security Operations Center

A full-stack security monitoring dashboard with real-time event streaming, threat detection visualization, and interactive network topology mapping.

![Tech Stack](https://img.shields.io/badge/stack-FastAPI%20%7C%20React%20%7C%20MongoDB%20%7C%20WebSocket-red)
![Status](https://img.shields.io/badge/status-development-yellow)

---

## Architecture Overview

```
┌──────────────────────┐      REST/WS       ┌──────────────────────┐
│   Frontend           │ ◄─────────────────► │   Backend            │
│   React + Vite       │                     │   FastAPI + Motor    │
│   soc-frontend/      │                     │   backend/           │
└──────────────────────┘                     └──────────┬───────────┘
                                                        │
                                              ┌─────────▼───────────┐
                                              │   MongoDB            │
                                              │   security_db        │
                                              └─────────────────────┘
```

---

## Features

### Backend (FastAPI)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/events` | GET | Retrieve security events (paginated) |
| `/alerts` | GET | Retrieve security alerts (paginated) |
| `/antivirus/scan` | POST | Simulate file malware scan |
| `/ws/soc` | WebSocket | Real-time event stream |

- **Event-driven alerting** — HIGH/CRITICAL severity events auto-generate alerts
- **Real-time broadcasting** — WebSocket push to all connected clients
- **MongoDB persistence** — Async Motor driver for non-blocking DB operations

### Frontend (React)

- **Matrix rain animation** — Red katakana canvas background
- **Live Event Feed** — WebSocket-connected real-time security event viewer
- **Alert Panel** — Filterable active threats with auto-polling
- **Malware Scanner UI** — Scan simulation with visual feedback
- **Network Traffic Monitor** — Bar chart, protocol pie chart, live packet view
- **Interactive Topology Map** — SVG network graph with 8 device nodes and hover stats
- **Security Metrics Dashboard** — 4-panel score overview (firewall, intrusion, malware, vulns)
- **Analytics Viewer** — Log table with category sidebar, search, filters, and detail panel
- **System Status** — Live uptime, threats blocked, scan counters
- **Hacker Terminal Theme** — Black/red aesthetic with glow effects and monospace typography

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Python 3.11+ | Runtime |
| FastAPI | Async web framework |
| Uvicorn | ASGI server |
| MongoDB + Motor | Database & async driver |
| Pydantic | Data validation & settings |
| WebSocket | Real-time bidirectional communication |

### Frontend

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| CSS Custom Properties | Theming (hacker aesthetic) |
| WebSocket API | Real-time event streaming |
| Canvas API | Matrix rain animation |
| SVG | Network topology & charts |

---

## Concepts Used

### Architectural Patterns

- **Modular Monolith** — Backend features split into self-contained modules (`antivirus/`, `events/`, `alerts/`, `streaming/`), each with its own router and service layer
- **Component-Based Architecture** — Frontend composed of independent, reusable React components
- **Manager Pattern** — Core backend logic encapsulated in manager classes (`EventManager`, `AlertManager`, `StreamManager`)
- **Singleton Pattern** — `StreamManager` and `logStore` exist as single shared instances
- **Observer Pattern** — `logStore` implements publish/subscribe for log distribution to subscribers
- **Conditional Rendering** — Tab-based navigation uses state-driven conditional rendering instead of a router library

### System Design Concepts

- **Event-Driven Architecture** — Security events trigger downstream alerts and WebSocket broadcasts, decoupling producers from consumers
- **Real-Time Streaming** — WebSocket provides persistent bidirectional channel for live security event delivery
- **Polling vs Push** — Alert panel uses polling (5s interval); event feed uses WebSocket push — demonstrating both data-fetching strategies
- **Async/Await** — Fully asynchronous Python backend using `asyncio` with non-blocking MongoDB I/O via Motor
- **Simulated Threat Detection** — Antivirus service demonstrates detection logic by pattern-matching file names

### Frontend Concepts

- **Single-Page Application (SPA)** — All views rendered client-side without page reloads
- **State Management** — Component-local state with `useState`/`useEffect`; shared singleton store for cross-component log data
- **CSS Theming** — Global design tokens via CSS custom properties for consistent hacker aesthetic
- **Canvas Rendering** — Matrix rain animation drawn directly on an HTML5 Canvas element
- **SVG Data Visualization** — Network topology map and protocol pie chart rendered with inline SVG

### API & Data Concepts

- **RESTful Endpoints** — CRUD-style HTTP endpoints for events, alerts, and scans
- **WebSocket Protocol** — Persistent connection for real-time event broadcasting
- **Data Validation** — Pydantic models enforce schema on all incoming/outgoing data
- **Environment-Based Configuration** — `pydantic-settings` (backend) and `VITE_*` env vars (frontend) manage environment-specific config

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20+
- MongoDB (local or Docker)

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd soc-frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `soc-frontend/.env` (defaults to `http://127.0.0.1:8000`).

---

## Environment Variables

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URL` | `mongodb://localhost:27017` | MongoDB connection string |
| `DB_NAME` | `security_db` | Database name |
| `APP_NAME` | `Enterprise Security Backend` | Application name |
| `VERSION` | `1.0.0` | API version |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | Backend API base URL |

---

## MongoDB Collections

| Collection | Description |
|------------|-------------|
| `security_events` | Security events with type, source, severity, timestamp |
| `security_alerts` | Auto-generated alerts from HIGH/CRITICAL events |
| `file_scans` | Malware scan results |

---

## Project Structure

```
Soc/
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py                  # FastAPI entry point
│       ├── core/
│       │   ├── config.py            # Settings & env config
│       │   ├── mongodb.py           # MongoDB connection (Motor)
│       │   ├── event_manager.py     # Event creation + alert trigger
│       │   ├── alert_manager.py     # Alert creation
│       │   └── stream_manager.py    # WebSocket broadcast manager
│       ├── models/
│       │   ├── event_model.py       # SecurityEvent schema
│       │   └── alert_model.py       # SecurityAlert schema
│       └── modules/
│           ├── antivirus/           # Scan router + service
│           ├── events/              # Events router
│           ├── alerts/              # Alerts router
│           └── streaming/           # WebSocket router
│
├── soc-frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx                 # React entry point
│       ├── App.jsx                  # Root component + routing
│       ├── api/api.js              # API client
│       ├── logStore.js             # Log simulation store
│       └── components/
│           ├── Navbar.jsx
│           ├── MatrixBackground.jsx
│           ├── EventFeed.jsx
│           ├── AlertPanel.jsx
│           ├── ScanForm.jsx
│           ├── SystemStats.jsx
│           ├── Analytics.jsx
│           ├── SecurityMetrics.jsx
│           ├── NetworkTraffic.jsx
│           └── NetworkTopology.jsx
│
└── README.md
```

---

## License

MIT
