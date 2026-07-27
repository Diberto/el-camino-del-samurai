# Admin Backend, CMS & User Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Admin Backend dashboard, CMS for Blog with WYSIWYG editor, client-side WebP image converter, YouTube video embed tool, section toggle & menu editor, GPU options manager, pluggable database abstraction layer (PocketBase default, SQLite local, Supabase, Firebase adapters), and User Management.

**Architecture:** A lightweight client-side SPA served at `/admin.html` interacting with a unified `DatabaseService` abstraction interface. PocketBase acts as the default backend provider for Auth, CRUD, and file storage, while adapter interfaces allow seamless switching to alternative backends.

**Tech Stack:** Vanilla JavaScript (ES modules), HTML5, CSS3, PocketBase JS SDK / REST API, Offscreen/Canvas WebP converter API, HTML WYSIWYG editor.

## Global Constraints
- Target workspace: `d:\Documentos\Work\hummus\samurai\el-camino-del-samurai`
- ES Modules style JS.
- Mobile-first, dark-themed responsive UI matching landing page aesthetics.
- No breaking changes to existing `index.html`, `gpu-config.js`, or `script.js`.

---

### Task 1: Database Adapter Abstraction Layer & PocketBase / Fallback Drivers

**Files:**
- Create: `src/services/db-service.js`
- Create: `src/services/adapters/pocketbase-adapter.js`
- Create: `src/services/adapters/sqlite-adapter.js`
- Create: `src/services/adapters/supabase-adapter.js`

**Interfaces:**
- Produces: `DatabaseService` singleton with methods: `login()`, `logout()`, `getCurrentUser()`, `getSettings()`, `saveSettings()`, `getPosts()`, `savePost()`, `deletePost()`, `getUsers()`, `saveUser()`, `uploadMedia()`.

- [ ] **Step 1: Write `pocketbase-adapter.js` with PocketBase API integration**

```javascript
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
```

- [ ] **Step 2: Create Local Storage / SQLite fallback adapter `sqlite-adapter.js`**

```javascript
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
```

- [ ] **Step 3: Create `db-service.js` provider factory**

```javascript
// src/services/db-service.js
import { PocketBaseAdapter } from './adapters/pocketbase-adapter.js';
import { LocalSqliteAdapter } from './adapters/sqlite-adapter.js';

class DatabaseService {
  constructor() {
    this.providerType = localStorage.getItem('db_provider') || 'pocketbase';
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
```

- [ ] **Step 4: Commit Task 1**
```bash
git add src/services/
git commit -m "feat: add DatabaseService abstraction layer and PocketBase / Local SQLite adapters"
```

---

### Task 2: WebP Image Converter & YouTube Embed Media Utilities

**Files:**
- Create: `src/utils/webp-converter.js`
- Create: `src/utils/youtube-embed.js`

- [ ] **Step 1: Write `webp-converter.js` Canvas-based converter**

```javascript
// src/utils/webp-converter.js
export async function convertToWebP(file, quality = 0.82, maxWidth = 1920) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('El archivo no es una imagen válida'));
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Fallo al convertir la imagen a WebP'));
          const webpFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, '') + '.webp',
            { type: 'image/webp' }
          );
          resolve(webpFile);
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('No se pudo cargar la imagen para conversión'));
    };

    img.src = objectUrl;
  });
}
```

- [ ] **Step 2: Write `youtube-embed.js` Embed URL Extractor and Builder**

```javascript
// src/utils/youtube-embed.js
export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export function generateYouTubeEmbedHTML(youtubeId) {
  if (!youtubeId) return '';
  return `
<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; margin: 1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/${youtubeId}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
  </iframe>
</div>
  `.trim();
}
```

- [ ] **Step 3: Commit Task 2**
```bash
git add src/utils/
git commit -m "feat: add WebP Canvas image converter and YouTube embed helper utilities"
```

---

### Task 3: Admin Auth & Dashboard Shell

**Files:**
- Create: `admin.html`
- Create: `src/admin/admin.js`
- Create: `src/admin/admin.css`

- [ ] **Step 1: Create `admin.html` structural template**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard | El Camino del Samurai</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="src/admin/admin.css">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body class="admin-body">
  <div id="login-modal" class="admin-login-modal">
    <div class="login-box">
      <h2>Panel Samurai Admin</h2>
      <p>Ingresa tus credenciales para acceder</p>
      <form id="login-form">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="login-email" required value="admin@samurai.com">
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" id="login-password" required value="admin123">
        </div>
        <div id="login-error" class="login-error"></div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  </div>

  <div id="admin-app" class="admin-layout hidden">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <span class="logo-symbol">⚔️</span>
        <h3>Samurai Admin</h3>
      </div>
      <nav class="sidebar-nav">
        <button class="nav-item active" data-tab="sections">🚩 Secciones y Menú</button>
        <button class="nav-item" data-tab="gpu">⚙️ Opciones GPU</button>
        <button class="nav-item" data-tab="blog">✍️ Blog CMS</button>
        <button class="nav-item" data-tab="users">👥 Usuarios</button>
      </nav>
      <div class="sidebar-footer">
        <div class="user-info">
          <span id="user-display-name">Admin</span>
        </div>
        <button id="logout-btn" class="btn btn-logout">Cerrar Sesión</button>
      </div>
    </aside>

    <main class="admin-content">
      <section id="tab-sections" class="tab-panel active"></section>
      <section id="tab-gpu" class="tab-panel"></section>
      <section id="tab-blog" class="tab-panel"></section>
      <section id="tab-users" class="tab-panel"></section>
    </main>
  </div>

  <script type="module" src="src/admin/admin.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `admin.css` dark theme styles**

```css
.admin-body {
  margin: 0;
  background-color: #0f1115;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.admin-login-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.login-box {
  background: #1a1d24;
  border: 1px solid #2d3748;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
}

.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 260px;
  background: #14171d;
  border-right: 1px solid #2d3748;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  flex: 1;
}

.nav-item {
  background: transparent;
  border: none;
  color: #a0aec0;
  padding: 0.8rem 1rem;
  text-align: left;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.nav-item:hover, .nav-item.active {
  background: #2b303c;
  color: #ffffff;
}

.admin-content {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
}

.tab-panel { display: none; }
.tab-panel.active { display: block; }
.hidden { display: none !important; }
```

- [ ] **Step 3: Write `src/admin/admin.js` tab routing and auth control**

```javascript
import { dbService } from '../services/db-service.js';
import { initSectionsManager } from './modules/sections-menu-manager.js';
import { initGpuManager } from './modules/gpu-config-manager.js';
import { initBlogManager } from './modules/blog-cms-manager.js';
import { initUserManager } from './modules/user-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('login-modal');
  const loginForm = document.getElementById('login-form');
  const adminApp = document.getElementById('admin-app');
  const logoutBtn = document.getElementById('logout-btn');
  const userDisplayName = document.getElementById('user-display-name');

  function checkAuth() {
    const user = dbService.getCurrentUser();
    if (user) {
      loginModal.classList.add('hidden');
      adminApp.classList.remove('hidden');
      userDisplayName.textContent = user.name || user.email;
      loadModules();
    } else {
      loginModal.classList.remove('hidden');
      adminApp.classList.add('hidden');
    }
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      await dbService.login(email, password);
      checkAuth();
    } catch (err) {
      document.getElementById('login-error').textContent = err.message || 'Error de autenticación';
    }
  });

  logoutBtn.addEventListener('click', () => {
    dbService.logout();
    checkAuth();
  });

  // Tab switching
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  function loadModules() {
    initSectionsManager(document.getElementById('tab-sections'));
    initGpuManager(document.getElementById('tab-gpu'));
    initBlogManager(document.getElementById('tab-blog'));
    initUserManager(document.getElementById('tab-users'));
  }

  checkAuth();
});
```

- [ ] **Step 4: Commit Task 3**
```bash
git add admin.html src/admin/
git commit -m "feat: add Admin Dashboard shell and authentication view"
```

---

### Task 4: Admin Section Toggle & Navigation Menu Manager

**Files:**
- Create: `src/admin/modules/sections-menu-manager.js`

- [ ] **Step 1: Write `sections-menu-manager.js`**

```javascript
import { dbService } from '../../services/db-service.js';

export async function initSectionsManager(container) {
  const settings = (await dbService.getSettings()) || {
    sections_toggle: { hero: true, philosophy: true, gallery: true, gpu: true, blog: true, contact: true },
    navigation_menu: [
      { id: '1', label: 'Inicio', url: '#hero', visible: true },
      { id: '2', label: 'Filosofía', url: '#philosophy', visible: true },
      { id: '3', label: 'Galería', url: '#gallery', visible: true },
      { id: '4', label: 'GPU Engine', url: '#gpu', visible: true },
      { id: '5', label: 'Blog', url: '#blog', visible: true }
    ]
  };

  container.innerHTML = `
    <h2>Control de Secciones y Menú</h2>
    <div style="margin-top: 1.5rem; display: grid; gap: 2rem;">
      <div style="background:#1a1d24; padding:1.5rem; border-radius:8px; border:1px solid #2d3748;">
        <h3>Visibilidad de Secciones</h3>
        <div id="sections-toggle-list" style="display:flex; flex-direction:column; gap:0.8rem; margin-top:1rem;">
          ${Object.entries(settings.sections_toggle).map(([sec, active]) => `
            <label style="display:flex; justify-content:space-between; align-items:center; background:#242832; padding:0.8rem 1rem; border-radius:6px;">
              <span style="text-transform:capitalize; font-weight:600;">${sec}</span>
              <input type="checkbox" data-section="${sec}" ${active ? 'checked' : ''} style="width:20px; height:20px;">
            </label>
          `).join('')}
        </div>
      </div>

      <div style="background:#1a1d24; padding:1.5rem; border-radius:8px; border:1px solid #2d3748;">
        <h3>Menú de Navegación</h3>
        <div id="menu-items-list" style="display:flex; flex-direction:column; gap:0.8rem; margin-top:1rem;">
          ${settings.navigation_menu.map(item => `
            <div class="menu-item-row" style="display:flex; gap:0.5rem; align-items:center;">
              <input type="text" value="${item.label}" data-key="label" data-id="${item.id}" style="padding:0.5rem; background:#242832; border:1px solid #4a5568; color:#fff; border-radius:4px; flex:1;">
              <input type="text" value="${item.url}" data-key="url" data-id="${item.id}" style="padding:0.5rem; background:#242832; border:1px solid #4a5568; color:#fff; border-radius:4px; flex:1;">
              <label><input type="checkbox" data-key="visible" data-id="${item.id}" ${item.visible ? 'checked' : ''}> Visible</label>
            </div>
          `).join('')}
        </div>
      </div>
      <button id="save-sections-btn" style="padding:0.8rem 1.5rem; background:#3182ce; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">Guardar Cambios</button>
      <div id="save-sections-msg" style="color:#48bb78; font-weight:600;"></div>
    </div>
  `;

  document.getElementById('save-sections-btn').addEventListener('click', async () => {
    const updatedToggles = {};
    container.querySelectorAll('#sections-toggle-list input[type="checkbox"]').forEach(chk => {
      updatedToggles[chk.dataset.section] = chk.checked;
    });

    const updatedMenu = settings.navigation_menu.map(item => {
      const labelInput = container.querySelector(`input[data-key="label"][data-id="${item.id}"]`);
      const urlInput = container.querySelector(`input[data-key="url"][data-id="${item.id}"]`);
      const visChk = container.querySelector(`input[data-key="visible"][data-id="${item.id}"]`);
      return {
        id: item.id,
        label: labelInput ? labelInput.value : item.label,
        url: urlInput ? urlInput.value : item.url,
        visible: visChk ? visChk.checked : item.visible
      };
    });

    settings.sections_toggle = updatedToggles;
    settings.navigation_menu = updatedMenu;

    await dbService.saveSettings(settings);
    document.getElementById('save-sections-msg').textContent = '¡Configuración guardada exitosamente!';
    setTimeout(() => { document.getElementById('save-sections-msg').textContent = ''; }, 3000);
  });
}
```

- [ ] **Step 2: Commit Task 4**
```bash
git add src/admin/modules/sections-menu-manager.js
git commit -m "feat: add section toggle and menu editor module"
```

---

### Task 5: Admin GPU Config Controller

**Files:**
- Create: `src/admin/modules/gpu-config-manager.js`

- [ ] **Step 1: Write `gpu-config-manager.js`**

```javascript
import { dbService } from '../../services/db-service.js';

export async function initGpuManager(container) {
  const settings = (await dbService.getSettings()) || {};
  const gpuConf = settings.gpu_config || {
    renderScale: 1.0,
    quality: 'high',
    enableShaders: true,
    particleLimit: 5000
  };

  container.innerHTML = `
    <h2>Configuración Motor GPU</h2>
    <div style="background:#1a1d24; padding:1.5rem; border-radius:8px; border:1px solid #2d3748; margin-top:1.5rem;">
      <div style="display:flex; flex-direction:column; gap:1.2rem;">
        <label>Escala de Renderizado (Render Scale)
          <input type="range" id="gpu-scale" min="0.5" max="2.0" step="0.1" value="${gpuConf.renderScale}" style="width:100%;">
          <span id="gpu-scale-val">${gpuConf.renderScale}</span>
        </label>

        <label>Nivel de Calidad Shaders
          <select id="gpu-quality" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px;">
            <option value="low" ${gpuConf.quality === 'low' ? 'selected' : ''}>Bajo (Rendimiento)</option>
            <option value="medium" ${gpuConf.quality === 'medium' ? 'selected' : ''}>Medio</option>
            <option value="high" ${gpuConf.quality === 'high' ? 'selected' : ''}>Alto (Ultra)</option>
          </select>
        </label>

        <label style="display:flex; align-items:center; gap:0.5rem;">
          <input type="checkbox" id="gpu-shaders" ${gpuConf.enableShaders ? 'checked' : ''}> Activar Efectos WebGL/WebGPU
        </label>

        <button id="save-gpu-btn" style="padding:0.8rem; background:#3182ce; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">Guardar Ajustes GPU</button>
        <div id="save-gpu-msg" style="color:#48bb78; font-weight:600;"></div>
      </div>
    </div>
  `;

  const scaleInput = document.getElementById('gpu-scale');
  scaleInput.addEventListener('input', (e) => {
    document.getElementById('gpu-scale-val').textContent = e.target.value;
  });

  document.getElementById('save-gpu-btn').addEventListener('click', async () => {
    settings.gpu_config = {
      renderScale: parseFloat(scaleInput.value),
      quality: document.getElementById('gpu-quality').value,
      enableShaders: document.getElementById('gpu-shaders').checked
    };
    await dbService.saveSettings(settings);
    document.getElementById('save-gpu-msg').textContent = '¡Ajustes GPU actualizados!';
    setTimeout(() => { document.getElementById('save-gpu-msg').textContent = ''; }, 3000);
  });
}
```

- [ ] **Step 2: Commit Task 5**
```bash
git add src/admin/modules/gpu-config-manager.js
git commit -m "feat: add GPU configuration manager module"
```

---

### Task 6: Admin Blog CMS & WYSIWYG Editor Component

**Files:**
- Create: `src/admin/components/wysiwyg-editor.js`
- Create: `src/admin/modules/blog-cms-manager.js`

- [ ] **Step 1: Create `wysiwyg-editor.js` with WebP converter and YouTube embed tools**

```javascript
import { convertToWebP } from '../../utils/webp-converter.js';
import { extractYouTubeId, generateYouTubeEmbedHTML } from '../../utils/youtube-embed.js';
import { dbService } from '../../services/db-service.js';

export class WysiwygEditor {
  constructor(containerEl, initialHTML = '') {
    this.container = containerEl;
    this.initialHTML = initialHTML;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="wysiwyg-toolbar" style="display:flex; gap:0.4rem; padding:0.5rem; background:#242832; border:1px solid #4a5568; border-bottom:none; border-radius:6px 6px 0 0; flex-wrap:wrap;">
        <button type="button" data-cmd="bold" style="padding:0.4rem 0.7rem; font-weight:bold;">B</button>
        <button type="button" data-cmd="italic" style="padding:0.4rem 0.7rem; font-style:italic;">I</button>
        <button type="button" data-cmd="underline" style="padding:0.4rem 0.7rem; text-decoration:underline;">U</button>
        <button type="button" data-cmd="formatBlock" data-val="H2" style="padding:0.4rem 0.7rem;">H2</button>
        <button type="button" data-cmd="formatBlock" data-val="H3" style="padding:0.4rem 0.7rem;">H3</button>
        <button type="button" data-cmd="insertUnorderedList" style="padding:0.4rem 0.7rem;">• Lista</button>
        <button type="button" id="btn-insert-image" style="padding:0.4rem 0.7rem; background:#4a5568; color:#fff; border:none; border-radius:4px; cursor:pointer;">🖼️ WebP Imagen</button>
        <button type="button" id="btn-insert-youtube" style="padding:0.4rem 0.7rem; background:#e53e3e; color:#fff; border:none; border-radius:4px; cursor:pointer;">▶️ YouTube</button>
        <input type="file" id="wysiwyg-file-input" accept="image/*" style="display:none;">
      </div>
      <div class="wysiwyg-content" contenteditable="true" style="min-height:250px; padding:1rem; background:#1a1d24; border:1px solid #4a5568; border-radius:0 0 6px 6px; color:#fff; overflow-y:auto;">
        ${this.initialHTML}
      </div>
    `;

    const contentDiv = this.container.querySelector('.wysiwyg-content');
    const toolbar = this.container.querySelector('.wysiwyg-toolbar');

    toolbar.querySelectorAll('button[data-cmd]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.execCommand(btn.dataset.cmd, false, btn.dataset.val || null);
      });
    });

    const fileInput = this.container.querySelector('#wysiwyg-file-input');
    this.container.querySelector('#btn-insert-image').addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const webpFile = await convertToWebP(file);
        const url = await dbService.uploadMedia(webpFile);
        document.execCommand('insertImage', false, url);
      } catch (err) {
        alert('Error al procesar/subir imagen: ' + err.message);
      }
    });

    this.container.querySelector('#btn-insert-youtube').addEventListener('click', () => {
      const input = prompt('Ingresa la URL o ID del video de YouTube:');
      const yid = extractYouTubeId(input);
      if (yid) {
        const html = generateYouTubeEmbedHTML(yid);
        contentDiv.focus();
        document.execCommand('insertHTML', false, html);
      } else if (input) {
        alert('URL de YouTube no válida');
      }
    });
  }

  getContent() {
    return this.container.querySelector('.wysiwyg-content').innerHTML;
  }
}
```

- [ ] **Step 2: Create `blog-cms-manager.js`**

```javascript
import { dbService } from '../../services/db-service.js';
import { WysiwygEditor } from '../components/wysiwyg-editor.js';

export async function initBlogManager(container) {
  let posts = await dbService.getPosts();
  let currentEditor = null;

  function renderList() {
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <h2>Gestión de Blog</h2>
        <button id="new-post-btn" style="padding:0.6rem 1.2rem; background:#38a169; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">+ Nuevo Artículo</button>
      </div>

      <div style="background:#1a1d24; border:1px solid #2d3748; border-radius:8px; overflow:hidden;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:#242832; color:#a0aec0;">
            <tr>
              <th style="padding:0.8rem 1rem;">Título</th>
              <th style="padding:0.8rem 1rem;">Estado</th>
              <th style="padding:0.8rem 1rem;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${posts.map(p => `
              <tr style="border-top:1px solid #2d3748;">
                <td style="padding:0.8rem 1rem;">${p.title}</td>
                <td style="padding:0.8rem 1rem;"><span style="background:${p.status === 'published' ? '#276749' : '#742a2a'}; padding:0.2rem 0.6rem; border-radius:4px; font-size:0.8rem;">${p.status}</span></td>
                <td style="padding:0.8rem 1rem;">
                  <button class="edit-post-btn" data-id="${p.id}" style="background:#3182ce; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:4px; cursor:pointer;">Editar</button>
                  <button class="del-post-btn" data-id="${p.id}" style="background:#e53e3e; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:4px; cursor:pointer;">Borrar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('new-post-btn').addEventListener('click', () => renderForm());
    container.querySelectorAll('.edit-post-btn').forEach(b => b.addEventListener('click', () => {
      const p = posts.find(item => item.id === b.dataset.id);
      renderForm(p);
    }));
    container.querySelectorAll('.del-post-btn').forEach(b => b.addEventListener('click', async () => {
      if (confirm('¿Eliminar artículo?')) {
        await dbService.deletePost(b.dataset.id);
        posts = await dbService.getPosts();
        renderList();
      }
    }));
  }

  function renderForm(post = null) {
    container.innerHTML = `
      <h2>${post ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
      <form id="post-form" style="margin-top:1.5rem; display:flex; flex-direction:column; gap:1.2rem;">
        <label>Título
          <input type="text" id="post-title" required value="${post ? post.title : ''}" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px;">
        </label>
        <label>Estado
          <select id="post-status" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px;">
            <option value="published" ${post?.status === 'published' ? 'selected' : ''}>Publicado</option>
            <option value="draft" ${post?.status === 'draft' ? 'selected' : ''}>Borrador</option>
          </select>
        </label>
        <div>
          <label style="display:block; margin-bottom:0.5rem;">Contenido del Artículo</label>
          <div id="editor-container"></div>
        </div>
        <div style="display:flex; gap:1rem;">
          <button type="submit" style="padding:0.8rem 1.5rem; background:#38a169; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">Guardar Post</button>
          <button type="button" id="cancel-post-btn" style="padding:0.8rem 1.5rem; background:#4a5568; color:#fff; border:none; border-radius:6px; cursor:pointer;">Cancelar</button>
        </div>
      </form>
    `;

    currentEditor = new WysiwygEditor(document.getElementById('editor-container'), post ? post.content : '');

    document.getElementById('cancel-post-btn').addEventListener('click', () => renderList());
    document.getElementById('post-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const postData = {
        id: post ? post.id : undefined,
        title: document.getElementById('post-title').value,
        status: document.getElementById('post-status').value,
        content: currentEditor.getContent(),
        created_at: post ? post.created_at : new Date().toISOString()
      };
      await dbService.savePost(postData);
      posts = await dbService.getPosts();
      renderList();
    });
  }

  renderList();
}
```

- [ ] **Step 3: Commit Task 6**
```bash
git add src/admin/components/wysiwyg-editor.js src/admin/modules/blog-cms-manager.js
git commit -m "feat: add Blog CMS module with WYSIWYG editor and WebP / YouTube tools"
```

---

### Task 7: Admin User Management Module

**Files:**
- Create: `src/admin/modules/user-manager.js`

- [ ] **Step 1: Write `user-manager.js`**

```javascript
import { dbService } from '../../services/db-service.js';

export async function initUserManager(container) {
  let users = await dbService.getUsers();

  function renderList() {
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <h2>Gestión de Usuarios</h2>
        <button id="new-user-btn" style="padding:0.6rem 1.2rem; background:#38a169; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">+ Agregar Usuario</button>
      </div>

      <div style="background:#1a1d24; border:1px solid #2d3748; border-radius:8px; overflow:hidden;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:#242832; color:#a0aec0;">
            <tr>
              <th style="padding:0.8rem 1rem;">Nombre</th>
              <th style="padding:0.8rem 1rem;">Email</th>
              <th style="padding:0.8rem 1rem;">Rol</th>
              <th style="padding:0.8rem 1rem;">Estado</th>
              <th style="padding:0.8rem 1rem;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr style="border-top:1px solid #2d3748;">
                <td style="padding:0.8rem 1rem;">${u.name || 'Sin Nombre'}</td>
                <td style="padding:0.8rem 1rem;">${u.email}</td>
                <td style="padding:0.8rem 1rem;">${u.role}</td>
                <td style="padding:0.8rem 1rem;">${u.active !== false ? 'Activo' : 'Inactivo'}</td>
                <td style="padding:0.8rem 1rem;">
                  <button class="edit-usr-btn" data-id="${u.id}" style="background:#3182ce; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:4px; cursor:pointer;">Editar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('new-user-btn').addEventListener('click', () => renderForm());
    container.querySelectorAll('.edit-usr-btn').forEach(b => b.addEventListener('click', () => {
      const u = users.find(item => item.id === b.dataset.id);
      renderForm(u);
    }));
  }

  function renderForm(user = null) {
    container.innerHTML = `
      <h2>${user ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
      <form id="usr-form" style="margin-top:1.5rem; display:flex; flex-direction:column; gap:1.2rem; max-width:500px;">
        <label>Nombre
          <input type="text" id="usr-name" required value="${user ? user.name || '' : ''}" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px;">
        </label>
        <label>Email
          <input type="email" id="usr-email" required value="${user ? user.email : ''}" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px;">
        </label>
        <label>Rol
          <select id="usr-role" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px;">
            <option value="admin" ${user?.role === 'admin' ? 'selected' : ''}>Administrador</option>
            <option value="editor" ${user?.role === 'editor' ? 'selected' : ''}>Editor</option>
          </select>
        </label>
        <label style="display:flex; align-items:center; gap:0.5rem;">
          <input type="checkbox" id="usr-active" ${user?.active !== false ? 'checked' : ''}> Usuario Activo
        </label>
        <div style="display:flex; gap:1rem;">
          <button type="submit" style="padding:0.8rem 1.5rem; background:#38a169; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">Guardar Usuario</button>
          <button type="button" id="cancel-usr-btn" style="padding:0.8rem 1.5rem; background:#4a5568; color:#fff; border:none; border-radius:6px; cursor:pointer;">Cancelar</button>
        </div>
      </form>
    `;

    document.getElementById('cancel-usr-btn').addEventListener('click', () => renderList());
    document.getElementById('usr-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const userData = {
        id: user ? user.id : undefined,
        name: document.getElementById('usr-name').value,
        email: document.getElementById('usr-email').value,
        role: document.getElementById('usr-role').value,
        active: document.getElementById('usr-active').checked
      };
      await dbService.saveUser(userData);
      users = await dbService.getUsers();
      renderList();
    });
  }

  renderList();
}
```

- [ ] **Step 2: Commit Task 7**
```bash
git add src/admin/modules/user-manager.js
git commit -m "feat: add User Management module"
```

---

### Task 8: Public Landing Page & Blog Section Integration

**Files:**
- Modify: `script.js`
- Create: `blog.html`
- Create: `src/public/blog.js`

- [ ] **Step 1: Update `script.js` to fetch section visibility from `DatabaseService`**

```javascript
import { dbService } from './src/services/db-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const settings = await dbService.getSettings();
    if (settings?.sections_toggle) {
      Object.entries(settings.sections_toggle).forEach(([sec, active]) => {
        const el = document.getElementById(sec) || document.querySelector(`.${sec}`);
        if (el) el.style.display = active ? '' : 'none';
      });
    }
  } catch (err) {
    console.warn('Could not sync dynamic settings:', err);
  }
});
```

- [ ] **Step 2: Create public `blog.html` page**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | El Camino del Samurai</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body style="background:#0f1115; color:#fff; font-family:'Inter', sans-serif; padding:2rem;">
  <header style="max-width:1000px; margin:0 auto 3rem; display:flex; justify-content:space-between; align-items:center;">
    <h1>Blog Samurai</h1>
    <a href="index.html" style="color:#63b3ed; text-decoration:none;">← Volver a la Landing</a>
  </header>
  <main id="blog-posts-container" style="max-width:1000px; margin:0 auto; display:grid; gap:2.5rem;"></main>

  <script type="module" src="src/public/blog.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `src/public/blog.js` public post renderer**

```javascript
import { dbService } from '../services/db-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('blog-posts-container');
  const posts = await dbService.getPosts();
  const published = posts.filter(p => p.status === 'published');

  if (published.length === 0) {
    container.innerHTML = '<p>No hay artículos publicados aún.</p>';
    return;
  }

  container.innerHTML = published.map(post => `
    <article style="background:#1a1d24; border:1px solid #2d3748; padding:2rem; border-radius:10px;">
      <h2 style="font-family:'Cinzel', serif; color:#e2e8f0; margin-top:0;">${post.title}</h2>
      <div style="font-size:0.85rem; color:#a0aec0; margin-bottom:1.5rem;">${new Date(post.created_at).toLocaleDateString('es-ES')}</div>
      <div class="post-body" style="line-height:1.7; color:#cbd5e0;">
        ${post.content}
      </div>
    </article>
  `).join('');
});
```

- [ ] **Step 4: Commit Task 8**
```bash
git add script.js blog.html src/public/blog.js
git commit -m "feat: integrate public landing page with dynamic settings and add public blog view"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-27-admin-backend-cms-plan.md`. Two execution options:

1. **Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach do you prefer?
