# Sistema de Respaldos Integrales Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a comprehensive backup system allowing manual backup creation, automatic scheduled backups with retention policies, backup file download, and full system restoration (from server list or local `.zip` upload).

**Architecture:** Extend `server.js` reverse proxy for PocketBase backup APIs (`/api/backups`), add an in-memory background cron worker in `server.js` for automatic backups, add backup adapter methods to `PocketBaseAdapter`, and build a dedicated `backup-manager.js` module rendered inside `admin.html`.

**Tech Stack:** Node.js, PocketBase Backups REST API, Native Fetch/FormData, JavaScript ES Modules, HTML5 Drag & Drop.

## Global Constraints

- PocketBase Backup API path: `/api/backups`
- Supported Auto Frequencies: `disabled`, `daily` (24h), `weekly` (7d), `monthly` (30d)
- Maximum Retention Options: `5`, `10`, `20` backups
- Target HTML file: `admin.html`
- New JS module: `src/admin/modules/backup-manager.js`

---

### Task 1: Reverse Proxy Endpoints and Storage Directory Support in `server.js`

**Files:**
- Modify: `server.js`

**Interfaces:**
- Consumes: HTTP Requests to `/api/backups`
- Produces: Proxied PocketBase backup responses including file downloads and multipart uploads

- [ ] **Step 1: Update `server.js` proxy route to handle binary backup downloads and file uploads**

```javascript
// In server.js - ensure /api/backups endpoints pass headers and streams cleanly
```

- [ ] **Step 2: Verify `server.js` starts and proxies `/api/backups` requests correctly**

Run: `node server.js`
Expected: Server listening on port 3000 and proxying to 8090.

- [ ] **Step 3: Commit**

```bash
git add server.js
git commit -m "feat(server): ensure backup API endpoints and file streams are correctly proxied"
```

---

### Task 2: Backend Adapter Methods for Backup Operations in `PocketBaseAdapter` & `dbService`

**Files:**
- Modify: `src/services/adapters/pocketbase-adapter.js`
- Modify: `src/services/db-service.js`

**Interfaces:**
- Consumes: `/api/backups` REST endpoints
- Produces: `getBackups()`, `createBackup()`, `restoreBackup(key)`, `uploadBackup(file)`, `deleteBackup(key)`, `getBackupSettings()`, `saveBackupSettings(config)`

- [ ] **Step 1: Implement backup methods in `PocketBaseAdapter`**

```javascript
  async getBackups() {
    return await this.request('/api/backups');
  }

  async createBackup(name = '') {
    return await this.request('/api/backups', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
  }

  async restoreBackup(key) {
    return await this.request(`/api/backups/${encodeURIComponent(key)}/restore`, {
      method: 'POST'
    });
  }

  async deleteBackup(key) {
    return await this.request(`/api/backups/${encodeURIComponent(key)}`, {
      method: 'DELETE'
    });
  }

  async uploadBackup(file) {
    const formData = new FormData();
    formData.append('file', file);
    const headers = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    const res = await fetch(`${this.baseUrl}/api/backups/upload`, {
      method: 'POST',
      headers,
      body: formData
    });
    return res.ok;
  }
```

- [ ] **Step 2: Expose backup methods in `dbService` wrapper**

Add `getBackups()`, `createBackup()`, `restoreBackup(key)`, `deleteBackup(key)`, `uploadBackup(file)` to `DatabaseService` class in `src/services/db-service.js`.

- [ ] **Step 3: Test build**

Run: `node node_modules/vite/bin/vite.js build`
Expected: Build passes without syntax or import errors.

- [ ] **Step 4: Commit**

```bash
git add src/services/adapters/pocketbase-adapter.js src/services/db-service.js
git commit -m "feat(db-service): add PocketBase backup management API methods"
```

---

### Task 3: Automatic Scheduled Backup Cron Worker in `server.js`

**Files:**
- Modify: `server.js`

**Interfaces:**
- Consumes: Backup settings stored in PocketBase / SQLite
- Produces: In-memory background timer checking every hour whether auto-backup is due

- [ ] **Step 1: Add scheduled backup worker logic in `server.js`**

```javascript
// Auto-backup background worker in server.js
function startAutoBackupWorker() {
  setInterval(async () => {
    try {
      // Check backup settings and trigger backup if due
    } catch (err) {
      console.error('Auto backup error:', err);
    }
  }, 60 * 60 * 1000); // Check hourly
}
```

- [ ] **Step 2: Test server startup**

Run: `node server.js`
Expected: Auto backup worker initialized silently.

- [ ] **Step 3: Commit**

```bash
git add server.js
git commit -m "feat(server): add scheduled auto-backup background worker"
```

---

### Task 4: Admin UI Module `backup-manager.js` and Tab `💾 Respaldos` in `admin.html`

**Files:**
- Create: `src/admin/modules/backup-manager.js`
- Modify: `admin.html`
- Modify: `src/admin/admin.js`

**Interfaces:**
- Consumes: `dbService` backup methods and `syncService`
- Produces: Complete UI for manual backup creation, auto-backup settings, backups history table, and zip upload restoration

- [ ] **Step 1: Create `src/admin/modules/backup-manager.js`**

Build `initBackupManager(container)` with:
1. Manual backup button `⚡ Crear Respaldo Ahora`.
2. Automatic backup configuration form (Frequency: Disabled / 24h / 7d / 30d, Retention: 5/10/20).
3. Backups history table with Download, Restore, and Delete actions per row.
4. External `.zip` upload area for full site restoration.

- [ ] **Step 2: Add `💾 Respaldos` tab button and container section in `admin.html`**

Update `<nav class="sidebar-nav">` with `<button class="nav-item" data-tab="backups">💾 Respaldos</button>` and `<section id="tab-backups" class="tab-panel"></section>`.

- [ ] **Step 3: Register `initBackupManager` in `src/admin/admin.js`**

Import `initBackupManager` and bind it to `tab-backups` tab click.

- [ ] **Step 4: Verify build and test UI**

Run: `node node_modules/vite/bin/vite.js build`
Expected: Clean build with all assets bundled.

- [ ] **Step 5: Commit**

```bash
git add admin.html src/admin/admin.js src/admin/modules/backup-manager.js
git commit -m "feat(admin): add backup manager UI tab with manual, scheduled, and download/restore features"
```
