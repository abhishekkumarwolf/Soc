import { useEffect, useState, useRef } from "react";
import { WS_URL, getEvents } from "../api/api";

export default function EventFeed() {
  const [events, setEvents] = useState([]);
  const [connected, setConnected] = useState(false);
  const feedRef = useRef(null);

  useEffect(() => {
    getEvents().then(setEvents);

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "security_event") {
        setEvents((prev) => [data.data, ...prev].slice(0, 100));
      }
    };

    return () => ws.close();
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      CRITICAL: '#ff0000',
      HIGH: '#ff3131',
      MEDIUM: '#ff6b6b',
      LOW: '#ff9999'
    };
    return colors[severity] || '#ff9999';
  };

  return (
    <div className="panel">
      <div className="panel-title">
        <span>■ [LIVE_EVENT_STREAM] ■</span>
        <span style={{ 
          fontSize: "0.7rem", 
          color: connected ? '#ff0000' : '#8b0000',
          animation: connected ? 'pulse-red 1s infinite' : 'none'
        }}>
          {connected ? '● LIVE' : '○ DISCONNECTED'}
        </span>
      </div>
      
      <div 
        ref={feedRef}
        className="terminal-text"
        style={{ 
          height: "400px", 
          overflowY: "auto",
          padding: "10px",
          background: "rgba(0,0,0,0.5)",
          border: '1px solid #8b0000'
        }}
      >
        {events.length === 0 && (
          <div style={{ color: "#8b0000", textAlign: 'center', marginTop: '50px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⌛</div>
            <div>AWAITING SECURITY EVENTS...</div>
          </div>
        )}
        {events.map((e, i) => (
          <div 
            key={i} 
            style={{ 
              marginBottom: "12px", 
              borderLeft: `3px solid ${getSeverityColor(e.severity)}`, 
              paddingLeft: "10px",
              background: 'rgba(139, 0, 0, 0.05)',
              padding: '8px',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: "#8b0000", fontSize: '0.75rem' }}>
                [{e.timestamp ? new Date(e.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString()}]
              </span>
              <span 
                className={`severity-${e.severity?.toLowerCase() || 'low'}`}
                style={{ fontWeight: '700', fontSize: '0.8rem' }}
              >
                [{e.severity || 'UNKNOWN'}]
              </span>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <span style={{ color: '#ff3131', fontWeight: '700' }}>
                [{e.event_type?.toUpperCase() || 'EVENT'}]
              </span>{" "}
              <span style={{ color: '#ff6b6b' }}>{e.message}</span>
            </div>
            {e.metadata && Object.keys(e.metadata).length > 0 && (
              <div style={{ fontSize: "0.75rem", color: "#8b0000", marginTop: '5px' }}>
                {Object.entries(e.metadata).map(([key, val]) => (
                  <div key={key}>▸ {key.toUpperCase()}: {val}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}