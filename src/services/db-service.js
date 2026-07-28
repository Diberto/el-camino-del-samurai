// src/services/db-service.js
import { PocketBaseAdapter } from './adapters/pocketbase-adapter.js';

class DatabaseService {
  constructor() {
    this.adapter = new PocketBaseAdapter();
  }

  getProvider() { return 'pocketbase'; }
  setProvider() { return 'pocketbase'; }

  login(e, p) { return this.adapter.login(e, p); }
  logout() { return this.adapter.logout(); }
  getCurrentUser() { return this.adapter.getCurrentUser(); }
  getSettings() { return this.adapter.getSettings(); }
  saveSettings(s) { return this.adapter.saveSettings(s); }
  getPosts() { return this.adapter.getPosts(); }
  savePost(p) { return this.adapter.savePost(p); }
  deletePost(id) { return this.adapter.deletePost(id); }
  getMedia() { return this.adapter.getMedia(); }
  deleteMedia(id) { return this.adapter.deleteMedia(id); }
  getUsers() { return this.adapter.getUsers(); }
  saveUser(u) { return this.adapter.saveUser(u); }
  uploadMedia(f) { return this.adapter.uploadMedia(f); }
  getBackups() { return this.adapter.getBackups(); }
  createBackup(n) { return this.adapter.createBackup(n); }
  restoreBackup(k) { return this.adapter.restoreBackup(k); }
  deleteBackup(k) { return this.adapter.deleteBackup(k); }
  uploadBackup(f) { return this.adapter.uploadBackup(f); }
  getDownloadBackupUrl(k) { return this.adapter.getDownloadBackupUrl(k); }
}

export const dbService = new DatabaseService();
