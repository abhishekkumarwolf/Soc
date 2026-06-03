import { useEffect, useState } from 'react';
import { logStore } from '../logStore';

export default function Analytics() {
  const [logs, setLogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Application');
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [cpuData, setCpuData] = useState([45, 52, 48, 60, 55, 70, 65, 58, 62, 68]);
  const [memoryData, setMemoryData] = useState([60, 65, 62, 70, 68, 75, 72, 70, 73, 78]);
  const [diskData, setDiskData] = useState([30, 32, 35, 33, 38, 40, 42, 45, 43, 48]);

  const categories = [
    { name: 'Application', icon: '📱', count: 0 },
    { name: 'Security', icon: '🔒', count: 0 },
    { name: 'System', icon: '⚙️', count: 0 },
    { name: 'Setup', icon: '🔧', count: 0 }
  ];

  useEffect(() => {
    // Get existing logs from store
    setLogs(logStore.getLogs());

    // Subscribe to log updates
    const unsubscribe = logStore.subscribe((newLogs) => {
      setLogs(newLogs);
    });

    // Update system metrics
    const metricsInterval = setInterval(() => {
      setCpuData(prev => [...prev.slice(1), Math.floor(Math.random() * 40 + 40)]);
      setMemoryData(prev => [...prev.slice(1), Math.floor(Math.random() * 30 + 60)]);
      setDiskData(prev => [...prev.slice(1), Math.floor(Math.random() * 20 + 30)]);
    }, 3000);

    return () => {
      unsubscribe();
      clearInterval(metricsInterval);
    };
  }, []);

  const getLogColor = (type) => {
    const colors = {
      INFO: '#00ff41',
      WARNING: '#ffff00',
      ERROR: '#ff6b6b',
      CRITICAL: '#ff0000'
    };
    return colors[type] || '#fff';
  };

  const filteredLogs = logs.filter(log => {
    const categoryMatch = log.category === selectedCategory;
    const typeMatch = filter === 'ALL' || log.type === filter;
    const searchMatch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventId.toString().includes(searchTerm);
    return categoryMatch && typeMatch && searchMatch;
  });

  const getCategoryCounts = () => {
    return categories.map(cat => ({
      ...cat,
      count: logs.filter(log => log.category === cat.name).length
    }));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '15px', height: 'calc(100vh - 150px)' }}>
      {/* Left Sidebar - Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="panel" style={{ padding: '10px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>EVENT VIEWER</div>
          {getCategoryCounts().map(cat => (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              style={{
                padding: '10px',
                marginBottom: '5px',
                background: selectedCategory === cat.name ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.5)',
                border: `1px solid ${selectedCategory === cat.name ? '#ff0000' : '#333'}`,
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.75rem',
                transition: 'all 0.3s'
              }}
            >
              <span>{cat.icon} {cat.name}</span>
              <span style={{ 
                background: 'rgba(255, 0, 0, 0.3)', 
                padding: '2px 8px', 
                borderRadius: '10px',
                fontSize: '0.7rem'
              }}>{cat.count}</span>
            </div>
          ))}
        </div>

        {/* System Metrics */}
        <div className="panel" style={{ padding: '10px', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', marginBottom: '10px' }}>SYSTEM METRICS</div>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '0.65rem', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
              <span>CPU</span>
              <span style={{ color: '#ff0000' }}>{cpuData[cpuData.length - 1]}%</span>
            </div>
            <div style={{ height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${cpuData[cpuData.length - 1]}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #ff0000, #ff6b6b)',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '0.65rem', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
              <span>MEMORY</span>
              <span style={{ color: '#ffff00' }}>{memoryData[memoryData.length - 1]}%</span>
            </div>
            <div style={{ height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${memoryData[memoryData.length - 1]}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #ffff00, #ffaa00)',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.65rem', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
              <span>DISK</span>
              <span style={{ color: '#00ff41' }}>{diskData[diskData.length - 1]}%</span>
            </div>
            <div style={{ height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${diskData[diskData.length - 1]}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #00ff41, #00aa00)',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Filters */}
        <div className="panel" style={{ padding: '10px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['ALL', 'CRITICAL', 'ERROR', 'WARNING', 'INFO'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '0.65rem',
                    background: filter === type ? 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)' : 'transparent',
                    borderColor: filter === type ? '#ff0000' : '#ffffff'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <input
              type="text"
              placeholder="Search by Event ID, Source, or Message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '5px 10px',
                fontSize: '0.7rem'
              }}
            />

            <div style={{ fontSize: '0.65rem', color: '#999' }}>
              {filteredLogs.length} events
            </div>
          </div>
        </div>

        {/* Log Table */}
        <div className="panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px', minHeight: '500px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '80px 60px 150px 120px 1fr',
            gap: '10px',
            padding: '8px 10px',
            background: 'rgba(255, 0, 0, 0.1)',
            borderRadius: '5px',
            fontSize: '0.7rem',
            fontWeight: '700',
            marginBottom: '10px'
          }}>
            <div>LEVEL</div>
            <div>EVENT ID</div>
            <div>SOURCE</div>
            <div>TIME</div>
            <div>MESSAGE</div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', fontSize: '0.7rem' }}>
            {filteredLogs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                No events found
              </div>
            )}
            {filteredLogs.map(log => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: '80px 60px 150px 120px 1fr',
                  gap: '10px',
                  padding: '8px 10px',
                  marginBottom: '2px',
                  background: selectedLog?.id === log.id ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.3)',
                  borderLeft: `3px solid ${getLogColor(log.type)}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderRadius: '3px'
                }}
              >
                <span style={{ color: getLogColor(log.type), fontWeight: '600' }}>{log.type}</span>
                <span style={{ color: '#00d4ff' }}>{log.eventId}</span>
                <span style={{ color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.source}</span>
                <span style={{ color: '#999', fontSize: '0.65rem' }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
                <span style={{ color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Log Details */}
        {selectedLog && (
          <div className="panel" style={{ padding: '15px', maxHeight: '300px', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>EVENT DETAILS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '8px', fontSize: '0.7rem' }}>
              <div style={{ color: '#999' }}>Level:</div>
              <div style={{ color: getLogColor(selectedLog.type), fontWeight: '600' }}>{selectedLog.type}</div>
              
              <div style={{ color: '#999' }}>Event ID:</div>
              <div style={{ color: '#00d4ff' }}>{selectedLog.eventId}</div>
              
              <div style={{ color: '#999' }}>Source:</div>
              <div>{selectedLog.source}</div>
              
              <div style={{ color: '#999' }}>Category:</div>
              <div>{selectedLog.category}</div>
              
              <div style={{ color: '#999' }}>Date/Time:</div>
              <div>{selectedLog.timestamp}</div>
              
              <div style={{ color: '#999' }}>User:</div>
              <div>{selectedLog.user}</div>
              
              <div style={{ color: '#999' }}>Computer:</div>
              <div>{selectedLog.computer}</div>
              
              <div style={{ color: '#999' }}>Message:</div>
              <div style={{ lineHeight: '1.6', wordBreak: 'break-word' }}>{selectedLog.message}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
