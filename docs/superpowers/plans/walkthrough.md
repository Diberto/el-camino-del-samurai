# Walkthrough: Solución Definitiva a Errores 400 (Bad Request)

## Causa Raíz
1. **Peticiones POST no deseadas durante lecturas (GET)**: `getSettings()`, `getPosts()`, `getMedia()` intentaban crear registros vía `POST` automáticamente al cargar la página si la colección no devolvía elementos. Esto generaba errores `400 Bad Request` en la consola si el usuario no estaba autenticado o si la colección estaba vacía.
2. **Sintaxis de Migraciones en PocketBase 0.22.x**: Las colecciones creadas mediante `new Collection({ schema: [...] })` requerían el uso explícito de `SchemaField` y `.schema.addField()` en las migraciones de JavaScript de PocketBase.

---

## Solución Aplicada

1. **Lectura Pura sin Efectos Secundarios ([pocketbase-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/pocketbase-adapter.js))**:
   - `getSettings()`, `getPosts()`, `getMedia()`, `getUsers()` ahora realizan **únicamente consultas `GET`**.
   - Si PocketBase no devuelve registros o está inicializándose, el adaptador responde inmediatamente con los datos por defecto desde memoria, sin ejecutar peticiones `POST`.
   - Las peticiones `POST` / `PATCH` solo se realizan cuando el administrador presiona expresamente "Guardar" en el panel.

2. **Corrección de Migraciones ([pb_migrations/1700000000_init_collections.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/pb_migrations/1700000000_init_collections.js))**:
   - Se actualizó el script de migración para utilizar `new SchemaField(...)` y `.schema.addField(...)`, asegurando que PocketBase registre correctamente todos los campos en `settings`, `posts`, `media` y `users`.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada con 0 errores.
- **Sincronización Git**: Commit `40ba44b` publicado en `origin/master`.
