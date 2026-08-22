# Graph Report - .  (2026-08-22)

## Corpus Check
- 130 files · ~262.412 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 370 nodes · 764 edges · 19 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 180 · PARENT_OF: 179 · MODIFIES: 163 · contains: 91 · method: 73 · calls: 44 · imports: 34


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 130 · Candidates: 225
- Excluded: 1 untracked · 1451 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `cf9d01a`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `PocketBaseAdapter` - 28 edges
2. `DatabaseService` - 28 edges
3. `dbService` - 13 edges
4. `GpuConfigEngine` - 10 edges
5. `SyncService` - 9 edges
6. `WysiwygEditor` - 6 edges
7. `SakuraPetal` - 5 edges
8. `renderView()` - 5 edges
9. `ensureBinary()` - 4 edges
10. `serveDiagnosticsHealth()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 10 → community 6_
- `0390b13 docs: update walkthrough for smart environment provider detection` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 1 → community 6_
- `0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 5 → community 6_
- `0562814 docs: update design spec for Media Library and blog image integration` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 16 → community 6_
- `084f7f6 docs: add walkthrough documentation` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 0 → community 6_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (44): checkAuth(), loadModules(), 084f7f6 docs: add walkthrough documentation, 1549879 docs: update implementation plan for unified samurai admin and real-time live sync, 1c33ae2 docs: update walkthrough for Blog section implementation, 1f0cf3c feat(opiniones): modulo CRUD en admin, galeria corregida y seccion de redes sociales (Instagram, YouTube, Facebook), 26bbdaa docs: update walkthrough for Media Library implementation, 2e08ad4 docs: update walkthrough for Strapi integration (+36 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (38): 0390b13 docs: update walkthrough for smart environment provider detection, 0a8d211 feat(server): add scheduled auto-backup background worker, 0da1f79 refactor: remove unused local SQLite and Strapi adapters, UI selectors, and clean up codebase for pure PocketBase architecture, 13fc8df docs: update walkthrough for Hostinger deployment log analysis, 14d3d80 fix: resolve PocketBase collection 404 errors with auto-migration and remove stray AudioContext on page load, 17c5296 fix: eliminate 404 network fetch errors on static hosting by conditionally querying PocketBase when base URL is configured, 196097e fix: resolve PocketBase 400 Bad Request error by sending native json payload and adding site-config fallback, 1d552ed feat: integrate PocketBase as default provider with cross-platform (Linux/Windows) runner script and auto-seeding (+30 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (23): 101f3c3 fix(server): resolve storage dir auto-creation and internal port auto-backup execution in server.js, 3bf6a3a docs: add design specification for architecture and performance optimization, 4882a88 fix(server): replace dynamic await import with static exec import in server.js, 52de155 fix(server & auth): add native backup proxy handler in server.js and improve admin auth fallback, 8ba7e5f docs: add implementation plan for architecture and performance optimization, c7cc8d1 fix(pocketbase): enforce chmod 0755 execution permissions on Linux servers to prevent EACCES errors, ee4947c perf(architecture & memory): implement zlib gzip compression, canvas background tab pause, sqlite RAM tuning, and image lazy loading, checkPocketBaseHealth() (+15 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (1): DatabaseService

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (1): PocketBaseAdapter

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (11): 0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop, 336d2f1 feat: viento del mouse mucho mas notorio con estela, 69a07f6 feat: petals 3D con Three.js y viento del mouse, 773c0b5 fix(assets): bundle WebP logo and cloud assets via ES imports in script.js to resolve 404 broken image errors, 9e88171 Revert "feat: petals 3D con Three.js y viento del mouse", a6e9380 Initial commit, e629f53 feat: petals afectados por viento del mouse (velocidad/direccion), eaa4638 fix: samurai detras del texto hero en mobile (z-index) (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.16
Nodes (24): master, 02fe36c feat(mobile): position logo below parallax objects, adjust top margin, add left-to-right transparent glass sliding menu and left-aligned hamburger button, 16d9a6e docs: add design spec for admin backend, cms and user management, 1dae309 fix(menu): lock all menu text link colors to light white (#f8f9fa) with shadow in all modes for perfect legibility, 1fe3520 feat(audio): implement traditional Japanese Shakuhachi procedural flute audio engine with Zen temple reverb, pitch bends, and header toggle, 2228b27 feat(mobile): align Enso artwork to top below navbar and position logo typography cleanly below circle, 28cd58f docs: update walkthrough for PocketBase cross-platform service, 2e00a3f fix(theme): eliminate duplicate event listener on theme-toggle to fix Day/Night mode switching (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (7): 28ed22a feat(gpu): add /gpu configuration control panel with live real-time preview, cloud/particle/sky controls, user/global presets, and JSON export/import, DEFAULT_PRESET, gpuConfig, GpuConfigEngine, applySkyGradients(), updatePresetDropdown(), updateUIFromConfig()

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (17): 1728be7 fix: use raw SQL UPDATE query in migration and pre-launch to forcefully set collection rules to NULL in SQLite, 6d400fe fix: update server.listen for Unix Socket support in Hostinger Node manager, 6fcf262 feat: add 1700000001_unlock_collections migration to unblock 403 collection rules in PocketBase, 992fa5d chore: update graphify manifest and sync repository, a3e96d1 fix: return 404 for missing static assets to prevent Strict MIME type checking error, dd3ad3e fix: use native node:sqlite module in start-pocketbase.js to unlock PocketBase collection rules on Hostinger, binDir, binPath (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.16
Nodes (17): 165b44d fix: make entire blog catalog cards and buttons clickable and support fallback slug/ID navigation, 16ee04a docs(plan): add implementation plan for backup system, 241dc91 docs: update walkthrough for home blog link navigation fix, 3b9e154 fix: resolve query string routing bug in server.js so blog.html?post=... opens blog.html instead of falling back to index.html, 452ac9f docs: update walkthrough for blog query parameter routing fix, 8cd8d91 docs: update walkthrough for blog post navigation fix, 9cb9cbc fix: resolve navigation conflict on home blog cards by using clean anchor links, ad996eb docs(spec): add backup system design specification (+9 more)

### Community 10 - "Community 10"
Cohesion: 0.20
Nodes (10): 0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle, 02b0dd5 fix(fuji): fill true peak tip coordinates (y:0..65 in layer 1) with solid 100% opaque cream snow, 0e4583a checkpoint: volumetric clouds engine, deep royal blue sky, bottom mist layer, and verified parallax composition, 2f73c41 feat(sky): add dual background/foreground WebGPU clouds passing in front and behind Mount Fuji, bottom atmospheric mist layer, and deep royal blue sky gradient, 514414b fix(sakura): restore original static layer 7 and layer 8 parallax petals and fix Mount Fuji snow cap, 5ea7b41 feat(clouds): integrate WebGPU dynamic atmospheric clouds shader with WebGL fallback and optimize Mount Fuji snow cap coverage, 732199f feat(clouds): transition from mathematical shaders to organic volumetric cloud texture engine with realistic Japanese cumulus/cirrus drifting physics, 7f08f53 fix(fuji): resolve fuji snow cap transparency by selectively filling peak cutout region with opaque cream and restoring high-fidelity layers (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.20
Nodes (10): 2a3315c fix(performance): cap canvas resolution and parallax background container to a maximum width of 1280px, 443707e feat(parallax): restrict desktop parallax artwork objects canvas to max-width 1280px while preserving full-width sky background, 5290f56 fix(lightbox): extract loaded image URL directly to fix modal expansion 404 and refine modal overlay design, 54c49f4 feat(gallery): integrate author portrait (orpianesi1.webp) and add interactive photo gallery with Lightbox modal, 5ae8c77 feat(mobile): maximize Enso circle artwork and typography logo size, restore original full-width stacked CTA buttons, a9f9253 feat(branding): crop exact circular red kanji seal stamp directly from assets/Logo.webp, cbacb09 fix(hero): contain hero logo and artwork within 1200px max-width centered container, resolving edge seam cut error, d6f8411 fix(mobile): lock hero height to 100vh with seamless bottom gradient overlay to eliminate scroll gap (+2 more)

### Community 12 - "Community 12"
Cohesion: 0.20
Nodes (10): 3f7d802 feat(sky): implement azure sky blue background, white clouds, GPU acceleration, and preserve vivid red sun and cherry blossom colors, 5650d5b fix(sky): make mountain backdrop sky transparent so animated day/night sky layers are fully visible, 5b9e949 fix(fuji): reconstruct Mount Fuji snow peak with 100% opaque bright white snow cap, 6d2db3a feat(sakura): implement high-performance dynamic 3D-flipping sakura falling petals particle system, 6e21877 feat(sky): convert red sun into dynamic celestial orb morphing into mystical full moon in night mode, 7179ed1 feat(css): add styles for Day/Night skies, clouds drifting, and theme toggle, 9c9ebe0 fix(fuji): resolve transparent holes in fuji snow peak by preserving high-luminance white pixels, c8d7182 feat(html): add sky container markup and theme toggle button (+2 more)

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (8): 111a100 fix(3d-book): repair 3d box geometry to prevent clipping/floating spine and update tomo selector buttons to match site standard style, 230d48f feat(3d-book): enlarge 3D book 20%, redesign tomo selector tabs, implement single flip button, and add continuous slow idle rotation with drag tracking, 6114a72 fix(navbar): lock desktop menu text link color to bright white (#f8f9fa) with shadow in both day and night modes, 7e6eae1 assets: add Logo.webp, c642b72 fix(clouds): restore missing clouds-fg-canvas element in index.html and make canvas context initialization resilient, cc310b4 feat(theme): implement interactive micro sky engine inside day/night toggle button with stars, moon aura, drifting clouds, and solar rays, d6df3b9 feat(sakura): replace particle ellipses with organic cherry blossom petal textures extracted directly from layer 7 and layer 8, e46bc8f fix(layout): wrap hero parallax elements in centered 1280px stage container and extend clouds canvas bleed to fix cut off edges

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (7): 102b502 feat: add dynamic top 3 posts widget to home and 2-stage blog catalog and single post reader view, 5d50db6 docs: update design spec for Blog catalog and reader views, 73225bf docs: update plan for Blog catalog and reader views, 9a29bbf fix: update Hero section action button from Oráculo Zen to Comprar (#contacto), 9db1bb9 docs: update walkthrough for 2-stage blog catalog and reader router, dcd0258 docs: update walkthrough for public photos static path fix, e8e6597 fix: remove admin panel link from public footer

### Community 15 - "Community 15"
Cohesion: 0.33
Nodes (6): 0f896e4 add design spec for animated day night sky, 18d586b feat: scroll empuja particulas, burst al ir arriba, 1afbe94 fix: texto hero mas legible, gradiente superior sutil, 1d1d4eb fix: petalos mas lentos, radio de viento 350px y mas fuerza, 3e1faf4 add implementation plan for animated day night sky, ae99829 feat: boton scroll to top, remove musica

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (5): 0562814 docs: update design spec for Media Library and blog image integration, 43b96bb docs: update walkthrough for WYSIWYG redesign and post duplication, 441d589 docs: update walkthrough for autocomplete and connection handling, 7cfa4b6 fix: add autocomplete attributes to login inputs, add login provider selector, and handle unstarted PocketBase server connection errors, f3c80ce docs: update plan for Media Library integration

### Community 17 - "Community 17"
Cohesion: 0.50
Nodes (1): WysiwygEditor

### Community 18 - "Community 18"
Cohesion: 0.60
Nodes (1): SakuraPetal

## Knowledge Gaps
- **19 isolated node(s):** `__filename`, `__dirname`, `rootDir`, `binDir`, `dataDir` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 3`** (1 nodes): `DatabaseService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (1 nodes): `PocketBaseAdapter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `WysiwygEditor`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `SakuraPetal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DatabaseService` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `PocketBaseAdapter` connect `Community 4` to `Community 1`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `rootDir` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.053763440860215055 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06852497096399536 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07386363636363637 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._