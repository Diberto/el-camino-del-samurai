# Node Description Batch 10 of 10

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

- "services_db_service_databaseservice_uploadmedia": ".uploadMedia()" | kind=code-symbol | source=src/services/db-service.js:L25 | neighbors=[DatabaseService]
- "services_sync_service_syncservice_broadcast": ".broadcast()" | kind=code-symbol | source=src/services/sync-service.js:L12 | neighbors=[SyncService]
- "services_sync_service_syncservice_constructor": ".constructor()" | kind=code-symbol | source=src/services/sync-service.js:L3 | neighbors=[SyncService]
- "services_sync_service_syncservice_subscribe": ".subscribe()" | kind=code-symbol | source=src/services/sync-service.js:L20 | neighbors=[SyncService]
- "vite_config_configureserver": "configureServer()" | kind=code-symbol | source=vite.config.js:L21 | neighbors=[vite.config.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-009.json

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
