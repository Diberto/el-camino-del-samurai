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

- "server_fetchcollectioncount": "fetchCollectionCount()" | kind=code-symbol | source=server.js:L692 | neighbors=[server.js, serveDiagnosticsHealth()]
- "server_generatesitemapxml": "generateSitemapXml()" | kind=code-symbol | source=server.js:L445 | neighbors=[server.js, serveDynamicSitemap()]
- "server_getdirectorysize": "getDirectorySize()" | kind=code-symbol | source=server.js:L668 | neighbors=[server.js, serveDiagnosticsHealth()]
- "server_servedynamicsitemap": "serveDynamicSitemap()" | kind=code-symbol | source=server.js:L465 | neighbors=[server.js, generateSitemapXml()]
- "services_native_store_readbody": "readBody()" | kind=code-symbol | source=src/services/native-store.js:L176 | neighbors=[native-store.js, handleNativeDataStore()]
- "services_native_store_writestore": "writeStore()" | kind=code-symbol | source=src/services/native-store.js:L165 | neighbors=[native-store.js, handleNativeDataStore()]
- "services_sync_service": "sync-service.js" | kind=code-symbol | source=src/services/sync-service.js:L1 | neighbors=[48d0413 feat: align admin shell with sa…, SyncService]
- "utils_webp_converter": "webp-converter.js" | kind=code-symbol | source=src/utils/webp-converter.js:L1 | neighbors=[a4cbf51 feat: add WebP Canvas image con…, convertToWebP()]
- "utils_youtube_embed_extractyoutubeid": "extractYouTubeId()" | kind=code-symbol | source=src/utils/youtube-embed.js:L2 | neighbors=[wysiwyg-editor.js, youtube-embed.js]
- "utils_youtube_embed_generateyoutubeembedhtml": "generateYouTubeEmbedHTML()" | kind=code-symbol | source=src/utils/youtube-embed.js:L12 | neighbors=[wysiwyg-editor.js, youtube-embed.js]
- "adapters_pocketbase_adapter_pocketbaseadapter_constructor": ".constructor()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L3 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_getcurrentuser": ".getCurrentUser()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L96 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_getdownloadbackupurl": ".getDownloadBackupUrl()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L618 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_logout": ".logout()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L89 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_uploadbackup": ".uploadBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L601 | neighbors=[PocketBaseAdapter]
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
- "modules_sections_menu_manager_default_gallery_items": "DEFAULT_GALLERY_ITEMS" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L32 | neighbors=[sections-menu-manager.js]
- "modules_sections_menu_manager_section_labels": "SECTION_LABELS" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L4 | neighbors=[sections-menu-manager.js]
- "modules_sections_menu_manager_section_url_map": "SECTION_URL_MAP" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L18 | neighbors=[sections-menu-manager.js]
- "pb_migrations_1700000000_init_collections_ensurecol": "ensureCol()" | kind=code-symbol | source=pb_migrations/1700000000_init_collections.js:L10 | neighbors=[1700000000_init_collections.js]
- "pb_migrations_1700000002_opinions_collection": "1700000002_opinions_collection.js" | kind=code-symbol | source=pb_migrations/1700000002_opinions_collection.js:L1 | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…]
- "script_animateparallax": "animateParallax()" | kind=code-symbol | source=script.js:L743 | neighbors=[script.js]
- "script_animatepetals": "animatePetals()" | kind=code-symbol | source=script.js:L975 | neighbors=[script.js]
- "script_applygpuskycolors": "applyGpuSkyColors()" | kind=code-symbol | source=script.js:L338 | neighbors=[script.js]
- "script_escapehtml": "escapeHTML()" | kind=code-symbol | source=script.js:L23 | neighbors=[script.js]
- "script_handlescrolleffects": "handleScrollEffects()" | kind=code-symbol | source=script.js:L682 | neighbors=[script.js]
- "script_init3dbookengine": "init3DBookEngine()" | kind=code-symbol | source=script.js:L1133 | neighbors=[script.js]
- "script_initdaynightcycle": "initDayNightCycle()" | kind=code-symbol | source=script.js:L290 | neighbors=[script.js]
- "script_initopinionsmanager": "initOpinionsManager()" | kind=code-symbol | source=script.js:L1363 | neighbors=[script.js]
- "script_initstarfield": "initStarfield()" | kind=code-symbol | source=script.js:L521 | neighbors=[script.js]
- "script_inittestimonialsslider": "initTestimonialsSlider()" | kind=code-symbol | source=script.js:L1159 | neighbors=[script.js]

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
