# Walkthrough: Solución Definitiva de Autoprovisionamiento y Saneamiento de Cargas PocketBase

## Diagnóstico
1. **Autenticación `users/auth-with-password` devolvía 400**: El usuario `admin@samurai.com` no existía formalmente en la colección `users` de PocketBase. Al intentar autenticarse sin registrar el usuario previamente, PocketBase devolvía HTTP 400 (Fallo de Autenticación).
2. **Cargas de `savePost` devolvían 400**: La estructura enviada a `posts/records` incluía campos no registrados en el esquema (como `created_at` o IDs de plantilla `default-post-1`), provocando que PocketBase rechazara la creación del registro.

---

## Solución Aplicada ([pocketbase-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/pocketbase-adapter.js))

1. **Autoprovisionamiento del Usuario Admin**:
   - En `login()`, si el usuario intenta ingresar con `admin@samurai.com` / `admin123` y el registro no existe en PocketBase, el adaptador crea automáticamente el usuario `admin@samurai.com` en PocketBase vía API de registro (`/api/collections/users/records`), permitiendo autenticaciones directas futuras sin error.

2. **Saneamiento Estricto del Payload de Artículos (`savePost`)**:
   - Se filtraron los datos enviados en `savePost()` para incluir únicamente los campos reconocidos por el esquema de PocketBase (`title`, `slug`, `excerpt`, `content`, `cover_image`, `status`, `author`).
   - Se removió cualquier campo no registrado o ID temporal (`default-post-*`).

---

## Verificación

- **Compilación de Producción (`vite build`)**: Verificada con 0 errores.
- **Sincronización Git**: Commit `8a1ce7e` publicado en `origin/master`.
