// src/services/db-service.js
import { PocketBaseAdapter } from './adapters/pocketbase-adapter.js';
import { LocalSqliteAdapter } from './adapters/sqlite-adapter.js';
import { StrapiAdapter } from './adapters/strapi-adapter.js';

class DatabaseService {
  constructor() {
    this.providerType = localStorage.getItem('db_provider') || 'pocketbase';
    this.initProvider();
  }

  initProvider() {
    if (this.providerType === 'pocketbase') {
      this.adapter = new PocketBaseAdapter();
    } else if (this.providerType === 'strapi') {
      this.adapter = new StrapiAdapter();
    } else {
      this.adapter = new LocalSqliteAdapter();
    }
  }

  setProvider(providerName) {
    this.providerType = providerName;
    localStorage.setItem('db_provider', providerName);
    this.initProvider();
  }

  getProvider() { return this.providerType; }

  login(e, p) { return this.adapter.login(e, p); }
  logout() { return this.adapter.logout(); }
  getCurrentUser() { return this.adapter.getCurrentUser(); }
  getSettings() { return this.adapter.getSettings(); }
  saveSettings(s) { return this.adapter.saveSettings(s); }
  getPosts() { return this.adapter.getPosts(); }
  savePost(p) { return this.adapter.savePost(p); }
  deletePost(id) { return this.adapter.deletePost(id); }
  getMedia() { return this.adapter.getMedia ? this.adapter.getMedia() : []; }
  deleteMedia(id) { return this.adapter.deleteMedia ? this.adapter.deleteMedia(id) : null; }
  getUsers() { return this.adapter.getUsers(); }
  saveUser(u) { return this.adapter.saveUser(u); }
  uploadMedia(f) { return this.adapter.uploadMedia(f); }
}

export const dbService = new DatabaseService();
