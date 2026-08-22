# Node Description Batch 3 of 10

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

- "commit:repo:github.com/Diberto/el-camino-del-samurai@5b744f6f596eeba2a57685a65d5e430dd5aa564e": "5b744f6 fix: move blog and media photos to public/photos directory for clean st…" | kind=Commit | source=git | neighbors=[26bbdaa docs: update walkthrough for Me…, master, dcd0258 docs: update walkthrough for pu…, blog-cms-manager.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@5ea7b41f5e91d47da32b28104d590a483588e9a1": "5ea7b41 feat(clouds): integrate WebGPU dynamic atmospheric clouds shader with W…" | kind=Commit | source=git | neighbors=[master, c4fc262 fix(fuji): resolve fuji snow tr…, script.js, 7f08f53 fix(fuji): resolve fuji snow ca…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@69a07f6f6d1de13133ad6e285b218423e3305a36": "69a07f6 feat: petals 3D con Three.js y viento del mouse" | kind=Commit | source=git | neighbors=[master, 9e88171 Revert "feat: petals 3D con Thr…, script.js, e629f53 feat: petals afectados por vien…] | lang=es
- "commit:repo:github.com/Diberto/el-camino-del-samurai@6d2db3a7dfc0b5db471837b4fac2122e421a67c2": "6d2db3a feat(sakura): implement high-performance dynamic 3D-flipping sakura fal…" | kind=Commit | source=git | neighbors=[master, 514414b fix(sakura): restore original s…, script.js, 9c9ebe0 fix(fuji): resolve transparent …] | lang=pt
- "commit:repo:github.com/Diberto/el-camino-del-samurai@6d400fe2303dcbd4138bb6e2488bdf6580e766fe": "6d400fe fix: update server.listen for Unix Socket support in Hostinger Node man…" | kind=Commit | source=git | neighbors=[469434d fix: bypass redundant 502 auth …, master, 992fa5d chore: update graphify manifest…, server.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@6e2187739fd9bc13e8e79393728ee14dde2cb331": "6e21877 feat(sky): convert red sun into dynamic celestial orb morphing into mys…" | kind=Commit | source=git | neighbors=[5650d5b fix(sky): make mountain backdro…, master, 3f7d802 feat(sky): implement azure sky …, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@6fcf2625552507fe4cf66829c329914bb3ae8dae": "6fcf262 feat: add 1700000001_unlock_collections migration to unblock 403 collec…" | kind=Commit | source=git | neighbors=[master, 1728be7 fix: use raw SQL UPDATE query i…, 1700000001_unlock_collections.js, 992fa5d chore: update graphify manifest…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@732199f569e19c5dd53482427a8e7fa9c22579d5": "732199f feat(clouds): transition from mathematical shaders to organic volumetri…" | kind=Commit | source=git | neighbors=[2f73c41 feat(sky): add dual background/…, master, 0e4583a checkpoint: volumetric clouds e…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@773c0b57b6b27d4f2a7432fc7bef7fe501ce750d": "773c0b5 fix(assets): bundle WebP logo and cloud assets via ES imports in script…" | kind=Commit | source=git | neighbors=[master, d6f8411 fix(mobile): lock hero height t…, script.js, f7921ed fix(canvas): prevent InvalidSta…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@785f410c0adb3c19e5c6623f209dab3ae952f1ed": "785f410 fix(logo): maintain white typography logo in desktop mode for both day …" | kind=Commit | source=git | neighbors=[master, d7168e8 feat(design): implement white s…, script.js, c4adbee fix(header): preserve translate…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@8a1ce7ee04a6b7ee454e1fa48426f3e96e394b29": "8a1ce7e fix: sanitize savePost payloads and auto-provision admin user on login …" | kind=Commit | source=git | neighbors=[7a6f4db docs: update walkthrough for fi…, pocketbase-adapter.js, master, 5961996 docs: update walkthrough for ad…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@9cb9cbc96db0a2fbbf82a62c13c96fcd96556f92": "9cb9cbc fix: resolve navigation conflict on home blog cards by using clean anch…" | kind=Commit | source=git | neighbors=[8cd8d91 docs: update walkthrough for bl…, master, 241dc91 docs: update walkthrough for ho…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@9e88171030a8a3cc7363d918fcb3d6112e6ba2d1": "9e88171 Revert \"feat: petals 3D con Three.js y viento del mouse\"" | kind=Commit | source=git | neighbors=[69a07f6 feat: petals 3D con Three.js y …, master, 336d2f1 feat: viento del mouse mucho ma…, script.js] | lang=es
- "commit:repo:github.com/Diberto/el-camino-del-samurai@a3e96d131cf9888aa1eec6605a471e4dfe54c452": "a3e96d1 fix: return 404 for missing static assets to prevent Strict MIME type c…" | kind=Commit | source=git | neighbors=[1728be7 fix: use raw SQL UPDATE query i…, master, dd3ad3e fix: use native node:sqlite mod…, server.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@ae99829982564cd7b92a8a17399374a780423359": "ae99829 feat: boton scroll to top, remove musica" | kind=Commit | source=git | neighbors=[1afbe94 fix: texto hero mas legible, gr…, master, 18d586b feat: scroll empuja particulas,…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@b6fbf32995a151ea051d6990da28693510f62a3d": "b6fbf32 feat(logo): restore original black letters with red details for Day Mod…" | kind=Commit | source=git | neighbors=[9c66d68 fix(mobile): enlarge and center…, master, 2e00a3f fix(theme): eliminate duplicate…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c642b72f08d30bf54eb94704afc2ee2278136406": "c642b72 fix(clouds): restore missing clouds-fg-canvas element in index.html and…" | kind=Commit | source=git | neighbors=[7e6eae1 assets: add Logo.webp, master, 230d48f feat(3d-book): enlarge 3D book …, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c7cc8d1499123be9f9a5a617a270c6b4626dc92e": "c7cc8d1 fix(pocketbase): enforce chmod 0755 execution permissions on Linux serv…" | kind=Commit | source=git | neighbors=[4882a88 fix(server): replace dynamic aw…, master, eea1ef3 fix: resolve PocketBase 502/404…, start-pocketbase.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@cb439bfdf089809328313e583422b6e093d8a545": "cb439bf feat(seo & security): add SEO metadata, robots.txt, sitemap.xml, worksp…" | kind=Commit | source=git | neighbors=[452ac9f docs: update walkthrough for bl…, master, ad996eb docs(spec): add backup system d…, blog.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@cb7e83eaedf6fa2bae7fe7ac105a4a3ee116461e": "cb7e83e refactor: remove audio engine, music toggle button, and all music-relat…" | kind=Commit | source=git | neighbors=[28cd58f docs: update walkthrough for Po…, master, b3dc1fb docs: update walkthrough for au…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@cc9752f69bbf2df5e855f7ced164f594de8b836f": "cc9752f fix(gpu): connect site script to gpuConfig engine so saved cloud, parti…" | kind=Commit | source=git | neighbors=[a11a5b7 fix(navbar): remove GPU option …, master, 1fe3520 feat(audio): implement traditio…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@cd5a9353f076d7eddfbe4dc15153835b4e434050": "cd5a935 fix: resolve static hosting Hostinger 404s by adding silent fallback to…" | kind=Commit | source=git | neighbors=[8c1eec2 docs: update walkthrough for 40…, pocketbase-adapter.js, master, f2e9dd0 docs: update walkthrough for Ho…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@d6df3b9c86373551b498728e7050303c700fc729": "d6df3b9 feat(sakura): replace particle ellipses with organic cherry blossom pet…" | kind=Commit | source=git | neighbors=[cc310b4 feat(theme): implement interact…, master, 28ed22a feat(gpu): add /gpu configurati…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@d85fa7370a5e2a8c3eb8ff2aac20aac2ceb27b3e": "d85fa73 feat(branding): replace text kanjis in author signature and footer logo…" | kind=Commit | source=git | neighbors=[5290f56 fix(lightbox): extract loaded i…, master, a9f9253 feat(branding): crop exact circ…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@dd3ad3e9b153d2acf58b85abac9af1ee2d150861": "dd3ad3e fix: use native node:sqlite module in start-pocketbase.js to unlock Poc…" | kind=Commit | source=git | neighbors=[a3e96d1 fix: return 404 for missing sta…, master, 1f0cf3c feat(opiniones): modulo CRUD en…, start-pocketbase.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@e0b581f0a501879279ad73c6202d560436902cff": "e0b581f feat(parallax): restrict parallax objects container to max-width 1280px…" | kind=Commit | source=git | neighbors=[2a3315c fix(performance): cap canvas re…, master, cbacb09 fix(hero): contain hero logo an…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@e123a8e3926c92bb1cc7f8dd4c1c3d8722b45db0": "e123a8e feat(js): add Day/Night theme manager and animated starfield canvas" | kind=Commit | source=git | neighbors=[7179ed1 feat(css): add styles for Day/N…, master, f8e6b94 chore: complete Day/Night sky s…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@e46bc8f0b504233999427d0b2887defd88d8514a": "e46bc8f fix(layout): wrap hero parallax elements in centered 1280px stage conta…" | kind=Commit | source=git | neighbors=[443707e feat(parallax): restrict deskto…, master, 7e6eae1 assets: add Logo.webp, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@e629f53a6b82bb53d7f862e82a8038a2cd226de1": "e629f53 feat: petals afectados por viento del mouse (velocidad/direccion)" | kind=Commit | source=git | neighbors=[master, 69a07f6 feat: petals 3D con Three.js y …, script.js, eaa4638 fix: samurai detras del texto h…] | lang=es
- "commit:repo:github.com/Diberto/el-camino-del-samurai@ec4f3b173efd226c6c191e3f6499c214022079b8": "ec4f3b1 fix(mobile): resolve asset loading stall and add fail-safe handlers for…" | kind=Commit | source=git | neighbors=[1dae309 fix(menu): lock all menu text l…, master, 0405449 fix(logo): restore white typogr…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@f7921ed33cae053da033b8d7cf9e0f4b2a2bc058": "f7921ed fix(canvas): prevent InvalidStateError in drawImage by checking texture…" | kind=Commit | source=git | neighbors=[master, 773c0b5 fix(assets): bundle WebP logo a…, script.js, fae5c61 fix(logo): ensure maximum contr…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@fae5c61b9f378edb70689d0aa9ee1bd86c975405": "fae5c61 fix(logo): ensure maximum contrast and prevent overflow clipping for ty…" | kind=Commit | source=git | neighbors=[0405449 fix(logo): restore white typogr…, master, f7921ed fix(canvas): prevent InvalidSta…, script.js] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@ff284595efa6ba015f9a4fa4aa1facf7af635500": "ff28459 fix: smart environment provider detection to prevent PocketBase 404 net…" | kind=Commit | source=git | neighbors=[f2e9dd0 docs: update walkthrough for Ho…, master, 0390b13 docs: update walkthrough for sm…, db-service.js] | lang=en
- "gpu_config": "gpu-config.js" | kind=code-symbol | source=gpu-config.js:L1 | neighbors=[28ed22a feat(gpu): add /gpu configurati…, DEFAULT_PRESET, gpuConfig, GpuConfigEngine] | lang=en
- "gpu_config_gpuconfigengine_mergewithdefault": ".mergeWithDefault()" | kind=code-symbol | source=gpu-config.js:L71 | neighbors=[GpuConfigEngine, .loadCurrentConfig(), .saveCurrentConfig(), .saveNewPreset()] | lang=en
- "modules_backup_manager": "backup-manager.js" | kind=code-symbol | source=src/admin/modules/backup-manager.js:L1 | neighbors=[daecf0d feat(admin): add backup manager…, initBackupManager(), dbService, SyncService] | lang=en
- "modules_opiniones_manager": "opiniones-manager.js" | kind=code-symbol | source=src/admin/modules/opiniones-manager.js:L1 | neighbors=[1f0cf3c feat(opiniones): modulo CRUD en…, 6e84b4a feat(optimizations): mejoras de…, initOpinionesManager(), dbService] | lang=en
- "scripts_start_pocketbase_ensurebinary": "ensureBinary()" | kind=code-symbol | source=scripts/start-pocketbase.js:L66 | neighbors=[start-pocketbase.js, downloadFile(), getDownloadUrl(), main()] | lang=en
- "server_servediagnosticshealth": "serveDiagnosticsHealth()" | kind=code-symbol | source=server.js:L773 | neighbors=[server.js, checkPocketBaseHealth(), fetchCollectionCount(), getDirectorySize()] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@0065d031aeccba19fb32bf3932e271e594b53998": "0065d03 chore(cleanup): remove 97 unused asset files, update metadata reference…" | kind=Commit | source=git | neighbors=[master, 02b0dd5 fix(fuji): fill true peak tip c…, c4fc262 fix(fuji): resolve fuji snow tr…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-002.json

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
