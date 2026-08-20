# Node Description Batch 8 of 9

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "gpu_panel_renderlivesakura": "renderLiveSakura()" | kind=code-symbol | source=gpu-panel.js:L469 | neighbors=[gpu-panel.js]
- "gpu_panel_renderlivestars": "renderLiveStars()" | kind=code-symbol | source=gpu-panel.js:L416 | neighbors=[gpu-panel.js]
- "modules_sections_menu_manager_section_labels": "SECTION_LABELS" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L4 | neighbors=[sections-menu-manager.js]
- "modules_sections_menu_manager_section_url_map": "SECTION_URL_MAP" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L18 | neighbors=[sections-menu-manager.js]
- "pb_migrations_1700000000_init_collections_ensurecol": "ensureCol()" | kind=code-symbol | source=pb_migrations/1700000000_init_collections.js:L10 | neighbors=[1700000000_init_collections.js]
- "pb_migrations_1700000002_opinions_collection": "1700000002_opinions_collection.js" | kind=code-symbol | source=pb_migrations/1700000002_opinions_collection.js:L1 | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…]
- "script_animateparallax": "animateParallax()" | kind=code-symbol | source=script.js:L617 | neighbors=[script.js]
- "script_animatepetals": "animatePetals()" | kind=code-symbol | source=script.js:L849 | neighbors=[script.js]
- "script_applydynamicsettings": "applyDynamicSettings()" | kind=code-symbol | source=script.js:L48 | neighbors=[script.js]
- "script_applygpuskycolors": "applyGpuSkyColors()" | kind=code-symbol | source=script.js:L212 | neighbors=[script.js]
- "script_escapehtml": "escapeHTML()" | kind=code-symbol | source=script.js:L23 | neighbors=[script.js]
- "script_handlescrolleffects": "handleScrollEffects()" | kind=code-symbol | source=script.js:L556 | neighbors=[script.js]
- "script_init3dbookengine": "init3DBookEngine()" | kind=code-symbol | source=script.js:L1007 | neighbors=[script.js]
- "script_initdaynightcycle": "initDayNightCycle()" | kind=code-symbol | source=script.js:L164 | neighbors=[script.js]
- "script_initgallerylightbox": "initGalleryLightbox()" | kind=code-symbol | source=script.js:L1187 | neighbors=[script.js]
- "script_initopinionsmanager": "initOpinionsManager()" | kind=code-symbol | source=script.js:L1237 | neighbors=[script.js]
- "script_initstarfield": "initStarfield()" | kind=code-symbol | source=script.js:L395 | neighbors=[script.js]
- "script_inittestimonialsslider": "initTestimonialsSlider()" | kind=code-symbol | source=script.js:L1159 | neighbors=[script.js]
- "script_initvolumetricclouds": "initVolumetricClouds()" | kind=code-symbol | source=script.js:L227 | neighbors=[script.js]
- "script_renderhomeblogposts": "renderHomeBlogPosts()" | kind=code-symbol | source=script.js:L113 | neighbors=[script.js]
- "script_sakurapetal_draw": ".draw()" | kind=code-symbol | source=script.js:L824 | neighbors=[SakuraPetal]
- "scripts_start_pocketbase_bindir": "binDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L11 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_binpath": "binPath" | kind=code-symbol | source=scripts/start-pocketbase.js:L16 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_datadir": "dataDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L12 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_dirname": "__dirname" | kind=code-symbol | source=scripts/start-pocketbase.js:L9 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_filename": "__filename" | kind=code-symbol | source=scripts/start-pocketbase.js:L8 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_migrationsdir": "migrationsDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L13 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_rootdir": "rootDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L10 | neighbors=[start-pocketbase.js]
- "server_cleanoldbackups": "cleanOldBackups()" | kind=code-symbol | source=server.js:L323 | neighbors=[server.js]
- "server_dirname": "__dirname" | kind=code-symbol | source=server.js:L10 | neighbors=[server.js]
- "server_dist_dir": "DIST_DIR" | kind=code-symbol | source=server.js:L13 | neighbors=[server.js]
- "server_filename": "__filename" | kind=code-symbol | source=server.js:L9 | neighbors=[server.js]
- "server_getsafebackupfilename": "getSafeBackupFilename()" | kind=code-symbol | source=server.js:L521 | neighbors=[server.js]
- "server_mime_types": "MIME_TYPES" | kind=code-symbol | source=server.js:L26 | neighbors=[server.js]
- "server_pbprocess": "pbProcess" | kind=code-symbol | source=server.js:L19 | neighbors=[server.js]
- "server_pbscript": "pbScript" | kind=code-symbol | source=server.js:L18 | neighbors=[server.js]
- "server_performbackupcreation": "performBackupCreation()" | kind=code-symbol | source=server.js:L352 | neighbors=[server.js]
- "server_public_dir": "PUBLIC_DIR" | kind=code-symbol | source=server.js:L14 | neighbors=[server.js]
- "server_security_headers": "SECURITY_HEADERS" | kind=code-symbol | source=server.js:L40 | neighbors=[server.js]
- "server_servedynamicsitemap": "serveDynamicSitemap()" | kind=code-symbol | source=server.js:L381 | neighbors=[server.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-007.json

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
