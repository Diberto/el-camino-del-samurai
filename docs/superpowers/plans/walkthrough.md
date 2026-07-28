# Walkthrough: Solución Definitiva a la Navegación de Artículos desde la Página Principal (Home)

## Diagnóstico y Causa Raíz
En la página de inicio (`index.html`), las tarjetas de los artículos tenían una directiva atributiva inline `onclick="window.location.href='...'"` y a la vez un enlace HTML hijo `<a href="...">`. 

Al hacer clic, el navegador ejecutaba simultáneamente la navegación del enlace y la del evento padre `onclick`, cancelando la navegación y provocando que la página de inicio se recargara a sí misma sin ingresar al artículo.

---

## Solución Aplicada ([script.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/script.js))

1. **Estructura Estándar de Enlaces Nativos**:
   - Se removió la directiva redundante `onclick`.
   - Se estructuraron los enlaces tanto en la imagen, el título como en el botón principal como etiquetas HTML limpias `<a href="blog.html?post=...">`.
   - Al hacer clic en cualquier parte de la tarjeta o botón en la página principal, el navegador navega directamente a la lectura completa del artículo en `blog.html?post=...`.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada con 0 errores.
- **Sincronización Git**: Commit `9cb9cbc` publicado en `origin/master`.
