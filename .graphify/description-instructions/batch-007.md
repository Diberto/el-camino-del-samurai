# Node Description Batch 8 of 10

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

- "adapters_pocketbase_adapter_pocketbaseadapter_getdownloadbackupurl": ".getDownloadBackupUrl()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L599 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_logout": ".logout()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L89 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_uploadbackup": ".uploadBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L582 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_uploadmedia": ".uploadMedia()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L495 | neighbors=[PocketBaseAdapter]
- "components_wysiwyg_editor_wysiwygeditor_getcontent": ".getContent()" | kind=code-symbol | source=src/admin/components/wysiwyg-editor.js:L185 | neighbors=[WysiwygEditor]
- "components_wysiwyg_editor_wysiwygeditor_handleimagefile": ".handleImageFile()" | kind=code-symbol | source=src/admin/components/wysiwyg-editor.js:L174 | neighbors=[WysiwygEditor]
- "gpu_config_gpuconfigengine_exportpresetjson": ".exportPresetJSON()" | kind=code-symbol | source=gpu-config.js:L133 | neighbors=[GpuConfigEngine]
- "gpu_config_gpuconfigengine_resettodefault": ".resetToDefault()" | kind=code-symbol | source=gpu-config.js:L124 | neighbors=[GpuConfigEngine]
- "gpu_panel_initliveclouds": "initLiveClouds()" | kind=code-symbol | source=gpu-panel.js:L298 | neighbors=[gpu-panel.js]
- "gpu_panel_initlivesakura": "initLiveSakura()" | kind=code-symbol | source=gpu-panel.js:L443 | neighbors=[gpu-panel.js]
- "gpu_panel_initlivestars": "initLiveStars()" | kind=code-symbol | source=gpu-panel.js:L395 | neighbors=[gpu-panel.js]
- "gpu_panel_renderliveclouds": "renderLiveClouds()" | kind=code-symbol | source=gpu-panel.js:L343 | neighbors=[gpu-panel.js]
- "gpu_panel_renderlivesakura": "renderLiveSakura()" | kind=code-symbol | source=gpu-panel.js:L469 | neighbors=[gpu-panel.js]
- "gpu_panel_renderlivestars": "renderLiveStars()" | kind=code-symbol | source=gpu-panel.js:L416 | neighbors=[gpu-panel.js]
- "modules_sections_menu_manager_section_labels": "SECTION_LABELS" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L4 | neighbors=[sections-menu-manager.js]
- "modules_sections_menu_manager_section_url_map": "SECTION_URL_MAP" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L18 | neighbors=[sections-menu-manager.js]
- "pb_migrations_1700000000_init_collections_ensurecol": "ensureCol()" | kind=code-symbol | source=pb_migrations/1700000000_init_collections.js:L10 | neighbors=[1700000000_init_collections.js]
- "pb_migrations_1700000002_opinions_collection": "1700000002_opinions_collection.js" | kind=code-symbol | source=pb_migrations/1700000002_opinions_collection.js:L1 | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…]
- "script_animateparallax": "animateParallax()" | kind=code-symbol | source=script.js:L668 | neighbors=[script.js]
- "script_animatepetals": "animatePetals()" | kind=code-symbol | source=script.js:L900 | neighbors=[script.js]
- "script_applydynamicsettings": "applyDynamicSettings()" | kind=code-symbol | source=script.js:L48 | neighbors=[script.js]
- "script_applygpuskycolors": "applyGpuSkyColors()" | kind=code-symbol | source=script.js:L263 | neighbors=[script.js]
- "script_escapehtml": "escapeHTML()" | kind=code-symbol | source=script.js:L23 | neighbors=[script.js]
- "script_handlescrolleffects": "handleScrollEffects()" | kind=code-symbol | source=script.js:L607 | neighbors=[script.js]
- "script_init3dbookengine": "init3DBookEngine()" | kind=code-symbol | source=script.js:L1058 | neighbors=[script.js]
- "script_initdaynightcycle": "initDayNightCycle()" | kind=code-symbol | source=script.js:L215 | neighbors=[script.js]
- "script_initgallerylightbox": "initGalleryLightbox()" | kind=code-symbol | source=script.js:L1238 | neighbors=[script.js]
- "script_initopinionsmanager": "initOpinionsManager()" | kind=code-symbol | source=script.js:L1288 | neighbors=[script.js]
- "script_initstarfield": "initStarfield()" | kind=code-symbol | source=script.js:L446 | neighbors=[script.js]
- "script_inittestimonialsslider": "initTestimonialsSlider()" | kind=code-symbol | source=script.js:L1159 | neighbors=[script.js]
- "script_initvolumetricclouds": "initVolumetricClouds()" | kind=code-symbol | source=script.js:L278 | neighbors=[script.js]
- "script_renderhomeblogposts": "renderHomeBlogPosts()" | kind=code-symbol | source=script.js:L164 | neighbors=[script.js]
- "script_sakurapetal_draw": ".draw()" | kind=code-symbol | source=script.js:L875 | neighbors=[SakuraPetal]
- "scripts_start_pocketbase_bindir": "binDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L11 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_binpath": "binPath" | kind=code-symbol | source=scripts/start-pocketbase.js:L16 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_datadir": "dataDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L12 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_dirname": "__dirname" | kind=code-symbol | source=scripts/start-pocketbase.js:L9 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_filename": "__filename" | kind=code-symbol | source=scripts/start-pocketbase.js:L8 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_migrationsdir": "migrationsDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L13 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_rootdir": "rootDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L10 | neighbors=[start-pocketbase.js]

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
