import { useState } from "react";
import { scanFile } from "../api/api";

export default function ScanForm() {
  const [file, setFile] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsScanning(true);
    setResult(null);
    
    try {
      const res = await scanFile(file);
      setResult(res);
    } catch (err) {
      setResult({ status: "error", message: "Scan failed" });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className={`panel ${isScanning ? "is-scanning" : ""}`}>
      <div className="scanning-line"></div>
      
      <div className="panel-title">
        <span>⚡ [MALWARE_SCANNER] ⚡</span>
        {isScanning && <span style={{ fontSize: '0.7rem', color: '#ff0000', animation: 'pulse-red 1s infinite' }}>SCANNING...</span>}
      </div>

      <form onSubmit={handleScan} style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          style={{ flex: 1 }}
          placeholder=">> ENTER_TARGET_FILE_PATH..."
          value={file}
          onChange={(e) => setFile(e.target.value)}
          disabled={isScanning}
        />
        <button type="submit" disabled={isScanning}>
          {isScanning ? "⚠ SCANNING..." : "▶ INIT_SCAN"}
        </button>
      </form>

      {result && (
        <div className="terminal-text" style={{ 
          padding: "15px", 
          background: result.result?.malicious ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.5)', 
          border: `2px solid ${result.result?.malicious ? '#ff0000' : '#8b0000'}`,
          boxShadow: result.result?.malicious ? '0 0 20px rgba(255, 0, 0, 0.5)' : 'none'
        }}>
          <div style={{ 
            color: result.result?.malicious ? "#ff0000" : "#ff6b6b",
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: '10px',
            textShadow: result.result?.malicious ? '0 0 10px #ff0000' : 'none'
          }}>
            {result.result?.malicious ? "☠ THREAT DETECTED ☠" : "✓ SYSTEM CLEAN"}
          </div>
          <div style={{ fontSize: "0.85rem", marginTop: "8px", borderLeft: '3px solid #8b0000', paddingLeft: '10px' }}>
            <div>FILE: {result.result?.file_name}</div>
            <div>STATUS: {result.result?.malicious ? "MALICIOUS" : "SAFE"}</div>
            <div>TIMESTAMP: {result.result?.scanned_at}</div>
          </div>
        </div>
      )}
    </div>
  );
}