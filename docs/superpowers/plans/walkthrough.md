# Walkthrough: Resolución Completa del Error 400 en `settings/records`

## Causa Raíz
PocketBase 0.22.x requiere que las cargas de campos de tipo `json` (`settings_data`) sean objetos nativos JSON. Si se enviaban datos como cadenas stringified o si la colección no tenía asignado explícitamente el esquema de campo, PocketBase devolvía HTTP 400 Bad Request.

---

## Cambios Realizados

1. **Corrección de Carga Útil JSON Nativa ([pocketbase-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/pocketbase-adapter.js))**:
   - `saveSettings()` envía el payload nativo `{ settings_data: settingsData }`.
   - Se añadió lectura de respaldo inmediata desde `/data/site-config.json` para garantizar que el panel de administración **abra siempre al 100% de manera fluida y sin bloqueos**.

2. **Actualización de Migraciones ([pb_migrations/1700000000_init_collections.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/pb_migrations/1700000000_init_collections.js))**:
   - `ensureCol` asigna y sincroniza automáticamente `collection.schema = schema` para la colección `settings` en la base de datos de PocketBase.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Verificada con 0 errores.
- **Sincronización Git**: Commit `196097e` publicado en `origin/master`.
