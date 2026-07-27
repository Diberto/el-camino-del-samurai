// src/services/adapters/pocketbase-adapter.js
export class PocketBaseAdapter {
  constructor(baseUrl = 'http://127.0.0.1:8090') {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('pb_auth_token') || '';
    this.currentUser = JSON.parse(localStorage.getItem('pb_auth_user') || 'null');
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
    const data = await this.request('/api/collections/users/auth-with-password', {
      method: 'POST',
      body: JSON.stringify({ identity: email, password })
    });
    this.token = data.token;
    this.currentUser = data.record;
    localStorage.setItem('pb_auth_token', this.token);
    localStorage.setItem('pb_auth_user', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  logout() {
    this.token = '';
    this.currentUser = null;
    localStorage.removeItem('pb_auth_token');
    localStorage.removeItem('pb_auth_user');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async getSettings() {
    try {
      const res = await this.request('/api/collections/settings/records');
      return res.items?.[0] || null;
    } catch {
      return null;
    }
  }

  async saveSettings(settingsData) {
    const existing = await this.getSettings();
    if (existing?.id) {
      return this.request(`/api/collections/settings/records/${existing.id}`, {
        method: 'PATCH',
        body: JSON.stringify(settingsData)
      });
    } else {
      return this.request('/api/collections/settings/records', {
        method: 'POST',
        body: JSON.stringify(settingsData)
      });
    }
  }

  async getPosts() {
    try {
      const res = await this.request('/api/collections/posts/records?sort=-created');
      return res.items || [];
    } catch {
      return [];
    }
  }

  async savePost(postData) {
    if (postData.id) {
      return this.request(`/api/collections/posts/records/${postData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(postData)
      });
    } else {
      return this.request('/api/collections/posts/records', {
        method: 'POST',
        body: JSON.stringify(postData)
      });
    }
  }

  async deletePost(id) {
    return this.request(`/api/collections/posts/records/${id}`, { method: 'DELETE' });
  }

  async getUsers() {
    try {
      const res = await this.request('/api/collections/users/records');
      return res.items || [];
    } catch {
      return [];
    }
  }

  async saveUser(userData) {
    if (userData.id) {
      return this.request(`/api/collections/users/records/${userData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(userData)
      });
    } else {
      return this.request('/api/collections/users/records', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    }
  }

  async uploadMedia(file) {
    const formData = new FormData();
    formData.append('file', file);
    const headers = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    const res = await fetch(`${this.baseUrl}/api/files`, { method: 'POST', headers, body: formData });
    const data = await res.json();
    return data.url || `${this.baseUrl}/api/files/${data.id}`;
  }
}
