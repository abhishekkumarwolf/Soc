const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function getEvents() {
  const res = await fetch(`${API_BASE}/events`);
  return res.json();
}

export async function getAlerts() {
  const res = await fetch(`${API_BASE}/alerts`);
  return res.json();
}

export async function scanFile(fileName) {
  const res = await fetch(`${API_BASE}/antivirus/scan?file_name=${fileName}`, {
    method: "POST",
  });

  return res.json();
}

const wsProtocol = API_BASE.startsWith('https') ? 'wss' : 'ws';
const wsHost = API_BASE.replace('http://', '').replace('https://', '');
export const WS_URL = `${wsProtocol}://${wsHost}/ws/soc`;