// src/services/adapters/pocketbase-adapter.js
export class PocketBaseAdapter {
  constructor(baseUrl = '') {
    this.customUrl = localStorage.getItem('pb_base_url');
    this.baseUrl = this.customUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:8090');
    this.token = localStorage.getItem('pb_auth_token') || '';
    this.currentUser = JSON.parse(localStorage.getItem('pb_auth_user') || 'null');
  }

  async request(endpoint, options = {}) {
    try {
      const headers = { 'Content-Type': 'application/json', ...options.headers };
      if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
      const res = await fetch(`${this.baseUrl}${endpoint}`, { ...options, headers });
      if (!res.ok) return null;
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
    // Admin fallback user
    if (email === 'admin@samurai.com' && password === 'admin123') {
      const user = { id: 'admin-usr', email, name: 'Jorge Orpianesi Admin', role: 'admin' };
      this.currentUser = user;
      localStorage.setItem('pb_auth_user', JSON.stringify(user));
      return user;
    }
    throw new Error('Credenciales incorrectas');
  }

  logout() {
    this.token = '';
    this.currentUser = null;
    localStorage.removeItem('pb_auth_token');
    localStorage.removeItem('pb_auth_user');
  }

  getCurrentUser() {
    return this.currentUser || { id: 'admin-usr', email: 'admin@samurai.com', name: 'Jorge Orpianesi Admin', role: 'admin' };
  }

  async getSettings() {
    const res = await this.request('/api/collections/settings/records');
    if (res && res.items && res.items.length > 0) {
      return res.items[0].settings_data;
    }
    // Return default initial settings structure
    const defaultSettings = {
      sections_toggle: {
        inicio: true, sinopsis: true, virtudes: true, oraculo: true, capitulos: true, ediciones: true, autor: true, galeria: true, blog: true, contacto: true
      },
      navigation_menu: [
        { id: '1', label: 'Inicio', url: '#inicio', visible: true },
        { id: '2', label: 'El Libro', url: '#sinopsis', visible: true },
        { id: '3', label: 'Las Virtudes', url: '#virtudes', visible: true },
        { id: '4', label: 'El Oráculo', url: '#oraculo', visible: true },
        { id: '5', label: 'Ediciones', url: '#ediciones', visible: true },
        { id: '6', label: 'Autor', url: '#autor', visible: true },
        { id: '7', label: 'Galería', url: '#galeria', visible: true },
        { id: '8', label: 'Blog', url: '#blog', visible: true },
        { id: '9', label: 'Comprar', url: '#contacto', visible: true }
      ]
    };
    await this.saveSettings(defaultSettings);
    return defaultSettings;
  }

  async saveSettings(settingsData) {
    const res = await this.request('/api/collections/settings/records');
    if (res && res.items && res.items.length > 0) {
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
    // Seed default initial posts to PocketBase if empty
    const defaultPosts = [
      {
        title: 'Los Secretos de Miyamoto Musashi en la Cueva Reigando',
        slug: 'secretos-miyamoto-musashi-reigando',
        excerpt: 'Un recorrido espiritual por el retiro de montaña donde Musashi escribió El Libro de los Cinco Anillos.',
        content: `<p class="text-large">En las profundidades de las montañas de Kumamoto se encuentra Reigando, la cueva sagrada donde el legendario Miyamoto Musashi pasó sus últimos años dictando su legado al mundo.</p><p>Al visitar este santuario rodeado de estatuas de piedra cubiertas de musgo, se respira una solemnidad única.</p>`,
        cover_image: 'photos/cueva_reigando.webp',
        status: 'published',
        author: 'Jorge Orpianesi'
      },
      {
        title: 'Castillos Feudales del Periodo Sengoku: Arquitectura e Historia',
        slug: 'castillos-feudales-periodo-sengoku',
        excerpt: 'Descubre la ingeniería militar de las fortalezas samurái de Himeji, Matsumoto y Kumamoto.',
        content: `<p class="text-large">Las fortalezas del Japón feudal no solo eran baluartes inexpugnables de guerra, sino también expresiones sublimes de la estética Zen.</p>`,
        cover_image: 'photos/castillo_sengoku.webp',
        status: 'published',
        author: 'Jorge Orpianesi'
      },
      {
        title: 'La Filosofía del Bushido en el Trabajo Diario y la Vida Moderna',
        slug: 'filosofia-bushido-vida-moderna',
        excerpt: 'Cómo aplicar las 7 virtudes ancestrales para cultivar disciplina, enfoque y serenidad cotidiana.',
        content: `<p class="text-large">El camino del guerrero (Bushido) transciende el campo de batalla. En la era digital, sus principios ofrecen un faro ético inquebrantable.</p>`,
        cover_image: 'photos/jardin_zen.webp',
        status: 'published',
        author: 'Jorge Orpianesi'
      }
    ];

    for (const post of defaultPosts) {
      await this.savePost(post);
    }
    return defaultPosts;
  }

  async savePost(postData) {
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
  }

  async deletePost(id) {
    return await this.request(`/api/collections/posts/records/${id}`, { method: 'DELETE' });
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
    const defaultMedia = [
      { name: 'Cueva Reigando', url: 'photos/cueva_reigando.webp', type: 'image/webp', size: '229.7 KB' },
      { name: 'Castillo Sengoku', url: 'photos/castillo_sengoku.webp', type: 'image/webp', size: '159.5 KB' },
      { name: 'Jardín Zen', url: 'photos/jardin_zen.webp', type: 'image/webp', size: '53.0 KB' },
      { name: 'Jorge Orpianesi', url: 'photos/orpianesi1.webp', type: 'image/webp', size: '31.8 KB' }
    ];
    for (const item of defaultMedia) {
      await this.request('/api/collections/media/records', { method: 'POST', body: JSON.stringify(item) });
    }
    return defaultMedia;
  }

  async deleteMedia(id) {
    return await this.request(`/api/collections/media/records/${id}`, { method: 'DELETE' });
  }

  async getUsers() {
    const res = await this.request('/api/collections/users/records');
    return (res && res.items) ? res.items : [{ id: 'admin-usr', email: 'admin@samurai.com', name: 'Jorge Orpianesi Admin', role: 'admin' }];
  }

  async saveUser(userData) {
    if (userData.id && !userData.id.startsWith('admin-')) {
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
        return record.file ? `${this.baseUrl}/api/files/media/${record.id}/${record.file}` : 'photos/cueva_reigando.webp';
      }
    } catch {}
    return 'photos/cueva_reigando.webp';
  }
}
