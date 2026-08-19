# Especificación de Diseño: Sección de Opiniones de Lectores

**Fecha**: 2026-08-17  
**Estado**: Aprobado  
**Proyecto**: La Ruta del Samurái (El Camino del Samurai)

---

## 1. Visión General y Objetivos
El objetivo de esta función es agregar una sección interactiva de "Opiniones de Lectores" (Testimonios) al sitio web oficial de *La Ruta del Samurái*. La sección mostrará testimonios de lectores con sus fotos de perfil, calificaciones en estrellas, texto de reseña y distintivo de compra verificada. En dispositivos móviles se adaptará con un carousel táctil (swipe) de 1 tarjeta por pantalla.

---

## 2. Componentes y Estructura HTML (`index.html`)

### 2.1 Actualización de la Navegación (`navbar`)
Se agrega el enlace de navegación `#opiniones`:
```html
<li><a href="#opiniones" class="nav-link">Opiniones</a></li>
```

### 2.2 Estructura de la Sección `#opiniones`
La sección se insertará inmediatamente después de la sección `#ediciones` y antes de la sección `#autor`.

```html
<section class="opiniones-section" id="opiniones" aria-label="Opiniones de Lectores">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-subtitle">TESTIMONIOS</span>
            <h2 class="section-title">Lo que dicen los lectores</h2>
            <div class="divider-samurai"><span>🉀</span></div>
        </div>

        <div class="testimonials-slider-wrapper">
            <button class="slider-arrow prev" id="testimonials-prev" aria-label="Opinión anterior">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>
            
            <div class="testimonials-track-container" id="testimonials-track-container">
                <div class="testimonials-track" id="testimonials-track">
                    <!-- Tarjeta 1 -->
                    <article class="testimonial-card glass-card">
                        <div class="testimonial-header">
                            <img src="assets/reader_1.webp" alt="Foto de Carlos Mendoza" class="testimonial-avatar" width="64" height="64" loading="lazy">
                            <div class="testimonial-info">
                                <h3 class="testimonial-name">Carlos Mendoza</h3>
                                <p class="testimonial-role">Practicante de Kendo & Lector</p>
                                <div class="testimonial-stars" aria-label="Calificación: 5 de 5 estrellas">
                                    <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                                </div>
                            </div>
                        </div>
                        <blockquote class="testimonial-body">
                            "Un libro imprescindible para todo amante del Bushido. La rigurosidad histórica de Jorge combinada con su experiencia en viajes por Japón te transporta directamente a los castillos y dojos antiguos."
                        </blockquote>
                        <span class="verified-badge">✓ Compra Verificada</span>
                    </article>

                    <!-- Tarjetas adicionales 2, 3, 4, etc. -->
                </div>
            </div>

            <button class="slider-arrow next" id="testimonials-next" aria-label="Siguiente opinión">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </button>
        </div>

        <!-- Indicadores (Dots) -->
        <div class="testimonials-dots" id="testimonials-dots" role="tablist" aria-label="Paginación de testimonios">
            <!-- Puntos generados o estáticos -->
        </div>
    </div>
</section>
```

---

## 3. Estilos Visuales y Responsividad (`styles.css`)

### 3.1 Diseño Estético
- **Estilo de tarjeta**: `glass-card` con fondo translúcido (`rgba(16, 20, 32, 0.75)`), `backdrop-filter: blur(12px)` y borde metálico/dorado `rgba(212, 160, 23, 0.25)`.
- **Estrellas**: Color dorado brillante (`#f59e0b`) con un suave resplandor (`filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.5))`).
- **Avatar**: Formato circular `border-radius: 50%`, borde de 2px en tono oro antiguo y efecto hover sutil de escala.

### 3.2 Adaptabilidad y Ajustes Móviles
- **Móviles (< 768px)**:
  - Ancho de cada tarjeta: `100%` del contenedor visible.
  - Ocultar flechas externas en pantallas muy estrechas si ocupan mucho espacio, o superponerlas limpiamente.
  - Soporte de gestos deslizantes táctiles (*touch drag / swipe*).
  - Ajuste de padding para evitar scroll horizontal global (`overflow-x: hidden`).
- **Tablets y Desktop (>= 768px)**:
  - Mostrar 2 o 3 tarjetas por vista según el ancho de pantalla (`grid-auto-columns` / `flex: 0 0 50%` o `flex: 0 0 33.333%`).

---

## 4. Lógica JavaScript (`script.js`)

Se creará la función `initTestimonialsSlider()` encargada de:
1. Calcular el ancho del slide y controlar la posición `transform: translateX(...)` del `testimonials-track`.
2. Manejar eventos de botones `prev` / `next` e indicadores `dots`.
3. Escuchar eventos táctiles `touchstart`, `touchmove`, `touchend` para el deslizamiento móvil fluido con umbral de swipe (50px).
4. Auto-reproducir o pausar en hover para experiencia óptima de usuario.
5. Actualizar aria-attributes para navegabilidad accesible.

---

## 5. Plan de Verificación y Pruebas
1. **Prueba de renderizado**: Comprobar el aspecto visual en modo Claro y Noche (Día / Noche toggle).
2. **Prueba de interacción**: Probar botones prev/next, clics en los puntos e interacción por teclado (`Tab`, `Flechas`).
3. **Prueba en Dispositivos Móviles**: Verificar comportamiento táctil, swipe y responsividad en viewports móviles (375px, 414px, 768px).
