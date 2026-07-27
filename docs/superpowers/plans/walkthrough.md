# Walkthrough: Admin Backend, CMS & User Management

## Cambios Realizados

### 1. Capa Adaptadora de Datos (`DatabaseService`)
- [db-service.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/db-service.js): Singleton que abstrae el backend subyacente.
- [pocketbase-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/pocketbase-adapter.js): Integración con PocketBase API REST/Auth/Storage.
- [sqlite-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/sqlite-adapter.js): Emulador local en localStorage/SQLite para desarrollo sin servidor externo.

### 2. Procesamiento Multimedia y Conversión WebP
- [webp-converter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/utils/webp-converter.js): Módulo Canvas en cliente que convierte imágenes JPG/PNG automáticamente a formato `.webp` optimizado antes del upload.
- [youtube-embed.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/utils/youtube-embed.js): Extractor de ID y generador de contenedores `<iframe>` responsivos para videos de YouTube.

### 3. Dashboard Administrativo
- [admin.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/admin.html): Panel SPA en la ruta `/admin.html`.
- [admin.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/admin.js) y [admin.css](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/admin.css): Autenticación JWT / control de sesiones y ruteo de pestañas.
- **Control de Secciones y Menú**: [sections-menu-manager.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/modules/sections-menu-manager.js).
- **Control de Opciones GPU**: [gpu-config-manager.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/modules/gpu-config-manager.js).
- **Editor WYSIWYG & Blog CMS**: [wysiwyg-editor.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/components/wysiwyg-editor.js) y [blog-cms-manager.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/modules/blog-cms-manager.js).
- **Gestión de Usuarios**: [user-manager.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/modules/user-manager.js).

### 4. Integración Pública y Sección Blog
- [script.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/script.js): Actualizado para ocultar/mostrar secciones dinámicamente según configuración guardada en DB.
- [blog.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/blog.html) y [blog.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/public/blog.js): Página pública para renderizar artículos del blog con imágenes WebP y reproductores YouTube.

---

## Verificación Realizada

- **Compilación de producción (`vite build`)**: Ejecutada exitosamente sin errores, generando bundle optimizado para todas las páginas (`index.html`, `gpu.html`, `admin.html`, `blog.html`).
