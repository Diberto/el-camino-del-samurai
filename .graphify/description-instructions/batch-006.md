# Node Description Batch 7 of 10

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

- "adapters_pocketbase_adapter_pocketbaseadapter_getmedia": ".getMedia()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L307 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_getopinions": ".getOpinions()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L623 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_getposts": ".getPosts()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L174 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_getsettings": ".getSettings()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L103 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_getsystemdiagnostics": ".getSystemDiagnostics()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L393 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_getusers": ".getUsers()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L438 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_login": ".login()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L30 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_restorebackup": ".restoreBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L581 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_saveopinion": ".saveOpinion()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L702 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_savepost": ".savePost()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L242 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_savesettings": ".saveSettings()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L145 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_saveuser": ".saveUser()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L458 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_updatemedia": ".updateMedia()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L345 | neighbors=[PocketBaseAdapter, .request()]
- "adapters_pocketbase_adapter_pocketbaseadapter_uploadmedia": ".uploadMedia()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L495 | neighbors=[PocketBaseAdapter, .request()]
- "admin_admin_checkauth": "checkAuth()" | kind=code-symbol | source=src/admin/admin.js:L19 | neighbors=[admin.js, loadModules()]
- "admin_admin_loadmodules": "loadModules()" | kind=code-symbol | source=src/admin/admin.js:L64 | neighbors=[admin.js, checkAuth()]
- "components_wysiwyg_editor_wysiwygeditor_constructor": ".constructor()" | kind=code-symbol | source=src/admin/components/wysiwyg-editor.js:L6 | neighbors=[WysiwygEditor, .render()]
- "components_wysiwyg_editor_wysiwygeditor_render": ".render()" | kind=code-symbol | source=src/admin/components/wysiwyg-editor.js:L12 | neighbors=[WysiwygEditor, .constructor()]
- "gpu_config_default_preset": "DEFAULT_PRESET" | kind=code-symbol | source=gpu-config.js:L5 | neighbors=[gpu-config.js, gpu-panel.js]
- "gpu_config_gpuconfigengine_importpresetjson": ".importPresetJSON()" | kind=code-symbol | source=gpu-config.js:L137 | neighbors=[GpuConfigEngine, .saveNewPreset()]
- "gpu_config_gpuconfigengine_loadpresets": ".loadPresets()" | kind=code-symbol | source=gpu-config.js:L84 | neighbors=[GpuConfigEngine, .constructor()]
- "gpu_config_gpuconfigengine_savecurrentconfig": ".saveCurrentConfig()" | kind=code-symbol | source=gpu-config.js:L97 | neighbors=[GpuConfigEngine, .mergeWithDefault()]
- "gpu_panel_applyskygradients": "applySkyGradients()" | kind=code-symbol | source=gpu-panel.js:L127 | neighbors=[gpu-panel.js, updateUIFromConfig()]
- "gpu_panel_updatepresetdropdown": "updatePresetDropdown()" | kind=code-symbol | source=gpu-panel.js:L116 | neighbors=[gpu-panel.js, updateUIFromConfig()]
- "modules_backup_manager_initbackupmanager": "initBackupManager()" | kind=code-symbol | source=src/admin/modules/backup-manager.js:L5 | neighbors=[admin.js, backup-manager.js]
- "modules_blog_cms_manager_initblogmanager": "initBlogManager()" | kind=code-symbol | source=src/admin/modules/blog-cms-manager.js:L5 | neighbors=[admin.js, blog-cms-manager.js]
- "modules_diagnostics_manager_initdiagnosticsmanager": "initDiagnosticsManager()" | kind=code-symbol | source=src/admin/modules/diagnostics-manager.js:L4 | neighbors=[admin.js, diagnostics-manager.js]
- "modules_gallery_manager_initgallerymanager": "initGalleryManager()" | kind=code-symbol | source=src/admin/modules/gallery-manager.js:L57 | neighbors=[admin.js, gallery-manager.js]
- "modules_gpu_config_manager_initgpumanager": "initGpuManager()" | kind=code-symbol | source=src/admin/modules/gpu-config-manager.js:L4 | neighbors=[admin.js, gpu-config-manager.js]
- "modules_media_manager_initmediamanager": "initMediaManager()" | kind=code-symbol | source=src/admin/modules/media-manager.js:L4 | neighbors=[admin.js, media-manager.js]
- "modules_opiniones_manager_initopinionesmanager": "initOpinionesManager()" | kind=code-symbol | source=src/admin/modules/opiniones-manager.js:L3 | neighbors=[admin.js, opiniones-manager.js]
- "modules_sections_menu_manager_initsectionsmanager": "initSectionsManager()" | kind=code-symbol | source=src/admin/modules/sections-menu-manager.js:L32 | neighbors=[admin.js, sections-menu-manager.js]
- "modules_user_manager_initusermanager": "initUserManager()" | kind=code-symbol | source=src/admin/modules/user-manager.js:L3 | neighbors=[admin.js, user-manager.js]
- "public_blog_gettargetpostid": "getTargetPostId()" | kind=code-symbol | source=src/public/blog.js:L63 | neighbors=[blog.js, renderView()]
- "public_blog_updatedynamicseo": "updateDynamicSEO()" | kind=code-symbol | source=src/public/blog.js:L13 | neighbors=[blog.js, renderView()]
- "script_applydynamicsettings": "applyDynamicSettings()" | kind=code-symbol | source=script.js:L48 | neighbors=[script.js, initGalleryLightbox()]
- "script_initgallerylightbox": "initGalleryLightbox()" | kind=code-symbol | source=script.js:L186 | neighbors=[script.js, applyDynamicSettings()]
- "script_sakurapetal_constructor": ".constructor()" | kind=code-symbol | source=script.js:L874 | neighbors=[SakuraPetal, .reset()]
- "script_sakurapetal_update": ".update()" | kind=code-symbol | source=script.js:L899 | neighbors=[SakuraPetal, .reset()]
- "scripts_start_pocketbase_downloadfile": "downloadFile()" | kind=code-symbol | source=scripts/start-pocketbase.js:L37 | neighbors=[start-pocketbase.js, ensureBinary()]

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
