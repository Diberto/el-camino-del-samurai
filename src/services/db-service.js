// src/services/db-service.js
import { PocketBaseAdapter } from './adapters/pocketbase-adapter.js';
import { LocalSqliteAdapter } from './adapters/sqlite-adapter.js';

class DatabaseService {
  constructor() {
    this.providerType = localStorage.getItem('db_provider') || 'local';
    this.initProvider();
  }

  initProvider() {
    if (this.providerType === 'pocketbase') {
      this.adapter = new PocketBaseAdapter();
    } else {
      this.adapter = new LocalSqliteAdapter();
    }
  }

  setProvider(providerName) {
    this.providerType = providerName;
    localStorage.setItem('db_provider', providerName);
    this.initProvider();
  }

  login(e, p) { return this.adapter.login(e, p); }
  logout() { return this.adapter.logout(); }
  getCurrentUser() { return this.adapter.getCurrentUser(); }
  getSettings() { return this.adapter.getSettings(); }
  saveSettings(s) { return this.adapter.saveSettings(s); }
  getPosts() { return this.adapter.getPosts(); }
  savePost(p) { return this.adapter.savePost(p); }
  deletePost(id) { return this.adapter.deletePost(id); }
  getUsers() { return this.adapter.getUsers(); }
  saveUser(u) { return this.adapter.saveUser(u); }
  uploadMedia(f) { return this.adapter.uploadMedia(f); }
}

export const dbService = new DatabaseService();
