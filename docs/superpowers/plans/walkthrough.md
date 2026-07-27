# Walkthrough: Solución Definitiva de Rutas de Imágenes en Servidor

## Causa Raíz Identificada
- En las compilaciones estáticas de Vite, las imágenes en la carpeta `assets/` que son referenciadas mediante cadenas dinámicas (como las almacenadas en `localStorage` o base de datos) no recibían el sufijo de hash de Rollup (ej. `-BhFrtZ_t.webp`), provocando errores 404 (Not Found) al subirse a servidores estáticos de producción.

## Solución Aplicada
1. **Directorio Público Estático (`public/photos/`)**:
   - Se trasladaron y crearon copias limpias sin caracteres especiales de todas las fotografías a `public/photos/` (`photos/cueva_reigando.webp`, `photos/castillo_sengoku.webp`, `photos/jardin_zen.webp`, `photos/orpianesi1.webp`).
   - Vite emite el directorio `public/` intacto sin alteración de nombres ni hashes a `dist/photos/`.

2. **Actualización de la Base de Datos Local ([sqlite-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/sqlite-adapter.js))**:
   - Se actualizó la clave de almacenamiento local a `local_db_emulator_v4` para aplicar automáticamente las nuevas URLs estáticas `/photos/...` tanto en el blog como en la galería de medios.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Verificado `dist/photos/` conteniendo todas las imágenes servibles estáticamente.
- **Sincronización Git & Servidor**: Commit `5b744f6` publicado en `origin/master`.
