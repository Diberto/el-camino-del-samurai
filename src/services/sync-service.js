// src/services/sync-service.js
class SyncService {
  constructor() {
    this.channelName = 'samurai_sync_channel';
    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(this.channelName);
    } else {
      this.channel = null;
    }
  }

  broadcast(type, payload = {}) {
    const data = { type, payload, timestamp: Date.now() };
    if (this.channel) {
      this.channel.postMessage(data);
    }
    localStorage.setItem('samurai_last_sync_event', JSON.stringify(data));
  }

  subscribe(callback) {
    if (this.channel) {
      this.channel.onmessage = (event) => callback(event.data);
    }
    window.addEventListener('storage', (e) => {
      if (e.key === 'samurai_last_sync_event' && e.newValue) {
        try {
          callback(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Error parsing sync storage event:', err);
        }
      }
    });
  }
}

export const syncService = new SyncService();
