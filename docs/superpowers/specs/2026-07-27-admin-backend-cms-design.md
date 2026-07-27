# El Camino Del Samurai: PocketBase Linux & Cross-Platform Service Spec

## Overview
This specification documents the cross-platform PocketBase service runner (`scripts/start-pocketbase.js`), auto-seeder, and default `PocketBaseAdapter` integration supporting Linux (amd64/arm64) and Windows OS.

---

## 1. Cross-Platform PocketBase Binary Resolution

### 1.1 Operating System & Architecture Detection
`scripts/start-pocketbase.js` inspects `process.platform` and `process.arch`:
- **Linux x64**: `pocketbase_0.22.14_linux_amd64.zip`
- **Linux arm64**: `pocketbase_0.22.14_linux_arm64.zip`
- **Windows x64**: `pocketbase_0.22.14_windows_amd64.zip`

### 1.2 Binary Acquisition & Execution
- Downloads target zip from PocketBase GitHub Releases if binary (`./pocketbase` or `./pocketbase.exe`) is not found in `./bin/pocketbase/`.
- Extracts executable, grants execute permissions (`chmod +x` on Linux), and launches `pocketbase serve --http=127.0.0.1:8090`.

---

## 2. Database Service & Default Provider Settings

### 2.1 Provider Factory Update (`db-service.js`)
- Default provider set to `'pocketbase'`.
- `PocketBaseAdapter` includes auto-fallback/seeding logic: if PocketBase returns empty/404 or fails to respond, returns default initial posts (3 articles with public WebP images) and section toggles so website renders 100% reliably.

---

## 3. Verification & Build Plan

1. **Vite Production Build**: Execute `cmd.exe /c "npm run build"`.
2. **Git Synchronization**: Commit and push changes to `origin master`.
