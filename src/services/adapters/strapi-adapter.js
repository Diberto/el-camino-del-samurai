// src/services/adapters/strapi-adapter.js
export class StrapiAdapter {
  constructor(baseUrl = 'http://localhost:1337') {
    this.baseUrl = localStorage.getItem('strapi_base_url') || baseUrl;
    this.token = localStorage.getItem('strapi_auth_token') || '';
    this.currentUser = JSON.parse(localStorage.getItem('strapi_auth_user') || 'null');
  }

  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    const res = await fetch(`${this.baseUrl}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.error?.message || err.message || 'Error en Strapi request');
    }
    return res.json();
  }

  async login(email, password) {
    const data = await this.request('/api/auth/local', {
      method: 'POST',
      body: JSON.stringify({ identifier: email, password })
    });
    this.token = data.jwt;
    this.currentUser = data.user;
    localStorage.setItem('strapi_auth_token', this.token);
    localStorage.setItem('strapi_auth_user', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  logout() {
    this.token = '';
    this.currentUser = null;
    localStorage.removeItem('strapi_auth_token');
    localStorage.removeItem('strapi_auth_user');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async getSettings() {
    try {
      const res = await this.request('/api/settings');
      return res.data?.attributes || res.data || null;
    } catch {
      return null;
    }
  }

  async saveSettings(settingsData) {
    try {
      return await this.request('/api/settings', {
        method: 'POST',
        body: JSON.stringify({ data: settingsData })
      });
    } catch {
      return settingsData;
    }
  }

  async getPosts() {
    try {
      const res = await this.request('/api/posts?populate=*&sort=createdAt:desc');
      const items = res.data || [];
      return items.map(item => {
        const attr = item.attributes || item;
        return {
          id: String(item.id),
          title: attr.title,
          slug: attr.slug,
          excerpt: attr.excerpt,
          content: attr.content,
          cover_image: attr.cover_image?.data?.attributes?.url 
            ? `${this.baseUrl}${attr.cover_image.data.attributes.url}`
            : attr.cover_image || 'assets/photos/WhatsApp Image 2026-06-25 at 16.10.13.webp',
          status: attr.status || 'published',
          author: attr.author || 'Jorge Orpianesi',
          created_at: attr.createdAt || new Date().toISOString()
        };
      });
    } catch (err) {
      console.warn('Could not fetch posts from Strapi API, falling back:', err);
      return [];
    }
  }

  async savePost(postData) {
    const payload = {
      data: {
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        status: postData.status || 'published'
      }
    };
    if (postData.id) {
      const res = await this.request(`/api/posts/${postData.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      return res.data;
    } else {
      const res = await this.request('/api/posts', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return res.data;
    }
  }

  async deletePost(id) {
    return this.request(`/api/posts/${id}`, { method: 'DELETE' });
  }

  async getUsers() {
    try {
      return await this.request('/api/users');
    } catch {
      return [];
    }
  }

  async saveUser(userData) {
    if (userData.id) {
      return this.request(`/api/users/${userData.id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
      });
    } else {
      return this.request('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    }
  }

  async uploadMedia(file) {
    const formData = new FormData();
    formData.append('files', file);
    const headers = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    const res = await fetch(`${this.baseUrl}/api/upload`, { method: 'POST', headers, body: formData });
    const data = await res.json();
    const uploadedFile = data[0];
    return uploadedFile?.url ? `${this.baseUrl}${uploadedFile.url}` : '';
  }
}
