# Graph Report - .  (2026-08-21)

## Corpus Check
- 128 files · ~260.698 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 365 nodes · 748 edges · 12 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 179 · PARENT_OF: 178 · MODIFIES: 155 · contains: 88 · method: 73 · calls: 43 · imports: 32


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 128 · Candidates: 216
- Excluded: 1 untracked · 1447 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `6e84b4a`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `PocketBaseAdapter` - 28 edges
2. `DatabaseService` - 28 edges
3. `dbService` - 12 edges
4. `GpuConfigEngine` - 10 edges
5. `SyncService` - 9 edges
6. `WysiwygEditor` - 6 edges
7. `SakuraPetal` - 5 edges
8. `renderView()` - 5 edges
9. `ensureBinary()` - 4 edges
10. `serveDiagnosticsHealth()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `0390b13 docs: update walkthrough for smart environment provider detection` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 1 → community 0_
- `084f7f6 docs: add walkthrough documentation` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 9 → community 0_
- `0a8d211 feat(server): add scheduled auto-backup background worker` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 8 → community 0_
- `0a8d211 feat(server): add scheduled auto-backup background worker` --PARENT_OF--> `daecf0d feat(admin): add backup manager UI tab with manual, scheduled, and download/restore features`  [EXTRACTED]
  git → git  _Bridges community 8 → community 1_
- `0da1f79 refactor: remove unused local SQLite and Strapi adapters, UI selectors, and clean up codebase for pure PocketBase architecture` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 2 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (73): master, 0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle, 02b0dd5 fix(fuji): fill true peak tip coordinates (y:0..65 in layer 1) with solid 100% opaque cream snow, 02fe36c feat(mobile): position logo below parallax objects, adjust top margin, add left-to-right transparent glass sliding menu and left-aligned hamburger button, 0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop, 0e4583a checkpoint: volumetric clouds engine, deep royal blue sky, bottom mist layer, and verified parallax composition, 0f896e4 add design spec for animated day night sky, 111a100 fix(3d-book): repair 3d box geometry to prevent clipping/floating spine and update tomo selector buttons to match site standard style (+65 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (33): checkAuth(), loadModules(), 0390b13 docs: update walkthrough for smart environment provider detection, 0562814 docs: update design spec for Media Library and blog image integration, 215584e fix: restore PocketBase as default backend provider and enable Dual Sync for global persistence, 26bbdaa docs: update walkthrough for Media Library implementation, 2e08ad4 docs: update walkthrough for Strapi integration, 43b96bb docs: update walkthrough for WYSIWYG redesign and post duplication (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (30): 0da1f79 refactor: remove unused local SQLite and Strapi adapters, UI selectors, and clean up codebase for pure PocketBase architecture, 13fc8df docs: update walkthrough for Hostinger deployment log analysis, 14d3d80 fix: resolve PocketBase collection 404 errors with auto-migration and remove stray AudioContext on page load, 17c5296 fix: eliminate 404 network fetch errors on static hosting by conditionally querying PocketBase when base URL is configured, 196097e fix: resolve PocketBase 400 Bad Request error by sending native json payload and adding site-config fallback, 21e2a6e docs: update plan for Unified Node App server integration, 28b5340 feat: add server.js single-entrypoint Node app for 1-click deployment on any hosting provider, 31f490d docs: update walkthrough for PocketBase default provider restoration (+22 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (21): 101f3c3 fix(server): resolve storage dir auto-creation and internal port auto-backup execution in server.js, 3bf6a3a docs: add design specification for architecture and performance optimization, 4882a88 fix(server): replace dynamic await import with static exec import in server.js, 52de155 fix(server & auth): add native backup proxy handler in server.js and improve admin auth fallback, 8ba7e5f docs: add implementation plan for architecture and performance optimization, c7cc8d1 fix(pocketbase): enforce chmod 0755 execution permissions on Linux servers to prevent EACCES errors, ee4947c perf(architecture & memory): implement zlib gzip compression, canvas background tab pause, sqlite RAM tuning, and image lazy loading, checkPocketBaseHealth() (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (1): DatabaseService

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (1): PocketBaseAdapter

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (21): 165b44d fix: make entire blog catalog cards and buttons clickable and support fallback slug/ID navigation, 1728be7 fix: use raw SQL UPDATE query in migration and pre-launch to forcefully set collection rules to NULL in SQLite, 1f0cf3c feat(opiniones): modulo CRUD en admin, galeria corregida y seccion de redes sociales (Instagram, YouTube, Facebook), 6d400fe fix: update server.listen for Unix Socket support in Hostinger Node manager, 6fcf262 feat: add 1700000001_unlock_collections migration to unblock 403 collection rules in PocketBase, 992fa5d chore: update graphify manifest and sync repository, a3e96d1 fix: return 404 for missing static assets to prevent Strict MIME type checking error, d46f078 fix: resolve 502 Bad Gateway by adding multi-method zip extraction on Linux and zero-downtime reverse proxy fallback (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (7): 28ed22a feat(gpu): add /gpu configuration control panel with live real-time preview, cloud/particle/sky controls, user/global presets, and JSON export/import, DEFAULT_PRESET, gpuConfig, GpuConfigEngine, applySkyGradients(), updatePresetDropdown(), updateUIFromConfig()

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (18): 0a8d211 feat(server): add scheduled auto-backup background worker, 16ee04a docs(plan): add implementation plan for backup system, 241dc91 docs: update walkthrough for home blog link navigation fix, 3b9e154 fix: resolve query string routing bug in server.js so blog.html?post=... opens blog.html instead of falling back to index.html, 40f7e13 fix(ui): suavizado y fusion de bordes y niebla inferior en la seccion hero, 452ac9f docs: update walkthrough for blog query parameter routing fix, 6e84b4a feat(optimizations): mejoras de seguridad anti-XSS, headers HTTP, sitemap dinamico, rendimiento GPU y accesibilidad, 8cd8d91 docs: update walkthrough for blog post navigation fix (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (15): 084f7f6 docs: add walkthrough documentation, 1549879 docs: update implementation plan for unified samurai admin and real-time live sync, 1c33ae2 docs: update walkthrough for Blog section implementation, 2fcb02d fix: map admin section toggles and menu items to exact index.html DOM elements, 48d0413 feat: align admin shell with samurai design system and enable real-time home synchronization, 6cb0334 docs: update walkthrough documentation for unified samurai admin and real-time live sync, 7710994 docs: update plan for Strapi Headless CMS integration, 7e7ab65 docs: update design spec for unified samurai admin and real-time synchronization (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (16): 102b502 feat: add dynamic top 3 posts widget to home and 2-stage blog catalog and single post reader view, 1d552ed feat: integrate PocketBase as default provider with cross-platform (Linux/Windows) runner script and auto-seeding, 28cd58f docs: update walkthrough for PocketBase cross-platform service, 4cfca8e docs: update walkthrough for PocketBase systemd daemon service, 5d50db6 docs: update design spec for Blog catalog and reader views, 61d9e54 docs: update design spec for Unified Node App server, 73225bf docs: update plan for Blog catalog and reader views, 9a29bbf fix: update Hero section action button from Oráculo Zen to Comprar (#contacto) (+8 more)

### Community 11 - "Community 11"
Cohesion: 0.60
Nodes (1): SakuraPetal

## Knowledge Gaps
- **19 isolated node(s):** `__filename`, `__dirname`, `rootDir`, `binDir`, `dataDir` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 4`** (1 nodes): `DatabaseService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (1 nodes): `PocketBaseAdapter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `SakuraPetal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DatabaseService` connect `Community 4` to `Community 1`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `PocketBaseAdapter` connect `Community 5` to `Community 2`, `Community 1`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `rootDir` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.050156739811912224 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.061683599419448475 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07741935483870968 - nodes in this community are weakly interconnected._