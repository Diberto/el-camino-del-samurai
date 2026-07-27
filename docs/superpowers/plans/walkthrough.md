# Walkthrough: Blog Dinámico 3 Últimos en Home + Vista de Catálogo y Lectura Completa en `blog.html`

## Cambios Realizados

### 1. Widget Dinámico de los 3 Últimos Artículos ([script.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/script.js))
- En la sección `#blog` de la Landing Page ([index.html#blog](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/index.html#L649)), los artículos se filtran por estado *Publicado*, se ordenan dinámicamente por fecha descendente `created_at` y se renderizan los **3 últimos**.
- Cada tarjeta contiene enlace directo a `blog.html?post=ID`.

### 2. Router de 2 Vistas en `blog.html` ([blog.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/public/blog.js))
- **Vista de Catálogo Completo (`blog.html`)**:
  - Presenta el listado completo de todos los artículos publicados.
  - Incluye barra de búsqueda en tiempo real `🔍 Buscar por título o tema...`.
  - Botón **"Leer Artículo Completo →"** en cada tarjeta.
- **Vista de Lectura de Artículo Seleccionado (`blog.html?post=ID`)**:
  - Muestra la vista de lectura individual con botón de navegación **"← Volver al Catálogo de Artículos"**.
  - Visualización completa de imagen de portada en alta resolución, fecha, autor, contenido WYSIWYG formateado y botones de navegación hacia el *Artículo Anterior* / *Siguiente Artículo*.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada con éxito con `cmd.exe /c "npm run build"`, 0 errores.
- **Sincronización Git**: Commit `102b502` publicado exitosamente en `origin/master`.
