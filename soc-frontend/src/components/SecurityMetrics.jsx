import { useEffect, useState } from 'react';

export default function SecurityMetrics() {
  const [metrics, setMetrics] = useState({
    firewallBlocked: 1247,
    intrusionAttempts: 89,
    malwareDetected: 34,
    vulnerabilities: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        firewallBlocked: prev.firewallBlocked + Math.floor(Math.random() * 5),
        intrusionAttempts: prev.intrusionAttempts + Math.floor(Math.random() * 3),
        malwareDetected: prev.malwareDetected + Math.floor(Math.random() * 2),
        vulnerabilities: Math.max(0, prev.vulnerabilities + Math.floor(Math.random() * 2) - 1)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
      <div className="panel" style={{ padding: '12px' }}>
        <div className="panel-title" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>🛡️ FIREWALL</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#00ff41', marginBottom: '5px' }}>
            {metrics.firewallBlocked}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#999' }}>THREATS BLOCKED</div>
          <div style={{ marginTop: '10px', height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, #00ff41, #00aa00)' }} />
          </div>
          <div style={{ fontSize: '0.6rem', color: '#00ff41', marginTop: '3px' }}>87% EFFICIENCY</div>
        </div>
      </div>

      <div className="panel" style={{ padding: '12px' }}>
        <div className="panel-title" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>🚨 INTRUSION</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ff0000', marginBottom: '5px' }}>
            {metrics.intrusionAttempts}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#999' }}>ATTEMPTS</div>
          <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '0.6rem' }}>
            <div style={{ padding: '5px', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid #ff0000', borderRadius: '3px' }}>
              <div style={{ color: '#ff0000', fontSize: '0.9rem', fontWeight: '700' }}>67</div>
              <div style={{ color: '#999' }}>SQL</div>
            </div>
            <div style={{ padding: '5px', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid #ff0000', borderRadius: '3px' }}>
              <div style={{ color: '#ff0000', fontSize: '0.9rem', fontWeight: '700' }}>22</div>
              <div style={{ color: '#999' }}>XSS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ padding: '12px' }}>
        <div className="panel-title" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>🦠 MALWARE</div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff6b6b' }}>{metrics.malwareDetected}</div>
              <div style={{ fontSize: '0.6rem', color: '#999' }}>DETECTED</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#00ff41' }}>98.5%</div>
              <div style={{ fontSize: '0.6rem', color: '#999' }}>CLEAN</div>
            </div>
          </div>
          <div style={{ fontSize: '0.6rem', color: '#666' }}>
            <div>▸ Scanned: 45,892</div>
            <div>▸ Quarantined: 34</div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ padding: '12px' }}>
        <div className="panel-title" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>⚠️ VULNERABILITIES</div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid #ff0000', borderRadius: '3px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ff0000' }}>3</div>
              <div style={{ fontSize: '0.6rem', color: '#999' }}>CRITICAL</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255, 107, 107, 0.1)', border: '1px solid #ff6b6b', borderRadius: '3px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ff6b6b' }}>9</div>
              <div style={{ fontSize: '0.6rem', color: '#999' }}>HIGH</div>
            </div>
          </div>
          <div style={{ fontSize: '0.6rem', color: '#666' }}>
            <div>▸ Patches: 8</div>
            <div>▸ Attention: 4</div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ gridColumn: '1 / -1', padding: '12px' }}>
        <div className="panel-title" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>📊 SECURITY SCORE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ flex: '0 0 150px', textAlign: 'center', padding: '15px', background: 'rgba(0, 255, 65, 0.05)', border: '2px solid #00ff41', borderRadius: '8px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#00ff41' }}>
              8.7
            </div>
            <div style={{ fontSize: '0.65rem', color: '#999', marginTop: '5px' }}>
              OVERALL RATING
            </div>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {[
              { label: 'NETWORK', score: 9.2, color: '#00ff41' },
              { label: 'ENDPOINT', score: 8.5, color: '#00ff41' },
              { label: 'APPLICATION', score: 7.8, color: '#ffff00' },
              { label: 'DATA', score: 9.0, color: '#00ff41' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '10px', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid #333', borderRadius: '5px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: item.color }}>{item.score}</div>
                <div style={{ color: '#999', marginTop: '3px', fontSize: '0.65rem' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
