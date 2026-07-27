# El Camino Del Samurai: Blog Catalog & Reader Spec

## Overview
This specification defines the 2-stage public blog architecture: dynamic top 3 posts widget on `index.html`, full articles catalog view on `blog.html`, and single-article reading view on `blog.html?post=ID`.

---

## 1. Landing Page Widget (`script.js` & `index.html#blog`)
- Fetches all published posts via `dbService.getPosts()`.
- Sorts array by `created_at` in descending order and takes top 3 items (`slice(0, 3)`).
- Each card links directly to `blog.html?post=${post.id}`.

---

## 2. Dedicated Blog Page Router (`src/public/blog.js` & `blog.html`)

### 2.1 Catalog View (`blog.html` with no query parameter)
- Renders full list of published articles in responsive grid.
- Search / filter by title or keyword.
- Each item has a **"Leer Artículo →"** action that updates URL to `blog.html?post=${post.id}` and switches to Single Post view smoothly.

### 2.2 Single Post Reader View (`blog.html?post=ID`)
- Detects `post` URL parameter (`URLSearchParams`).
- Renders breadcrumb: **"← Volver a Todos los Artículos"** (resets URL back to `blog.html`).
- Renders cover image, title, author, date, and full HTML body.

---

## 3. Verification & Build Plan

1. **Vite Production Build**: Execute `cmd.exe /c "npm run build"`.
2. **Git Synchronization**: Commit and push changes to `origin master`.
