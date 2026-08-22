# Node Description Batch 6 of 10

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

- "commit:repo:github.com/Diberto/el-camino-del-samurai@c4fc262b2584b2a80f8dbebe91857889f8251465": "c4fc262 fix(fuji): resolve fuji snow transparency using precise scanline fill b…" | kind=Commit | source=git | neighbors=[5ea7b41 feat(clouds): integrate WebGPU …, master, 0065d03 chore(cleanup): remove 97 unuse…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c8d71822b8acf9308f72f0e77b7ffc6b00c2b68c": "c8d7182 feat(html): add sky container markup and theme toggle button" | kind=Commit | source=git | neighbors=[3e1faf4 add implementation plan for ani…, master, 7179ed1 feat(css): add styles for Day/N…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c9842faa45f5ab5cd3d8df179549566473365e8b": "c9842fa docs: update walkthrough for final PocketBase exclusivity verification" | kind=Commit | source=git | neighbors=[4a8d488 fix: HTML structure in admin.ht…, master, 196097e fix: resolve PocketBase 400 Bad…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@cbacb099be765c50f4aa2c3aa2441f35841c48a8": "cbacb09 fix(hero): contain hero logo and artwork within 1200px max-width center…" | kind=Commit | source=git | neighbors=[master, 443707e feat(parallax): restrict deskto…, e0b581f feat(parallax): restrict parall…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@cc310b468c3a08e0602bf0fc3e952ead86f01106": "cc310b4 feat(theme): implement interactive micro sky engine inside day/night to…" | kind=Commit | source=git | neighbors=[6114a72 fix(navbar): lock desktop menu …, master, d6df3b9 feat(sakura): replace particle …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@d6f84111a925239648c691290857e13f9429bce6": "d6f8411 fix(mobile): lock hero height to 100vh with seamless bottom gradient ov…" | kind=Commit | source=git | neighbors=[773c0b5 fix(assets): bundle WebP logo a…, master, 5ae8c77 feat(mobile): maximize Enso cir…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@d7168e89998664540262286ae27dbc261dcee45a": "d7168e8 feat(design): implement white sticky navbar in day mode with bottom tra…" | kind=Commit | source=git | neighbors=[785f410 fix(logo): maintain white typog…, master, 52462a2 style(navbar): transition stick…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@dc40c3bb455e620e79e4c4821a3a389e2eb084c9": "dc40c3b docs: update walkthrough for final 404 elimination fix" | kind=Commit | source=git | neighbors=[17c5296 fix: eliminate 404 network fetc…, master, b4f93cc fix: bind server.js to 0.0.0.0 …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@dcd02583257f018d08c4ad297c18c8a0e0157c0a": "dcd0258 docs: update walkthrough for public photos static path fix" | kind=Commit | source=git | neighbors=[5b744f6 fix: move blog and media photos…, master, 5d50db6 docs: update design spec for Bl…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@dcfdfe401e973845c8bef47efa30db098f9c803e": "dcfdfe4 docs: update walkthrough for scrollspy and menu button fixes" | kind=Commit | source=git | neighbors=[94208da fix: auto-sync section toggles …, master, 8334dc5 feat: add Samurai Blog section …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@e127af57f29b721cea9b732c0ee9a9fe1d021025": "e127af5 docs: add implementation plan for admin backend, cms and user management" | kind=Commit | source=git | neighbors=[16d9a6e docs: add design spec for admin…, master, 9b5d761 feat: add DatabaseService abstr…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@e4a2547da7c672097af04e04aa35a50d7e84d9f9": "e4a2547 docs: update design spec for Strapi Headless CMS integration" | kind=Commit | source=git | neighbors=[1c33ae2 docs: update walkthrough for Bl…, master, 7710994 docs: update plan for Strapi He…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@e7c6b2fb9c14cee3399ca07296a2372fe20b12d0": "e7c6b2f docs: update walkthrough for 502 Bad Gateway resolution" | kind=Commit | source=git | neighbors=[d46f078 fix: resolve 502 Bad Gateway by…, master, 165b44d fix: make entire blog catalog c…] | lang=en
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
- "modules_diagnostics_manager": "diagnostics-manager.js" | kind=code-symbol | source=src/admin/modules/diagnostics-manager.js:L1 | neighbors=[cf9d01a feat(admin): modulo de diagnost…, initDiagnosticsManager(), dbService] | lang=en
- "modules_user_manager": "user-manager.js" | kind=code-symbol | source=src/admin/modules/user-manager.js:L1 | neighbors=[c0749a0 feat: complete Admin Backend, C…, initUserManager(), dbService] | lang=en
- "pb_migrations_1700000001_unlock_collections": "1700000001_unlock_collections.js" | kind=code-symbol | source=pb_migrations/1700000001_unlock_collections.js:L1 | neighbors=[1728be7 fix: use raw SQL UPDATE query i…, 1f0cf3c feat(opiniones): modulo CRUD en…, 6fcf262 feat: add 1700000001_unlock_col…] | lang=en
- "public_blog_escapehtml": "escapeHTML()" | kind=code-symbol | source=src/public/blog.js:L91 | neighbors=[blog.js, renderCatalog(), renderSinglePost()] | lang=en
- "public_blog_rendercatalog": "renderCatalog()" | kind=code-symbol | source=src/public/blog.js:L101 | neighbors=[blog.js, escapeHTML(), renderView()] | lang=en
- "public_blog_rendersinglepost": "renderSinglePost()" | kind=code-symbol | source=src/public/blog.js:L154 | neighbors=[blog.js, escapeHTML(), renderView()] | lang=en
- "script_sakurapetal_reset": ".reset()" | kind=code-symbol | source=script.js:L879 | neighbors=[SakuraPetal, .constructor(), .update()] | lang=en
- "services_native_store_ensurefile": "ensureFile()" | kind=code-symbol | source=src/services/native-store.js:L139 | neighbors=[native-store.js, initDataStore(), readStore()] | lang=en
- "services_native_store_initdatastore": "initDataStore()" | kind=code-symbol | source=src/services/native-store.js:L127 | neighbors=[server.js, native-store.js, ensureFile()] | lang=en
- "utils_webp_converter_converttowebp": "convertToWebP()" | kind=code-symbol | source=src/utils/webp-converter.js:L2 | neighbors=[wysiwyg-editor.js, media-manager.js, webp-converter.js] | lang=en
- "utils_youtube_embed": "youtube-embed.js" | kind=code-symbol | source=src/utils/youtube-embed.js:L1 | neighbors=[a4cbf51 feat: add WebP Canvas image con…, extractYouTubeId(), generateYouTubeEmbedHTML()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_createbackup": ".createBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L570 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_deletebackup": ".deleteBackup()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L591 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_deletemedia": ".deleteMedia()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L374 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_deleteopinion": ".deleteOpinion()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L746 | neighbors=[PocketBaseAdapter, .request()] | lang=en
- "adapters_pocketbase_adapter_pocketbaseadapter_deletepost": ".deletePost()" | kind=code-symbol | source=src/services/adapters/pocketbase-adapter.js:L288 | neighbors=[PocketBaseAdapter, .request()] | lang=en

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
