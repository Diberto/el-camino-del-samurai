# Graph Report - .  (2026-08-18)

## Corpus Check
- 110 files · ~237.429 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 337 nodes · 692 edges · 16 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 176 · PARENT_OF: 175 · MODIFIES: 139 · contains: 75 · method: 63 · calls: 34 · imports: 30


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 110 · Candidates: 152
- Excluded: 49 untracked · 1452 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `dd3ad3e`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `PocketBaseAdapter` - 23 edges
2. `DatabaseService` - 23 edges
3. `dbService` - 11 edges
4. `GpuConfigEngine` - 10 edges
5. `SyncService` - 9 edges
6. `WysiwygEditor` - 6 edges
7. `SakuraPetal` - 5 edges
8. `ensureBinary()` - 4 edges
9. `renderView()` - 4 edges
10. `gpuConfig` - 3 edges

## Surprising Connections (you probably didn't know these)
- `0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 13 → community 7_
- `02fe36c feat(mobile): position logo below parallax objects, adjust top margin, add left-to-right transparent glass sliding menu and left-aligned hamburger button` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 10 → community 7_
- `0390b13 docs: update walkthrough for smart environment provider detection` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 1 → community 7_
- `0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 2 → community 7_
- `084f7f6 docs: add walkthrough documentation` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 8 → community 7_

## Communities

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (7): DEFAULT_PRESET, GpuConfigEngine, gpuConfig, updateUIFromConfig(), updatePresetDropdown(), applySkyGradients(), 28ed22a feat(gpu): add /gpu configuration control panel with live real-time preview, cloud/particle/sky controls, user/global presets, and JSON export/import

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (46): __filename, __dirname, DIST_DIR, PUBLIC_DIR, pbScript, pbProcess, MIME_TYPES, server (+38 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (21): __filename, __dirname, rootDir, binDir, dataDir, migrationsDir, binPath, getDownloadUrl() (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (15): 0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop, 18d586b feat: scroll empuja particulas, burst al ir arriba, 1afbe94 fix: texto hero mas legible, gradiente superior sutil, 1d1d4eb fix: petalos mas lentos, radio de viento 350px y mas fuerza, 336d2f1 feat: viento del mouse mucho mas notorio con estela, 69a07f6 feat: petals 3D con Three.js y viento del mouse, 773c0b5 fix(assets): bundle WebP logo and cloud assets via ES imports in script.js to resolve 404 broken image errors, 9e88171 Revert "feat: petals 3D con Three.js y viento del mouse" (+7 more)

### Community 15 - "Community 15"
Cohesion: 0.60
Nodes (1): SakuraPetal

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (32): checkAuth(), loadModules(), WysiwygEditor, initBackupManager(), initBlogManager(), initGpuManager(), initMediaManager(), initSectionsManager() (+24 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (15): SECTION_LABELS, SECTION_URL_MAP, 084f7f6 docs: add walkthrough documentation, 1549879 docs: update implementation plan for unified samurai admin and real-time live sync, 1c33ae2 docs: update walkthrough for Blog section implementation, 2fcb02d fix: map admin section toggles and menu items to exact index.html DOM elements, 48d0413 feat: align admin shell with samurai design system and enable real-time home synchronization, 6cb0334 docs: update walkthrough documentation for unified samurai admin and real-time live sync (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (15): getTargetPostId(), renderView(), escapeHTML(), renderCatalog(), renderSinglePost(), 102b502 feat: add dynamic top 3 posts widget to home and 2-stage blog catalog and single post reader view, 16ee04a docs(plan): add implementation plan for backup system, 3b9e154 fix: resolve query string routing bug in server.js so blog.html?post=... opens blog.html instead of falling back to index.html (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (1): PocketBaseAdapter

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (1): DatabaseService

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (10): 0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle, 02b0dd5 fix(fuji): fill true peak tip coordinates (y:0..65 in layer 1) with solid 100% opaque cream snow, 0e4583a checkpoint: volumetric clouds engine, deep royal blue sky, bottom mist layer, and verified parallax composition, 2f73c41 feat(sky): add dual background/foreground WebGPU clouds passing in front and behind Mount Fuji, bottom atmospheric mist layer, and deep royal blue sky gradient, 514414b fix(sakura): restore original static layer 7 and layer 8 parallax petals and fix Mount Fuji snow cap, 5ea7b41 feat(clouds): integrate WebGPU dynamic atmospheric clouds shader with WebGL fallback and optimize Mount Fuji snow cap coverage, 732199f feat(clouds): transition from mathematical shaders to organic volumetric cloud texture engine with realistic Japanese cumulus/cirrus drifting physics, 7f08f53 fix(fuji): resolve fuji snow cap transparency by selectively filling peak cutout region with opaque cream and restoring high-fidelity layers (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.17
Nodes (12): 02fe36c feat(mobile): position logo below parallax objects, adjust top margin, add left-to-right transparent glass sliding menu and left-aligned hamburger button, 1dae309 fix(menu): lock all menu text link colors to light white (#f8f9fa) with shadow in all modes for perfect legibility, 2228b27 feat(mobile): align Enso artwork to top below navbar and position logo typography cleanly below circle, 2e00a3f fix(theme): eliminate duplicate event listener on theme-toggle to fix Day/Night mode switching, 52462a2 style(navbar): transition sticky header to ultra-translucent frosted glassmorphism with high backdrop blur, 603d5fe fix(navbar): keep sticky menu styling identical and unified in all modes, 785f410 fix(logo): maintain white typography logo in desktop mode for both day and night themes, 90fc3cd feat(theme): extend Day/Night mode transition to 100% of website background, cards, text, and sections (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (21): 0f896e4 add design spec for animated day night sky, 16d9a6e docs: add design spec for admin backend, cms and user management, 1fe3520 feat(audio): implement traditional Japanese Shakuhachi procedural flute audio engine with Zen temple reverb, pitch bends, and header toggle, 241dc91 docs: update walkthrough for home blog link navigation fix, 3e1faf4 add implementation plan for animated day night sky, 3f7d802 feat(sky): implement azure sky blue background, white clouds, GPU acceleration, and preserve vivid red sun and cherry blossom colors, 5650d5b fix(sky): make mountain backdrop sky transparent so animated day/night sky layers are fully visible, 5b9e949 fix(fuji): reconstruct Mount Fuji snow peak with 100% opaque bright white snow cap (+13 more)

### Community 11 - "Community 11"
Cohesion: 0.18
Nodes (11): 111a100 fix(3d-book): repair 3d box geometry to prevent clipping/floating spine and update tomo selector buttons to match site standard style, 230d48f feat(3d-book): enlarge 3D book 20%, redesign tomo selector tabs, implement single flip button, and add continuous slow idle rotation with drag tracking, 443707e feat(parallax): restrict desktop parallax artwork objects canvas to max-width 1280px while preserving full-width sky background, 6114a72 fix(navbar): lock desktop menu text link color to bright white (#f8f9fa) with shadow in both day and night modes, 7e6eae1 assets: add Logo.webp, c642b72 fix(clouds): restore missing clouds-fg-canvas element in index.html and make canvas context initialization resilient, cbacb09 fix(hero): contain hero logo and artwork within 1200px max-width centered container, resolving edge seam cut error, cc310b4 feat(theme): implement interactive micro sky engine inside day/night toggle button with stars, moon aura, drifting clouds, and solar rays (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (11): 1d552ed feat: integrate PocketBase as default provider with cross-platform (Linux/Windows) runner script and auto-seeding, 28cd58f docs: update walkthrough for PocketBase cross-platform service, 4cfca8e docs: update walkthrough for PocketBase systemd daemon service, 61d9e54 docs: update design spec for Unified Node App server, 9a29bbf fix: update Hero section action button from Oráculo Zen to Comprar (#contacto), b3dc1fb docs: update walkthrough for audio removal, c266afd feat: verify PocketBase as default backend provider and add Linux systemd daemon service script, c2e6c56 docs: update plan for PocketBase Linux and cross-platform service integration (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (7): 2a3315c fix(performance): cap canvas resolution and parallax background container to a maximum width of 1280px, 5290f56 fix(lightbox): extract loaded image URL directly to fix modal expansion 404 and refine modal overlay design, 54c49f4 feat(gallery): integrate author portrait (orpianesi1.webp) and add interactive photo gallery with Lightbox modal, 5ae8c77 feat(mobile): maximize Enso circle artwork and typography logo size, restore original full-width stacked CTA buttons, a9f9253 feat(branding): crop exact circular red kanji seal stamp directly from assets/Logo.webp, d6f8411 fix(mobile): lock hero height to 100vh with seamless bottom gradient overlay to eliminate scroll gap, d85fa73 feat(branding): replace text kanjis in author signature and footer logo with official circular red kanji seal stamp (kanji_stamp.webp)

## Knowledge Gaps
- **17 isolated node(s):** `__filename`, `__dirname`, `rootDir`, `binDir`, `dataDir` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 15`** (1 nodes): `SakuraPetal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (1 nodes): `PocketBaseAdapter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (1 nodes): `DatabaseService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DatabaseService` connect `Community 5` to `Community 1`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `PocketBaseAdapter` connect `Community 6` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `dbService` connect `Community 1` to `Community 8`, `Community 9`, `Community 2`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `rootDir` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11956521739130435 - nodes in this community are weakly interconnected._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.050505050505050504 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.1067193675889328 - nodes in this community are weakly interconnected._