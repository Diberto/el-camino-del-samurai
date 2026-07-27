# Walkthrough: Integración de Strapi Headless CMS y Selector de Proveedor

## Cambios Realizados

### 1. Adaptador de Strapi (`StrapiAdapter`)
- [strapi-adapter.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/adapters/strapi-adapter.js): Creado adaptador completo compatible con las APIs REST de Strapi v4/v5 (`/api/auth/local`, `/api/posts`, `/api/upload`, `/api/users`).

### 2. Fábrica de Servicios de Base de Datos (`DatabaseService`)
- [db-service.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/services/db-service.js): Registrado `StrapiAdapter` como proveedor disponible junto a PocketBase y SQLite Local.

### 3. Selector de Proveedor Backend en el Admin (`admin.html`)
- [admin.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/admin.html) & [admin.js](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/src/admin/admin.js): Añadido un desplegable interactivo en la barra lateral para alternar dinámicamente el backend activo en tiempo real (**SQLite Local / Emulator**, **Strapi Headless CMS**, o **PocketBase**).

---

## Verificación

- **Compilación de Producción (`vite build`)**: Ejecutada exitosamente con `cmd.exe /c "npm run build"`, construyendo sin errores todos los módulos.
