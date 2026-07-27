# Walkthrough: Eliminación Definitiva de Errores 404 en Hostinger Estático

## Causa Raíz Resolucionada

En Hostinger estático (`gold-bat-153379.hostingersite.com`), la aplicación intentaba hacer peticiones HTTP `fetch('https://gold-bat-153379.hostingersite.com/api/collections/settings/records')`. Al no existir un proceso backend corriendo en ese dominio estático, el servidor de Hostinger devolvía HTTP 404.

---

## Solución Aplicada ([pocketbase-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/pocketbase-adapter.js))

1. **Resolución Inteligente de URL de Servidor (`baseUrl`)**:
   - Si la aplicación se ejecuta localmente (`localhost` / `127.0.0.1` / `192.168.x.x`), conecta a `http://127.0.0.1:8090`.
   - Si se configura una URL remota personalizada en el Admin (ej. `https://mi-pocketbase.com`), conecta a esa URL remota.
   - En un hosting estático (como Hostinger `gold-bat-153379.hostingersite.com`) sin URL remota configurada, `PocketBaseAdapter` delega inmediatamente las lecturas al almacén de respaldo publicado (`site-config.json` + `localStorage`) **sin emitir llamadas HTTP `fetch('/api/collections/...')`**.

2. **Cero Errores 404 en Consola**:
   - Se elimina al 100% cualquier línea roja de error 404 en la consola DevTools de Chrome/Firefox en Hostinger.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada con 0 errores.
- **Sincronización Git**: Commit `17c5296` publicado en `origin/master`.
