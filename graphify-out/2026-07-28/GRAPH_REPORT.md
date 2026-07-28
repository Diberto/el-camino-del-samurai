# Graph Report - el-camino-del-samurai  (2026-07-28)

## Corpus Check
- 37 files · ~326,743 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 267 nodes · 336 edges · 27 communities (19 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `469434d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin.js
- PocketBaseAdapter
- DatabaseService
- script.js
- package.json
- gpu-panel.js
- start-pocketbase.js
- server.js
- wysiwyg-editor.js
- GpuConfigEngine
- blog.js
- install-service.sh
- Optimización SEO (Search Engine Optimization) y Posicionamiento Web
- Especificación de Diseño: Sistema de Respaldos Integrales y Programados
- 2. Key Architecture & Components
- El Camino Del Samurai: Unified Node App (`server.js`) Spec
- Global Constraints
- Global Constraints
- Unified Node App (`server.js`) Integration Plan
- Walkthrough: Solución Definitiva al Enrutamiento de URLs con Parámetros (`blog.html?post=...`)
- Subagent Progress Ledger: Animated Day/Night Sky
- graphify.md
- graphify.md
- Cambios Propuestos
- 3. Detalle por Componente

## God Nodes (most connected - your core abstractions)
1. `PocketBaseAdapter` - 23 edges
2. `DatabaseService` - 23 edges
3. `dbService` - 11 edges
4. `GpuConfigEngine` - 10 edges
5. `SyncService` - 9 edges
6. `loadModules()` - 8 edges
7. `Optimización SEO (Search Engine Optimization) y Posicionamiento Web` - 7 edges
8. `scripts` - 6 edges
9. `WysiwygEditor` - 6 edges
10. `SakuraPetal` - 5 edges

## Surprising Connections (you probably didn't know these)
- `loadModules()` --calls--> `initBackupManager()`  [EXTRACTED]
  src/admin/admin.js → src/admin/modules/backup-manager.js
- `loadModules()` --calls--> `initBlogManager()`  [EXTRACTED]
  src/admin/admin.js → src/admin/modules/blog-cms-manager.js
- `loadModules()` --calls--> `initGpuManager()`  [EXTRACTED]
  src/admin/admin.js → src/admin/modules/gpu-config-manager.js
- `loadModules()` --calls--> `initMediaManager()`  [EXTRACTED]
  src/admin/admin.js → src/admin/modules/media-manager.js
- `loadModules()` --calls--> `initSectionsManager()`  [EXTRACTED]
  src/admin/admin.js → src/admin/modules/sections-menu-manager.js

## Import Cycles
- None detected.

## Communities (27 total, 8 thin omitted)

### Community 0 - "admin.js"
Cohesion: 0.21
Nodes (12): checkAuth(), loadModules(), initBackupManager(), initBlogManager(), initGpuManager(), initMediaManager(), initSectionsManager(), SECTION_LABELS (+4 more)

### Community 4 - "package.json"
Cohesion: 0.13
Nodes (14): description, devDependencies, vite, main, name, scripts, build, dev (+6 more)

### Community 5 - "gpu-panel.js"
Cohesion: 0.21
Nodes (5): DEFAULT_PRESET, gpuConfig, applySkyGradients(), updatePresetDropdown(), updateUIFromConfig()

### Community 6 - "start-pocketbase.js"
Cohesion: 0.21
Nodes (11): binDir, binPath, dataDir, __dirname, downloadFile(), ensureBinary(), __filename, getDownloadUrl() (+3 more)

### Community 7 - "server.js"
Cohesion: 0.18
Nodes (10): __dirname, DIST_DIR, __filename, MIME_TYPES, pbProcess, pbScript, performBackupCreation(), PUBLIC_DIR (+2 more)

### Community 8 - "wysiwyg-editor.js"
Cohesion: 0.30
Nodes (4): WysiwygEditor, convertToWebP(), extractYouTubeId(), generateYouTubeEmbedHTML()

### Community 10 - "blog.js"
Cohesion: 0.67
Nodes (5): escapeHTML(), getTargetPostId(), renderCatalog(), renderSinglePost(), renderView()

### Community 14 - "Optimización SEO (Search Engine Optimization) y Posicionamiento Web"
Cohesion: 0.20
Nodes (9): 1. Meta Etiquetas y Títulos, 2. Meta Etiquetas para Redes Sociales (Open Graph & Twitter Cards), 3. Estructura Semántica HTML5 y Encabezados, 4. Datos Estructurados (Schema.org / JSON-LD), 5. Archivos Técnicos SEO (`sitemap.xml` & `robots.txt`), 6. Lista de Chequeo SEO (Audit Checklist), Ejemplo para un Artículo de Blog:, Ejemplo para un Libro / Sitio Web: (+1 more)

### Community 15 - "Especificación de Diseño: Sistema de Respaldos Integrales y Programados"
Cohesion: 0.22
Nodes (8): 1. Visión General, 2.1 Backend / API Proxy (`server.js` + PocketBase `/api/backups`), 2.2 Capa de Adaptador y Datos (`PocketBaseAdapter` & `db-service.js`), 2.3 Interfaz de Usuario (Módulo Admin `backup-manager.js` + Tab `💾 Respaldos`), 2. Arquitectura y Componentes, 3. Flujo de Datos y Manejo de Errores, 4. Plan de Verificación, Especificación de Diseño: Sistema de Respaldos Integrales y Programados

### Community 16 - "2. Key Architecture & Components"
Cohesion: 0.25
Nodes (7): 1. Overview, 2.1 HTML Structure (`index.html`), 2.2 CSS Design & Animation System (`styles.css`), 2.3 JavaScript Controller (`script.js`), 2. Key Architecture & Components, 3. Verification & Quality Gates, Technical Design Specification: Animated Day/Night Sky & Landscape System

### Community 17 - "El Camino Del Samurai: Unified Node App (`server.js`) Spec"
Cohesion: 0.25
Nodes (7): 1.1 Server Components & Execution Flow, 1. Unified Node App Server Specifications (`server.js`), 2.1 `package.json` Updates, 2. Package & Build Configuration, 3. Verification & Build Plan, El Camino Del Samurai: Unified Node App (`server.js`) Spec, Overview

### Community 18 - "Global Constraints"
Cohesion: 0.29
Nodes (6): Animated Day/Night Sky & Landscape Implementation Plan, Global Constraints, Task 1: HTML Markup for Sky Container & Theme Toggle Button, Task 2: CSS Styles for Sky Gradients, Cloud Drifting & Day/Night Transition, Task 3: JavaScript Theme Controller & Starfield Canvas Animation, Task 4: Final Verification & Production Build Audit

### Community 19 - "Global Constraints"
Cohesion: 0.29
Nodes (6): Global Constraints, Sistema de Respaldos Integrales Implementation Plan, Task 1: Reverse Proxy Endpoints and Storage Directory Support in `server.js`, Task 2: Backend Adapter Methods for Backup Operations in `PocketBaseAdapter` & `dbService`, Task 3: Automatic Scheduled Backup Cron Worker in `server.js`, Task 4: Admin UI Module `backup-manager.js` and Tab `💾 Respaldos` in `admin.html`

### Community 20 - "Unified Node App (`server.js`) Integration Plan"
Cohesion: 0.33
Nodes (5): Execution Handoff, Task 1: Create `server.js` Entry Point, Task 2: Update `PocketBaseAdapter` for Relative `/api` Proxy Pathing, Task 3: Verify Build & Test Unified Server, Unified Node App (`server.js`) Integration Plan

### Community 21 - "Walkthrough: Solución Definitiva al Enrutamiento de URLs con Parámetros (`blog.html?post=...`)"
Cohesion: 0.40
Nodes (4): Diagnóstico y Causa Raíz, Solución Aplicada ([server.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/server.js)), Verificación, Walkthrough: Solución Definitiva al Enrutamiento de URLs con Parámetros (`blog.html?post=...`)

### Community 25 - "Cambios Propuestos"
Cohesion: 0.12
Nodes (16): 1. Servidor Node.js (`server.js`), 2. Capa de Animación & Frontend (`script.js`, `gpu-panel.js`), 3. Base de Datos & Proceso Daemon (`scripts/start-pocketbase.js`), 4. Assets & Carga Diferida (`index.html`, `blog.html`), Cambios Propuestos, [MODIFY] [blog.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/blog.html), [MODIFY] [gpu-panel.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/gpu-panel.js), [MODIFY] [index.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/index.html) (+8 more)

### Community 26 - "3. Detalle por Componente"
Cohesion: 0.18
Nodes (10): 1. Visión General y Objetivos, 2. Arquitectura de Componentes Optimizada, 3.1. Frontend & Gestión de Memoria Canvas (`script.js`, `gpu-panel.js`), 3.2. Servidor Node.js con Compresión Nativa (`server.js`), 3.3. Tuning de Base de Datos SQLite / PocketBase (`scripts/start-pocketbase.js`), 3.4. Assets & HTML (`index.html`, `blog.html`, `gpu.html`, `admin.html`), 3. Detalle por Componente, 4. Plan de Verificación (+2 more)

## Knowledge Gaps
- **85 isolated node(s):** `name`, `version`, `description`, `type`, `main` (+80 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DatabaseService` connect `DatabaseService` to `admin.js`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `PocketBaseAdapter` connect `PocketBaseAdapter` to `admin.js`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `GpuConfigEngine` connect `GpuConfigEngine` to `gpu-panel.js`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _85 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PocketBaseAdapter` be split into smaller, more focused modules?**
  _Cohesion score 0.1422924901185771 - nodes in this community are weakly interconnected._
- **Should `DatabaseService` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `script.js` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._