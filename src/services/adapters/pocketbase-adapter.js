// src/services/adapters/pocketbase-adapter.js
import { LocalSqliteAdapter } from './sqlite-adapter.js';

export class PocketBaseAdapter {
  constructor(baseUrl = '') {
    this.baseUrl = localStorage.getItem('pb_base_url') || (typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:8090');
    this.token = localStorage.getItem('pb_auth_token') || '';
    this.currentUser = JSON.parse(localStorage.getItem('pb_auth_user') || 'null');
    this.fallbackAdapter = new LocalSqliteAdapter();
  }

  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    const res = await fetch(`${this.baseUrl}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Request failed');
    }
    return res.json();
  }

  async login(email, password) {
    try {
      const data = await this.request('/api/collections/users/auth-with-password', {
        method: 'POST',
        body: JSON.stringify({ identity: email, password })
      });
      this.token = data.token;
      this.currentUser = data.record;
      localStorage.setItem('pb_auth_token', this.token);
      localStorage.setItem('pb_auth_user', JSON.stringify(this.currentUser));
      return this.currentUser;
    } catch (err) {
      // Fallback to local admin user login
      try {
        return await this.fallbackAdapter.login(email, password);
      } catch {
        throw new Error(`PocketBase (127.0.0.1:8090) no responde: ${err.message}. Puedes ingresar con admin@samurai.com / admin123.`);
      }
    }
  }

  logout() {
    this.token = '';
    this.currentUser = null;
    localStorage.removeItem('pb_auth_token');
    localStorage.removeItem('pb_auth_user');
    this.fallbackAdapter.logout();
  }

  getCurrentUser() {
    return this.currentUser || this.fallbackAdapter.getCurrentUser();
  }

  async getSettings() {
    try {
      const res = await this.request('/api/collections/settings/records');
      if (res.items && res.items.length > 0) return res.items[0].settings_data;
      return await this.fallbackAdapter.getSettings();
    } catch {
      return await this.fallbackAdapter.getSettings();
    }
  }

  async saveSettings(settingsData) {
    try {
      const res = await this.request('/api/collections/settings/records');
      if (res.items && res.items.length > 0) {
        return await this.request(`/api/collections/settings/records/${res.items[0].id}`, {
          method: 'PATCH',
          body: JSON.stringify({ settings_data: settingsData })
        });
      } else {
        return await this.request('/api/collections/settings/records', {
          method: 'POST',
          body: JSON.stringify({ settings_data: settingsData })
        });
      }
    } catch {
      return await this.fallbackAdapter.saveSettings(settingsData);
    }
  }

  async getPosts() {
    try {
      const res = await this.request('/api/collections/posts/records?sort=-created');
      if (res.items && res.items.length > 0) {
        return res.items.map(item => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          content: item.content,
          cover_image: item.cover_image ? (item.cover_image.startsWith('http') || item.cover_image.startsWith('photos/') ? item.cover_image : `${this.baseUrl}/api/files/posts/${item.id}/${item.cover_image}`) : 'photos/cueva_reigando.webp',
          status: item.status || 'published',
          author: item.author || 'Jorge Orpianesi',
          created_at: item.created || item.created_at
        }));
      }
      return await this.fallbackAdapter.getPosts();
    } catch {
      return await this.fallbackAdapter.getPosts();
    }
  }

  async savePost(postData) {
    try {
      if (postData.id && !postData.id.startsWith('post-')) {
        return await this.request(`/api/collections/posts/records/${postData.id}`, {
          method: 'PATCH',
          body: JSON.stringify(postData)
        });
      } else {
        return await this.request('/api/collections/posts/records', {
          method: 'POST',
          body: JSON.stringify(postData)
        });
      }
    } catch {
      return await this.fallbackAdapter.savePost(postData);
    }
  }

  async deletePost(id) {
    try {
      return await this.request(`/api/collections/posts/records/${id}`, { method: 'DELETE' });
    } catch {
      return await this.fallbackAdapter.deletePost(id);
    }
  }

  async getMedia() {
    try {
      const res = await this.request('/api/collections/media/records?sort=-created');
      if (res.items && res.items.length > 0) {
        return res.items.map(item => ({
          id: item.id,
          name: item.name,
          url: item.file ? `${this.baseUrl}/api/files/media/${item.id}/${item.file}` : item.url,
          type: item.type || 'image/webp',
          size: item.size || 'WebP',
          created_at: item.created
        }));
      }
      return await this.fallbackAdapter.getMedia();
    } catch {
      return await this.fallbackAdapter.getMedia();
    }
  }

  async deleteMedia(id) {
    try {
      return await this.request(`/api/collections/media/records/${id}`, { method: 'DELETE' });
    } catch {
      return await this.fallbackAdapter.deleteMedia(id);
    }
  }

  async getUsers() {
    try {
      const res = await this.request('/api/collections/users/records');
      return res.items || [];
    } catch {
      return await this.fallbackAdapter.getUsers();
    }
  }

  async saveUser(userData) {
    try {
      if (userData.id) {
        return await this.request(`/api/collections/users/records/${userData.id}`, {
          method: 'PATCH',
          body: JSON.stringify(userData)
        });
      } else {
        return await this.request('/api/collections/users/records', {
          method: 'POST',
          body: JSON.stringify(userData)
        });
      }
    } catch {
      return await this.fallbackAdapter.saveUser(userData);
    }
  }

  async uploadMedia(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name || 'WebP Image');
      const headers = {};
      if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
      const res = await fetch(`${this.baseUrl}/api/collections/media/records`, { method: 'POST', headers, body: formData });
      const record = await res.json();
      return record.file ? `${this.baseUrl}/api/files/media/${record.id}/${record.file}` : await this.fallbackAdapter.uploadMedia(file);
    } catch {
      return await this.fallbackAdapter.uploadMedia(file);
    }
  }
}
