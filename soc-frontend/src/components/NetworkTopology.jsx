import { useEffect, useState } from 'react';

export default function NetworkTopology() {
  const [activeConnections, setActiveConnections] = useState([]);
  const [hoveredDevice, setHoveredDevice] = useState(null);
  const [deviceStats, setDeviceStats] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnections(
        Array.from({ length: 3 }, () => Math.floor(Math.random() * 8))
      );
      // Update device stats
      const stats = {};
      devices.forEach(device => {
        stats[device.id] = {
          cpu: Math.floor(Math.random() * 100),
          disk: Math.floor(Math.random() * 100),
          memory: Math.floor(Math.random() * 100),
          security: Math.random() > 0.8 ? 'Warning' : 'Secure'
        };
      });
      setDeviceStats(stats);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const devices = [
    { id: 'router', label: 'ROUTER', x: 50, y: 20, color: '#ff0000', icon: '🌐', desc: 'Main network gateway' },
    { id: 'firewall', label: 'FIREWALL', x: 50, y: 40, color: '#ff3131', icon: '🛡️', desc: 'Network security barrier' },
    { id: 'switch', label: 'SWITCH', x: 50, y: 60, color: '#ff6b6b', icon: '🔀', desc: 'Network traffic distributor' },
    { id: 'server1', label: 'SERVER-1', x: 20, y: 85, color: '#00ff41', icon: '🖥️', desc: 'Application server' },
    { id: 'server2', label: 'SERVER-2', x: 40, y: 85, color: '#00ff41', icon: '🖥️', desc: 'Web server' },
    { id: 'db', label: 'DATABASE', x: 60, y: 85, color: '#00d4ff', icon: '💾', desc: 'Data storage server' },
    { id: 'client1', label: 'CLIENT-1', x: 80, y: 85, color: '#ffff00', icon: '💻', desc: 'Workstation endpoint' },
    { id: 'client2', label: 'CLIENT-2', x: 100, y: 85, color: '#ffff00', icon: '💻', desc: 'Workstation endpoint' }
  ];

  const connections = [
    { from: 'router', to: 'firewall' },
    { from: 'firewall', to: 'switch' },
    { from: 'switch', to: 'server1' },
    { from: 'switch', to: 'server2' },
    { from: 'switch', to: 'db' },
    { from: 'switch', to: 'client1' },
    { from: 'switch', to: 'client2' }
  ];

  return (
    <div className="panel" style={{ gridColumn: '1 / -1', background: 'transparent', border: 'none', boxShadow: 'none' }}>
      <div className="panel-title">🌐 NETWORK TOPOLOGY</div>
      <div style={{ position: 'relative', height: '400px', padding: '20px', overflow: 'visible' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {connections.map((conn, i) => {
            const from = devices.find(d => d.id === conn.from);
            const to = devices.find(d => d.id === conn.to);
            const isActive = activeConnections.includes(i);
            
            return (
              <line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={isActive ? '#00ff41' : '#333'}
                strokeWidth={isActive ? '3' : '2'}
                style={{
                  transition: 'all 0.3s',
                  filter: isActive ? 'drop-shadow(0 0 5px #00ff41)' : 'none'
                }}
              />
            );
          })}
        </svg>

        {devices.map((device) => {
          const stats = deviceStats[device.id] || { cpu: 0, disk: 0, memory: 0, security: 'Unknown' };
          return (
            <div
              key={device.id}
              style={{
                position: 'absolute',
                left: `${device.x}%`,
                top: `${device.y}%`,
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                transition: 'all 0.3s',
                zIndex: hoveredDevice === device.id ? 2000 : 1
              }}
              onMouseEnter={() => setHoveredDevice(device.id)}
              onMouseLeave={() => setHoveredDevice(null)}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${device.color}20, ${device.color}40)`,
                  border: `2px solid ${device.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: `0 0 20px ${device.color}50`,
                  animation: 'pulse 2s infinite',
                  cursor: 'pointer'
                }}
              >
                {device.icon}
              </div>
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '0.65rem',
                  color: device.color,
                  fontWeight: '600',
                  textShadow: `0 0 5px ${device.color}`,
                  letterSpacing: '0.5px'
                }}
              >
                {device.label}
              </div>
              
              {hoveredDevice === device.id && (
                <div
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: `2px solid ${device.color}`,
                    borderRadius: '8px',
                    padding: '12px',
                    minWidth: '180px',
                    zIndex: 9999,
                    boxShadow: `0 0 20px ${device.color}80`,
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ color: device.color, fontWeight: 'bold', marginBottom: '8px', borderBottom: `1px solid ${device.color}40`, paddingBottom: '4px' }}>
                    {device.label}
                  </div>
                  <div style={{ color: '#aaa', marginBottom: '6px', fontSize: '0.7rem' }}>{device.desc}</div>
                  <div style={{ color: stats.cpu > 80 ? '#ff3131' : '#00ff41', marginBottom: '3px' }}>CPU: {stats.cpu}%</div>
                  <div style={{ color: stats.disk > 80 ? '#ff3131' : '#00ff41', marginBottom: '3px' }}>Disk: {stats.disk}%</div>
                  <div style={{ color: stats.memory > 80 ? '#ff3131' : '#00ff41', marginBottom: '3px' }}>Memory: {stats.memory}%</div>
                  <div style={{ color: stats.security === 'Secure' ? '#00ff41' : '#ff3131' }}>Security: {stats.security}</div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px', 
          fontSize: '0.7rem',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #333'
        }}>
          <div style={{ marginBottom: '5px', color: '#00ff41' }}>● ACTIVE: 7 devices</div>
          <div style={{ marginBottom: '5px', color: '#ffff00' }}>● TRAFFIC: 2.4 Gbps</div>
          <div style={{ color: '#00d4ff' }}>● LATENCY: 12ms</div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
