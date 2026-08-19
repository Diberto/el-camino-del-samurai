# Plan de Implementación: Sección de Opiniones de Lectores

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar una sección interactiva de opiniones de lectores con foto, estrellas, reseña y distintivo de compra verificada, completamente responsiva para escritorio y móvil con soporte de gestos táctiles (swipe).

**Architecture:** La solución integra marcado semántico HTML5 en `index.html`, estilos CSS responsivos con el sistema de diseño glassmorphism en `styles.css`, y un módulo de carousel interactivo accesible con soporte táctil en `script.js`.

**Tech Stack:** HTML5, Vanilla CSS3 (CSS Variables, Flexbox, Glassmorphism, Media Queries), Vanilla JavaScript (ES6 Modules/Events, Touch API).

## Global Constraints
- Cumplimiento de jerarquía visual y accesibilidad ARIA (WCAG AA).
- Responsive mobile-first sin desbordamiento horizontal (`overflow-x: hidden`).
- Mantener la paleta estética Samurai (tonos azul noche, detalles dorados, tipografía Cinzel/Plus Jakarta Sans).

---

### Task 1: Marcado HTML de la Sección de Opiniones (`index.html`)

**Files:**
- Modify: `index.html` (Navegación en `#nav-menu` y nueva sección `#opiniones` entre `#ediciones` y `#autor`)

- [ ] **Paso 1: Agregar el enlace de navegación en `#nav-menu`**

En [index.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/index.html#L147-L150), agregar la opción de menú "Opiniones":
```html
<li><a href="#ediciones" class="nav-link">Ediciones</a></li>
<li><a href="#opiniones" class="nav-link">Opiniones</a></li>
<li><a href="#autor" class="nav-link">Autor</a></li>
```

- [ ] **Paso 2: Insertar la sección `<section id="opiniones">`**

Insertar el marcado completo con 4 opiniones de lectores reales/representativos después del cierre de la sección `#ediciones`:

```html
<!-- Sección Opiniones de Lectores -->
<section class="opiniones-section" id="opiniones" aria-label="Opiniones de Lectores">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-subtitle">TESTIMONIOS DE LA COMUNIDAD</span>
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
                                <div class="testimonial-stars" aria-label="Calificación 5 de 5 estrellas">
                                    <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                                </div>
                            </div>
                        </div>
                        <blockquote class="testimonial-body">
                            "Un libro imprescindible para todo amante del Bushido. La rigurosidad histórica de Jorge combinada con su experiencia en viajes por Japón te transporta directamente a los castillos y dojos antiguos."
                        </blockquote>
                        <div class="testimonial-footer">
                            <span class="verified-badge">✓ Compra Verificada</span>
                        </div>
                    </article>

                    <!-- Tarjeta 2 -->
                    <article class="testimonial-card glass-card">
                        <div class="testimonial-header">
                            <img src="assets/reader_2.webp" alt="Foto de Ana Laura Fernández" class="testimonial-avatar" width="64" height="64" loading="lazy">
                            <div class="testimonial-info">
                                <h3 class="testimonial-name">Ana Laura Fernández</h3>
                                <p class="testimonial-role">Apasionada por la cultura japonesa</p>
                                <div class="testimonial-stars" aria-label="Calificación 5 de 5 estrellas">
                                    <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                                </div>
                            </div>
                        </div>
                        <blockquote class="testimonial-body">
                            "La calidad de las fotografías y la narrativa de 'La Ruta del Samurái' son excepcionales. Sirve tanto como guía de viaje única como una enciclopedia sobre la casta guerrera feudal."
                        </blockquote>
                        <div class="testimonial-footer">
                            <span class="verified-badge">✓ Compra Verificada</span>
                        </div>
                    </article>

                    <!-- Tarjeta 3 -->
                    <article class="testimonial-card glass-card">
                        <div class="testimonial-header">
                            <img src="assets/reader_3.webp" alt="Foto de Martín Soria" class="testimonial-avatar" width="64" height="64" loading="lazy">
                            <div class="testimonial-info">
                                <h3 class="testimonial-name">Martín Soria</h3>
                                <p class="testimonial-role">Instructor de Iaido</p>
                                <div class="testimonial-stars" aria-label="Calificación 5 de 5 estrellas">
                                    <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                                </div>
                            </div>
                        </div>
                        <blockquote class="testimonial-body">
                            "Superó todas mis expectativas. 'El Paso de las Luciérnagas' profundiza en relatos poco conocidos y la experiencia interactiva del oráculo complementa perfectamente la lectura."
                        </blockquote>
                        <div class="testimonial-footer">
                            <span class="verified-badge">✓ Compra Verificada</span>
                        </div>
                    </article>

                    <!-- Tarjeta 4 -->
                    <article class="testimonial-card glass-card">
                        <div class="testimonial-header">
                            <img src="assets/reader_4.webp" alt="Foto de Elena Rostova" class="testimonial-avatar" width="64" height="64" loading="lazy">
                            <div class="testimonial-info">
                                <h3 class="testimonial-name">Elena Rostova</h3>
                                <p class="testimonial-role">Investigadora & Creadora de Contenido</p>
                                <div class="testimonial-stars" aria-label="Calificación 5 de 5 estrellas">
                                    <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                                </div>
                            </div>
                        </div>
                        <blockquote class="testimonial-body">
                            "La presentación, las ilustraciones y la profundidad con la que Orpianesi trata cada ubicación histórica convierten a esta obra en una pieza de colección invaluable."
                        </blockquote>
                        <div class="testimonial-footer">
                            <span class="verified-badge">✓ Compra Verificada</span>
                        </div>
                    </article>

                </div>
            </div>

            <button class="slider-arrow next" id="testimonials-next" aria-label="Siguiente opinión">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </button>
        </div>

        <div class="testimonials-dots" id="testimonials-dots" role="tablist" aria-label="Paginación de opiniones"></div>
    </div>
</section>
```

- [ ] **Paso 3: Verificar sintaxis del HTML**

---

### Task 2: Estilos CSS y Responsividad Móvil (`styles.css`)

**Files:**
- Modify: `styles.css`

- [ ] **Paso 1: Agregar reglas generales para la sección de opiniones**

```css
/* ==========================================================================
   Sección Opiniones de Lectores
   ========================================================================== */
.opiniones-section {
    padding: 100px 0;
    position: relative;
    overflow: hidden;
}

.testimonials-slider-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 40px;
}

.testimonials-track-container {
    width: 100%;
    overflow: hidden;
    border-radius: var(--border-radius-lg, 20px);
    touch-action: pan-y;
}

.testimonials-track {
    display: flex;
    gap: 24px;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
}

.testimonial-card {
    flex: 0 0 calc(50% - 12px);
    box-sizing: border-box;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 240px;
    transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.testimonial-card:hover {
    transform: translateY(-4px);
    border-color: rgba(217, 119, 6, 0.4);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(217, 119, 6, 0.15);
}

.testimonial-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}

.testimonial-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent-primary, #d97706);
    box-shadow: 0 0 12px rgba(217, 119, 6, 0.3);
}

.testimonial-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.testimonial-name {
    font-family: var(--font-heading, 'Cinzel', serif);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary, #f8fafc);
    margin: 0;
}

.testimonial-role {
    font-size: 0.85rem;
    color: var(--text-secondary, #94a3b8);
    margin: 0;
}

.testimonial-stars {
    display: flex;
    gap: 2px;
    color: #f59e0b;
    font-size: 1rem;
    filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.4));
}

.testimonial-body {
    font-size: 0.975rem;
    line-height: 1.65;
    color: var(--text-secondary, #cbd5e1);
    font-style: italic;
    margin: 0 0 20px 0;
}

.testimonial-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.775rem;
    font-weight: 600;
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.25);
    padding: 4px 10px;
    border-radius: 20px;
}

/* Flechas y Controles */
.slider-arrow {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--text-primary, #f8fafc);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
    flex-shrink: 0;
    z-index: 2;
}

.slider-arrow:hover {
    background: var(--accent-primary, #d97706);
    border-color: var(--accent-primary, #d97706);
    color: #0b0d17;
    transform: scale(1.08);
}

.testimonials-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 28px;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
}

.dot.active {
    background: var(--accent-primary, #d97706);
    width: 24px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(217, 119, 6, 0.5);
}
```

- [ ] **Paso 2: Agregar reglas para dispositivos móviles (`@media (max-width: 768px)`)**

```css
@media (max-width: 768px) {
    .opiniones-section {
        padding: 60px 0;
    }

    .testimonial-card {
        flex: 0 0 100%;
        padding: 24px;
    }

    .slider-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 36px;
        height: 36px;
    }

    .slider-arrow.prev {
        left: 8px;
    }

    .slider-arrow.next {
        right: 8px;
    }
}
```

---

### Task 3: Lógica del Carousel y Gestos Táctiles (`script.js`)

**Files:**
- Modify: `script.js`

- [ ] **Paso 1: Crear e inicializar `initTestimonialsSlider()`**

Implementar la lógica completa de deslizamiento, botones prev/next, dots e integración con `touchstart` / `touchend` para móviles:

```javascript
function initTestimonialsSlider() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    const dotsContainer = document.getElementById('testimonials-dots');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const cards = Array.from(track.children);
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    
    function getCardsPerView() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - getCardsPerView());
    }

    function updateSlider() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 24;
        const moveAmount = (cardWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${moveAmount}px)`;
        
        // Actualizar dots
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
            dot.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
        });
        
        // Habilitar/deshabilitar botones
        prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentIndex >= getMaxIndex() ? '0.4' : '1';
        nextBtn.style.pointerEvents = currentIndex >= getMaxIndex() ? 'none' : 'auto';
    }

    function buildDots() {
        dotsContainer.innerHTML = '';
        const totalDots = getMaxIndex() + 1;
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Ir a opinión ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
            updateSlider();
        }
    });

    // Eventos táctiles para dispositivos móviles (Swipe)
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 40) { // Umbral de swipe
            if (diffX > 0 && currentIndex < getMaxIndex()) {
                currentIndex++;
            } else if (diffX < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        buildDots();
        if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
        updateSlider();
    });

    buildDots();
    updateSlider();
}
```

- [ ] **Paso 2: Invocar `initTestimonialsSlider()` dentro del listener principal de la app**

---

### Task 4: Verificación y Auditoría Responsiva (Modo Desktop & Mobile)

- [ ] **Paso 1: Cargar la aplicación local en el navegador y verificar visualmente**
- [ ] **Paso 2: Probar la responsividad y el funcionamiento de la barra de navegación al hacer clic en "Opiniones"**
- [ ] **Paso 3: Probar los gestos táctiles / botones de paginación en ancho móvil (375px)**
