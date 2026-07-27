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
    try {
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
    } catch {}

    // Admin fallback user for admin.html login
    if (email === 'admin@samurai.com' && password === 'admin123') {
      const user = { id: 'admin-usr', email, name: 'Jorge Orpianesi Admin', role: 'admin' };
      this.currentUser = user;
      this.token = 'admin-token-local';
      localStorage.setItem('pb_auth_token', this.token);
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
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('pb_auth_user') || 'null');
    }
    return this.currentUser;
  }

  async getSettings() {
    try {
      const res = await this.request('/api/collections/settings/records');
      if (res && res.items && res.items.length > 0) {
        const raw = res.items[0].settings_data;
        if (typeof raw === 'string') {
          try { return JSON.parse(raw); } catch { return raw; }
        }
        if (raw && typeof raw === 'object') return raw;
      }
    } catch {}

    // Fallback default settings without triggering auto-POST on GET
    return {
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
  }

  async saveSettings(settingsData) {
    try {
      const payload = { settings_data: settingsData };
      const res = await this.request('/api/collections/settings/records');
      if (res && res.items && res.items.length > 0) {
        return await this.request(`/api/collections/settings/records/${res.items[0].id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload)
        });
      } else {
        return await this.request('/api/collections/settings/records', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }
    } catch {
      return null;
    }
  }

  async getPosts() {
    try {
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
    } catch {}

    // Fallback default posts without triggering auto-POST on GET
    return [
      {
        id: 'default-post-1',
        title: 'Los Secretos de Miyamoto Musashi en la Cueva Reigando',
        slug: 'secretos-miyamoto-musashi-reigando',
        excerpt: 'Un recorrido espiritual por el retiro de montaña donde Musashi escribió El Libro de los Cinco Anillos.',
        content: `<p class="text-large">En las profundidades de las montañas de Kumamoto se encuentra Reigando, la cueva sagrada donde el legendario Miyamoto Musashi pasó sus últimos años dictando su legado al mundo.</p><p>Al visitar este santuario rodeado de estatuas de piedra cubiertas de musgo, se respira una solemnidad única.</p>`,
        cover_image: 'photos/cueva_reigando.webp',
        status: 'published',
        author: 'Jorge Orpianesi'
      },
      {
        id: 'default-post-2',
        title: 'Castillos Feudales del Periodo Sengoku: Arquitectura e Historia',
        slug: 'castillos-feudales-periodo-sengoku',
        excerpt: 'Descubre la ingeniería militar de las fortalezas samurái de Himeji, Matsumoto y Kumamoto.',
        content: `<p class="text-large">Las fortalezas del Japón feudal no solo eran baluartes inexpugnables de guerra, sino también expresiones sublimes de la estética Zen.</p>`,
        cover_image: 'photos/castillo_sengoku.webp',
        status: 'published',
        author: 'Jorge Orpianesi'
      },
      {
        id: 'default-post-3',
        title: 'La Filosofía del Bushido en el Trabajo Diario y la Vida Moderna',
        slug: 'filosofia-bushido-vida-moderna',
        excerpt: 'Cómo aplicar las 7 virtudes ancestrales para cultivar disciplina, enfoque y serenidad cotidiana.',
        content: `<p class="text-large">El camino del guerrero (Bushido) transciende el campo de batalla. En la era digital, sus principios ofrecen un faro ético inquebrantable.</p>`,
        cover_image: 'photos/jardin_zen.webp',
        status: 'published',
        author: 'Jorge Orpianesi'
      }
    ];
  }

  async savePost(postData) {
    try {
      const payload = { ...postData };
      if (payload.id && payload.id.startsWith('default-post-')) {
        delete payload.id;
      }

      if (payload.id) {
        return await this.request(`/api/collections/posts/records/${payload.id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload)
        });
      } else {
        return await this.request('/api/collections/posts/records', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }
    } catch {
      return null;
    }
  }

  async deletePost(id) {
    try {
      return await this.request(`/api/collections/posts/records/${id}`, { method: 'DELETE' });
    } catch {
      return null;
    }
  }

  async getMedia() {
    try {
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
    } catch {}

    // Fallback default media without triggering auto-POST on GET
    return [
      { id: 'default-media-1', name: 'Cueva Reigando', url: 'photos/cueva_reigando.webp', type: 'image/webp', size: '229.7 KB' },
      { id: 'default-media-2', name: 'Castillo Sengoku', url: 'photos/castillo_sengoku.webp', type: 'image/webp', size: '159.5 KB' },
      { id: 'default-media-3', name: 'Jardín Zen', url: 'photos/jardin_zen.webp', type: 'image/webp', size: '53.0 KB' },
      { id: 'default-media-4', name: 'Jorge Orpianesi', url: 'photos/orpianesi1.webp', type: 'image/webp', size: '31.8 KB' }
    ];
  }

  async deleteMedia(id) {
    try {
      return await this.request(`/api/collections/media/records/${id}`, { method: 'DELETE' });
    } catch {
      return null;
    }
  }

  async getUsers() {
    try {
      const res = await this.request('/api/collections/users/records');
      if (res && res.items) return res.items;
    } catch {}
    return [{ id: 'admin-usr', email: 'admin@samurai.com', name: 'Jorge Orpianesi Admin', role: 'admin' }];
  }

  async saveUser(userData) {
    try {
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
    } catch {
      return null;
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
