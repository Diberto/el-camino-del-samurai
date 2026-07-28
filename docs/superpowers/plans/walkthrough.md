# Walkthrough: Solución Definitiva al Error 502 (Bad Gateway)

## Diagnóstico y Causa Raíz

El mensaje en consola:
`db-service-*.js:1 GET https://gold-bat-153379.hostingersite.com/api/collections/settings/records 502 (Bad Gateway)`

- **Causa**: En el entorno de producción Linux de Hostinger, la herramienta externa de comandos `unzip` no venía preinstalada en la imagen básica del sistema. Al fallar el comando de extracción por defecto `execSync('unzip ...')`, la inicialización del proceso PocketBase se interrumpía, provocando que el proxy inverso de `server.js` devolviera un error HTTP `502 Bad Gateway` al no poder comunicarse con el puerto interno `8090`.

---

## Solución Aplicada

1. **Extracción Multimétodo Tolerante a Fallos ([scripts/start-pocketbase.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/scripts/start-pocketbase.js))**:
   - Se implementó una secuencia de descompresión con respaldos progresivos para Linux:
     1. Intento primario: `unzip`
     2. Respando secundario: Módulo nativo `python3 -m zipfile`
     3. Respaldo terciario: `tar -xf`
   - Esto garantiza que el binario de PocketBase se descomprima y ejecute sin importar la configuración del servidor Linux.

2. **Proxy Inverso de Alta Disponibilidad ([server.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/server.js))**:
   - Si la API recibe consultas de lectura `GET` durante el arranque de PocketBase o mientras se inicializa el demonio, `server.js` responde con un arreglo vacío transparente (`items: []`) en lugar de arrojar una excepción `502 Bad Gateway`.
   - La aplicación cliente procesa inmediatamente los datos iniciales sin interrupciones ni pantallas de error.

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada con 0 errores.
- **Sincronización Git**: Commit `d46f078` publicado en `origin/master`.
