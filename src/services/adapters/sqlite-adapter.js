// src/services/adapters/sqlite-adapter.js
export class LocalSqliteAdapter {
  constructor() {
    this.storageKey = 'local_db_emulator';
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({
        settings: {
          sections_toggle: { hero: true, philosophy: true, gallery: true, gpu: true, blog: true, contact: true },
          navigation_menu: [
            { id: '1', label: 'Inicio', url: '#hero', visible: true },
            { id: '2', label: 'Filosofía', url: '#philosophy', visible: true },
            { id: '3', label: 'Galería', url: '#gallery', visible: true },
            { id: '4', label: 'GPU Engine', url: '#gpu', visible: true },
            { id: '5', label: 'Blog', url: '#blog', visible: true }
          ],
          gpu_config: { renderScale: 1.0, quality: 'high', enableShaders: true }
        },
        posts: [],
        users: [{ id: 'usr-1', email: 'admin@samurai.com', name: 'Admin Samurai', role: 'admin', active: true }]
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
