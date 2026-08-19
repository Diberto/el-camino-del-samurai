# Plan de Implementación: Corrección de Visibilidad y CRUD de Opiniones

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corregir el problema de visibilidad de texto en Modo Día/Noche e implementar la gestión completa CRUD (Crear, Editar, Eliminar) de opiniones con persistencia en `localStorage`.

**Architecture:** Modificación de estilos CSS para adaptarse a las variables de tema `:root` y `body.theme-night`, adición de un modal HTML reutilizable para el formulario de opiniones, y un módulo JavaScript de gestión de estado persistente en `localStorage`.

**Tech Stack:** HTML5, Vanilla CSS3 (Variables de Tema, Modal Glassmorphism), Vanilla JavaScript (ES6 Modules, LocalStorage, DOM Events).

## Global Constraints
- La visibilidad de texto debe ser 100% clara en Modo Día (`:root`) y Modo Noche (`body.theme-night`).
- El carousel debe re-calcular sus páginas y puntos dinámicamente al agregar, editar o borrar elementos.
- Los datos ingresados por el usuario deben persistir en `localStorage`.

---

### Task 1: Corrección de Estilos CSS e Interfaz del Modal y CRUD (`styles.css`)

**Files:**
- Modify: `styles.css` (Sección 10.5 `.opiniones-section` y estilos de modal)

- [ ] **Paso 1: Actualizar estilos de la tarjeta y texto para ser adaptables al tema Día/Noche**

En [styles.css](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/styles.css#L1758-L1880):
- Modificar `.opiniones-section` para usar `background-color: var(--bg-primary);`.
- Modificar `.testimonial-card` para usar `background: var(--bg-card);`, `border: 1px solid var(--border-color);`, `color: var(--text-primary);`.
- Modificar `.testimonial-name` para usar `color: var(--text-primary);`.
- Modificar `.testimonial-role` y `.testimonial-body` para usar `color: var(--text-secondary);`.
- Modificar `.slider-arrow` para usar `background: var(--bg-card);`, `color: var(--text-primary);`, `border: 1px solid var(--border-color);`.

- [ ] **Paso 2: Agregar estilos para los botones de acción Editar/Eliminar y el modal `#opinion-modal`**

```css
/* Botones CRUD en la tarjeta */
.testimonial-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border-color);
    justify-content: flex-end;
}

.btn-action {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-fast);
}

.btn-action.edit:hover {
    background: var(--accent-gold);
    color: var(--bg-primary);
    border-color: var(--accent-gold);
}

.btn-action.delete:hover {
    background: var(--accent-red);
    color: #fff;
    border-color: var(--accent-red);
}

/* Modal de Formulario de Opinión */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.modal-overlay.active {
    opacity: 1;
    pointer-events: auto;
}

.modal-card {
    background: var(--bg-primary);
    border: 1px solid var(--accent-gold);
    border-radius: 12px;
    padding: 32px;
    width: 90%;
    max-width: 520px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 12px;
}

.modal-title {
    font-family: var(--font-title);
    font-size: 1.3rem;
    color: var(--text-primary);
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
}

.form-group label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
}

.form-group input,
.form-group textarea,
.form-group select {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 10px 14px;
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.9rem;
}

.star-rating-select {
    display: flex;
    gap: 8px;
    font-size: 1.5rem;
    color: #f59e0b;
    cursor: pointer;
}
```

---

### Task 2: Marcado HTML del Modal de Opiniones y Botón de Creación (`index.html`)

**Files:**
- Modify: `index.html` (Cabecera de `#opiniones` y cuerpo antes de `</body>`)

- [ ] **Paso 1: Agregar el botón "+ Agregar mi Opinión" en `#opiniones`**

En la cabecera de la sección `section-header`:
```html
<div class="section-header text-center fade-in">
    <span class="section-subtitle">TESTIMONIOS DE LA COMUNIDAD</span>
    <h2 class="section-title">Lo que dicen los lectores</h2>
    <p class="section-desc">Experiencias y valoraciones de quienes se han adentrado en la historia, geografía y filosofía de las obras.</p>
    <button class="btn btn-primary btn-add-opinion" id="btn-open-opinion-modal" style="margin-top: 15px;">
        + Agregar mi Opinión
    </button>
</div>
```

- [ ] **Paso 2: Insertar el marcado del modal `#opinion-modal`**

Antes de `</body>`:
```html
<!-- Modal Formulario de Opiniones -->
<div class="modal-overlay" id="opinion-modal" aria-hidden="true">
    <div class="modal-card">
        <div class="modal-header">
            <h3 class="modal-title" id="opinion-modal-title">Agregar Opinión</h3>
            <button class="modal-close" id="btn-close-opinion-modal" aria-label="Cerrar">&times;</button>
        </div>
        <form id="opinion-form">
            <input type="hidden" id="opinion-id" value="">
            
            <div class="form-group">
                <label for="opinion-name">Tu Nombre *</label>
                <input type="text" id="opinion-name" required placeholder="Ej. Carlos Mendoza">
            </div>
            
            <div class="form-group">
                <label for="opinion-role">Rol o Ocupación *</label>
                <input type="text" id="opinion-role" required placeholder="Ej. Lector / Practicante de Kendo">
            </div>
            
            <div class="form-group">
                <label>Calificación (Estrellas) *</label>
                <div class="star-rating-select" id="star-rating-select">
                    <span data-value="1">★</span>
                    <span data-value="2">★</span>
                    <span data-value="3">★</span>
                    <span data-value="4">★</span>
                    <span data-value="5" class="active">★</span>
                </div>
                <input type="hidden" id="opinion-rating" value="5">
            </div>

            <div class="form-group">
                <label for="opinion-body">Tu Opinión / Reseña *</label>
                <textarea id="opinion-body" rows="4" required placeholder="Escribe aquí tus comentarios sobre el libro..."></textarea>
            </div>

            <div class="form-group">
                <label for="opinion-avatar">URL Foto de Perfil (Opcional)</label>
                <input type="url" id="opinion-avatar" placeholder="https://ejemplo.com/foto.jpg">
            </div>

            <div class="form-group" style="flex-direction: row; align-items: center; gap: 8px;">
                <input type="checkbox" id="opinion-verified" checked style="width: auto;">
                <label for="opinion-verified" style="margin: 0;">Compra Verificada</label>
            </div>

            <div class="modal-footer" style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
                <button type="button" class="btn btn-secondary" id="btn-cancel-opinion-modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar Opinión</button>
            </div>
        </form>
    </div>
</div>
```

---

### Task 3: Lógica JS CRUD y Persistencia `localStorage` (`script.js`)

**Files:**
- Modify: `script.js`

- [ ] **Paso 1: Reemplazar el renderizado estático por un gestor dinámico de opiniones**

Implementar:
1. `DEFAULT_OPINIONS` (Array con las 4 opiniones iniciales).
2. `getOpinions()`: Lee `localStorage.getItem('samurai_opinions')`.
3. `setOpinions(opinions)`: Guarda en `localStorage`.
4. `renderOpinionsCards()`: Reconstruye `#testimonials-track` dinámicamente con botones `.edit` y `.delete`.
5. Event listeners para abrir modal, seleccionar estrellas, enviar formulario (`submit`), editar y eliminar.
6. Re-invocación automática de `initTestimonialsSlider()` al modificar los testimonios.

---

### Task 4: Verificación y Auditoría de Pruebas

- [ ] **Paso 1: Comprobar legibilidad de texto en Modo Día y Modo Noche**
- [ ] **Paso 2: Crear una nueva opinión y verificar que aparezca en la lista**
- [ ] **Paso 3: Editar una opinión existente y confirmar los cambios**
- [ ] **Paso 4: Eliminar una opinión y verificar que el slider se ajuste**
- [ ] **Paso 5: Recargar la página y comprobar la persistencia en `localStorage`**
