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
  updateMedia(id, d) { return this.adapter.updateMedia(id, d); }
  deleteMedia(id) { return this.adapter.deleteMedia(id); }
  getUsers() { return this.adapter.getUsers(); }
  saveUser(u) { return this.adapter.saveUser(u); }
  uploadMedia(f) { return this.adapter.uploadMedia(f); }
  getOpinions(page, perPage, filter) { return this.adapter.getOpinions(page, perPage, filter); }
  saveOpinion(o) { return this.adapter.saveOpinion(o); }
  deleteOpinion(id) { return this.adapter.deleteOpinion(id); }
  getBackups() { return this.adapter.getBackups(); }
  createBackup(n) { return this.adapter.createBackup(n); }
  restoreBackup(k) { return this.adapter.restoreBackup(k); }
  deleteBackup(k) { return this.adapter.deleteBackup(k); }
  uploadBackup(f) { return this.adapter.uploadBackup(f); }
  getDownloadBackupUrl(k) { return this.adapter.getDownloadBackupUrl(k); }
  getSystemDiagnostics() { return this.adapter.getSystemDiagnostics(); }
}

export const dbService = new DatabaseService();
