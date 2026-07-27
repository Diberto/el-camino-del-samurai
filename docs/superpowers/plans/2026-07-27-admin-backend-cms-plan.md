# Blog Catalog & Single Article Reader View Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure the home page blog section shows the top 3 latest published articles linked directly to `blog.html?post=ID`, and implement a 2-view router on `blog.html` (Catalog List View + Single Article Reader View).

**Architecture:** `script.js` updates home blog grid with direct links to `blog.html?post=ID`. `src/public/blog.js` reads `URLSearchParams` to render either the full article catalog or the single article reading view with breadcrumbs.

---

### Task 1: Update Home Blog Widget in `script.js`

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Ensure `renderHomeBlogPosts()` sorts published posts by `created_at` desc, takes top 3, and links each post card to `blog.html?post=${post.id}`**

---

### Task 2: Implement Catalog List View & Single Article Reader View in `src/public/blog.js` and `blog.html`

**Files:**
- Modify: `blog.html`
- Modify: `src/public/blog.js`

- [ ] **Step 1: Update `blog.html` header structure for dynamic breadcrumbs and view toggling**
- [ ] **Step 2: Rewrite `src/public/blog.js` with client-side view router based on `URLSearchParams` or `#id`**
  - If `?post=ID` exists, render Single Article Reader view with cover banner, breadcrumbs, title, author, date, and full HTML body.
  - Otherwise, render Catalog List view with search input and cards for ALL published articles.

---

### Task 3: Verify Build & Push to GitHub

- [ ] **Step 1: Execute `cmd.exe /c "npm run build"` to verify 0 errors**
- [ ] **Step 2: Commit and push changes to `origin master`**

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-27-admin-backend-cms-plan.md`.
