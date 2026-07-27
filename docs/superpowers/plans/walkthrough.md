# Walkthrough: Aplicación Node.js Unificada (`server.js`) para Despliegue en Hosting

## Cambios Realizados

### 1. Punto de Entrada Unificado Node.js ([server.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/server.js))
- Creado servidor web estático y proxy inverso en `server.js`.
- Inicia automáticamente PocketBase en segundo plano y redirige de forma transparente las peticiones `/api/*` y `/_/*`.
- Sirve los archivos estáticos de producción (`index.html`, `blog.html`, `admin.html`, `gpu.html`) en la puerta asignada por el proveedor de hosting (`process.env.PORT` o `3000`).

### 2. Configuración para Hosting ([package.json](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/package.json))
- Configurado `"start": "node server.js"` y `"main": "server.js"`.
- Al conectar tu repositorio de GitHub a cualquier hosting (cPanel Node.js, Render, Railway, Vercel, Plesk, VPS), el hosting ejecuta la aplicación sin requerir comandos ni configuraciones manuales adicionales.

### 3. Enrutamiento Relativo Transparente ([pocketbase-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/pocketbase-adapter.js))
- Actualizado `baseUrl` a `window.location.origin` para que las consultas API en cualquier dispositivo utilicen el mismo dominio y puerto de la aplicación Node.js sin bloqueos de CORS o localhost.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Verificada con 0 errores.
- **Sincronización Git**: Commit `28b5340` publicado en `origin/master`.
