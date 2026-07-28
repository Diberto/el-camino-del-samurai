# Especificación de Diseño: Sistema de Respaldos Integrales y Programados

**Proyecto:** El Camino del Samurai  
**Fecha:** 28 de Julio, 2026  
**Módulo:** Admin Panel CMS / Sistema de Respaldos (`backup-manager.js`)  
**Estado:** Aprobado

---

## 1. Visión General

El **Sistema de Respaldos Integrales** permite realizar copias de seguridad de todo el contenido del sitio (artículos del blog, galería de medios, imágenes de portada, configuración de secciones, opciones GPU y usuarios) en un archivo `.zip` comprimido y autosuficiente.

El sistema contempla:
- Respaldos manuales a demanda.
- Respaldos automáticos programados (Diario, Semanal, Mensual).
- Descarga directa de archivos de respaldo a la computadora local.
- Restauración completa desde respaldos existentes o subiendo un archivo `.zip` externo.
- Gestión de retención de archivos para prevenir el llenado del almacenamiento en disco.

---

## 2. Arquitectura y Componentes

### 2.1 Backend / API Proxy (`server.js` + PocketBase `/api/backups`)
- **API Endpoints Proxy**:
  - `GET /api/backups`: Lista los archivos de respaldo almacenados en el servidor.
  - `POST /api/backups`: Crea un nuevo respaldo `.zip` con marca de tiempo.
  - `GET /api/backups/:key`: Descarga el archivo de respaldo especificado.
  - `POST /api/backups/upload`: Permite subir un archivo `.zip` para restauración.
  - `POST /api/backups/:key/restore`: Ejecuta la restauración de la base de datos y archivos multimedia.
  - `DELETE /api/backups/:key`: Elimina un archivo de respaldo.

- **Programador de Tareas (Cron Service en `server.js`)**:
  - Tarea periódica de fondo en Node.js que consulta la configuración de respaldo guardada en `settings`.
  - Si el intervalo programado se ha cumplido (ej: cada 24 horas, cada 7 días, cada 30 días), invoca automáticamente la creación de un nuevo respaldo.
  - Aplica la política de retención configurada (ej. mantener los últimos 10 respaldos y eliminar los anteriores).

### 2.2 Capa de Adaptador y Datos (`PocketBaseAdapter` & `db-service.js`)
- Nuevos métodos expuestos en `dbService`:
  - `getBackups()`
  - `createBackup()`
  - `downloadBackupUrl(key)`
  - `restoreBackup(key)`
  - `uploadAndRestoreBackup(file)`
  - `deleteBackup(key)`
  - `getBackupSettings()` / `saveBackupSettings(config)`

### 2.3 Interfaz de Usuario (Módulo Admin `backup-manager.js` + Tab `💾 Respaldos`)
- **Pestaña `💾 Respaldos` en `admin.html`**:
  1. **Sección Respaldo Manual**: Botón con indicador visual de carga durante el empaquetado.
  2. **Sección Configuración Automática**:
     - Frecuencia: `Desactivado`, `Diario (24h)`, `Semanal (7d)`, `Mensual (30d)`.
     - Retención máxima: `5`, `10`, `20` archivos.
     - Indicador del próximo respaldo programado.
  3. **Historial de Respaldos (Tabla)**:
     - Nombre del archivo, Fecha/Hora de creación, Tamaño en MB.
     - Botones de acción por fila: **Descargar**, **Restaurar** (con modal de confirmación), **Eliminar**.
  4. **Zona Drag & Drop (Restauración Externa)**:
     - Formulario de subida de archivo `.zip` para restaurar en una instalación limpia.

---

## 3. Flujo de Datos y Manejo de Errores

1. **Creación de Respaldo**:
   - El cliente envía la solicitud → PocketBase empaqueta `pb_data/data.db` y `pb_data/storage/` en `pb_data/backups/pb_backup_TIMESTAMP.zip`.
   - Se emite una notificación de actualización a través de `sync-service.js`.

2. **Restauración**:
   - Antes de restaurar, el sistema advierte al usuario que la sesión puede reiniciarse para aplicar los cambios en caliente de la base de datos.
   - En caso de error de red o archivo corrupto, el adaptador revierte al estado previo y muestra un mensaje de alerta.

---

## 4. Plan de Verificación

1. **Prueba de Respaldo Manual**:
   - Generar un respaldo `.zip` desde el botón del Admin Panel y verificar que aparezca en el historial con el tamaño correcto.
2. **Prueba de Descarga**:
   - Descargar el `.zip` a la computadora y verificar su estructura comprimida.
3. **Prueba de Restauración**:
   - Crear un post de prueba, ejecutar una restauración desde el respaldo previo y comprobar que la base de datos vuelve al estado original.
4. **Prueba de Programador Automático**:
   - Probar la ejecución de tarea periódica en `server.js`.
