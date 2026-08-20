# Node Description Batch 2 of 9

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

- "commit:repo:github.com/Diberto/el-camino-del-samurai@52de155d879e9290bfe3226f8d98898687e42f48": "52de155 fix(server & auth): add native backup proxy handler in server.js and im…" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, master, 101f3c3 fix(server): resolve storage di…, server.js, daecf0d feat(admin): add backup manager…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@7af96be55f5a4bce2d02ab2373c538c7bae73af4": "7af96be feat: integrate Strapi Headless CMS adapter and add backend provider se…" | kind=Commit | source=git | neighbors=[7710994 docs: update plan for Strapi He…, admin.js, master, 2e08ad4 docs: update walkthrough for St…, db-service.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@7cfa4b6f5502bd8a1a88d4e613f5af26cd650e66": "7cfa4b6 fix: add autocomplete attributes to login inputs, add login provider se…" | kind=Commit | source=git | neighbors=[43b96bb docs: update walkthrough for WY…, pocketbase-adapter.js, admin.js, master, 441d589 docs: update walkthrough for au…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@84bc08e3f8f87eb2d82f6c5520e577028eafd7f7": "84bc08e fix: make admin login and module initialization asynchronous and error …" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, admin.js, master, 3533889 docs: update walkthrough for ad…, bafccaf docs: update walkthrough for Po…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@94208dacb4107492dbfc4b67ab2098798a12eca3": "94208da fix: auto-sync section toggles with menu items, restore Comprar btn-nav…" | kind=Commit | source=git | neighbors=[master, dcfdfe4 docs: update walkthrough for sc…, sections-menu-manager.js, script.js, bc1adc8 docs: update walkthrough docume…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@9b5d761bff5888778f81fb440dde81178e833aa7": "9b5d761 feat: add DatabaseService abstraction layer and PocketBase / Local SQLi…" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, master, a4cbf51 feat: add WebP Canvas image con…, db-service.js, e127af5 docs: add implementation plan f…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@a4cbf51dc352a80bb4c2d68db9d0a0e0c2790e48": "a4cbf51 feat: add WebP Canvas image converter and YouTube embed helper utilities" | kind=Commit | source=git | neighbors=[9b5d761 feat: add DatabaseService abstr…, master, c0749a0 feat: complete Admin Backend, C…, webp-converter.js, youtube-embed.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@b4f93cce984521f3e77c2936ff6716e8b1004e89": "b4f93cc fix: bind server.js to 0.0.0.0 and suppress unzip log output for clean …" | kind=Commit | source=git | neighbors=[master, 13fc8df docs: update walkthrough for Ho…, start-pocketbase.js, server.js, dc40c3b docs: update walkthrough for fi…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@d46f078e6a5d6722c861a2c7bff96f649515a21b": "d46f078 fix: resolve 502 Bad Gateway by adding multi-method zip extraction on L…" | kind=Commit | source=git | neighbors=[5961996 docs: update walkthrough for ad…, master, e7c6b2f docs: update walkthrough for 50…, start-pocketbase.js, server.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@daecf0d085038f87a5de58d0bb98051d9a2caf00": "daecf0d feat(admin): add backup manager UI tab with manual, scheduled, and down…" | kind=Commit | source=git | neighbors=[0a8d211 feat(server): add scheduled aut…, admin.js, master, 52de155 fix(server & auth): add native …, backup-manager.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@dec3efb4ee76aa8ffadb8756e6b0afcc08d3ee56": "dec3efb feat(db-service): add PocketBase backup management API methods" | kind=Commit | source=git | neighbors=[16ee04a docs(plan): add implementation …, pocketbase-adapter.js, master, 0a8d211 feat(server): add scheduled aut…, db-service.js] | lang=en
- "modules_gpu_config_manager": "gpu-config-manager.js" | kind=code-symbol | source=src/admin/modules/gpu-config-manager.js:L1 | neighbors=[48d0413 feat: align admin shell with sa…, c0749a0 feat: complete Admin Backend, C…, initGpuManager(), dbService, SyncService] | lang=en
- "public_blog_renderview": "renderView()" | kind=code-symbol | source=src/public/blog.js:L71 | neighbors=[blog.js, getTargetPostId(), renderCatalog(), renderSinglePost(), updateDynamicSEO()] | lang=en
- "script_sakurapetal": "SakuraPetal" | kind=code-symbol | source=script.js:L747 | neighbors=[script.js, .constructor(), .draw(), .reset(), .update()] | lang=en
- "vite_config": "vite.config.js" | kind=code-symbol | source=vite.config.js:L1 | neighbors=[28ed22a feat(gpu): add /gpu configurati…, 48b349d feat: add HTML rewrites to vite…, c0749a0 feat: complete Admin Backend, C…, eea1ef3 fix: resolve PocketBase 502/404…, configureServer()] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@0405449f71204f86cbf03fa3642ecd79e5b24481": "0405449 fix(logo): restore white typography logo (logo_typography_light.webp) w…" | kind=Commit | source=git | neighbors=[master, fae5c61 fix(logo): ensure maximum contr…, script.js, ec4f3b1 fix(mobile): resolve asset load…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@0a8d211cdac0681d034c0ef4e012b8c78e42a179": "0a8d211 feat(server): add scheduled auto-backup background worker" | kind=Commit | source=git | neighbors=[master, daecf0d feat(admin): add backup manager…, server.js, dec3efb feat(db-service): add PocketBas…] | lang=pt
- "commit:repo:github.com/Diberto/el-camino-del-samurai@0da1f79f2e5ac440fa975463bf2fc22ae06c4678": "0da1f79 refactor: remove unused local SQLite and Strapi adapters, UI selectors,…" | kind=Commit | source=git | neighbors=[admin.js, master, 8161ee0 docs: update walkthrough for cl…, 5cec31a docs: update walkthrough for ex…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@101f3c385f70d6cea855193495e53a33bc8720bd": "101f3c3 fix(server): resolve storage dir auto-creation and internal port auto-b…" | kind=Commit | source=git | neighbors=[master, 3bf6a3a docs: add design specification …, server.js, 52de155 fix(server & auth): add native …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@111a100dcf4667edeb225cefdc9880f44c043879": "111a100 fix(3d-book): repair 3d box geometry to prevent clipping/floating spine…" | kind=Commit | source=git | neighbors=[master, 6114a72 fix(navbar): lock desktop menu …, script.js, 230d48f feat(3d-book): enlarge 3D book …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@17c5296eeb6da29595ef2b87e1f278d102d75d9f": "17c5296 fix: eliminate 404 network fetch errors on static hosting by conditiona…" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, master, dc40c3b docs: update walkthrough for fi…, 31f490d docs: update walkthrough for Po…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@18d586b385f5960b06b5f3cbadd4ec36eadf6341": "18d586b feat: scroll empuja particulas, burst al ir arriba" | kind=Commit | source=git | neighbors=[master, 0f896e4 add design spec for animated da…, script.js, ae99829 feat: boton scroll to top, remo…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@1d1d4eb599e407d848c79fe3617502e0d834460f": "1d1d4eb fix: petalos mas lentos, radio de viento 350px y mas fuerza" | kind=Commit | source=git | neighbors=[master, 1afbe94 fix: texto hero mas legible, gr…, script.js, 336d2f1 feat: viento del mouse mucho ma…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@1fe3520074e4ca3c63de37ff491c5027d8af64bb": "1fe3520 feat(audio): implement traditional Japanese Shakuhachi procedural flute…" | kind=Commit | source=git | neighbors=[master, 16d9a6e docs: add design spec for admin…, script.js, cc9752f fix(gpu): connect site script t…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@230d48fb6be7e3306c754ba3c91b8fe1b32138e7": "230d48f feat(3d-book): enlarge 3D book 20%, redesign tomo selector tabs, implem…" | kind=Commit | source=git | neighbors=[master, 111a100 fix(3d-book): repair 3d box geo…, script.js, c642b72 fix(clouds): restore missing cl…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@2a3315cb77766b02c593d7dd81d920028063b8b3": "2a3315c fix(performance): cap canvas resolution and parallax background contain…" | kind=Commit | source=git | neighbors=[master, e0b581f feat(parallax): restrict parall…, script.js, a9f9253 feat(branding): crop exact circ…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@2e00a3f77cd674948993fd734944f1f92af77487": "2e00a3f fix(theme): eliminate duplicate event listener on theme-toggle to fix D…" | kind=Commit | source=git | neighbors=[master, c4adbee fix(header): preserve translate…, script.js, b6fbf32 feat(logo): restore original bl…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@2f73c41fbcd6acf89552493b75edd159350dc7c7": "2f73c41 feat(sky): add dual background/foreground WebGPU clouds passing in fron…" | kind=Commit | source=git | neighbors=[master, 732199f feat(clouds): transition from m…, script.js, e8d36e0 revert(fuji): restore original …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@336d2f1542879b302963a0797129048121e55a03": "336d2f1 feat: viento del mouse mucho mas notorio con estela" | kind=Commit | source=git | neighbors=[master, 1d1d4eb fix: petalos mas lentos, radio …, script.js, 9e88171 Revert "feat: petals 3D con Thr…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@3b9e154a5806d29455d085f27303f5fa36311452": "3b9e154 fix: resolve query string routing bug in server.js so blog.html?post=..…" | kind=Commit | source=git | neighbors=[241dc91 docs: update walkthrough for ho…, master, 452ac9f docs: update walkthrough for bl…, server.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@3f7d80254d6979e4b8941d162b1465be517a2273": "3f7d802 feat(sky): implement azure sky blue background, white clouds, GPU accel…" | kind=Commit | source=git | neighbors=[master, 5b9e949 fix(fuji): reconstruct Mount Fu…, script.js, 6e21877 feat(sky): convert red sun into…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@469316f87815eb5d8c55f99758c2a37ce78905d9": "469316f fix: resolve PocketBase 400 Bad Request error by stringifying settings_…" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, master, bafccaf docs: update walkthrough for Po…, 8161ee0 docs: update walkthrough for cl…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@469434d73e4e37e70646fcfa679456af7d6052b1": "469434d fix: bypass redundant 502 auth retries when PocketBase server is offline" | kind=Commit | source=git | neighbors=[pocketbase-adapter.js, master, 6d400fe fix: update server.listen for U…, eea1ef3 fix: resolve PocketBase 502/404…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@4882a8802d2f599095992b524524383a0b4419f2": "4882a88 fix(server): replace dynamic await import with static exec import in se…" | kind=Commit | source=git | neighbors=[master, c7cc8d1 fix(pocketbase): enforce chmod …, server.js, ee4947c perf(architecture & memory): im…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@514414bc573478fdc363406f60470f68cd763b56": "514414b fix(sakura): restore original static layer 7 and layer 8 parallax petal…" | kind=Commit | source=git | neighbors=[master, 7f08f53 fix(fuji): resolve fuji snow ca…, script.js, 6d2db3a feat(sakura): implement high-pe…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@5290f56f695338a2f98cc7aa76fd6c235458f2dd": "5290f56 fix(lightbox): extract loaded image URL directly to fix modal expansion…" | kind=Commit | source=git | neighbors=[master, d85fa73 feat(branding): replace text ka…, script.js, 54c49f4 feat(gallery): integrate author…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@54c49f42e8af16d2e7f4dcd8e2216ab1693a8763": "54c49f4 feat(gallery): integrate author portrait (orpianesi1.webp) and add inte…" | kind=Commit | source=git | neighbors=[master, 5290f56 fix(lightbox): extract loaded i…, script.js, 5ae8c77 feat(mobile): maximize Enso cir…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@5b744f6f596eeba2a57685a65d5e430dd5aa564e": "5b744f6 fix: move blog and media photos to public/photos directory for clean st…" | kind=Commit | source=git | neighbors=[26bbdaa docs: update walkthrough for Me…, master, dcd0258 docs: update walkthrough for pu…, blog-cms-manager.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@5ea7b41f5e91d47da32b28104d590a483588e9a1": "5ea7b41 feat(clouds): integrate WebGPU dynamic atmospheric clouds shader with W…" | kind=Commit | source=git | neighbors=[master, c4fc262 fix(fuji): resolve fuji snow tr…, script.js, 7f08f53 fix(fuji): resolve fuji snow ca…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@69a07f6f6d1de13133ad6e285b218423e3305a36": "69a07f6 feat: petals 3D con Three.js y viento del mouse" | kind=Commit | source=git | neighbors=[master, 9e88171 Revert "feat: petals 3D con Thr…, script.js, e629f53 feat: petals afectados por vien…] | lang=es

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-001.json

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
