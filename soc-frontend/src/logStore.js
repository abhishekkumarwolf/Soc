// Global log store that runs in background
class LogStore {
  constructor() {
    this.logs = [];
    this.maxLogs = 500;
    this.listeners = [];
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const logTypes = ['INFO', 'WARNING', 'ERROR', 'CRITICAL'];
    const categories = ['Application', 'Security', 'System', 'Setup'];
    const eventIds = [1000, 1001, 4624, 4625, 7036, 7040, 1074, 6005, 6006];
    const messages = [
      'Application started successfully',
      'User authentication successful',
      'Service started',
      'Configuration loaded',
      'Connection established to database',
      'Cache cleared successfully',
      'Backup operation completed',
      'System resource threshold exceeded',
      'Failed login attempt detected',
      'Service stopped unexpectedly',
      'Memory allocation successful',
      'Network connection timeout',
      'File system access granted',
      'Security policy updated',
      'Process terminated normally'
    ];
    const sources = ['Application', 'Security-Auditing', 'Service Control Manager', 'Kernel-General'];
    const users = ['SYSTEM', 'Administrator', 'NetworkService', 'LocalService'];

    this.interval = setInterval(() => {
      const log = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toLocaleString(),
        type: logTypes[Math.floor(Math.random() * logTypes.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        eventId: eventIds[Math.floor(Math.random() * eventIds.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        user: users[Math.floor(Math.random() * users.length)],
        computer: 'SOC-SERVER-01'
      };

      this.logs = [log, ...this.logs.slice(0, this.maxLogs - 1)];
      this.notifyListeners();
    }, 2000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.logs));
  }

  getLogs() {
    return this.logs;
  }

  clear() {
    this.logs = [];
    this.notifyListeners();
  }
}

export const logStore = new LogStore();
