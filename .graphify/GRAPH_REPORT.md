# Graph Report - .  (2026-09-02)

## Corpus Check
- Large corpus: 203 files · ~551.023 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 504 nodes · 1242 edges · 25 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 391 · MODIFIES: 312 · PARENT_OF: 221 · contains: 147 · method: 73 · calls: 58 · imports: 40


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 203 · Candidates: 322
- Excluded: 54 untracked · 295 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `8fbbfec`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `PocketBaseAdapter` - 28 edges
2. `DatabaseService` - 28 edges
3. `dbService` - 14 edges
4. `GpuConfigEngine` - 10 edges
5. `SyncService` - 10 edges
6. `WysiwygEditor` - 6 edges
7. `SakuraPetal` - 5 edges
8. `renderView()` - 5 edges
9. `handleNativeDataStore()` - 5 edges
10. `showPhotoAtIndex()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 13 → community 4_
- `0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle` --ON_BRANCH--> `php-version`  [EXTRACTED]
  git → git  _Bridges community 13 → community 0_
- `02fe36c feat(mobile): position logo below parallax objects, adjust top margin, add left-to-right transparent glass sliding menu and left-aligned hamburger button` --ON_BRANCH--> `php-version`  [EXTRACTED]
  git → git  _Bridges community 4 → community 0_
- `0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 5 → community 4_
- `0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop` --ON_BRANCH--> `php-version`  [EXTRACTED]
  git → git  _Bridges community 5 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (80): php-version, 004180a feat(hero): apilar emblema Enso limpio con tipografia debajo en logo chico y ocultar parallax grande en modo mobile, 0390b13 docs: update walkthrough for smart environment provider detection, 0562814 docs: update design spec for Media Library and blog image integration, 084f7f6 docs: add walkthrough documentation, 0a8d211 feat(server): add scheduled auto-backup background worker, 0da1f79 refactor: remove unused local SQLite and Strapi adapters, UI selectors, and clean up codebase for pure PocketBase architecture, 13fc8df docs: update walkthrough for Hostinger deployment log analysis (+72 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (29): 07d709b fix(design): restaurar 100% fidelidad visual original, visor 3D interactivo, petalos sakura y animaciones completas, 089b602 feat(blog-nav): rediseño de listado de blog en grilla compacta con paginacion y navegacion limpia entre paginas sin superposicion de anclas, 2371b41 feat(engine): unificar motor interactivo maestro con nubes volumetricas, parallax 3D, starfield, sakura y 3D book drag, 29fb907 fix(layout): corregir espacio superior en mobile colocando hero directo bajo navbar y equilibrar columnas de ediciones con ancho 50/50, 36a7478 feat(links): actualizar enlaces oficiales de compra de Amazon Global y Budokan Argentina (Tomo 1 y Tomo 2), 4096f57 feat(media-analytics): implementar Biblioteca Central de Medios, modal selector universal y Dashboard de analiticas y visitas, 418b8b4 sec(data): agregar .htaccess para proteger archivos de base de datos JSON, 4dfedf5 feat(webp-optimizer): implementar optimizacion y conversion automatica a WebP de todas las imagenes subidas (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (1): DatabaseService

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (1): PocketBaseAdapter

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (27): master, 02fe36c feat(mobile): position logo below parallax objects, adjust top margin, add left-to-right transparent glass sliding menu and left-aligned hamburger button, 102b502 feat: add dynamic top 3 posts widget to home and 2-stage blog catalog and single post reader view, 1dae309 fix(menu): lock all menu text link colors to light white (#f8f9fa) with shadow in all modes for perfect legibility, 2228b27 feat(mobile): align Enso artwork to top below navbar and position logo typography cleanly below circle, 28cd58f docs: update walkthrough for PocketBase cross-platform service, 2e00a3f fix(theme): eliminate duplicate event listener on theme-toggle to fix Day/Night mode switching, 4cfca8e docs: update walkthrough for PocketBase systemd daemon service (+19 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (12): 0405449 fix(logo): restore white typography logo (logo_typography_light.webp) with enhanced drop-shadow for 100% legibility on both mobile and desktop, 34b9d9b fix: corregir visibilidad de secciones en Samsung (eliminar bloqueo fade-in) y maximizar visibilidad del boton Comprar en iPhone sin interferencia de niebla, 773c0b5 fix(assets): bundle WebP logo and cloud assets via ES imports in script.js to resolve 404 broken image errors, bfbf89c fix(samsung): resolver lag y artefactos visuales (eliminar content-visibility con jank en One UI, corregir escalado de canvas setTransform DPR, y limpiar mascaras/filtros conflictivos en moviles), e679a82 perf: optimizaciones integrales de rendimiento para moviles de baja gama (capping DPR, suspension RAF fuera de pantalla, reduccion de particulas, content-visibility y eliminacion de blurs pesados), ec4f3b1 fix(mobile): resolve asset loading stall and add fail-safe handlers for mobile browser network rendering, f7921ed fix(canvas): prevent InvalidStateError in drawImage by checking texture load state before rendering cloud particles, fae5c61 fix(logo): ensure maximum contrast and prevent overflow clipping for typography logo on mobile and desktop (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (16): checkPocketBaseHealth(), __dirname, DIST_DIR, fetchCollectionCount(), __filename, generateSitemapXml(), getDirectorySize(), MIME_TYPES (+8 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (7): 28ed22a feat(gpu): add /gpu configuration control panel with live real-time preview, cloud/particle/sky controls, user/global presets, and JSON export/import, DEFAULT_PRESET, gpuConfig, GpuConfigEngine, applySkyGradients(), updatePresetDropdown(), updateUIFromConfig()

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (21): 71f1d80 fix(persistence): proteger datos y medios contra sobreescrituras en despliegues con export/import JSON, 8ccca63 fix(media): carga y persistencia real de imagenes en uploads/ y editor completo de Galería Fotográfica, 93efe9c fix: corregir logo letras negras permanente, titulo opiniones de nuestros lectores, titulo y enlaces oficiales de redes sociales, y boton de compra Budokan Web, 94e9395 fix(static): decodificacion de URLs con espacios (decodeURIComponent) y favicon.ico 404 fix, a0744dc feat(storage): motor de persistencia nativo en disco (data/) para Hostinger Node.js y produccion, ed6b561 feat: actualizar logo con letras negras, seccion opiniones lectores, macro enlaces redes, ediciones y contacto oficial, DATA_DIR, DEFAULT_MEDIA (+13 more)

### Community 9 - "Community 9"
Cohesion: 0.16
Nodes (13): checkAuth(), loadModules(), 40f7e13 fix(ui): suavizado y fusion de bordes y niebla inferior en la seccion hero, 6e84b4a feat(optimizations): mejoras de seguridad anti-XSS, headers HTTP, sitemap dinamico, rendimiento GPU y accesibilidad, cf9d01a feat(admin): modulo de diagnosticos/logs, configuracion de redes sociales y metadatos SEO en medios, daecf0d feat(admin): add backup manager UI tab with manual, scheduled, and download/restore features, initBackupManager(), initDiagnosticsManager() (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (17): 1728be7 fix: use raw SQL UPDATE query in migration and pre-launch to forcefully set collection rules to NULL in SQLite, 6d400fe fix: update server.listen for Unix Socket support in Hostinger Node manager, 6fcf262 feat: add 1700000001_unlock_collections migration to unblock 403 collection rules in PocketBase, 992fa5d chore: update graphify manifest and sync repository, a3e96d1 fix: return 404 for missing static assets to prevent Strict MIME type checking error, dd3ad3e fix: use native node:sqlite module in start-pocketbase.js to unlock PocketBase collection rules on Hostinger, binDir, binPath (+9 more)

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (12): 0f896e4 add design spec for animated day night sky, 18d586b feat: scroll empuja particulas, burst al ir arriba, 1afbe94 fix: texto hero mas legible, gradiente superior sutil, 1d1d4eb fix: petalos mas lentos, radio de viento 350px y mas fuerza, 336d2f1 feat: viento del mouse mucho mas notorio con estela, 3e1faf4 add implementation plan for animated day night sky, 69a07f6 feat: petals 3D con Three.js y viento del mouse, 9e88171 Revert "feat: petals 3D con Three.js y viento del mouse" (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.23
Nodes (7): 48b349d feat: add HTML rewrites to vite.config.js, upgrade WYSIWYG editor UI with Drag & Drop WebP, and add post duplication feature, 9b5d761 feat: add DatabaseService abstraction layer and PocketBase / Local SQLite adapters, a4cbf51 feat: add WebP Canvas image converter and YouTube embed helper utilities, c0749a0 feat: complete Admin Backend, CMS, WebP Converter, YouTube Embed, and User Management implementation, convertToWebP(), extractYouTubeId(), generateYouTubeEmbedHTML()

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (10): 0065d03 chore(cleanup): remove 97 unused asset files, update metadata references, and optimize site production bundle, 02b0dd5 fix(fuji): fill true peak tip coordinates (y:0..65 in layer 1) with solid 100% opaque cream snow, 0e4583a checkpoint: volumetric clouds engine, deep royal blue sky, bottom mist layer, and verified parallax composition, 2f73c41 feat(sky): add dual background/foreground WebGPU clouds passing in front and behind Mount Fuji, bottom atmospheric mist layer, and deep royal blue sky gradient, 514414b fix(sakura): restore original static layer 7 and layer 8 parallax petals and fix Mount Fuji snow cap, 5ea7b41 feat(clouds): integrate WebGPU dynamic atmospheric clouds shader with WebGL fallback and optimize Mount Fuji snow cap coverage, 732199f feat(clouds): transition from mathematical shaders to organic volumetric cloud texture engine with realistic Japanese cumulus/cirrus drifting physics, 7f08f53 fix(fuji): resolve fuji snow cap transparency by selectively filling peak cutout region with opaque cream and restoring high-fidelity layers (+2 more)

### Community 14 - "Community 14"
Cohesion: 0.24
Nodes (5): 26bbdaa docs: update walkthrough for Media Library implementation, 5b744f6 fix: move blog and media photos to public/photos directory for clean static serving on production servers, fd36f9a feat: add Media Library Manager, link Media Library images to Blog CMS and WYSIWYG editor, and fix asset image paths, WysiwygEditor, initBlogManager()

### Community 15 - "Community 15"
Cohesion: 0.20
Nodes (10): 2a3315c fix(performance): cap canvas resolution and parallax background container to a maximum width of 1280px, 443707e feat(parallax): restrict desktop parallax artwork objects canvas to max-width 1280px while preserving full-width sky background, 5290f56 fix(lightbox): extract loaded image URL directly to fix modal expansion 404 and refine modal overlay design, 54c49f4 feat(gallery): integrate author portrait (orpianesi1.webp) and add interactive photo gallery with Lightbox modal, 5ae8c77 feat(mobile): maximize Enso circle artwork and typography logo size, restore original full-width stacked CTA buttons, a9f9253 feat(branding): crop exact circular red kanji seal stamp directly from assets/Logo.webp, cbacb09 fix(hero): contain hero logo and artwork within 1200px max-width centered container, resolving edge seam cut error, d6f8411 fix(mobile): lock hero height to 100vh with seamless bottom gradient overlay to eliminate scroll gap (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.24
Nodes (9): 2fcb02d fix: map admin section toggles and menu items to exact index.html DOM elements, 6cb0334 docs: update walkthrough documentation for unified samurai admin and real-time live sync, 8334dc5 feat: add Samurai Blog section on home with 3 example posts and dedicated reading page, 94208da fix: auto-sync section toggles with menu items, restore Comprar btn-nav style, and fix scrollspy active link calculation, bc1adc8 docs: update walkthrough documentation for exact section mapping, dcfdfe4 docs: update walkthrough for scrollspy and menu button fixes, DEFAULT_GALLERY_ITEMS, SECTION_LABELS (+1 more)

### Community 17 - "Community 17"
Cohesion: 0.20
Nodes (10): 3f7d802 feat(sky): implement azure sky blue background, white clouds, GPU acceleration, and preserve vivid red sun and cherry blossom colors, 5650d5b fix(sky): make mountain backdrop sky transparent so animated day/night sky layers are fully visible, 5b9e949 fix(fuji): reconstruct Mount Fuji snow peak with 100% opaque bright white snow cap, 6d2db3a feat(sakura): implement high-performance dynamic 3D-flipping sakura falling petals particle system, 6e21877 feat(sky): convert red sun into dynamic celestial orb morphing into mystical full moon in night mode, 7179ed1 feat(css): add styles for Day/Night skies, clouds drifting, and theme toggle, 9c9ebe0 fix(fuji): resolve transparent holes in fuji snow peak by preserving high-luminance white pixels, c8d7182 feat(html): add sky container markup and theme toggle button (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.29
Nodes (3): 48d0413 feat: align admin shell with samurai design system and enable real-time home synchronization, initGpuManager(), SyncService

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (7): 101f3c3 fix(server): resolve storage dir auto-creation and internal port auto-backup execution in server.js, 3bf6a3a docs: add design specification for architecture and performance optimization, 4882a88 fix(server): replace dynamic await import with static exec import in server.js, 52de155 fix(server & auth): add native backup proxy handler in server.js and improve admin auth fallback, 8ba7e5f docs: add implementation plan for architecture and performance optimization, c7cc8d1 fix(pocketbase): enforce chmod 0755 execution permissions on Linux servers to prevent EACCES errors, ee4947c perf(architecture & memory): implement zlib gzip compression, canvas background tab pause, sqlite RAM tuning, and image lazy loading

### Community 20 - "Community 20"
Cohesion: 0.33
Nodes (5): 86a8e0f feat(gallery): area independiente en admin con subida directa, selector visual de medios, reordenacion y edicion total, 90ed50e feat(admin): seccion y pestaña dedicada para gestion de Galeria Fotografica, DEFAULT_GALLERY_ITEMS, initGalleryManager(), SUGGESTED_TAGS

### Community 21 - "Community 21"
Cohesion: 0.57
Nodes (6): escapeHTML(), getTargetPostId(), renderCatalog(), renderSinglePost(), renderView(), updateDynamicSEO()

### Community 22 - "Community 22"
Cohesion: 0.40
Nodes (5): 111a100 fix(3d-book): repair 3d box geometry to prevent clipping/floating spine and update tomo selector buttons to match site standard style, 230d48f feat(3d-book): enlarge 3D book 20%, redesign tomo selector tabs, implement single flip button, and add continuous slow idle rotation with drag tracking, 7e6eae1 assets: add Logo.webp, c642b72 fix(clouds): restore missing clouds-fg-canvas element in index.html and make canvas context initialization resilient, e46bc8f fix(layout): wrap hero parallax elements in centered 1280px stage container and extend clouds canvas bleed to fix cut off edges

### Community 23 - "Community 23"
Cohesion: 0.50
Nodes (2): is_admin_logged_in(), require_admin_auth()

### Community 24 - "Community 24"
Cohesion: 0.60
Nodes (1): SakuraPetal

## Knowledge Gaps
- **31 isolated node(s):** `__filename`, `__dirname`, `rootDir`, `binDir`, `dataDir` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 2`** (1 nodes): `DatabaseService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 3`** (1 nodes): `PocketBaseAdapter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `is_admin_logged_in()`, `require_admin_auth()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (1 nodes): `SakuraPetal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DatabaseService` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `PocketBaseAdapter` connect `Community 3` to `Community 0`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `rootDir` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05034199726402189 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05058717253839205 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._