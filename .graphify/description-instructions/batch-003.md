# Node Description Batch 4 of 10

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

- "gpu_config": "gpu-config.js" | kind=code-symbol | source=gpu-config.js:L1 | neighbors=[28ed22a feat(gpu): add /gpu configurati…, DEFAULT_PRESET, gpuConfig, GpuConfigEngine] | lang=en
- "gpu_config_gpuconfigengine_mergewithdefault": ".mergeWithDefault()" | kind=code-symbol | source=gpu-config.js:L71 | neighbors=[GpuConfigEngine, .loadCurrentConfig(), .saveCurrentConfig(), .saveNewPreset()] | lang=en
- "modules_backup_manager": "backup-manager.js" | kind=code-symbol | source=src/admin/modules/backup-manager.js:L1 | neighbors=[daecf0d feat(admin): add backup manager…, initBackupManager(), dbService, SyncService] | lang=en
- "modules_opiniones_manager": "opiniones-manager.js" | kind=code-symbol | source=src/admin/modules/opiniones-manager.js:L1 | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…, 6e84b4a feat(optimizations): mejoras de…, initOpinionesManager(), dbService] | lang=en
- "scripts_start_pocketbase_ensurebinary": "ensureBinary()" | kind=code-symbol | source=scripts/start-pocketbase.js:L66 | neighbors=[start-pocketbase.js, downloadFile(), getDownloadUrl(), main()] | lang=en
- "server_servediagnosticshealth": "serveDiagnosticsHealth()" | kind=code-symbol | source=server.js:L803 | neighbors=[server.js, checkPocketBaseHealth(), fetchCollectionCount(), getDirectorySize()] | lang=en
- "services_native_store_readstore": "readStore()" | kind=code-symbol | source=src/services/native-store.js:L150 | neighbors=[server.js, native-store.js, handleNativeDataStore(), ensureFile()] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@0065d031aeccba19fb32bf3932e271e594b53998": "0065d03 chore(cleanup): remove 97 unused asset files, update metadata reference…" | kind=Commit | source=git | neighbors=[master, 02b0dd5 fix(fuji): fill true peak tip c…, c4fc262 fix(fuji): resolve fuji snow tr…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@02b0dd5bbd79b19b9286a398563140cdf6d72d76": "02b0dd5 fix(fuji): fill true peak tip coordinates (y:0..65 in layer 1) with sol…" | kind=Commit | source=git | neighbors=[0065d03 chore(cleanup): remove 97 unuse…, master, e8d36e0 revert(fuji): restore original …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@02fe36cbc512e4baa12bc7e49b33a8f195422ac4": "02fe36c feat(mobile): position logo below parallax objects, adjust top margin, …" | kind=Commit | source=git | neighbors=[master, 2228b27 feat(mobile): align Enso artwor…, 0e4583a checkpoint: volumetric clouds e…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@0390b13bdec77b6f847f8544e67f0ccb238435f6": "0390b13 docs: update walkthrough for smart environment provider detection" | kind=Commit | source=git | neighbors=[master, 215584e fix: restore PocketBase as defa…, ff28459 fix: smart environment provider…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@05628146c25a62991f290a79a8d16a7d43ff60e3": "0562814 docs: update design spec for Media Library and blog image integration" | kind=Commit | source=git | neighbors=[master, f3c80ce docs: update plan for Media Lib…, 441d589 docs: update walkthrough for au…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@084f7f65ac489b466551503932c496329c5363be": "084f7f6 docs: add walkthrough documentation" | kind=Commit | source=git | neighbors=[master, 7e7ab65 docs: update design spec for un…, c0749a0 feat: complete Admin Backend, C…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@0e4583a967cf03e4969d92250990e87fa1fd88a3": "0e4583a checkpoint: volumetric clouds engine, deep royal blue sky, bottom mist …" | kind=Commit | source=git | neighbors=[master, 02fe36c feat(mobile): position logo bel…, 732199f feat(clouds): transition from m…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@0f896e433f3fa1cfc8d50015aecb57832646e534": "0f896e4 add design spec for animated day night sky" | kind=Commit | source=git | neighbors=[master, 3e1faf4 add implementation plan for ani…, 18d586b feat: scroll empuja particulas,…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@13fc8dfcb7c7934b3a8fe0cc6ec202afc5c2816d": "13fc8df docs: update walkthrough for Hostinger deployment log analysis" | kind=Commit | source=git | neighbors=[master, 8656858 feat: make PocketBase exclusive…, b4f93cc fix: bind server.js to 0.0.0.0 …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@1549879a0873aa083fba39194f7e0c247e158b23": "1549879 docs: update implementation plan for unified samurai admin and real-tim…" | kind=Commit | source=git | neighbors=[master, 48d0413 feat: align admin shell with sa…, 7e7ab65 docs: update design spec for un…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@16d9a6e94e17f9001ca1e38f1b82666054bc6dc9": "16d9a6e docs: add design spec for admin backend, cms and user management" | kind=Commit | source=git | neighbors=[master, e127af5 docs: add implementation plan f…, 1fe3520 feat(audio): implement traditio…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@16ee04afab2aec457d1f3f8dadbf3884bff2c1ab": "16ee04a docs(plan): add implementation plan for backup system" | kind=Commit | source=git | neighbors=[master, dec3efb feat(db-service): add PocketBas…, ad996eb docs(spec): add backup system d…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@1afbe941a01de27cb15e0ce2aa83b4070be0a43a": "1afbe94 fix: texto hero mas legible, gradiente superior sutil" | kind=Commit | source=git | neighbors=[master, ae99829 feat: boton scroll to top, remo…, 1d1d4eb fix: petalos mas lentos, radio …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@1c33ae25b6b8aaa5f6b91824ab183b121e0a9d51": "1c33ae2 docs: update walkthrough for Blog section implementation" | kind=Commit | source=git | neighbors=[master, e4a2547 docs: update design spec for St…, 8334dc5 feat: add Samurai Blog section …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@1dae309d48b180b4595298d3ea1d283a89073316": "1dae309 fix(menu): lock all menu text link colors to light white (#f8f9fa) with…" | kind=Commit | source=git | neighbors=[master, ec4f3b1 fix(mobile): resolve asset load…, 603d5fe fix(navbar): keep sticky menu s…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@21e2a6e338a725230fdd4243657a22440ca59ee5": "21e2a6e docs: update plan for Unified Node App server integration" | kind=Commit | source=git | neighbors=[master, 28b5340 feat: add server.js single-entr…, 61d9e54 docs: update design spec for Un…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@2228b272091c45768f86bc2bd2aac7a95da48ee3": "2228b27 feat(mobile): align Enso artwork to top below navbar and position logo …" | kind=Commit | source=git | neighbors=[02fe36c feat(mobile): position logo bel…, master, 9c66d68 fix(mobile): enlarge and center…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@241dc91e459127179d3983d9a85af3613039fc2d": "241dc91 docs: update walkthrough for home blog link navigation fix" | kind=Commit | source=git | neighbors=[master, 3b9e154 fix: resolve query string routi…, 9cb9cbc fix: resolve navigation conflic…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@26bbdaa8c38452c5375d3da77f5008839b646ce2": "26bbdaa docs: update walkthrough for Media Library implementation" | kind=Commit | source=git | neighbors=[master, 5b744f6 fix: move blog and media photos…, fd36f9a feat: add Media Library Manager…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@28cd58f11ed5ed56fc8b779ad223ad275f51ab1b": "28cd58f docs: update walkthrough for PocketBase cross-platform service" | kind=Commit | source=git | neighbors=[1d552ed feat: integrate PocketBase as d…, master, cb7e83e refactor: remove audio engine, …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@2e08ad4affab4ac552907192df38ce3675935844": "2e08ad4 docs: update walkthrough for Strapi integration" | kind=Commit | source=git | neighbors=[master, 48b349d feat: add HTML rewrites to vite…, 7af96be feat: integrate Strapi Headless…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@31f490d4c97ea54063cd8bde71419a14bec0bc2d": "31f490d docs: update walkthrough for PocketBase default provider restoration" | kind=Commit | source=git | neighbors=[215584e fix: restore PocketBase as defa…, master, 17c5296 fix: eliminate 404 network fetc…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@35338899b450dacc07710f6a492cf41b6e515ddd": "3533889 docs: update walkthrough for admin login and module loading fix" | kind=Commit | source=git | neighbors=[master, 4a8d488 fix: HTML structure in admin.ht…, 84bc08e fix: make admin login and modul…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@3bf6a3a0ae1c1a28d1b89f5364a05f96ef0c89e8": "3bf6a3a docs: add design specification for architecture and performance optimiz…" | kind=Commit | source=git | neighbors=[101f3c3 fix(server): resolve storage di…, master, 8ba7e5f docs: add implementation plan f…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@3e1faf4747bbc0e7a3ea33c2f3c17367e14f24a5": "3e1faf4 add implementation plan for animated day night sky" | kind=Commit | source=git | neighbors=[0f896e4 add design spec for animated da…, master, c8d7182 feat(html): add sky container m…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@40f7e13e4933a212508c2666e48191350fcec3ad": "40f7e13 fix(ui): suavizado y fusion de bordes y niebla inferior en la seccion h…" | kind=Commit | source=git | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…, master, 6e84b4a feat(optimizations): mejoras de…] | lang=es
- "commit:repo:github.com/Diberto/el-camino-del-samurai@43b96bb9072983c1d066e53442d7202a93144702": "43b96bb docs: update walkthrough for WYSIWYG redesign and post duplication" | kind=Commit | source=git | neighbors=[master, 7cfa4b6 fix: add autocomplete attribute…, 48b349d feat: add HTML rewrites to vite…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@441d5892d03dc54160342fdaecab7230283a14c7": "441d589 docs: update walkthrough for autocomplete and connection handling" | kind=Commit | source=git | neighbors=[master, 0562814 docs: update design spec for Me…, 7cfa4b6 fix: add autocomplete attribute…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@443707ec8558d8ad05132591d5537537643d1bea": "443707e feat(parallax): restrict desktop parallax artwork objects canvas to max…" | kind=Commit | source=git | neighbors=[master, e46bc8f fix(layout): wrap hero parallax…, cbacb09 fix(hero): contain hero logo an…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@452ac9fe03c825a8e7fb58a1bab2b03878f28f08": "452ac9f docs: update walkthrough for blog query parameter routing fix" | kind=Commit | source=git | neighbors=[3b9e154 fix: resolve query string routi…, master, cb439bf feat(seo & security): add SEO m…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@4a8d488aecf2027655c1640f80c1c99c0a858916": "4a8d488 fix: HTML structure in admin.html and sync build artifacts" | kind=Commit | source=git | neighbors=[3533889 docs: update walkthrough for ad…, master, c9842fa docs: update walkthrough for fi…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@4cfca8ec314f80c477343168af35664ae0e8f46b": "4cfca8e docs: update walkthrough for PocketBase systemd daemon service" | kind=Commit | source=git | neighbors=[master, 61d9e54 docs: update design spec for Un…, c266afd feat: verify PocketBase as defa…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@52462a2a379623dfd6b1ef7ef9a2af56081883fd": "52462a2 style(navbar): transition sticky header to ultra-translucent frosted gl…" | kind=Commit | source=git | neighbors=[master, 90fc3cd feat(theme): extend Day/Night m…, d7168e8 feat(design): implement white s…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-003.json

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
