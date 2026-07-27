# El Camino Del Samurai: Unified Admin Backend, CMS & Real-time Home Synchronization Spec

## Overview
This document specifies the unified design system alignment and real-time live synchronization between the Admin Backend (`/admin.html`), the public Landing page (`index.html`), and the public Blog page (`blog.html`).

---

## 1. Design System Alignment & Visual Coherence

### 1.1 Aesthetics & Styling
- The Admin dashboard ([admin.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/admin.html)) directly imports [styles.css](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/styles.css) and operates on the same CSS design tokens:
  - Font Families: `'Cinzel', serif` for headers and branding; `'Plus Jakarta Sans', sans-serif` for body UI elements.
  - Colors: Crimson Red (`--accent-red`, `#d81124`), Samurai Gold (`--accent-gold`, `#c5a880`), Dark Night Card backgrounds (`var(--bg-card)` with `backdrop-filter: blur(12px)` glassmorphism).
  - Glowing borders and Samurai Kanji badge styles (`var(--border-glow)`).
  - Native Day/Night theme switcher matching the main landing page (`body.theme-night`).

---

## 2. Real-Time Bidirectional Synchronization (`BroadcastChannel`)

### 2.1 Synchronization Mechanism
To guarantee live updates without manual page refreshes:
- A `BroadcastChannel('samurai_sync')` API is initialized across `admin.html`, `script.js` (`index.html`), and `blog.js` (`blog.html`).
- When an admin saves section toggles, modifies the navigation menu, adjusts GPU engine options, or publishes a blog post, a broadcast payload is emitted:
  ```json
  {
    "type": "SETTINGS_UPDATED",
    "payload": { "sections_toggle": {...}, "navigation_menu": [...], "gpu_config": {...} },
    "timestamp": 1785090000000
  }
  ```
- `script.js` listens to `samurai_sync` messages and immediately:
  1. Toggles section display states (`display: none` / `display: block`).
  2. Re-renders navigation menu links in real-time.
  3. Updates GPU parameters in `gpuConfig` dynamically.

---

## 3. Database Layer & Media Processing

### 3.1 `DatabaseService` Architecture
- Multi-provider adapter layer supporting PocketBase (default), Local Storage / SQLite fallback, Supabase, and Firebase drivers.
- WebP Canvas client converter utility (`webp-converter.js`) compressing uploaded images.
- YouTube embed helper utility (`youtube-embed.js`) embedding responsive HTML5 containers.

---

## 4. Verification Plan

1. **Vite Production Build**: Run `npm run build` via `cmd.exe /c` to ensure all 4 pages (`index.html`, `gpu.html`, `admin.html`, `blog.html`) bundle cleanly.
2. **Real-time Synchronization Test**: Verify `BroadcastChannel` events trigger DOM updates on `index.html` when modified in `admin.html`.
