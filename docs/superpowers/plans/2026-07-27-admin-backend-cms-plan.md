# Unified Node App (`server.js`) Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `server.js` as the single Node.js entry point that launches PocketBase, proxies `/api/*` and `/_/*`, and serves the static production build on `process.env.PORT || 3000` for 1-click hosting deployment.

**Architecture:** Node.js HTTP server using Express / Http-Proxy or native HTTP server. Launches `scripts/start-pocketbase.js` on boot, proxies API calls to `127.0.0.1:8090`, and serves `dist/` static files.

---

### Task 1: Create `server.js` Entry Point

**Files:**
- Create: `server.js`
- Modify: `package.json`

- [ ] **Step 1: Write `server.js` using Express & `http-proxy-middleware` or native HTTP proxy**
  - Spawns `scripts/start-pocketbase.js`.
  - Proxies `/api/` and `/_/` to `http://127.0.0.1:8090`.
  - Serves static files from `dist/` (with fallback to `index.html`, `blog.html`, `admin.html`, `gpu.html`).
- [ ] **Step 2: Update `package.json` scripts (`"start": "node server.js"`, `"dev": "node server.js"`)**

---

### Task 2: Update `PocketBaseAdapter` for Relative `/api` Proxy Pathing

**Files:**
- Modify: `src/services/adapters/pocketbase-adapter.js`

- [ ] **Step 1: Update default `baseUrl` in `PocketBaseAdapter` to use relative path `''` or `window.location.origin`**
  - Enables seamless proxying through `server.js` without CORS or port issues.

---

### Task 3: Verify Build & Test Unified Server

- [ ] **Step 1: Run `cmd.exe /c "npm run build"` to verify frontend build**
- [ ] **Step 2: Test `cmd.exe /c "node server.js"`**
- [ ] **Step 3: Commit and push changes to `origin master`**

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-27-admin-backend-cms-plan.md`.
