import { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '▣' },
    { id: 'network', label: 'NETWORK', icon: '📡' },
    { id: 'events', label: 'EVENTS', icon: '▤' },
    { id: 'alerts', label: 'ALERTS', icon: '⚠' },
    { id: 'scanner', label: 'SCANNER', icon: '🔍' },
    { id: 'analytics', label: 'ANALYTICS', icon: '📈' }
  ];

  return (
    <nav style={{
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(20, 20, 20, 0.95) 100%)',
      border: '2px solid #ffffff',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '20px',
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)',
      position: 'relative',
      zIndex: 100
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            background: activeTab === tab.id 
              ? 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)' 
              : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
            color: '#fff',
            border: `2px solid ${activeTab === tab.id ? '#ff0000' : '#ffffff'}`,
            padding: '10px 18px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.5px',
            transition: 'all 0.3s',
            boxShadow: activeTab === tab.id ? '0 0 20px rgba(255, 0, 0, 0.6)' : 'none',
            borderRadius: '5px'
          }}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </nav>
  );
}
