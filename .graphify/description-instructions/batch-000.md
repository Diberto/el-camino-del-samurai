# Node Description Batch 1 of 10

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "branch:repo:github.com/Diberto/el-camino-del-samurai#master": "master" | kind=Branch | source=git | neighbors=[0065d03 chore(cleanup): remove 97 unuse…, 02b0dd5 fix(fuji): fill true peak tip c…, 02fe36c feat(mobile): position logo bel…, 0390b13 docs: update walkthrough for sm…, 0405449 fix(logo): restore white typogr…, 0562814 docs: update design spec for Me…] | lang=en
- "script": "script.js" | kind=code-symbol | source=script.js:L1 | neighbors=[0405449 fix(logo): restore white typogr…, 102b502 feat: add dynamic top 3 posts w…, 111a100 fix(3d-book): repair 3d box geo…, 14d3d80 fix: resolve PocketBase collect…, 165b44d fix: make entire blog catalog c…, 18d586b feat: scroll empuja particulas,…] | lang=en
- "server": "server.js" | kind=code-symbol | source=server.js:L1 | neighbors=[0a8d211 feat(server): add scheduled aut…, 101f3c3 fix(server): resolve storage di…, 1f0cf3c feat(opiniones): modulo CRUD en…, 28b5340 feat: add server.js single-entr…, 3b9e154 fix: resolve query string routi…, 4882a88 fix(server): replace dynamic aw…] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter": "PocketBaseAdapter" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L2 | neighbors=[pocketbase-adapter.js, .constructor(), .createBackup(), .deleteBackup(), .deleteMedia(), .deleteOpinion()] | lang=en
- "services_db_service_databaseservice": "DatabaseService" | kind=code-symbol | source=src/services/db-service.js:L4 | neighbors=[db-service.js, .constructor(), .createBackup(), .deleteBackup(), .deleteMedia(), .deleteOpinion()] | lang=en
- "adapters_pocketbase_adapter": "pocketbase-adapter.js" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L1 | neighbors=[PocketBaseAdapter, 17c5296 fix: eliminate 404 network fetc…, 196097e fix: resolve PocketBase 400 Bad…, 1d552ed feat: integrate PocketBase as d…, 1f0cf3c feat(opiniones): modulo CRUD en…, 215584e fix: restore PocketBase as defa…] | lang=en
- "admin_admin": "admin.js" | kind=code-symbol | source=src/admin/admin.js:L1 | neighbors=[checkAuth(), loadModules(), initBackupManager(), initBlogManager(), initDiagnosticsManager(), initGalleryManager()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_request": ".request()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L11 | neighbors=[PocketBaseAdapter, .createBackup(), .deleteBackup(), .deleteMedia(), .deleteOpinion(), .deletePost()] | lang=en
- "scripts_start_pocketbase": "start-pocketbase.js" | kind=code-symbol | source=scripts/start-pocketbase.js:L1 | neighbors=[1728be7 fix: use raw SQL UPDATE query i…, 1d552ed feat: integrate PocketBase as d…, 1f0cf3c feat(opiniones): modulo CRUD en…, b4f93cc fix: bind server.js to 0.0.0.0 …, c7cc8d1 fix(pocketbase): enforce chmod …, d46f078 fix: resolve 502 Bad Gateway by…] | lang=en
- "services_native_store": "native-store.js" | kind=code-symbol | source=src/services/native-store.js:L1 | neighbors=[8ccca63 fix(media): carga y persistenci…, a0744dc feat(storage): motor de persist…, DATA_DIR, DEFAULT_MEDIA, DEFAULT_OPINIONS, DEFAULT_POSTS] | lang=en
- "modules_sections_menu_manager": "sections-menu-manager.js" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L1 | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…, 2fcb02d fix: map admin section toggles …, 48d0413 feat: align admin shell with sa…, 8334dc5 feat: add Samurai Blog section …, 8ccca63 fix(media): carga y persistenci…, 90ed50e feat(admin): seccion y pestaña …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@1f0cf3c83562f5b81bad57bb131b633e21c13986": "1f0cf3c feat(opiniones): modulo CRUD en admin, galeria corregida y seccion de r…" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, admin.js, master, 40f7e13 fix(ui): suavizado y fusion de …, opiniones-manager.js, sections-menu-manager.js] | lang=en
- "services_db_service_dbservice": "dbService" | kind=code-symbol | source=src/services/db-service.js:L38 | neighbors=[admin.js, wysiwyg-editor.js, backup-manager.js, blog-cms-manager.js, diagnostics-manager.js, gallery-manager.js] | lang=en
- "gpu_panel": "gpu-panel.js" | kind=code-symbol | source=gpu-panel.js:L1 | neighbors=[28ed22a feat(gpu): add /gpu configurati…, ee4947c perf(architecture & memory): im…, DEFAULT_PRESET, gpuConfig, applySkyGradients(), initLiveClouds()] | lang=en
- "public_blog": "blog.js" | kind=code-symbol | source=src/public/blog.js:L1 | neighbors=[102b502 feat: add dynamic top 3 posts w…, 165b44d fix: make entire blog catalog c…, 6e84b4a feat(optimizations): mejoras de…, 8334dc5 feat: add Samurai Blog section …, c0749a0 feat: complete Admin Backend, C…, cb439bf feat(seo & security): add SEO m…] | lang=en
- "services_db_service": "db-service.js" | kind=code-symbol | source=src/services/db-service.js:L1 | neighbors=[1d552ed feat: integrate PocketBase as d…, 1f0cf3c feat(opiniones): modulo CRUD en…, 215584e fix: restore PocketBase as defa…, 7af96be feat: integrate Strapi Headless…, 8656858 feat: make PocketBase exclusive…, 9b5d761 feat: add DatabaseService abstr…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c0749a05ba07bdf9b65ded970fb1575a49dbf5db": "c0749a0 feat: complete Admin Backend, CMS, WebP Converter, YouTube Embed, and U…" | kind=Commit | source=git | neighbors=[a4cbf51 feat: add WebP Canvas image con…, admin.js, master, 084f7f6 docs: add walkthrough documenta…, wysiwyg-editor.js, blog-cms-manager.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@cf9d01a3762e0d24c89c7892f6db1ec3ae720e14": "cf9d01a feat(admin): modulo de diagnosticos/logs, configuracion de redes social…" | kind=Commit | source=git | neighbors=[6e84b4a feat(optimizations): mejoras de…, pocketbase-adapter.js, admin.js, master, a0744dc feat(storage): motor de persist…, diagnostics-manager.js] | lang=nl
- "gpu_config_gpuconfigengine": "GpuConfigEngine" | kind=code-symbol | source=gpu-config.js:L49 | neighbors=[gpu-config.js, .constructor(), .exportPresetJSON(), .importPresetJSON(), .loadCurrentConfig(), .loadPresets()] | lang=en
- "services_sync_service_syncservice": "SyncService" | kind=code-symbol | source=src/services/sync-service.js:L2 | neighbors=[backup-manager.js, blog-cms-manager.js, gallery-manager.js, gpu-config-manager.js, sections-menu-manager.js, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@6e84b4a0db371042873624ad244a576223a19c76": "6e84b4a feat(optimizations): mejoras de seguridad anti-XSS, headers HTTP, sitem…" | kind=Commit | source=git | neighbors=[40f7e13 fix(ui): suavizado y fusion de …, pocketbase-adapter.js, master, cf9d01a feat(admin): modulo de diagnost…, opiniones-manager.js, blog.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@eea1ef306ddab0a7e9ccfd242dd66f24eb049c65": "eea1ef3 fix: resolve PocketBase 502/404 errors, add fallback handling and Vite …" | kind=Commit | source=git | neighbors=[c7cc8d1 fix(pocketbase): enforce chmod …, pocketbase-adapter.js, master, 469434d fix: bypass redundant 502 auth …, 1700000000_init_collections.js, start-pocketbase.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@fd36f9a83a156e7d4171d1cfb6342f6c5aaac682": "fd36f9a feat: add Media Library Manager, link Media Library images to Blog CMS …" | kind=Commit | source=git | neighbors=[f3c80ce docs: update plan for Media Lib…, admin.js, master, 26bbdaa docs: update walkthrough for Me…, wysiwyg-editor.js, blog-cms-manager.js] | lang=en
- "components_wysiwyg_editor": "wysiwyg-editor.js" | kind=code-symbol | source=src/admin/components/wysiwyg-editor.js:L1 | neighbors=[48b349d feat: add HTML rewrites to vite…, c0749a0 feat: complete Admin Backend, C…, fd36f9a feat: add Media Library Manager…, WysiwygEditor, dbService, convertToWebP()] | lang=en
- "modules_blog_cms_manager": "blog-cms-manager.js" | kind=code-symbol | source=src/admin/modules/blog-cms-manager.js:L1 | neighbors=[48b349d feat: add HTML rewrites to vite…, 5b744f6 fix: move blog and media photos…, c0749a0 feat: complete Admin Backend, C…, fd36f9a feat: add Media Library Manager…, WysiwygEditor, initBlogManager()] | lang=en
- "modules_gallery_manager": "gallery-manager.js" | kind=code-symbol | source=src/admin/modules/gallery-manager.js:L1 | neighbors=[86a8e0f feat(gallery): area independien…, 90ed50e feat(admin): seccion y pestaña …, convertToWebP(), DEFAULT_GALLERY_ITEMS, initGalleryManager(), SUGGESTED_TAGS] | lang=en
- "pb_migrations_1700000000_init_collections": "1700000000_init_collections.js" | kind=code-symbol | source=pb_migrations/1700000000_init_collections.js:L1 | neighbors=[14d3d80 fix: resolve PocketBase collect…, 196097e fix: resolve PocketBase 400 Bad…, 1f0cf3c feat(opiniones): modulo CRUD en…, 40ba44b fix: eliminate POST auto-seedin…, 8656858 feat: make PocketBase exclusive…, ee4947c perf(architecture & memory): im…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@28ed22aec87d67e975037f06e1175cd01ca07fcb": "28ed22a feat(gpu): add /gpu configuration control panel with live real-time pre…" | kind=Commit | source=git | neighbors=[master, a11a5b7 fix(navbar): remove GPU option …, gpu-config.js, gpu-panel.js, script.js, vite.config.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@48d0413476f88a14e1f20eb77bbbcd7353df440f": "48d0413 feat: align admin shell with samurai design system and enable real-time…" | kind=Commit | source=git | neighbors=[1549879 docs: update implementation pla…, master, 6cb0334 docs: update walkthrough docume…, gpu-config-manager.js, sections-menu-manager.js, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@8ccca63b7b4819eac7faf1c904743099c0104f4d": "8ccca63 fix(media): carga y persistencia real de imagenes en uploads/ y editor …" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, master, 90ed50e feat(admin): seccion y pestaña …, sections-menu-manager.js, script.js, native-store.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@ee4947c58899e4f8bf55fef1801a785d7d0d3d73": "ee4947c perf(architecture & memory): implement zlib gzip compression, canvas ba…" | kind=Commit | source=git | neighbors=[8ba7e5f docs: add implementation plan f…, master, 4882a88 fix(server): replace dynamic aw…, gpu-panel.js, 1700000000_init_collections.js, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@1d552ed6068be0637fb02d6f509f9ac1431b18da": "1d552ed feat: integrate PocketBase as default provider with cross-platform (Lin…" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, master, 28cd58f docs: update walkthrough for Po…, start-pocketbase.js, db-service.js, c2e6c56 docs: update plan for PocketBas…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@48b349d91ba8871c975847ee2a9a44ced95a9a50": "48b349d feat: add HTML rewrites to vite.config.js, upgrade WYSIWYG editor UI wi…" | kind=Commit | source=git | neighbors=[2e08ad4 docs: update walkthrough for St…, master, 43b96bb docs: update walkthrough for WY…, wysiwyg-editor.js, blog-cms-manager.js, vite.config.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@8334dc5a9f8d19e6ddde40c734ff134333682634": "8334dc5 feat: add Samurai Blog section on home with 3 example posts and dedicat…" | kind=Commit | source=git | neighbors=[master, 1c33ae2 docs: update walkthrough for Bl…, sections-menu-manager.js, blog.js, script.js, dcfdfe4 docs: update walkthrough for sc…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@865685847c5366472d7c80f65814c3f2a25523f5": "8656858 feat: make PocketBase exclusive database provider and configure public …" | kind=Commit | source=git | neighbors=[13fc8df docs: update walkthrough for Ho…, pocketbase-adapter.js, master, 5cec31a docs: update walkthrough for ex…, 1700000000_init_collections.js, db-service.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@90ed50e180119cbb1103a890f983e59c89fddad4": "90ed50e feat(admin): seccion y pestaña dedicada para gestion de Galeria Fotogra…" | kind=Commit | source=git | neighbors=[8ccca63 fix(media): carga y persistenci…, admin.js, master, 86a8e0f feat(gallery): area independien…, gallery-manager.js, sections-menu-manager.js] | lang=es
- "components_wysiwyg_editor_wysiwygeditor": "WysiwygEditor" | kind=code-symbol | source=src/admin/components/wysiwyg-editor.js:L5 | neighbors=[wysiwyg-editor.js, .constructor(), .getContent(), .handleImageFile(), .render(), blog-cms-manager.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@102b50285636b688afe43b1929f536217d8399fe": "102b502 feat: add dynamic top 3 posts widget to home and 2-stage blog catalog a…" | kind=Commit | source=git | neighbors=[master, 9db1bb9 docs: update walkthrough for 2-…, blog.js, script.js, 73225bf docs: update plan for Blog cata…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@14d3d80d715dec202073646c52238e8f92018dcc": "14d3d80 fix: resolve PocketBase collection 404 errors with auto-migration and r…" | kind=Commit | source=git | neighbors=[master, 8c1eec2 docs: update walkthrough for 40…, 1700000000_init_collections.js, script.js, ac827a2 docs: update walkthrough for se…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@165b44de3d146588ac407eff96420b66b231722e": "165b44d fix: make entire blog catalog cards and buttons clickable and support f…" | kind=Commit | source=git | neighbors=[master, 8cd8d91 docs: update walkthrough for bl…, blog.js, script.js, e7c6b2f docs: update walkthrough for 50…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-000.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
