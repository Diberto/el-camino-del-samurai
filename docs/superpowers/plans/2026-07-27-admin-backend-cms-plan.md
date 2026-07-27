# PocketBase Linux & Cross-Platform Service Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate PocketBase as the primary backend provider for `DatabaseService`, create a cross-platform (Linux/Windows) runner script `scripts/start-pocketbase.js` that downloads/launches PocketBase, and ensure auto-seeding and robust client fallback.

**Architecture:** Node.js runner script detecting OS platform (Linux x64/arm64, Windows x64), downloading official PocketBase binary from GitHub releases if missing, running `pocketbase serve`, seeding default collections (`settings`, `posts`, `media`, `users`), and default `PocketBaseAdapter` setting in `db-service.js`.

---

### Task 1: Create `scripts/start-pocketbase.js` Cross-Platform Runner

**Files:**
- Create: `scripts/start-pocketbase.js`

- [ ] **Step 1: Write `scripts/start-pocketbase.js`**
  - Detect `process.platform` (linux, win32, darwin) and `process.arch` (x64, arm64).
  - Resolve GitHub release URL (e.g., `pocketbase_0.22.14_linux_amd64.zip` or `pocketbase_0.22.14_windows_amd64.zip`).
  - Extract to `bin/pocketbase/`.
  - Execute PocketBase daemon on port 8090.

---

### Task 2: Update `db-service.js` and `pocketbase-adapter.js`

**Files:**
- Modify: `src/services/db-service.js`
- Modify: `src/services/adapters/pocketbase-adapter.js`

- [ ] **Step 1: Set `'pocketbase'` as default provider in `db-service.js`**
- [ ] **Step 2: Add auto-seeding/fallback in `PocketBaseAdapter` for `getPosts`, `getSettings`, `getMedia`**

---

### Task 3: Update `package.json` Scripts & Verify Build

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add `"pb": "node scripts/start-pocketbase.js"` script to `package.json`**
- [ ] **Step 2: Execute `cmd.exe /c "npm run build"` to verify build**
- [ ] **Step 3: Commit and push changes to `origin master`**

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-27-admin-backend-cms-plan.md`.
