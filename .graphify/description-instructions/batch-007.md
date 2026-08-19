# Node Description Batch 8 of 9

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

- "script_applygpuskycolors": "applyGpuSkyColors()" | kind=code-symbol | source=script.js:L185 | neighbors=[script.js]
- "script_handlescrolleffects": "handleScrollEffects()" | kind=code-symbol | source=script.js:L512 | neighbors=[script.js]
- "script_init3dbookengine": "init3DBookEngine()" | kind=code-symbol | source=script.js:L961 | neighbors=[script.js]
- "script_initdaynightcycle": "initDayNightCycle()" | kind=code-symbol | source=script.js:L137 | neighbors=[script.js]
- "script_initgallerylightbox": "initGalleryLightbox()" | kind=code-symbol | source=script.js:L1120 | neighbors=[script.js]
- "script_initopinionsmanager": "initOpinionsManager()" | kind=code-symbol | source=script.js:L1170 | neighbors=[script.js]
- "script_initstarfield": "initStarfield()" | kind=code-symbol | source=script.js:L368 | neighbors=[script.js]
- "script_inittestimonialsslider": "initTestimonialsSlider()" | kind=code-symbol | source=script.js:L1159 | neighbors=[script.js]
- "script_initvolumetricclouds": "initVolumetricClouds()" | kind=code-symbol | source=script.js:L200 | neighbors=[script.js]
- "script_renderhomeblogposts": "renderHomeBlogPosts()" | kind=code-symbol | source=script.js:L86 | neighbors=[script.js]
- "script_sakurapetal_draw": ".draw()" | kind=code-symbol | source=script.js:L778 | neighbors=[SakuraPetal]
- "scripts_start_pocketbase_bindir": "binDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L11 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_binpath": "binPath" | kind=code-symbol | source=scripts/start-pocketbase.js:L16 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_datadir": "dataDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L12 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_dirname": "__dirname" | kind=code-symbol | source=scripts/start-pocketbase.js:L9 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_filename": "__filename" | kind=code-symbol | source=scripts/start-pocketbase.js:L8 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_migrationsdir": "migrationsDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L13 | neighbors=[start-pocketbase.js]
- "scripts_start_pocketbase_rootdir": "rootDir" | kind=code-symbol | source=scripts/start-pocketbase.js:L10 | neighbors=[start-pocketbase.js]
- "server_dirname": "__dirname" | kind=code-symbol | source=server.js:L10 | neighbors=[server.js]
- "server_dist_dir": "DIST_DIR" | kind=code-symbol | source=server.js:L13 | neighbors=[server.js]
- "server_filename": "__filename" | kind=code-symbol | source=server.js:L9 | neighbors=[server.js]
- "server_getsafebackupfilename": "getSafeBackupFilename()" | kind=code-symbol | source=server.js:L408 | neighbors=[server.js]
- "server_mime_types": "MIME_TYPES" | kind=code-symbol | source=server.js:L26 | neighbors=[server.js]
- "server_pbprocess": "pbProcess" | kind=code-symbol | source=server.js:L19 | neighbors=[server.js]
- "server_pbscript": "pbScript" | kind=code-symbol | source=server.js:L18 | neighbors=[server.js]
- "server_performbackupcreation": "performBackupCreation()" | kind=code-symbol | source=server.js:L308 | neighbors=[server.js]
- "server_public_dir": "PUBLIC_DIR" | kind=code-symbol | source=server.js:L14 | neighbors=[server.js]
- "server_server": "server" | kind=code-symbol | source=server.js:L40 | neighbors=[server.js]
- "server_servestaticfile": "serveStaticFile()" | kind=code-symbol | source=server.js:L258 | neighbors=[server.js]
- "server_startautobackupworker": "startAutoBackupWorker()" | kind=code-symbol | source=server.js:L336 | neighbors=[server.js]
- "server_verifyauthtoken": "verifyAuthToken()" | kind=code-symbol | source=server.js:L417 | neighbors=[server.js]
- "services_db_service_databaseservice_constructor": ".constructor()" | kind=code-symbol | source=src/services/db-service.js:L5 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_createbackup": ".createBackup()" | kind=code-symbol | source=src/services/db-service.js:L26 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_deletebackup": ".deleteBackup()" | kind=code-symbol | source=src/services/db-service.js:L28 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_deletemedia": ".deleteMedia()" | kind=code-symbol | source=src/services/db-service.js:L21 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_deletepost": ".deletePost()" | kind=code-symbol | source=src/services/db-service.js:L19 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getbackups": ".getBackups()" | kind=code-symbol | source=src/services/db-service.js:L25 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getcurrentuser": ".getCurrentUser()" | kind=code-symbol | source=src/services/db-service.js:L14 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getdownloadbackupurl": ".getDownloadBackupUrl()" | kind=code-symbol | source=src/services/db-service.js:L30 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getmedia": ".getMedia()" | kind=code-symbol | source=src/services/db-service.js:L20 | neighbors=[DatabaseService]

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
