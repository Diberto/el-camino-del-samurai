# Community Labeling

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

LANGUAGE: each community line ends with a `[lang=…]` marker giving the
language of its source nodes. Write that community's name in EXACTLY that
language. Do not normalize every name to one common language.

## Communities

Community 0: master, 0065d03 chore(cleanup): remove 97 unused asset files, update, 02b0dd5 fix(fuji): fill true peak tip coordinates (y:0..65 i, 02fe36c feat(mobile): position logo below parallax objects, , 0390b13 docs: update walkthrough for smart environment provi, 0562814 docs: update design spec for Media Library and blog , 0e4583a checkpoint: volumetric clouds engine, deep royal blu, 0f896e4 add design spec for animated day night sky, 102b502 feat: add dynamic top 3 posts widget to home and 2-s, 13fc8df docs: update walkthrough for Hostinger deployment lo, 14d3d80 fix: resolve PocketBase collection 404 errors with a, 17c5296 fix: eliminate 404 network fetch errors on static ho [lang=en]
Community 1: 0405449 fix(logo): restore white typography logo (logo_typog, 111a100 fix(3d-book): repair 3d box geometry to prevent clip, 18d586b feat: scroll empuja particulas, burst al ir arriba, 1afbe94 fix: texto hero mas legible, gradiente superior suti, 1d1d4eb fix: petalos mas lentos, radio de viento 350px y mas, 230d48f feat(3d-book): enlarge 3D book 20%, redesign tomo se, 2a3315c fix(performance): cap canvas resolution and parallax, 336d2f1 feat: viento del mouse mucho mas notorio con estela, 3f7d802 feat(sky): implement azure sky blue background, whit, 443707e feat(parallax): restrict desktop parallax artwork ob, 5290f56 fix(lightbox): extract loaded image URL directly to , 54c49f4 feat(gallery): integrate author portrait (orpianesi1 [lang=es]
Community 2: dbService, SyncService, admin.js, checkAuth(, loadModules(, 084f7f6 docs: add walkthrough documentation, 1549879 docs: update implementation plan for unified samurai, 2fcb02d fix: map admin section toggles and menu items to exa, 48d0413 feat: align admin shell with samurai design system a, 6cb0334 docs: update walkthrough documentation for unified s, 7e7ab65 docs: update design spec for unified samurai admin a, 8334dc5 feat: add Samurai Blog section on home with 3 exampl [lang=en]
Community 3: gpuConfig, GpuConfigEngine, 16d9a6e docs: add design spec for admin backend, cms and use, 1fe3520 feat(audio): implement traditional Japanese Shakuhac, 28ed22a feat(gpu): add /gpu configuration control panel with, a11a5b7 fix(navbar): remove GPU option from public header me, cc9752f fix(gpu): connect site script to gpuConfig engine so, e127af5 docs: add implementation plan for admin backend, cms, gpu-config.js, DEFAULT_PRESET, .constructor(, .exportPresetJSON( [lang=en]
Community 4: DatabaseService, .constructor(, .createBackup(, .deleteBackup(, .deleteMedia(, .deleteOpinion(, .deletePost(, .getBackups(, .getCurrentUser(, .getDownloadBackupUrl(, .getMedia(, .getOpinions( [lang=en]
Community 5: PocketBaseAdapter, .constructor(, .createBackup(, .deleteBackup(, .deleteMedia(, .deleteOpinion(, .deletePost(, .getBackups(, .getCurrentUser(, .getDownloadBackupUrl(, .getMedia(, .getOpinions( [lang=en]
Community 6: 101f3c3 fix(server): resolve storage dir auto-creation and i, 3bf6a3a docs: add design specification for architecture and , 4882a88 fix(server): replace dynamic await import with stati, 52de155 fix(server & auth): add native backup proxy handler , 8ba7e5f docs: add implementation plan for architecture and p, c7cc8d1 fix(pocketbase): enforce chmod 0755 execution permis, ee4947c perf(architecture & memory): implement zlib gzip com, server.js, cleanOldBackups(, __dirname, DIST_DIR, __filename [lang=en]
Community 7: ensureBinary(, 1728be7 fix: use raw SQL UPDATE query in migration and pre-l, 1f0cf3c feat(opiniones): modulo CRUD en admin, galeria corre, 40f7e13 fix(ui): suavizado y fusion de bordes y niebla infer, 6d400fe fix: update server.listen for Unix Socket support in, 6fcf262 feat: add 1700000001_unlock_collections migration to, 992fa5d chore: update graphify manifest and sync repository, a3e96d1 fix: return 404 for missing static assets to prevent, dd3ad3e fix: use native node:sqlite module in start-pocketba, 1700000001_unlock_collections.js, 1700000002_opinions_collection.js, start-pocketbase.js [lang=en]
Community 8: pocketbase-adapter.js, 0da1f79 refactor: remove unused local SQLite and Strapi adap, 196097e fix: resolve PocketBase 400 Bad Request error by sen, 3533889 docs: update walkthrough for admin login and module , 40ba44b fix: eliminate POST auto-seeding side effects on GET, 469316f fix: resolve PocketBase 400 Bad Request error by str, 469434d fix: bypass redundant 502 auth retries when PocketBa, 4a8d488 fix: HTML structure in admin.html and sync build art, 5961996 docs: update walkthrough for admin auto-provisioning, 5cec31a docs: update walkthrough for exclusive PocketBase pr, 7a6f4db docs: update walkthrough for final 400 Bad Request r, 8161ee0 docs: update walkthrough for cleanup of Strapi and L [lang=en]
Community 9: renderView(, 0a8d211 feat(server): add scheduled auto-backup background w, 165b44d fix: make entire blog catalog cards and buttons clic, 16ee04a docs(plan): add implementation plan for backup syste, 241dc91 docs: update walkthrough for home blog link navigati, 3b9e154 fix: resolve query string routing bug in server.js s, 452ac9f docs: update walkthrough for blog query parameter ro, 8cd8d91 docs: update walkthrough for blog post navigation fi, 9cb9cbc fix: resolve navigation conflict on home blog cards , ad996eb docs(spec): add backup system design specification, cb439bf feat(seo & security): add SEO metadata, robots.txt, , d46f078 fix: resolve 502 Bad Gateway by adding multi-method  [lang=en]
Community 10: WysiwygEditor, .constructor(, .getContent(, .handleImageFile(, .render( [lang=en]
Community 11: SakuraPetal, .constructor(, .draw(, .reset(, .update( [lang=en]

## Instructions

Write a single JSON object mapping each community id (as a string) to its
2-5 word name to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\label-instructions\communities.json

Example:
```json
{
  "0": "Authentication Flow",
  "1": "Authentication Flow",
  "2": "Authentication Flow"
}
```

Then re-run `graphify update` (or `graphify label`) to ingest the names.
