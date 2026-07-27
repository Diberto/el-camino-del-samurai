# El Camino Del Samurai: Media Library & Blog Integration Spec

## Overview
This specification details the unified Media Library (`media-manager.js`) integrated into the Admin dashboard, `DatabaseService`, Blog CMS, and WYSIWYG editor for WebP asset management across the website.

---

## 1. Media Library Specifications

### 1.1 Data Schema & Adapter Extensions
- `getMedia()`: Retrieves array of media objects `[{ id, name, url, size, type, created_at }]`.
- `uploadMedia(file)`: Converts file to WebP canvas buffer and persists it via active database adapter (`LocalSqliteAdapter`, `StrapiAdapter`, or `PocketBaseAdapter`), returning absolute/relative URL.
- `deleteMedia(id)`: Removes target media item from store.

### 1.2 Default Assets Standardization
Normalize asset URLs to avoid spaces and ensure static server compatibility:
- `assets/photos/orpianesi1.webp`
- `assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.09.webp`
- `assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.13.webp`
- `assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.15.webp`

---

## 2. Blog CMS & WYSIWYG Integration

### 2.1 Cover Image Selector
- Post editor includes a Cover Image field with live preview thumbnail and **"🖼️ Seleccionar de Galería"** modal picker.

### 2.2 WYSIWYG Media Picker Button
- **"🖼️ Galería"** toolbar button opens a modal showing all media assets in the Media Library. Clicking any image inserts `<img src="..." alt="...">` into the editor DOM.

---

## 3. Verification & Build Plan

1. **Vite Production Build**: Run `cmd.exe /c "npm run build"`.
2. **Git Synchronization**: Commit and push changes to `origin master`.
