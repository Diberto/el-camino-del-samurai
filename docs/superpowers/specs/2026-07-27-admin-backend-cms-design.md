# El Camino Del Samurai: Unified Node App (`server.js`) Spec

## Overview
This specification details the zero-config, single-entrypoint Node.js application server (`server.js`) that manages PocketBase backend execution, API reverse proxying, and static web serving for standard hosting environments.

---

## 1. Unified Node App Server Specifications (`server.js`)

### 1.1 Server Components & Execution Flow
1. **PocketBase Process Lifecycle**:
   - `server.js` executes `scripts/start-pocketbase.js` on startup.
   - Ensures PocketBase binary exists (downloading for Linux/Windows if missing) and runs PocketBase on internal port `8090`.
2. **Reverse Proxying**:
   - Intercepts requests matching `/api/*` and `/_/*` (PocketBase Admin UI) and proxies them to `http://127.0.0.1:8090`.
3. **Static Web Serving**:
   - Serves static assets from `dist/` (or `public/` during development).
   - Serves `index.html`, `blog.html`, `admin.html`, `gpu.html` seamlessly on port assigned by hosting (`process.env.PORT` or `3000`).

---

## 2. Package & Build Configuration

### 2.1 `package.json` Updates
- `"start": "node server.js"`
- `"dev": "node server.js"`
- `"build": "vite build"`

---

## 3. Verification & Build Plan

1. **Vite Production Build**: Execute `cmd.exe /c "npm run build"`.
2. **Node App Test**: Test `node server.js` to confirm single-process serving.
3. **Git Synchronization**: Commit and push changes to `origin master`.
