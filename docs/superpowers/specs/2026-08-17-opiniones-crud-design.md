# Especificación de Diseño: Corrección de Visibilidad y CRUD de Opiniones

**Fecha**: 2026-08-17  
**Estado**: En Implementación  
**Proyecto**: La Ruta del Samurái (El Camino del Samurai)

---

## 1. Problemas a Resolver
1. **Corrección de Visibilidad de Texto en Modo Día/Noche**:
   - Las tarjetas `.testimonial-card` tenían fondos oscuros fijos mientras que el texto usaba `var(--text-primary)`, causando que el texto fuera negro sobre fondo oscuro en el Modo Día (`:root`).
   - Solución: Adaptar la sección, tarjetas, textos y botones para usar dinámicamente las variables de tema `--bg-card`, `--text-primary`, `--text-secondary` y `--border-color`.

2. **Gestión Completa de Opiniones (CRUD: Crear, Editar, Eliminar)**:
   - Permitir a los usuarios y administradores del sitio agregar sus propias opiniones, editar opiniones existentes o eliminar aquellas que no deseen.
   - Guardar todos los cambios de forma persistente en `localStorage`.

---

## 2. Componentes UI y Marcado HTML (`index.html`)

### 2.1 Botón de Agregar Opinión
Ubicado en el encabezado de la sección `#opiniones`:
```html
<button class="btn btn-primary btn-add-opinion" id="btn-open-opinion-modal">
    <span>+ Agregar mi Opinión</span>
</button>
```

### 2.2 Modal de Formulario (`#opinion-modal`)
Formulario emergente responsivo para crear/editar una opinión:
- **Campos**:
  - ID Oculto (`opinion-id`)
  - Nombre del lector (`opinion-name`)
  - Rol o Disciplina (`opinion-role`)
  - Calificación en estrellas (Selector visual de 1 a 5 estrellas) (`opinion-rating`)
  - Comentario / Reseña (`opinion-body`)
  - Foto de Perfil / URL (`opinion-avatar`)
  - Es Compra Verificada (`opinion-verified` - checkbox)
- Botones de acción: "Guardar Opinión" y "Cancelar".

### 2.3 Acciones en cada Tarjeta de Opinión
Cada tarjeta incluirá una barra de herramientas con dos botones:
```html
<div class="testimonial-actions">
    <button class="btn-action edit" data-id="1" aria-label="Editar opinión">✏️ Editar</button>
    <button class="btn-action delete" data-id="1" aria-label="Eliminar opinión">🗑️ Eliminar</button>
</div>
```

---

## 3. Lógica JavaScript (`script.js`)

Módulo `OpinionsManager`:
1. `loadOpinions()`: Lee desde `localStorage.getItem('samurai_opinions')` o usa las 4 opiniones iniciales.
2. `saveOpinions()`: Escribe las opiniones en `localStorage`.
3. `renderOpinions()`: Genera dinámicamente el HTML de las tarjetas en `#testimonials-track` y actualiza la paginación e inicialización de `initTestimonialsSlider()`.
4. `addOpinion(data)` / `editOpinion(id, data)` / `deleteOpinion(id)`: Operaciones CRUD con actualización instantánea de interfaz.

---

## 4. Estilos CSS (`styles.css`)
- Adaptación de colores con CSS variables `--bg-card`, `--text-primary`, `--text-secondary`.
- Estilos para `.btn-action.edit`, `.btn-action.delete` y el modal `#opinion-modal`.
