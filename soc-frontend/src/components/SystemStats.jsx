import { useEffect, useState } from 'react';

export default function SystemStats() {
  const [stats, setStats] = useState({
    uptime: 0,
    threats: 0,
    scans: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        uptime: prev.uptime + 1,
        threats: Math.floor(Math.random() * 100),
        scans: prev.scans + Math.floor(Math.random() * 3)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      padding: '10px',
      background: 'rgba(139, 0, 0, 0.1)',
      border: '1px solid #8b0000',
      fontFamily: 'Courier New, monospace',
      fontSize: '0.85rem'
    }}>
      <div style={{ color: '#ff3131' }}>
        <span style={{ color: '#8b0000' }}>▸ UPTIME:</span> {formatUptime(stats.uptime)}
      </div>
      <div style={{ color: '#ff3131' }}>
        <span style={{ color: '#8b0000' }}>▸ THREATS_BLOCKED:</span> {stats.threats}
      </div>
      <div style={{ color: '#ff3131' }}>
        <span style={{ color: '#8b0000' }}>▸ TOTAL_SCANS:</span> {stats.scans}
      </div>
      <div style={{ color: '#ff0000', animation: 'pulse-red 1s infinite' }}>
        <span style={{ color: '#8b0000' }}>▸ STATUS:</span> ⚠ ACTIVE
      </div>
    </div>
  );
}
