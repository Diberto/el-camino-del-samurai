// src/services/adapters/sqlite-adapter.js
export class LocalSqliteAdapter {
  constructor() {
    this.storageKey = 'local_db_emulator';
    // Clear legacy mock data if present to ensure sync with real index.html sections
    const existingData = localStorage.getItem(this.storageKey);
    if (!existingData || existingData.includes('philosophy')) {
      localStorage.setItem(this.storageKey, JSON.stringify({
        settings: {
          sections_toggle: {
            inicio: true,
            sinopsis: true,
            virtudes: true,
            oraculo: true,
            capitulos: true,
            ediciones: true,
            autor: true,
            galeria: true,
            contacto: true
          },
          navigation_menu: [
            { id: '1', label: 'Inicio', url: '#inicio', visible: true },
            { id: '2', label: 'El Libro', url: '#sinopsis', visible: true },
            { id: '3', label: 'Las Virtudes', url: '#virtudes', visible: true },
            { id: '4', label: 'El Oráculo', url: '#oraculo', visible: true },
            { id: '5', label: 'Ediciones', url: '#ediciones', visible: true },
            { id: '6', label: 'Autor', url: '#autor', visible: true },
            { id: '7', label: 'Galería', url: '#galeria', visible: true },
            { id: '8', label: 'Comprar', url: '#contacto', visible: true }
          ],
          gpu_config: { renderScale: 1.0, quality: 'high', enableShaders: true }
        },
        posts: [],
        users: [{ id: 'usr-1', email: 'admin@samurai.com', name: 'Jorge Orpianesi Admin', role: 'admin', active: true }]
      }));
    }
  }

  _getData() { return JSON.parse(localStorage.getItem(this.storageKey)); }
  _saveData(d) { localStorage.setItem(this.storageKey, JSON.stringify(d)); }

  async login(email, password) {
    const data = this._getData();
    const user = data.users.find(u => u.email === email);
    if (!user) throw new Error('Usuario no encontrado');
    localStorage.setItem('local_auth_user', JSON.stringify(user));
    return user;
  }

  logout() { localStorage.removeItem('local_auth_user'); }
  getCurrentUser() { return JSON.parse(localStorage.getItem('local_auth_user') || 'null'); }
  async getSettings() { return this._getData().settings; }
  async saveSettings(s) {
    const d = this._getData();
    d.settings = { ...d.settings, ...s };
    this._saveData(d);
    return d.settings;
  }
  async getPosts() { return this._getData().posts; }
  async savePost(post) {
    const d = this._getData();
    if (!post.id) post.id = 'post-' + Date.now();
    const idx = d.posts.findIndex(p => p.id === post.id);
    if (idx >= 0) d.posts[idx] = post; else d.posts.unshift(post);
    this._saveData(d);
    return post;
  }
  async deletePost(id) {
    const d = this._getData();
    d.posts = d.posts.filter(p => p.id !== id);
    this._saveData(d);
  }
  async getUsers() { return this._getData().users; }
  async saveUser(user) {
    const d = this._getData();
    if (!user.id) user.id = 'usr-' + Date.now();
    const idx = d.users.findIndex(u => u.id === user.id);
    if (idx >= 0) d.users[idx] = user; else d.users.push(user);
    this._saveData(d);
    return user;
  }
  async uploadMedia(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
}
