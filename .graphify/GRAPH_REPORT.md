# Graph Report - .  (2026-08-20)

## Corpus Check
- 128 files · ~258.212 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 354 nodes · 726 edges · 12 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 178 · PARENT_OF: 177 · MODIFIES: 150 · contains: 82 · method: 69 · calls: 38 · imports: 32


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 128 · Candidates: 204
- Excluded: 0 untracked · 1447 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `40f7e13`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `PocketBaseAdapter` - 26 edges
2. `DatabaseService` - 26 edges
3. `dbService` - 12 edges
4. `GpuConfigEngine` - 10 edges
5. `SyncService` - 9 edges
6. `WysiwygEditor` - 6 edges
7. `SakuraPetal` - 5 edges
8. `renderView()` - 5 edges
9. `ensureBinary()` - 4 edges
10. `gpuConfig` - 3 edges

## Surprising Connections (you probably didn't know these)
- `0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 1 → community 0_
- `084f7f6 docs: add walkthrough documentation` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 2 → community 0_
- `0a8d211 feat(server): add scheduled auto-backup background worker` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 9 → community 0_
- `0a8d211 feat(server): add scheduled auto-backup background worker` --PARENT_OF--> `daecf0d feat(admin): add backup manager UI tab with manual, scheduled, and download/restore features`  [EXTRACTED]
  git → git  _Bridges community 9 → community 2_
- `0da1f79 refactor: remove unused local SQLite and Strapi adapters, UI selectors, and clean up codebase for pure PocketBase architecture` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 8 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (78): master, 0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle, 02b0dd5 fix(fuji): fill true peak tip coordinates (y:0..65 in layer 1) with solid 100% opaque cream snow, 02fe36c feat(mobile): position logo below parallax objects, adjust top margin, add left-to-right transparent glass sliding menu and left-aligned hamburger button, 0390b13 docs: update walkthrough for smart environment provider detection, 0562814 docs: update design spec for Media Library and blog image integration, 0e4583a checkpoint: volumetric clouds engine, deep royal blue sky, bottom mist layer, and verified parallax composition, 0f896e4 add design spec for animated day night sky (+70 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (35): 0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop, 111a100 fix(3d-book): repair 3d box geometry to prevent clipping/floating spine and update tomo selector buttons to match site standard style, 18d586b feat: scroll empuja particulas, burst al ir arriba, 1afbe94 fix: texto hero mas legible, gradiente superior sutil, 1d1d4eb fix: petalos mas lentos, radio de viento 350px y mas fuerza, 230d48f feat(3d-book): enlarge 3D book 20%, redesign tomo selector tabs, implement single flip button, and add continuous slow idle rotation with drag tracking, 2a3315c fix(performance): cap canvas resolution and parallax background container to a maximum width of 1280px, 336d2f1 feat: viento del mouse mucho mas notorio con estela (+27 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (30): checkAuth(), loadModules(), 084f7f6 docs: add walkthrough documentation, 1549879 docs: update implementation plan for unified samurai admin and real-time live sync, 2fcb02d fix: map admin section toggles and menu items to exact index.html DOM elements, 48d0413 feat: align admin shell with samurai design system and enable real-time home synchronization, 6cb0334 docs: update walkthrough documentation for unified samurai admin and real-time live sync, 7e7ab65 docs: update design spec for unified samurai admin and real-time synchronization (+22 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (12): 16d9a6e docs: add design spec for admin backend, cms and user management, 1fe3520 feat(audio): implement traditional Japanese Shakuhachi procedural flute audio engine with Zen temple reverb, pitch bends, and header toggle, 28ed22a feat(gpu): add /gpu configuration control panel with live real-time preview, cloud/particle/sky controls, user/global presets, and JSON export/import, a11a5b7 fix(navbar): remove GPU option from public header menu, cc9752f fix(gpu): connect site script to gpuConfig engine so saved cloud, particle, star, and sky settings apply dynamically, e127af5 docs: add implementation plan for admin backend, cms and user management, DEFAULT_PRESET, gpuConfig (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (1): DatabaseService

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (1): PocketBaseAdapter

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (16): 101f3c3 fix(server): resolve storage dir auto-creation and internal port auto-backup execution in server.js, 3bf6a3a docs: add design specification for architecture and performance optimization, 4882a88 fix(server): replace dynamic await import with static exec import in server.js, 52de155 fix(server & auth): add native backup proxy handler in server.js and improve admin auth fallback, 8ba7e5f docs: add implementation plan for architecture and performance optimization, c7cc8d1 fix(pocketbase): enforce chmod 0755 execution permissions on Linux servers to prevent EACCES errors, ee4947c perf(architecture & memory): implement zlib gzip compression, canvas background tab pause, sqlite RAM tuning, and image lazy loading, __dirname (+8 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (19): 1728be7 fix: use raw SQL UPDATE query in migration and pre-launch to forcefully set collection rules to NULL in SQLite, 1f0cf3c feat(opiniones): modulo CRUD en admin, galeria corregida y seccion de redes sociales (Instagram, YouTube, Facebook), 40f7e13 fix(ui): suavizado y fusion de bordes y niebla inferior en la seccion hero, 6d400fe fix: update server.listen for Unix Socket support in Hostinger Node manager, 6fcf262 feat: add 1700000001_unlock_collections migration to unblock 403 collection rules in PocketBase, 992fa5d chore: update graphify manifest and sync repository, a3e96d1 fix: return 404 for missing static assets to prevent Strict MIME type checking error, dd3ad3e fix: use native node:sqlite module in start-pocketbase.js to unlock PocketBase collection rules on Hostinger (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (18): 0da1f79 refactor: remove unused local SQLite and Strapi adapters, UI selectors, and clean up codebase for pure PocketBase architecture, 196097e fix: resolve PocketBase 400 Bad Request error by sending native json payload and adding site-config fallback, 3533889 docs: update walkthrough for admin login and module loading fix, 40ba44b fix: eliminate POST auto-seeding side effects on GET requests and fix PocketBase migration SchemaField syntax, 469316f fix: resolve PocketBase 400 Bad Request error by stringifying settings_data payload and handling empty collection initializations, 469434d fix: bypass redundant 502 auth retries when PocketBase server is offline, 4a8d488 fix: HTML structure in admin.html and sync build artifacts, 5961996 docs: update walkthrough for admin auto-provisioning and payload sanitization (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (19): 0a8d211 feat(server): add scheduled auto-backup background worker, 165b44d fix: make entire blog catalog cards and buttons clickable and support fallback slug/ID navigation, 16ee04a docs(plan): add implementation plan for backup system, 241dc91 docs: update walkthrough for home blog link navigation fix, 3b9e154 fix: resolve query string routing bug in server.js so blog.html?post=... opens blog.html instead of falling back to index.html, 452ac9f docs: update walkthrough for blog query parameter routing fix, 8cd8d91 docs: update walkthrough for blog post navigation fix, 9cb9cbc fix: resolve navigation conflict on home blog cards by using clean anchor links (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (1): WysiwygEditor

### Community 11 - "Community 11"
Cohesion: 0.60
Nodes (1): SakuraPetal

## Knowledge Gaps
- **18 isolated node(s):** `__filename`, `__dirname`, `rootDir`, `binDir`, `dataDir` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 4`** (1 nodes): `DatabaseService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (1 nodes): `PocketBaseAdapter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `WysiwygEditor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `SakuraPetal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DatabaseService` connect `Community 4` to `Community 0`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `PocketBaseAdapter` connect `Community 5` to `Community 8`, `Community 0`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `rootDir` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05031645569620253 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05795918367346939 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0708245243128964 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08602150537634409 - nodes in this community are weakly interconnected._