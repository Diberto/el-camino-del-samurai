# Walkthrough: Editor WYSIWYG Modernizado, Duplicación de Posts y Corrección de Ruteo Admin

## Cambios Realizados

### 1. Solución de Acceso al Admin (`vite.config.js` & `index.html`)
- [vite.config.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/vite.config.js): Añadido plugin middleware de reescritura HTML para que acceder tanto a `/admin` como a `/admin.html`, `/blog` y `/gpu` funcione de forma transparente en el servidor de desarrollo Vite y en producción.
- [index.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/index.html): Añadido enlace directo `⚔️ Panel Admin` en el pie de página.

### 2. UI WYSIWYG Rediseñada ([wysiwyg-editor.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/components/wysiwyg-editor.js))
- Barra de herramientas con estética Samurai (selector H1-H4/párrafo/blockquote, formatos B/I/U/S, alineaciones, listas, enlaces y YouTube embed tool).
- **Drag & Drop Zona**: Arrastra imágenes PNG/JPG directamente al editor para convertirlas automáticamente a `.webp` en tiempo real.

### 3. Función "📋 Duplicar Artículo" ([blog-cms-manager.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/modules/blog-cms-manager.js))
- Añadido botón **📋 Duplicar** en la tabla de artículos del blog. Clona inmediatamente el post seleccionado asignando estado *Borrador*, título `(Copia)` y nueva marca de tiempo.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada limpiamente construyendo sin errores todos los módulos y asset chunks (`dist/index.html`, `dist/admin.html`, `dist/blog.html`, `dist/gpu.html`).
