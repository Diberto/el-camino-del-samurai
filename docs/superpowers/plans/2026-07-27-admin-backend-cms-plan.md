# Media Library & Blog Image Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a Media Library Manager (`media-manager.js`) tab in the Admin panel, connect it to `DatabaseService`, normalize image URLs for blog posts, and enable media selection in the WYSIWYG editor and blog post cover picker.

**Architecture:** Extended `DatabaseService` adapters with `getMedia()`, `uploadMedia()`, and `deleteMedia()`. Media Library module rendering asset grid with WebP conversion, URL copying, and modal picker for Blog posts.

---

### Task 1: Extend `DatabaseService` & Adapters with `getMedia` and Normalized Image URLs

**Files:**
- Modify: `src/services/adapters/sqlite-adapter.js`
- Modify: `src/services/adapters/strapi-adapter.js`
- Modify: `src/services/adapters/pocketbase-adapter.js`
- Modify: `src/services/db-service.js`

- [ ] **Step 1: Normalize asset URLs and add `getMedia`, `deleteMedia` to adapters and `db-service.js`**

---

### Task 2: Create `src/admin/modules/media-manager.js` and Integrate into `admin.html` & `admin.js`

**Files:**
- Create: `src/admin/modules/media-manager.js`
- Modify: `admin.html`
- Modify: `src/admin/admin.js`

- [ ] **Step 1: Create `media-manager.js` with WebP Uploader, Media Grid, Copy URL, and Delete actions**
- [ ] **Step 2: Add `🖼️ Medios` tab to `admin.html` sidebar and wire in `admin.js`**

---

### Task 3: Integrate Media Library Modal Picker into WYSIWYG Editor and Blog CMS

**Files:**
- Modify: `src/admin/components/wysiwyg-editor.js`
- Modify: `src/admin/modules/blog-cms-manager.js`

- [ ] **Step 1: Add Media Library Modal Picker to `wysiwyg-editor.js`**
- [ ] **Step 2: Add Cover Image field and Media Selector to `blog-cms-manager.js`**
- [ ] **Step 3: Verify build with `cmd.exe /c "npm run build"` and push to GitHub**

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-27-admin-backend-cms-plan.md`.
