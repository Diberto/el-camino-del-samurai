# Plan de Implementación: Optimización Integral de Arquitectura, Disco y Memoria

Este plan técnico detalla las tareas paso a paso para optimizar el rendimiento, almacenamiento en disco y uso de memoria RAM/CPU en todo el sitio web **El Camino del Samurai**, sin modificar ninguna funcionalidad existente.

---

## Revisión de Usuario Requerida

> [!NOTE]
> Las optimizaciones propuestas no rompen compatibilidad ni alteran ninguna funcionalidad visual o interactiva del sitio. El cambio principal en el cliente es pausar las animaciones 3D cuando la pestaña está en segundo plano o el canvas no es visible en pantalla, reduciendo el consumo de batería y CPU a cero durante ese intervalo.

---

## Cambios Propuestos

### 1. Servidor Node.js (`server.js`)

#### [MODIFY] [server.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/server.js)
- Importar módulo nativo `zlib`.
- Añadir middleware de compresión Gzip / Deflate para solicitudes estáticas y API.
- Configurar cabeceras de almacenamiento en caché para activos estáticos (`Cache-Control: public, max-age=31536000, immutable`).

---

### 2. Capa de Animación & Frontend (`script.js`, `gpu-panel.js`)

#### [MODIFY] [script.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/script.js)
- Implementar listener `visibilitychange` para pausar bucles `requestAnimationFrame` cuando `document.hidden === true`.
- Implementar `IntersectionObserver` para pausar animaciones Canvas cuando no estén visibles en la pantalla.

#### [MODIFY] [gpu-panel.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/gpu-panel.js)
- Optimizar eventos de actualización del canvas GPU para evitar renders innecesarios cuando no se está interactuando con los controles.

---

### 3. Base de Datos & Proceso Daemon (`scripts/start-pocketbase.js`)

#### [MODIFY] [start-pocketbase.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/scripts/start-pocketbase.js)
- Configurar parámetros de PocketBase/SQLite para limitar el tamaño de caché en memoria RAM.

---

### 4. Assets & Carga Diferida (`index.html`, `blog.html`)

#### [MODIFY] [index.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/index.html)
#### [MODIFY] [blog.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/blog.html)
- Añadir `loading="lazy"` y `decoding="async"` en todas las imágenes.

---

## Plan de Verificación

### Pruebas Automatizadas & Build
- `node node_modules/vite/bin/vite.js build`: Verificar que Vite compile el bundle de producción correctamente.
- Medición de tamaño con Gzip en dist.

### Verificación Manual
1. **Comprobación de Compresión Gzip**:
   - Probar `curl -I -H "Accept-Encoding: gzip" http://localhost:3000/` y verificar cabecera `Content-Encoding: gzip`.
2. **Comprobación de Pausa en Pestaña Oculta**:
   - Abrir el panel de rendimiento en DevTools, cambiar a otra pestaña y confirmar que el uso de CPU desciende a 0%.
3. **Verificación Funcional**:
   - Confirmar que el Libro 3D, Partículas Sakura, Oráculo, Blog y Panel de Control Admin continúen funcionando al 100%.
