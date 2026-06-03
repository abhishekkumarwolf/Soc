import { useEffect, useState } from "react";
import { getAlerts } from "../api/api";

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    getAlerts().then(setAlerts);
    const interval = setInterval(() => {
      getAlerts().then(setAlerts);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityIcon = (severity) => {
    const icons = {
      CRITICAL: '☠',
      HIGH: '⚠',
      MEDIUM: '▲',
      LOW: '●'
    };
    return icons[severity] || '●';
  };

  const filteredAlerts = filter === 'ALL' 
    ? alerts 
    : alerts.filter(a => a.severity === filter);

  return (
    <div className="panel" style={{ borderColor: "#ff0000" }}>
      <div className="panel-title" style={{ color: "#ff0000", textShadow: '0 0 20px #ff0000' }}>
        <span>☠ [ACTIVE_THREATS] ☠</span>
        <span style={{ 
          fontSize: '0.8rem', 
          background: '#ff0000', 
          color: '#000', 
          padding: '2px 8px',
          fontWeight: '700',
          borderRadius: '2px'
        }}>
          {alerts.length}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', flexWrap: 'wrap' }}>
        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
          <button
            key={sev}
            onClick={() => setFilter(sev)}
            style={{
              padding: '5px 10px',
              fontSize: '0.7rem',
              background: filter === sev ? '#ff0000' : 'transparent',
              color: filter === sev ? '#000' : '#ff3131',
              borderColor: '#ff0000'
            }}
          >
            {sev}
          </button>
        ))}
      </div>

      <div style={{ height: "350px", overflowY: "auto" }}>
        {filteredAlerts.length === 0 && (
          <div style={{ 
            color: "#8b0000", 
            padding: "20px",
            textAlign: 'center',
            border: '2px dashed #8b0000',
            background: 'rgba(139, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✓</div>
            <div>NO {filter} THREATS DETECTED</div>
          </div>
        )}
        {filteredAlerts.map((a, i) => (
          <div 
            key={i} 
            className="terminal-text"
            style={{ 
              margin: "10px 0", 
              padding: "12px", 
              border: "2px solid rgba(255, 0, 0, 0.5)",
              background: "rgba(255, 0, 0, 0.08)",
              boxShadow: '0 0 15px rgba(255, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '3px',
              background: '#ff0000',
              animation: 'border-glow 2s infinite'
            }} />
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: 'center' }}>
              <b style={{ color: "#ff0000", fontSize: '1rem', textShadow: '0 0 10px #ff0000' }}>
                {getSeverityIcon(a.severity)} {a.title?.toUpperCase()}
              </b>
              <span 
                className={`severity-${a.severity?.toLowerCase()}`}
                style={{ fontWeight: '700', fontSize: '0.85rem' }}
              >
                [{a.severity?.toUpperCase()}]
              </span>
            </div>
            
            <div style={{ fontSize: "0.85rem", color: "#ff6b6b", marginBottom: '8px', lineHeight: '1.4' }}>
              {a.message}
            </div>
            
            <div style={{ 
              fontSize: "0.75rem", 
              marginTop: "10px", 
              paddingTop: '8px',
              borderTop: '1px solid rgba(139, 0, 0, 0.5)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '5px'
            }}>
              <div style={{ color: "#8b0000" }}>
                ▸ STATUS: <span style={{ color: '#ff3131' }}>{a.status?.toUpperCase()}</span>
              </div>
              <div style={{ color: "#8b0000" }}>
                ▸ SOURCE: <span style={{ color: '#ff3131' }}>{a.source?.toUpperCase()}</span>
              </div>
              <div style={{ color: "#8b0000" }}>
                ▸ TYPE: <span style={{ color: '#ff3131' }}>{a.event_type?.toUpperCase()}</span>
              </div>
              <div style={{ color: "#8b0000" }}>
                ▸ ID: <span style={{ color: '#ff3131' }}>{a._id?.slice(-8)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}