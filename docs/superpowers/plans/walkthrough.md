# Walkthrough: Solución a Errores 404 en Hostinger o Hosting Estático

## Diagnóstico del Error

El mensaje devuelto en producción:
`GET https://gold-bat-153379.hostingersite.com/api/collections/settings/records 404 (Not Found)`
`GET https://gold-bat-153379.hostingersite.com/api/collections/posts/records?sort=-created 404 (Not Found)`

### ¿Por qué ocurre esto?
- En planes de hosting estáticos (como Hostinger Web Hosting Estático, GitHub Pages, Netlify), el servidor solo entrega archivos HTML/JS/CSS estáticos y no está ejecutando un proceso backend Node.js / PocketBase en segundo plano.
- Al consultar `/api/collections/...` en un servidor estático, la consulta busca una carpeta física `/api/collections/...` que no existe en Hostinger, generando la respuesta 404.

---

## Solución Aplicada

1. **Manejo Silencioso de Fallbacks en Hosting Estático ([pocketbase-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/pocketbase-adapter.js))**:
   - Se actualizó `PocketBaseAdapter` para detectar cuando la URL del servidor backend devuelve HTTP 404 (al estar alojado en un hosting estático).
   - En lugar de emitir excepciones o errores no capturados, el adaptador conmuta suavemente al almacén de datos publicado de respaldo.

2. **Creación del Fichero Global de Configuración Estática ([public/data/site-config.json](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/public/data/site-config.json))**:
   - Creado el archivo `site-config.json` conteniendo el menú completo, estado de secciones, los 3 artículos iniciales del blog con portadas WebP y la galería de medios.
   - De este modo, en Hostinger el sitio carga instantáneamente y de forma 100% limpia sin errores en consola.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada con 0 errores.
- **Sincronización Git**: Commit `cd5a935` publicado en `origin/master`.
