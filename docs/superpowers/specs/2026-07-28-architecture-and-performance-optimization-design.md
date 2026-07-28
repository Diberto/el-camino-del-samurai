# Especificación de Diseño: Optimización Integral de Arquitectura, Disco y Memoria

Este documento define la arquitectura y el plan técnico para optimizar el rendimiento global del sitio web **El Camino del Samurai**, reduciendo el tamaño en disco, la latencia de transferencia de datos por red y el consumo de memoria RAM/CPU tanto en el cliente (navegador) como en el servidor (Node.js & PocketBase), **sin alterar ni perder ninguna funcionalidad existente**.

---

## 1. Visión General y Objetivos

### Objetivos Principales:
1. **Reducción de RAM/CPU en Cliente**: Pausar bucles de animación 3D (`requestAnimationFrame`) y Canvas cuando la pestaña está inactiva (`document.hidden`) o fuera de la pantalla.
2. **Carga Perezosa de Módulos (Lazy Loading)**: Diferir la importación de scripts pesados (Libro 3D, Partículas Sakura, Oráculo) hasta que el usuario los necesite o se renderice el viewport.
3. **Compresión HTTP Nivel Servidor (Gzip / Brotli)**: Implementar compresión al vuelo mediante el módulo nativo `zlib` de Node.js en `server.js` para reducir la transferencia de activos estáticos en un ~70%.
4. **Tuning de Memoria en SQLite / PocketBase**: Configurar PRAGMAs en la base de datos para mantener la huella de memoria RAM de PocketBase por debajo de 20 MB.
5. **Optimización de Assets**: Configurar carga diferida nativa (`loading="lazy"` / `decoding="async"`) y cabeceras de caché estática inmutable para activos empaquetados.

---

## 2. Arquitectura de Componentes Optimizada

```
                                  ┌────────────────────────┐
                                  │      Cliente Web       │
                                  │ (Navegador / Browser)  │
                                  └───────────┬────────────┘
                                              │
                                   Solicitud HTTP (Gzip/Brotli)
                                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Servidor Node.js (server.js - Puerto 3000)                                              │
│  ├── Compresión zlib nativa (Gzip / Deflate)                                           │
│  ├── Manejador Proxy REST & Estáticos con Cache-Control                                │
│  └── Worker Ligero de Respaldos Programados                                             │
└─────────────────────────────┬──────────────────────────────────────────────────────────┘
                              │ Proxy HTTP (Loopback 127.0.0.1)
                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PocketBase Daemon (Puerto 8090)                                                       │
│  └── SQLite Engine con Tuning de Memoria (PRAGMA cache_size = -2000, mmap_size = 256MB)│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detalle por Componente

### 3.1. Frontend & Gestión de Memoria Canvas (`script.js`, `gpu-panel.js`)
* **Ciclo de Vida de Animación con Event Listener `visibilitychange`**:
  - Escuchar cambios en `document.hidden`. Si la pestaña no está visible, congelar los bucles `requestAnimationFrame` del Canvas 3D de libro, campo de estrellas y partículas Sakura.
  - Al volver a enfocar la pestaña, reactivar suavemente los renderers.
* **Observer de Viewport (`IntersectionObserver`)**:
  - Pausar animaciones intensivas en GPU cuando el elemento `<canvas>` se desplaza fuera de la pantalla.

### 3.2. Servidor Node.js con Compresión Nativa (`server.js`)
* **Integración del Módulo `zlib` de Node**:
  - Detectar el encabezado `Accept-Encoding: gzip, deflate`.
  - Aplicar `zlib.createGzip()` o `zlib.createDeflate()` en la respuesta para archivos `.html`, `.js`, `.css`, `.json` y `.xml`.
  - Añadir cabeceras HTTP de caché inmutable `Cache-Control: public, max-age=31536000, immutable` para la carpeta `dist/assets/`.

### 3.3. Tuning de Base de Datos SQLite / PocketBase (`scripts/start-pocketbase.js`)
* Pasar opciones de ejecución a PocketBase para limitar el caché de páginas de SQLite en memoria:
  - `PRAGMA cache_size = -2000;` (cap a ~2 MB de memoria caché por conexión).
  - `PRAGMA temp_store = MEMORY;`
  - `PRAGMA journal_mode = WAL;` (optimiza lecturas simultáneas).

### 3.4. Assets & HTML (`index.html`, `blog.html`, `gpu.html`, `admin.html`)
* Asegurar que todas las etiquetas `<img>` incluyan `loading="lazy"` y `decoding="async"`.

---

## 4. Plan de Verificación

1. **Prueba de Compresión HTTP**:
   - Verificar mediante `curl -I -H "Accept-Encoding: gzip" http://localhost:3000/` que la cabecera `Content-Encoding: gzip` esté presente en las respuestas.
2. **Prueba de Memoria RAM / CPU en Navegador**:
   - Abrir DevTools -> pestaña *Performance* / *Memory*. Alternar entre pestañas y confirmar que los frames por segundo y uso de CPU caen a 0% cuando la pestaña está oculta.
3. **Prueba de Build y Compilación**:
   - Ejecutar `node node_modules/vite/bin/vite.js build` para validar que el empaquetado sea correcto.
4. **Verificación de Funcionalidad**:
   - Probar Oráculo, 3D Book, Panel Admin, Blog y Galería GPU para asegurar 100% de funcionamiento.
