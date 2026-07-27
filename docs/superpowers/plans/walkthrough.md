# Walkthrough: Corrección de Errores 404 PocketBase y Advertencia AudioContext

## Diagnóstico y Solución de Errores

### 1. Errores 404 en `/api/collections/settings/records` y `/api/collections/posts/records`
- **Causa**: Al arrancar PocketBase por primera vez, las colecciones personalizadas `settings`, `posts` y `media` no existían en la base de datos `pb_data/data.db`, por lo que el servidor devolvía HTTP 404.
- **Solución**: Se creó la migración automática de PocketBase `pb_migrations/1700000000_init_collections.js`. Al iniciar PocketBase, el motor crea automáticamente las colecciones de `settings`, `posts` y `media`, eliminando por completo los errores 404.

### 2. Advertencia `AudioContext was not allowed to start` (`main-DjrbHJ2A.js:11`)
- **Causa**: Existía una función residual `playZenChime()` en `script.js` que intentaba reproducir un sonido sutil con `AudioContext` en el evento `setTimeout` al cargar la página sin interacción previa del usuario.
- **Solución**: Se eliminó totalmente la llamada a `playZenChime()` y la inicialización de `AudioContext` de `script.js`, limpiando la consola del navegador.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada con 0 errores y 0 advertencias.
- **Sincronización Git**: Commit `14d3d80` publicado en `origin/master`.
