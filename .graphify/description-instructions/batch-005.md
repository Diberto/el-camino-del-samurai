# Node Description Batch 6 of 9

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

- "commit:repo:github.com/Diberto/el-camino-del-samurai@e8d36e00b58d7afd33c9936a556f385d1a738e22": "e8d36e0 revert(fuji): restore original exact SVG layer rendering without pixel …" | kind=Commit | source=git | neighbors=[02b0dd5 fix(fuji): fill true peak tip c…, master, 2f73c41 feat(sky): add dual background/…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@e8e6597e0a6406d904d950773c4f095176f2a282": "e8e6597 fix: remove admin panel link from public footer" | kind=Commit | source=git | neighbors=[9db1bb9 docs: update walkthrough for 2-…, master, 9a29bbf fix: update Hero section action…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@eaa4638bf3342a78375f19b74cbc3998b85ba5c5": "eaa4638 fix: samurai detras del texto hero en mobile (z-index)" | kind=Commit | source=git | neighbors=[a6e9380 Initial commit, master, e629f53 feat: petals afectados por vien…] | lang=es
- "commit:repo:github.com/Diberto/el-camino-del-samurai@f2e9dd0967b61b1274e09023751527320a415bb6": "f2e9dd0 docs: update walkthrough for Hostinger static hosting 404 resolution" | kind=Commit | source=git | neighbors=[cd5a935 fix: resolve static hosting Hos…, master, ff28459 fix: smart environment provider…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@f3c80ce72be8be91153c23fdeff1ab9ec29ecd46": "f3c80ce docs: update plan for Media Library integration" | kind=Commit | source=git | neighbors=[0562814 docs: update design spec for Me…, master, fd36f9a feat: add Media Library Manager…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@f8e6b944c6f9c5f30ac82c88a2dd070e2bfe3c02": "f8e6b94 chore: complete Day/Night sky system implementation" | kind=Commit | source=git | neighbors=[e123a8e feat(js): add Day/Night theme m…, master, 5650d5b fix(sky): make mountain backdro…] | lang=en
- "gpu_config_gpuconfig": "gpuConfig" | kind=code-symbol | source=gpu-config.js:L147 | neighbors=[gpu-config.js, gpu-panel.js, script.js] | lang=en
- "gpu_config_gpuconfigengine_constructor": ".constructor()" | kind=code-symbol | source=gpu-config.js:L50 | neighbors=[GpuConfigEngine, .loadCurrentConfig(), .loadPresets()] | lang=en
- "gpu_config_gpuconfigengine_loadcurrentconfig": ".loadCurrentConfig()" | kind=code-symbol | source=gpu-config.js:L58 | neighbors=[GpuConfigEngine, .constructor(), .mergeWithDefault()] | lang=en
- "gpu_config_gpuconfigengine_savenewpreset": ".saveNewPreset()" | kind=code-symbol | source=gpu-config.js:L109 | neighbors=[GpuConfigEngine, .importPresetJSON(), .mergeWithDefault()] | lang=en
- "gpu_panel_updateuifromconfig": "updateUIFromConfig()" | kind=code-symbol | source=gpu-panel.js:L80 | neighbors=[gpu-panel.js, applySkyGradients(), updatePresetDropdown()] | lang=en
- "modules_opiniones_manager": "opiniones-manager.js" | kind=code-symbol | source=src/admin/modules/opiniones-manager.js:L1 | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…, initOpinionesManager(), dbService] | lang=en
- "modules_user_manager": "user-manager.js" | kind=code-symbol | source=src/admin/modules/user-manager.js:L1 | neighbors=[c0749a0 feat: complete Admin Backend, C…, initUserManager(), dbService] | lang=en
- "pb_migrations_1700000001_unlock_collections": "1700000001_unlock_collections.js" | kind=code-symbol | source=pb_migrations/1700000001_unlock_collections.js:L1 | neighbors=[1728be7 fix: use raw SQL UPDATE query i…, 1f0cf3c feat(opiniones): modulo CRUD en…, 6fcf262 feat: add 1700000001_unlock_col…] | lang=en
- "public_blog_escapehtml": "escapeHTML()" | kind=code-symbol | source=src/public/blog.js:L91 | neighbors=[blog.js, renderCatalog(), renderSinglePost()] | lang=en
- "public_blog_rendercatalog": "renderCatalog()" | kind=code-symbol | source=src/public/blog.js:L101 | neighbors=[blog.js, escapeHTML(), renderView()] | lang=en
- "public_blog_rendersinglepost": "renderSinglePost()" | kind=code-symbol | source=src/public/blog.js:L154 | neighbors=[blog.js, escapeHTML(), renderView()] | lang=en
- "script_sakurapetal_reset": ".reset()" | kind=code-symbol | source=script.js:L753 | neighbors=[SakuraPetal, .constructor(), .update()] | lang=en
- "utils_webp_converter_converttowebp": "convertToWebP()" | kind=code-symbol | source=src/utils/webp-converter.js:L2 | neighbors=[wysiwyg-editor.js, media-manager.js, webp-converter.js] | lang=en
- "utils_youtube_embed": "youtube-embed.js" | kind=code-symbol | source=src/utils/youtube-embed.js:L1 | neighbors=[a4cbf51 feat: add WebP Canvas image con…, extractYouTubeId(), generateYouTubeEmbedHTML()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_createbackup": ".createBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L475 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_deletebackup": ".deleteBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L496 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_deletemedia": ".deleteMedia()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L343 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_deleteopinion": ".deleteOpinion()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L651 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_deletepost": ".deletePost()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L288 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_getbackups": ".getBackups()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L466 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_getmedia": ".getMedia()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L307 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_getopinions": ".getOpinions()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L528 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_getposts": ".getPosts()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L174 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_getsettings": ".getSettings()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L103 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_getusers": ".getUsers()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L362 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_login": ".login()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L30 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_restorebackup": ".restoreBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L486 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_saveopinion": ".saveOpinion()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L607 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_savepost": ".savePost()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L242 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_savesettings": ".saveSettings()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L145 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_saveuser": ".saveUser()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L382 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "admin_admin_checkauth": "checkAuth()" | kind=code-symbol | source=src/admin/admin.js:L17 | neighbors=[admin.js, loadModules()] | lang=en
- "admin_admin_loadmodules": "loadModules()" | kind=code-symbol | source=src/admin/admin.js:L62 | neighbors=[admin.js, checkAuth()] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@40f7e13e4933a212508c2666e48191350fcec3ad": "40f7e13 fix(ui): suavizado y fusion de bordes y niebla inferior en la seccion h…" | kind=Commit | source=git | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…, master] | lang=es

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-005.json

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
