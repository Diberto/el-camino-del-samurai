# Unified Samurai Admin & Real-Time Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Admin dashboard (`/admin.html`) to completely match the Home landing page aesthetic ([styles.css](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/styles.css)) and establish real-time live synchronization (`BroadcastChannel`) between Admin edits and the Home landing page (`index.html`).

**Architecture:** A unified dark samurai glassmorphism UI leveraging `styles.css` variables, connected via `syncService` (`BroadcastChannel('samurai_sync')`) to update section toggles, navigation menu links, GPU engine configs, and blog posts instantly on `index.html` without reloading.

**Tech Stack:** ES Modules, HTML5, CSS3 (`styles.css` design system), Web APIs (`BroadcastChannel`, `localStorage`).

## Global Constraints
- Target workspace: `d:\Documentos\Work\hummus\samurai\el-camino-del-samurai`
- Full visual consistency with `styles.css` (Cinzel/Plus Jakarta Sans, `#d81124`, `#c5a880`, glassmorphism cards).
- Instant real-time DOM updates on `index.html` when saved in `admin.html`.

---

### Task 1: Real-Time Sync Service (`src/services/sync-service.js`)

**Files:**
- Create: `src/services/sync-service.js`

**Interfaces:**
- Produces: `syncService` with `broadcast(type, payload)` and `subscribe(callback)`.

- [ ] **Step 1: Write `src/services/sync-service.js` using `BroadcastChannel`**

```javascript
// src/services/sync-service.js
class SyncService {
  constructor() {
    this.channelName = 'samurai_sync_channel';
    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(this.channelName);
    } else {
      this.channel = null;
    }
  }

  broadcast(type, payload = {}) {
    const data = { type, payload, timestamp: Date.now() };
    if (this.channel) {
      this.channel.postMessage(data);
    }
    localStorage.setItem('samurai_last_sync_event', JSON.stringify(data));
  }

  subscribe(callback) {
    if (this.channel) {
      this.channel.onmessage = (event) => callback(event.data);
    }
    window.addEventListener('storage', (e) => {
      if (e.key === 'samurai_last_sync_event' && e.newValue) {
        try {
          callback(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Error parsing sync storage event:', err);
        }
      }
    });
  }
}

export const syncService = new SyncService();
```

- [ ] **Step 2: Commit Task 1**
```bash
git add src/services/sync-service.js
git commit -m "feat: add syncService for real-time BroadcastChannel synchronization"
```

---

### Task 2: Redesign Admin Dashboard Shell (`admin.html`, `src/admin/admin.css`) with Samurai Design System

**Files:**
- Modify: `admin.html`
- Modify: `src/admin/admin.css`
- Modify: `src/admin/admin.js`

- [ ] **Step 1: Update `admin.html` to inherit `styles.css` classes, fonts, and Samurai aesthetic**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samurai Admin Panel | El Camino del Samurai</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="src/admin/admin.css">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body class="admin-body theme-night">
  <div id="login-modal" class="admin-login-modal">
    <div class="login-box samurai-card">
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <span class="logo-symbol" style="font-size: 2.5rem;">⚔️</span>
        <h2 class="samurai-title">SAMURAI ADMIN</h2>
        <p class="samurai-subtitle">Control & Gestión del Sitio</p>
      </div>
      <form id="login-form">
        <div class="form-group">
          <label>Email de Administrador</label>
          <input type="email" id="login-email" required value="admin@samurai.com">
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" id="login-password" required value="admin123">
        </div>
        <div id="login-error" class="login-error"></div>
        <button type="submit" class="btn btn-samurai-red" style="width: 100%; margin-top: 1rem;">Iniciar Sesión</button>
      </form>
    </div>
  </div>

  <div id="admin-app" class="admin-layout hidden">
    <aside class="admin-sidebar samurai-card">
      <div class="sidebar-header">
        <span class="logo-symbol">⚔️</span>
        <h3 class="samurai-title">SAMURAI ADMIN</h3>
      </div>
      <nav class="sidebar-nav">
        <button class="nav-item active" data-tab="sections">🚩 Secciones y Menú</button>
        <button class="nav-item" data-tab="gpu">⚙️ Opciones GPU</button>
        <button class="nav-item" data-tab="blog">✍️ Blog CMS</button>
        <button class="nav-item" data-tab="users">👥 Usuarios</button>
      </nav>
      <div class="sidebar-footer">
        <div class="user-info">
          Usuario: <strong id="user-display-name">Admin</strong>
        </div>
        <button id="logout-btn" class="btn btn-samurai-outline" style="width: 100%;">Cerrar Sesión</button>
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

- [ ] **Step 2: Update `src/admin/admin.css` using `styles.css` variables**

```css
.admin-body {
  margin: 0;
  background-color: var(--bg-primary, #07080a);
  color: var(--text-primary, #f8f9fa);
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
  min-height: 100vh;
}

.samurai-card {
  background: var(--bg-card, rgba(18, 19, 26, 0.85));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  border-radius: 12px;
}

.samurai-title {
  font-family: var(--font-title, 'Cinzel', serif);
  color: var(--text-primary, #f8f9fa);
  letter-spacing: 0.05em;
  margin: 0;
}

.samurai-subtitle {
  color: var(--text-secondary, #a2aab2);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.btn-samurai-red {
  background: var(--accent-red, #d81124);
  color: #ffffff;
  border: 1px solid var(--accent-red-hover, #ef233c);
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 15px var(--accent-red-glow, rgba(216, 17, 36, 0.35));
  transition: all 0.3s ease;
}

.btn-samurai-red:hover {
  background: var(--accent-red-hover, #ef233c);
  transform: translateY(-2px);
}

.btn-samurai-outline {
  background: transparent;
  color: var(--text-secondary, #a2aab2);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.15));
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-samurai-outline:hover {
  border-color: var(--accent-gold, #c5a880);
  color: var(--accent-gold, #c5a880);
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-secondary, #a2aab2);
  margin-bottom: 0.4rem;
}

.form-group input {
  width: 100%;
  padding: 0.7rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  color: var(--text-primary, #ffffff);
  border-radius: 6px;
  box-sizing: border-box;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-gold, #c5a880);
  box-shadow: 0 0 10px var(--accent-gold-glow, rgba(197, 168, 128, 0.3));
}

.admin-login-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.login-box {
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
}

.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 280px;
  margin: 1.5rem 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 2rem;
  flex: 1;
}

.nav-item {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-secondary, #a2aab2);
  padding: 0.9rem 1.2rem;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
  transition: all 0.3s ease;
}

.nav-item:hover, .nav-item.active {
  background: rgba(197, 168, 128, 0.1);
  border-color: var(--accent-gold, #c5a880);
  color: var(--accent-gold, #c5a880);
}

.admin-content {
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;
}

.tab-panel { display: none; }
.tab-panel.active { display: block; }
.hidden { display: none !important; }
```

- [ ] **Step 3: Commit Task 2**
```bash
git add admin.html src/admin/admin.css
git commit -m "feat: redesign Admin Dashboard shell with full Samurai Design System aesthetics"
```

---

### Task 3: Emit Sync Events from Admin Modules

**Files:**
- Modify: `src/admin/modules/sections-menu-manager.js`
- Modify: `src/admin/modules/gpu-config-manager.js`
- Modify: `src/admin/modules/blog-cms-manager.js`

- [ ] **Step 1: Update `sections-menu-manager.js` to emit `syncService.broadcast('SETTINGS_UPDATED', settings)`**

```javascript
import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';

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
    <h2 class="samurai-title" style="margin-bottom: 1.5rem;">Control de Secciones y Menú</h2>
    <div style="display: grid; gap: 2rem;">
      <div class="samurai-card" style="padding: 1.5rem;">
        <h3 class="samurai-title" style="font-size: 1.2rem;">Visibilidad de Secciones</h3>
        <div id="sections-toggle-list" style="display:flex; flex-direction:column; gap:0.8rem; margin-top:1rem;">
          ${Object.entries(settings.sections_toggle).map(([sec, active]) => `
            <label style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:0.8rem 1rem; border-radius:6px; border:1px solid rgba(255,255,255,0.05);">
              <span style="text-transform:capitalize; font-weight:600; color:var(--text-primary);">${sec}</span>
              <input type="checkbox" data-section="${sec}" ${active ? 'checked' : ''} style="width:20px; height:20px; accent-color:var(--accent-red);">
            </label>
          `).join('')}
        </div>
      </div>

      <div class="samurai-card" style="padding: 1.5rem;">
        <h3 class="samurai-title" style="font-size: 1.2rem;">Menú de Navegación</h3>
        <div id="menu-items-list" style="display:flex; flex-direction:column; gap:0.8rem; margin-top:1rem;">
          ${settings.navigation_menu.map(item => `
            <div class="menu-item-row" style="display:flex; gap:0.8rem; align-items:center;">
              <input type="text" value="${item.label}" data-key="label" data-id="${item.id}" style="padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; flex:1;">
              <input type="text" value="${item.url}" data-key="url" data-id="${item.id}" style="padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; flex:1;">
              <label style="display:flex; align-items:center; gap:0.3rem; color:var(--text-secondary);"><input type="checkbox" data-key="visible" data-id="${item.id}" ${item.visible ? 'checked' : ''} style="accent-color:var(--accent-red);"> Visible</label>
            </div>
          `).join('')}
        </div>
      </div>
      <button id="save-sections-btn" class="btn-samurai-red" style="width: fit-content;">Guardar y Sincronizar</button>
      <div id="save-sections-msg" style="color:var(--accent-gold); font-weight:600;"></div>
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
    syncService.broadcast('SETTINGS_UPDATED', settings);

    document.getElementById('save-sections-msg').textContent = '¡Configuración guardada y sincronizada en vivo!';
    setTimeout(() => { document.getElementById('save-sections-msg').textContent = ''; }, 3000);
  });
}
```

- [ ] **Step 2: Update `gpu-config-manager.js` to emit `syncService.broadcast('SETTINGS_UPDATED', settings)`**

```javascript
import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';

export async function initGpuManager(container) {
  const settings = (await dbService.getSettings()) || {};
  const gpuConf = settings.gpu_config || {
    renderScale: 1.0,
    quality: 'high',
    enableShaders: true
  };

  container.innerHTML = `
    <h2 class="samurai-title" style="margin-bottom: 1.5rem;">Configuración Motor GPU</h2>
    <div class="samurai-card" style="padding:1.5rem; max-width:600px;">
      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        <label style="color:var(--text-secondary);">Escala de Renderizado (Render Scale): <strong id="gpu-scale-val" style="color:var(--accent-gold);">${gpuConf.renderScale}</strong>
          <input type="range" id="gpu-scale" min="0.5" max="2.0" step="0.1" value="${gpuConf.renderScale}" style="width:100%; margin-top:0.5rem; accent-color:var(--accent-red);">
        </label>

        <label style="color:var(--text-secondary);">Nivel de Calidad Shaders
          <select id="gpu-quality" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); color:#fff; border:1px solid rgba(255,255,255,0.1); border-radius:6px; margin-top:0.5rem;">
            <option value="low" ${gpuConf.quality === 'low' ? 'selected' : ''}>Bajo (Rendimiento)</option>
            <option value="medium" ${gpuConf.quality === 'medium' ? 'selected' : ''}>Medio</option>
            <option value="high" ${gpuConf.quality === 'high' ? 'selected' : ''}>Alto (Ultra)</option>
          </select>
        </label>

        <label style="display:flex; align-items:center; gap:0.5rem; color:var(--text-primary);">
          <input type="checkbox" id="gpu-shaders" ${gpuConf.enableShaders ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--accent-red);"> Activar Efectos WebGL/WebGPU
        </label>

        <button id="save-gpu-btn" class="btn-samurai-red" style="width:100%;">Guardar Ajustes GPU</button>
        <div id="save-gpu-msg" style="color:var(--accent-gold); font-weight:600;"></div>
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
    syncService.broadcast('SETTINGS_UPDATED', settings);

    document.getElementById('save-gpu-msg').textContent = '¡Ajustes GPU actualizados y sincronizados en vivo!';
    setTimeout(() => { document.getElementById('save-gpu-msg').textContent = ''; }, 3000);
  });
}
```

- [ ] **Step 3: Commit Task 3**
```bash
git add src/admin/modules/sections-menu-manager.js src/admin/modules/gpu-config-manager.js
git commit -m "feat: emit real-time sync events on settings and GPU updates"
```

---

### Task 4: Subscribe `index.html` (`script.js`) to Live Synchronization

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Update `script.js` to listen to `syncService.subscribe()`**

```javascript
import { syncService } from './src/services/sync-service.js';
import { dbService } from './src/services/db-service.js';

// Inside DOMContentLoaded:
function applyDynamicSettings(settings) {
  if (!settings) return;
  if (settings.sections_toggle) {
    Object.entries(settings.sections_toggle).forEach(([sec, active]) => {
      const el = document.getElementById(sec) || document.querySelector(`.${sec}`);
      if (el) el.style.display = active ? '' : 'none';
    });
  }

  if (settings.navigation_menu) {
    const navContainer = document.querySelector('.nav-links') || document.querySelector('nav ul');
    if (navContainer) {
      navContainer.innerHTML = settings.navigation_menu
        .filter(item => item.visible !== false)
        .map(item => `<li><a href="${item.url}">${item.label}</a></li>`)
        .join('');
    }
  }
}

// Initial fetch + Live Sync Listener
(async () => {
  const initialSettings = await dbService.getSettings();
  applyDynamicSettings(initialSettings);

  syncService.subscribe((event) => {
    if (event.type === 'SETTINGS_UPDATED') {
      applyDynamicSettings(event.payload);
    }
  });
})();
```

- [ ] **Step 2: Commit Task 4**
```bash
git add script.js
git commit -m "feat: subscribe landing page script.js to live sync events for immediate DOM updates"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-27-admin-backend-cms-plan.md`. Two execution options:

1. **Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach do you prefer?
