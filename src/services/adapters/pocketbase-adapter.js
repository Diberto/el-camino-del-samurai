// src/services/adapters/pocketbase-adapter.js
import { LocalSqliteAdapter } from './sqlite-adapter.js';

export class PocketBaseAdapter {
  constructor(baseUrl = '') {
    this.customUrl = localStorage.getItem('pb_base_url');
    this.baseUrl = this.customUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:8090');
    this.token = localStorage.getItem('pb_auth_token') || '';
    this.currentUser = JSON.parse(localStorage.getItem('pb_auth_user') || 'null');
    this.fallbackAdapter = new LocalSqliteAdapter();
  }

  async request(endpoint, options = {}) {
    try {
      const headers = { 'Content-Type': 'application/json', ...options.headers };
      if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
      const res = await fetch(`${this.baseUrl}${endpoint}`, { ...options, headers });
      if (!res.ok) {
        return null;
      }
      return await res.json();
    } catch {
      return null;
    }
  }

  async login(email, password) {
    const data = await this.request('/api/collections/users/auth-with-password', {
      method: 'POST',
      body: JSON.stringify({ identity: email, password })
    });
    if (data && data.token) {
      this.token = data.token;
      this.currentUser = data.record;
      localStorage.setItem('pb_auth_token', this.token);
      localStorage.setItem('pb_auth_user', JSON.stringify(this.currentUser));
      return this.currentUser;
    }
    return await this.fallbackAdapter.login(email, password);
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
    const res = await this.request('/api/collections/settings/records');
    if (res && res.items && res.items.length > 0) return res.items[0].settings_data;
    return await this.fallbackAdapter.getSettings();
  }

  async saveSettings(settingsData) {
    const res = await this.request('/api/collections/settings/records');
    if (res && res.items && res.items.length > 0) {
      const updated = await this.request(`/api/collections/settings/records/${res.items[0].id}`, {
        method: 'PATCH',
        body: JSON.stringify({ settings_data: settingsData })
      });
      if (updated) {
        await this.fallbackAdapter.saveSettings(settingsData);
        return updated;
      }
    } else {
      const created = await this.request('/api/collections/settings/records', {
        method: 'POST',
        body: JSON.stringify({ settings_data: settingsData })
      });
      if (created) {
        await this.fallbackAdapter.saveSettings(settingsData);
        return created;
      }
    }
    return await this.fallbackAdapter.saveSettings(settingsData);
  }

  async getPosts() {
    const res = await this.request('/api/collections/posts/records?sort=-created');
    if (res && res.items && res.items.length > 0) {
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
  }

  async savePost(postData) {
    if (postData.id && !postData.id.startsWith('post-')) {
      const res = await this.request(`/api/collections/posts/records/${postData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(postData)
      });
      if (res) {
        await this.fallbackAdapter.savePost(postData);
        return res;
      }
    } else {
      const res = await this.request('/api/collections/posts/records', {
        method: 'POST',
        body: JSON.stringify(postData)
      });
      if (res) {
        await this.fallbackAdapter.savePost(postData);
        return res;
      }
    }
    return await this.fallbackAdapter.savePost(postData);
  }

  async deletePost(id) {
    const res = await this.request(`/api/collections/posts/records/${id}`, { method: 'DELETE' });
    await this.fallbackAdapter.deletePost(id);
    return res;
  }

  async getMedia() {
    const res = await this.request('/api/collections/media/records?sort=-created');
    if (res && res.items && res.items.length > 0) {
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
  }

  async deleteMedia(id) {
    const res = await this.request(`/api/collections/media/records/${id}`, { method: 'DELETE' });
    await this.fallbackAdapter.deleteMedia(id);
    return res;
  }

  async getUsers() {
    const res = await this.request('/api/collections/users/records');
    if (res && res.items) return res.items;
    return await this.fallbackAdapter.getUsers();
  }

  async saveUser(userData) {
    if (userData.id) {
      const res = await this.request(`/api/collections/users/records/${userData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(userData)
      });
      if (res) return res;
    } else {
      const res = await this.request('/api/collections/users/records', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      if (res) return res;
    }
    return await this.fallbackAdapter.saveUser(userData);
  }

  async uploadMedia(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name || 'WebP Image');
      const headers = {};
      if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
      const res = await fetch(`${this.baseUrl}/api/collections/media/records`, { method: 'POST', headers, body: formData });
      if (res.ok) {
        const record = await res.json();
        const url = record.file ? `${this.baseUrl}/api/files/media/${record.id}/${record.file}` : '';
        await this.fallbackAdapter.uploadMedia(file);
        return url;
      }
    } catch {}
    return await this.fallbackAdapter.uploadMedia(file);
  }
}
