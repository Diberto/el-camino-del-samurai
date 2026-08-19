# Node Description Batch 7 of 9

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

- "gpu_panel_updatepresetdropdown": "updatePresetDropdown()" | kind=code-symbol | source=gpu-panel.js:L116 | neighbors=[gpu-panel.js, updateUIFromConfig()]
- "modules_backup_manager_initbackupmanager": "initBackupManager()" | kind=code-symbol | source=src/admin/modules/backup-manager.js:L5 | neighbors=[admin.js, backup-manager.js]
- "modules_blog_cms_manager_initblogmanager": "initBlogManager()" | kind=code-symbol | source=src/admin/modules/blog-cms-manager.js:L5 | neighbors=[admin.js, blog-cms-manager.js]
- "modules_gpu_config_manager_initgpumanager": "initGpuManager()" | kind=code-symbol | source=src/admin/modules/gpu-config-manager.js:L4 | neighbors=[admin.js, gpu-config-manager.js]
- "modules_media_manager_initmediamanager": "initMediaManager()" | kind=code-symbol | source=src/admin/modules/media-manager.js:L4 | neighbors=[admin.js, media-manager.js]
- "modules_sections_menu_manager_initsectionsmanager": "initSectionsManager()" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L30 | neighbors=[admin.js, sections-menu-manager.js]
- "modules_user_manager_initusermanager": "initUserManager()" | kind=code-symbol | source=src/admin/modules/user-manager.js:L3 | neighbors=[admin.js, user-manager.js]
- "pb_migrations_1700000001_unlock_collections": "1700000001_unlock_collections.js" | kind=code-symbol | source=pb_migrations/1700000001_unlock_collections.js:L1 | neighbors=[1728be7 fix: use raw SQL UPDATE query i…, 6fcf262 feat: add 1700000001_unlock_col…]
- "public_blog_gettargetpostid": "getTargetPostId()" | kind=code-symbol | source=src/public/blog.js:L10 | neighbors=[blog.js, renderView()]
- "script_sakurapetal_constructor": ".constructor()" | kind=code-symbol | source=script.js:L702 | neighbors=[SakuraPetal, .reset()]
- "script_sakurapetal_update": ".update()" | kind=code-symbol | source=script.js:L727 | neighbors=[SakuraPetal, .reset()]
- "scripts_start_pocketbase_downloadfile": "downloadFile()" | kind=code-symbol | source=scripts/start-pocketbase.js:L37 | neighbors=[start-pocketbase.js, ensureBinary()]
- "scripts_start_pocketbase_getdownloadurl": "getDownloadUrl()" | kind=code-symbol | source=scripts/start-pocketbase.js:L20 | neighbors=[start-pocketbase.js, ensureBinary()]
- "scripts_start_pocketbase_main": "main()" | kind=code-symbol | source=scripts/start-pocketbase.js:L113 | neighbors=[start-pocketbase.js, ensureBinary()]
- "services_sync_service": "sync-service.js" | kind=code-symbol | source=src/services/sync-service.js:L1 | neighbors=[48d0413 feat: align admin shell with sa…, SyncService]
- "utils_webp_converter": "webp-converter.js" | kind=code-symbol | source=src/utils/webp-converter.js:L1 | neighbors=[a4cbf51 feat: add WebP Canvas image con…, convertToWebP()]
- "utils_youtube_embed_extractyoutubeid": "extractYouTubeId()" | kind=code-symbol | source=src/utils/youtube-embed.js:L2 | neighbors=[wysiwyg-editor.js, youtube-embed.js]
- "utils_youtube_embed_generateyoutubeembedhtml": "generateYouTubeEmbedHTML()" | kind=code-symbol | source=src/utils/youtube-embed.js:L12 | neighbors=[wysiwyg-editor.js, youtube-embed.js]
- "adapters_pocketbase_adapter_pocketbaseadapter_constructor": ".constructor()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L3 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_getcurrentuser": ".getCurrentUser()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L96 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_getdownloadbackupurl": ".getDownloadBackupUrl()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L397 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_logout": ".logout()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L89 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_uploadbackup": ".uploadBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L380 | neighbors=[PocketBaseAdapter]
- "adapters_pocketbase_adapter_pocketbaseadapter_uploadmedia": ".uploadMedia()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L324 | neighbors=[PocketBaseAdapter]
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
- "modules_sections_menu_manager_section_url_map": "SECTION_URL_MAP" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L17 | neighbors=[sections-menu-manager.js]
- "pb_migrations_1700000000_init_collections_ensurecol": "ensureCol()" | kind=code-symbol | source=pb_migrations/1700000000_init_collections.js:L10 | neighbors=[1700000000_init_collections.js]
- "script_animateparallax": "animateParallax()" | kind=code-symbol | source=script.js:L573 | neighbors=[script.js]
- "script_animatepetals": "animatePetals()" | kind=code-symbol | source=script.js:L803 | neighbors=[script.js]
- "script_applydynamicsettings": "applyDynamicSettings()" | kind=code-symbol | source=script.js:L36 | neighbors=[script.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-006.json

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
