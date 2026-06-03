import { useState, useEffect } from 'react';
import EventFeed from "./components/EventFeed";
import AlertPanel from "./components/AlertPanel";
import ScanForm from "./components/ScanForm";
import MatrixBackground from "./components/MatrixBackground";
import SystemStats from "./components/SystemStats";
import Navbar from "./components/Navbar";
import Analytics from "./components/Analytics";
import NetworkTraffic from "./components/NetworkTraffic";
import SecurityMetrics from "./components/SecurityMetrics";
import NetworkTopology from "./components/NetworkTopology";
import { logStore } from "./logStore";

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDashboard(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Start log collection in background when app loads
  useEffect(() => {
    logStore.start();
    return () => logStore.stop();
  }, []);

  if (!showDashboard) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MatrixBackground />
        <div style={{ 
          zIndex: 100, 
          color: '#ff0000', 
          fontSize: '1.5rem', 
          fontWeight: '700',
          textShadow: '0 0 20px #ff0000',
          animation: 'pulse-red 1s infinite'
        }}>
          INITIALIZING SYSTEM...
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <MatrixBackground />
      <div className="dashboard-container">
        <header className="header">
          <h1 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', fontWeight: '900', letterSpacing: '4px' }}>SOC TERMINAL</h1>
          <div style={{ fontSize: '0.7rem', color: '#fff', letterSpacing: '1px' }}>
            [UNAUTHORIZED ACCESS DETECTED] [SYSTEM BREACH MONITORING ACTIVE]
          </div>
          <div style={{ marginTop: '10px' }}>
            <SystemStats />
          </div>
        </header>

        <div style={{ gridArea: 'scanner', gridColumn: '1 / -1' }}>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {activeTab === 'dashboard' && (
          <div style={{ gridColumn: '1 / -1', display: 'grid', gap: '20px' }}>
            <NetworkTopology />
            <SecurityMetrics />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <EventFeed />
              <AlertPanel />
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div style={{ gridColumn: '1 / -1' }}>
            <EventFeed />
          </div>
        )}

        {activeTab === 'alerts' && (
          <div style={{ gridColumn: '1 / -1' }}>
            <AlertPanel />
          </div>
        )}

        {activeTab === 'scanner' && (
          <div style={{ gridColumn: '1 / -1' }}>
            <ScanForm />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ gridColumn: '1 / -1' }}>
            <Analytics />
          </div>
        )}

        {activeTab === 'network' && (
          <div style={{ gridColumn: '1 / -1' }}>
            <NetworkTraffic />
          </div>
        )}
      </div>
    </div>
  );
}
