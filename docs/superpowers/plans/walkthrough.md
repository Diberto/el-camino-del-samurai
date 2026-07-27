# Walkthrough: Solución a Error 400 Bad Request en PocketBase (`settings/records`)

## Diagnóstico y Causa Raíz

El mensaje en consola:
`api/collections/settings/records:1 Failed to load resource: the server responded with a status of 400 ()`

- **Causa**: Al enviar un `POST` o `PATCH` a la colección `settings` de PocketBase, el validador del campo tipo `json` en PocketBase (`settings_data`) esperaba el cuerpo adecuadamente serializado en formato JSON string. Si recibía una estructura incompleta o no serializada en la inicialización inicial, PocketBase devolvía HTTP 400 (Bad Request).

---

## Solución Aplicada ([pocketbase-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/pocketbase-adapter.js))

1. **Serialización Segura de `settings_data`**:
   - Se formateó la carga útil enviada en `saveSettings()`:
     ```javascript
     const payload = { settings_data: typeof settingsData === 'object' ? JSON.stringify(settingsData) : settingsData };
     ```
   - Al leer los ajustes en `getSettings()`, el adaptador analiza de forma segura si la respuesta es un objeto JSON o una cadena JSON serializada (`JSON.parse`).

2. **Manejo Silencioso durante Inicializaciones de Colección**:
   - Se envolvieron las peticiones de autopoblado con `.catch(() => null)`, previniendo excepciones o bloqueos no capturados si la colección está en proceso de creación inicial.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Verificada con 0 errores.
- **Sincronización Git**: Commit `469316f` publicado en `origin/master`.
