import { useEffect, useState } from 'react';

export default function NetworkTraffic() {
  const [traffic, setTraffic] = useState([]);
  const [packets, setPackets] = useState([]);
  const [protocolData, setProtocolData] = useState([
    { name: 'HTTP', value: 35, color: '#ff0000' },
    { name: 'HTTPS', value: 45, color: '#ff3131' },
    { name: 'TCP', value: 15, color: '#ff6b6b' },
    { name: 'UDP', value: 5, color: '#ff9999' }
  ]);

  useEffect(() => {
    const generateTraffic = () => {
      const newData = {
        timestamp: new Date().toLocaleTimeString(),
        incoming: Math.floor(Math.random() * 100),
        outgoing: Math.floor(Math.random() * 80),
        blocked: Math.floor(Math.random() * 20)
      };
      setTraffic(prev => [...prev.slice(-20), newData]);
    };

    const generatePacket = () => {
      const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS'];
      const protocol = protocols[Math.floor(Math.random() * 4)];
      
      const packet = {
        id: Date.now(),
        src: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        dst: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        port: Math.floor(Math.random() * 65535),
        protocol: protocol,
        status: Math.random() > 0.8 ? 'BLOCKED' : 'ALLOWED'
      };
      setPackets(prev => [packet, ...prev.slice(0, 15)]);
      
      // Update pie chart based on packet protocol
      setProtocolData(prevData => {
        const updated = prevData.map(item => {
          if (item.name === protocol) {
            return { ...item, value: Math.min(item.value + 1, 100) };
          }
          return { ...item, value: Math.max(item.value - 0.2, 1) };
        });
        
        // Normalize to 100%
        const total = updated.reduce((sum, item) => sum + item.value, 0);
        return updated.map(item => ({
          ...item,
          value: Math.round((item.value / total) * 100)
        }));
      });
    };

    const trafficInterval = setInterval(generateTraffic, 1000);
    const packetInterval = setInterval(generatePacket, 500);

    return () => {
      clearInterval(trafficInterval);
      clearInterval(packetInterval);
    };
  }, []);

  const total = protocolData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
      {/* Bar Plot */}
      <div className="panel">
        <div className="panel-title">📊 TRAFFIC BAR PLOT</div>
        <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '15px' }}>
          {traffic.slice(-10).map((data, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ 
                  width: '100%',
                  height: `${data.incoming}%`,
                  background: '#00ff41',
                  border: '2px solid #00ff41',
                  boxShadow: '0 0 10px rgba(0, 255, 65, 0.7)',
                  marginBottom: '2px'
                }} />
              </div>
              <div style={{ fontSize: '0.6rem', color: '#00ff41', textAlign: 'center' }}>{data.incoming}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.7rem', marginTop: '10px', color: '#00ff41' }}>
          ■ INCOMING TRAFFIC (Mbps)
        </div>
      </div>

      {/* Pie Chart */}
      <div className="panel">
        <div className="panel-title">🥧 PROTOCOL DISTRIBUTION</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', padding: '15px' }}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            {protocolData.map((item, i) => {
              const percentage = (item.value / total) * 100;
              const angle = (item.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArc = angle > 180 ? 1 : 0;
              const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
              
              currentAngle += angle;
              
              return (
                <path
                  key={i}
                  d={path}
                  fill={item.color}
                  stroke="#000"
                  strokeWidth="2"
                  style={{ 
                    filter: `drop-shadow(0 0 5px ${item.color})`,
                    transition: 'all 0.5s ease'
                  }}
                />
              );
            })}
          </svg>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.7rem', marginTop: '10px' }}>
          {protocolData.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: item.color, fontSize: '1rem' }}>■</span>
              <span style={{ color: '#fff' }}>{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Packets */}
      <div className="panel">
        <div className="panel-title">🌐 LIVE PACKETS</div>
        <div style={{ height: '300px', overflowY: 'auto', fontSize: '0.7rem' }}>
          {packets.map(packet => (
            <div key={packet.id} style={{ 
              padding: '6px',
              marginBottom: '4px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: `1px solid ${packet.status === 'BLOCKED' ? '#ff0000' : '#00ff41'}`,
              borderLeft: `3px solid ${packet.status === 'BLOCKED' ? '#ff0000' : '#00ff41'}`
            }}>
              <div style={{ color: '#fff', marginBottom: '3px' }}>
                <span style={{ color: packet.status === 'BLOCKED' ? '#ff0000' : '#00ff41', fontWeight: '600' }}>
                  [{packet.status}]
                </span> {packet.protocol}
              </div>
              <div style={{ color: '#999', fontSize: '0.65rem' }}>
                {packet.src} → {packet.dst}:{packet.port}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Map */}
      <div className="panel">
        <div className="panel-title">🔥 THREAT MAP</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '15px' }}>
          {[
            { country: 'USA', threats: 45, color: '#ff0000' },
            { country: 'CHINA', threats: 38, color: '#ff3131' },
            { country: 'RUSSIA', threats: 32, color: '#ff6b6b' },
            { country: 'BRAZIL', threats: 28, color: '#ff9999' },
            { country: 'INDIA', threats: 22, color: '#ffcccc' },
            { country: 'UK', threats: 18, color: '#8b0000' }
          ].map(item => (
            <div key={item.country} style={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: `2px solid ${item.color}`,
              padding: '12px',
              textAlign: 'center',
              boxShadow: `0 0 10px ${item.color}50`
            }}>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: item.color, marginBottom: '5px' }}>
                {item.threats}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#fff' }}>
                {item.country}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
