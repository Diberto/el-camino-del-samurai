# Node Description Batch 9 of 10

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

- "server_getsafebackupfilename": "getSafeBackupFilename()" | kind=code-symbol | source=server.js:L551 | neighbors=[server.js]
- "server_mime_types": "MIME_TYPES" | kind=code-symbol | source=server.js:L26 | neighbors=[server.js]
- "server_pbprocess": "pbProcess" | kind=code-symbol | source=server.js:L19 | neighbors=[server.js]
- "server_pbscript": "pbScript" | kind=code-symbol | source=server.js:L18 | neighbors=[server.js]
- "server_performbackupcreation": "performBackupCreation()" | kind=code-symbol | source=server.js:L382 | neighbors=[server.js]
- "server_public_dir": "PUBLIC_DIR" | kind=code-symbol | source=server.js:L14 | neighbors=[server.js]
- "server_security_headers": "SECURITY_HEADERS" | kind=code-symbol | source=server.js:L40 | neighbors=[server.js]
- "server_servedynamicsitemap": "serveDynamicSitemap()" | kind=code-symbol | source=server.js:L411 | neighbors=[server.js]
- "server_server": "server" | kind=code-symbol | source=server.js:L67 | neighbors=[server.js]
- "server_servestaticfile": "serveStaticFile()" | kind=code-symbol | source=server.js:L301 | neighbors=[server.js]
- "server_startautobackupworker": "startAutoBackupWorker()" | kind=code-symbol | source=server.js:L467 | neighbors=[server.js]
- "server_startlistening": "startListening()" | kind=code-symbol | source=server.js:L527 | neighbors=[server.js]
- "server_system_logs": "SYSTEM_LOGS" | kind=code-symbol | source=server.js:L48 | neighbors=[server.js]
- "server_verifyauthtoken": "verifyAuthToken()" | kind=code-symbol | source=server.js:L560 | neighbors=[server.js]
- "services_db_service_databaseservice_constructor": ".constructor()" | kind=code-symbol | source=src/services/db-service.js:L5 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_createbackup": ".createBackup()" | kind=code-symbol | source=src/services/db-service.js:L30 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_deletebackup": ".deleteBackup()" | kind=code-symbol | source=src/services/db-service.js:L32 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_deletemedia": ".deleteMedia()" | kind=code-symbol | source=src/services/db-service.js:L22 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_deleteopinion": ".deleteOpinion()" | kind=code-symbol | source=src/services/db-service.js:L28 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_deletepost": ".deletePost()" | kind=code-symbol | source=src/services/db-service.js:L19 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getbackups": ".getBackups()" | kind=code-symbol | source=src/services/db-service.js:L29 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getcurrentuser": ".getCurrentUser()" | kind=code-symbol | source=src/services/db-service.js:L14 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getdownloadbackupurl": ".getDownloadBackupUrl()" | kind=code-symbol | source=src/services/db-service.js:L34 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getmedia": ".getMedia()" | kind=code-symbol | source=src/services/db-service.js:L20 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getopinions": ".getOpinions()" | kind=code-symbol | source=src/services/db-service.js:L26 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getposts": ".getPosts()" | kind=code-symbol | source=src/services/db-service.js:L17 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getprovider": ".getProvider()" | kind=code-symbol | source=src/services/db-service.js:L9 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getsettings": ".getSettings()" | kind=code-symbol | source=src/services/db-service.js:L15 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getsystemdiagnostics": ".getSystemDiagnostics()" | kind=code-symbol | source=src/services/db-service.js:L35 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_getusers": ".getUsers()" | kind=code-symbol | source=src/services/db-service.js:L23 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_login": ".login()" | kind=code-symbol | source=src/services/db-service.js:L12 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_logout": ".logout()" | kind=code-symbol | source=src/services/db-service.js:L13 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_restorebackup": ".restoreBackup()" | kind=code-symbol | source=src/services/db-service.js:L31 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_saveopinion": ".saveOpinion()" | kind=code-symbol | source=src/services/db-service.js:L27 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_savepost": ".savePost()" | kind=code-symbol | source=src/services/db-service.js:L18 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_savesettings": ".saveSettings()" | kind=code-symbol | source=src/services/db-service.js:L16 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_saveuser": ".saveUser()" | kind=code-symbol | source=src/services/db-service.js:L24 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_setprovider": ".setProvider()" | kind=code-symbol | source=src/services/db-service.js:L10 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_updatemedia": ".updateMedia()" | kind=code-symbol | source=src/services/db-service.js:L21 | neighbors=[DatabaseService]
- "services_db_service_databaseservice_uploadbackup": ".uploadBackup()" | kind=code-symbol | source=src/services/db-service.js:L33 | neighbors=[DatabaseService]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-008.json

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
