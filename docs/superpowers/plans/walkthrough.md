# Walkthrough: Solución Definitiva al Enrutamiento de URLs con Parámetros (`blog.html?post=...`)

## Diagnóstico y Causa Raíz
Al hacer clic en un artículo desde la página principal (`index.html`), el navegador enviaba la solicitud HTTP a `https://gold-bat-153379.hostingersite.com/blog.html?post=default-post-1`.

En `server.js`, el resolvedor de archivos estáticos tomaba la URL completa (`req.url`) incluyendo la cadena de consulta (`?post=default-post-1`) e intentaba buscar en el disco del servidor un archivo físicamente llamado `blog.html?post=default-post-1`. 
Al no existir en disco por contener los parámetros de consulta `?post=...`, la función arrojaba `ENOENT` y activaba el mecanismo de respaldo SPA enviando de vuelta `index.html` (el Home).

---

## Solución Aplicada ([server.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/server.js))

1. **Separación de Ruta y Parámetros de Consulta (Query String)**:
   - Se aisló la ruta limpia del archivo (`pathname = fullUrl.split('?')[0]`).
   - Ahora, al recibir `/blog.html?post=default-post-1`, el servidor identifica la ruta `/blog.html`, sirve inmediatamente la plantilla estática `dist/blog.html` con código de estado 200, y permite que JavaScript procese el parámetro `post=default-post-1`.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada con 0 errores.
- **Sincronización Git**: Commit `3b9e154` publicado en `origin/master`.
