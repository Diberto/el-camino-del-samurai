import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper para escapar cadenas
function e(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${d.getDate()} ${meses[d.getMonth()]}, ${d.getFullYear()}`;
}

// Cargar archivos JSON
const configData = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'config.json'), 'utf-8'));
const libros = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'libros.json'), 'utf-8'));
const opiniones = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'opiniones.json'), 'utf-8'));
const galeria = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'galeria.json'), 'utf-8'));
const blog = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'blog.json'), 'utf-8'));

const settings = configData.settings || {};
const social = settings.social || {};

const pageTitle = settings.site_title || "La Ruta del Samurái - Jorge Orpianesi";
const pageDesc = settings.site_description || "Descubre 'La Ruta del Samurái' y 'El Paso de las Luciérnagas' de Jorge Orpianesi. Crónicas de viajes, artes marciales y la historia de los guerreros feudales de Japón.";

// Construir Navbar
const navMenu = [
    { label: 'Inicio', section: 'inicio', url: '#inicio' },
    { label: 'El Libro', section: 'sinopsis', url: '#sinopsis' },
    { label: 'Opiniones', section: 'opiniones', url: '#opiniones' },
    { label: 'Redes', section: 'redes', url: '#redes' },
    { label: 'Ediciones', section: 'ediciones', url: '#ediciones' },
    { label: 'Autor', section: 'autor', url: '#autor' },
    { label: 'Galería', section: 'galeria', url: '#galeria' },
    { label: 'Blog', section: 'blog', url: '#blog' },
    { label: 'Contacto', section: 'contacto', url: '#contacto', isBtn: true }
];

let navItemsHtml = navMenu.map(item => {
    const classes = [item.isBtn ? 'btn btn-nav' : 'nav-link'];
    if (item.section === 'inicio') classes.push('active');
    return `                    <li>
                        <a href="${e(item.url)}" class="${classes.join(' ')}" data-section="${e(item.section)}">
                            ${e(item.label)}
                        </a>
                    </li>`;
}).join('\n');

// 1. Hero Section
const heroHtml = `    <!-- Hero Section (Diseño Oficial Unificado) -->
    <section class="hero-parallax" id="inicio">
        <!-- Fondo Atmosférico Cálido estilo Pergamino Tradicional -->
        <div class="hero-bg-container">
            <div class="hero-bg-glow"></div>
        </div>
        
        <!-- Contenedor Principal del Hero -->
        <div class="hero-stage">
            <div class="parallax-text">
                <div class="hero-content">
                    <div class="hero-main-logo-wrapper">
                        <img src="assets/enso_emblem_centered.png" 
                             alt="Emblema Enso Samurái" 
                             class="hero-logo-emblem" 
                             fetchpriority="high" 
                             decoding="async">
                        <img src="assets/logo_typography_dark.webp" 
                             alt="La Ruta del Samurái - Jorge Orpianesi" 
                             class="hero-logo-typography" 
                             id="hero-logo-main" 
                             fetchpriority="high" 
                             decoding="async">
                    </div>
                    <h2 class="hero-tagline">LA SENDA DE LA HISTORIA Y EL BUDO</h2>
                    <p class="hero-desc">
                        Un recorrido por el Japón de los samuráis a través de los libros y canales de difusión de un estudioso de la cultura y la historia del país del sol naciente
                    </p>
                    <div class="hero-actions">
                        <a href="#sinopsis" class="btn btn-primary">Explorar Libros</a>
                        <a href="#ediciones" class="btn btn-secondary">Comprar</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Capa de Niebla Atmosférica Inferior -->
        <div class="hero-mist-layer">
            <div class="mist-wave mist-wave-1"></div>
            <div class="mist-wave mist-wave-2"></div>
        </div>

        <!-- Capa inferior de degradado para fusionar el final del hero -->
        <div class="hero-overlay-bottom"></div>
    </section>`;

// 2. Sinopsis Section (Libros 3D + Focus Modal)
let tomoTabs = libros.map((l, idx) => `                    <button class="btn ${idx === 0 ? 'btn-primary active' : 'btn-secondary'} tomo-tab" data-tomo="${idx + 1}">
                        ${e(l.tab_label || l.title)}
                    </button>`).join('\n');

let tomoStages = libros.map((l, idx) => `                <!-- Stage Tomo ${idx + 1} -->
                <div class="book-3d-stage tomo-stage ${idx === 0 ? 'active' : ''}" id="stage-tomo-${idx + 1}" style="${idx > 0 ? 'display: none;' : ''}">
                    <div class="book-3d-card" id="book-card-${idx + 1}" data-rotated="false">
                        <div class="book-face-front">
                            <img src="${e(l.cover_front)}" alt="${e(l.title)} - Portada" decoding="async">
                            <div class="book-shine"></div>
                        </div>
                        <div class="book-face-back">
                            <img src="${e(l.cover_back)}" alt="${e(l.title)} - Contraportada" decoding="async">
                            <div class="book-shine"></div>
                        </div>
                        <div class="book-face-spine spine-tomo${(idx % 2) + 1}">
                            <span class="spine-kanji">侍</span>
                            <span class="spine-title">${e(l.title.toUpperCase())}</span>
                            <span class="spine-author">JORGE ORPIANESI</span>
                        </div>
                        <div class="book-face-pages"></div>
                        <div class="book-face-top"></div>
                        <div class="book-face-bottom"></div>
                        <div class="book-3d-shadow"></div>
                    </div>
                </div>`).join('\n');

let focusTomoTabs = libros.map((l, idx) => `                <button class="btn focus-tomo-tab ${idx === 0 ? 'active' : ''}" data-tomo="${idx + 1}" role="tab" aria-selected="${idx === 0 ? 'true' : 'false'}">
                    ${e(l.badge || 'TOMO ' + (idx + 1))}
                </button>`).join('\n');

let focusTomoStages = libros.map((l, idx) => `            <div class="focus-3d-stage tomo-focus-stage ${idx === 0 ? 'active' : ''}" id="focus-stage-tomo-${idx + 1}" style="${idx > 0 ? 'display: none;' : ''}">
                <div class="focus-3d-card" id="focus-book-card-${idx + 1}" data-tomo="${idx + 1}">
                    <div class="book-face-front">
                        <img src="${e(l.cover_front)}" alt="${e(l.title)} - Portada en Alta Definición" decoding="async">
                        <div class="book-shine"></div>
                    </div>
                    <div class="book-face-back">
                        <img src="${e(l.cover_back)}" alt="${e(l.title)} - Contraportada en Alta Definición" decoding="async">
                        <div class="book-shine"></div>
                    </div>
                    <div class="book-face-spine spine-tomo${(idx % 2) + 1}">
                        <span class="spine-kanji">侍</span>
                        <span class="spine-title">${e(l.title.toUpperCase())}</span>
                        <span class="spine-author">JORGE ORPIANESI</span>
                    </div>
                    <div class="book-face-pages"></div>
                    <div class="book-face-top"></div>
                    <div class="book-face-bottom"></div>
                    <div class="book-3d-shadow focus-shadow"></div>
                </div>
            </div>`).join('\n');

const sinopsisHtml = `    <!-- Sección de Sinopsis / La Obra Literaria -->
    <section class="section sinopsis-section" id="sinopsis">
        <div class="container grid-2">
            <div class="sinopsis-image fade-in">
                <div class="book-3d-wrapper" id="book-3d-container">
                    <div class="tomo-buttons-group">
${tomoTabs}
                    </div>

${tomoStages}

                    <div class="book-3d-controls">
                        <button class="btn btn-primary btn-flip-single" id="btn-flip-single">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                            </svg>
                            <span id="btn-flip-text">Girar a Contraportada</span>
                        </button>
                        <button class="btn btn-secondary btn-focus-trigger" id="btn-open-focus-3d" aria-label="Ampliar libro en pantalla completa" title="Ampliar libro en 3D">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                            </svg>
                            <span>Pantalla Completa</span>
                        </button>
                    </div>
                    <p class="book-3d-hint">✨ <em>Haz clic en el libro para ampliarlo en detalle · Arrastra para rotar en 3D</em></p>
                </div>
            </div>
            
            <div class="sinopsis-content fade-in">
                <span class="section-subtitle">LA OBRA LITERARIA</span>
                <h2 class="section-title">La guía definitiva de Japón para los amantes de la historia samurái.</h2>
                <p class="text-large">Una aventura literaria y fotográfica que conecta la historia, las artes marciales, la cultura y la filosofía de Japón a través de entretenidas narrativas de viajes por los lugares icónicos del Japón samurái.</p>
                
                <div class="philosophy-points">
                    <div class="point-item">
                        <div class="point-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        </div>
                        <div class="point-text">
                            <h3>Viaje al Japón profundo</h3>
                            <p>Explora templos y santuarios, antiguos poblados, caminos centenarios, castillos, cementerios, campos de batalla, escuelas samuráis y hasta el sagrado Monte Fuji acompañado de mapas, fotos a color, dibujos y pinturas históricas.</p>
                        </div>
                    </div>
                    
                    <div class="point-item">
                        <div class="point-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div class="point-text">
                            <h3>La vida de los grandes samuráis de la historia</h3>
                            <p>Conoce la vida y obra de los grandes nombres de la historia samurái a través de textos antiguos, cartas personales, partes de batalla y de historias reales o noveladas de guerreros de la talla de Miyamoto Musashi, Tokugawa Ieyasu, Toyotomi Hideyoshi, Kato Kiyomasa, Todo Takatora, Honda Tadakatsu, Oda Nobunaga y ¡muchos más!</p>
                        </div>
                    </div>
                    
                    <div class="point-item">
                        <div class="point-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        </div>
                        <div class="point-text">
                            <h3>Cultura y filosofía</h3>
                            <p>Sumérgete en la sociedad japonesa actual a través de sus valores, creencias, costumbres y tradiciones que fueron heredadas de los grandes guerreros samurái que gobernaron el país durante casi ¡siete siglos!</p>
                        </div>
                    </div>
                </div>
                
                <a href="#ediciones" class="btn btn-primary btn-margin">Adquirir Ejemplar</a>
            </div>
        </div>
    </section>

    <!-- MODAL DE ENFOQUE INMERSIVO 3D (LIGHTBOX FULLSCREEN) -->
    <div class="book-focus-modal" id="book-focus-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Visor 3D ampliado de la obra">
        <div class="focus-backdrop" id="focus-backdrop" title="Haz clic o desplaza para cerrar"></div>
        
        <div class="focus-modal-content">
            <!-- Barra Superior de Navegación y Cierre -->
            <div class="focus-top-bar">
                <div class="focus-tomo-tabs" role="tablist">
${focusTomoTabs}
                </div>
                
                <div class="focus-top-actions">
                    <span class="focus-hint-desktop">Desplaza (scroll) o presiona ESC para salir</span>
                    <button class="focus-close-btn" id="focus-close-btn" aria-label="Cerrar visor ampliado">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span class="close-text">Cerrar</span>
                    </button>
                </div>
            </div>

            <!-- Escenario 3D Central Ampliado -->
            <div class="focus-stage-container" id="focus-stage-container">
${focusTomoStages}
            </div>

            <!-- Barra de Controles Inferior con Zoom -->
            <div class="focus-bottom-bar">
                <button class="btn btn-primary btn-focus-flip" id="btn-focus-flip">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                    </svg>
                    <span id="btn-focus-flip-text">Girar a Contraportada</span>
                </button>

                <!-- Controles de Acercamiento / Zoom -->
                <div class="focus-zoom-controls" role="group" aria-label="Controles de zoom">
                    <button type="button" class="btn btn-secondary btn-zoom-action" id="btn-focus-zoom-out" title="Alejar libro" aria-label="Alejar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </button>
                    <span class="focus-zoom-badge" id="focus-zoom-badge" title="Nivel de zoom actual">100%</span>
                    <button type="button" class="btn btn-secondary btn-zoom-action" id="btn-focus-zoom-in" title="Acercar libro para leer en detalle" aria-label="Acercar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="11" y1="8" x2="11" y2="14"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </button>
                </div>

                <button class="btn btn-secondary btn-focus-reset" id="btn-focus-reset" title="Restablecer posición inicial y escala">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                    </svg>
                    <span>Centrar</span>
                </button>
            </div>
            
            <p class="focus-mobile-hint">👆 <em>Desliza para salir · Doble toque en el libro para zoom</em></p>
        </div>
    </div>`;

// 3. Opiniones Section (11 reviews + Pagination + Filter + Modal)
const defaultReviewFilter = settings.reviews_default_filter || 'text';
const perPageReviews = 6;
let visibleCount = 0;
let opinionsHtml = opiniones.map(rev => {
    const cardType = rev.type || 'text';
    const matchesFilter = (defaultReviewFilter === 'all' || cardType === defaultReviewFilter);
    let isVisible = false;
    if (matchesFilter) {
        visibleCount++;
        isVisible = (visibleCount <= perPageReviews);
    }
    const stars = '★'.repeat(Number(rev.rating) || 5);

    if (cardType === 'photo' && rev.photo) {
        return `                <!-- Tarjeta con Foto -->
                <article class="review-card review-card-photo" 
                         data-id="${e(rev.id || '')}"
                         data-type="photo" 
                         data-name="${e(rev.name || '')}"
                         data-role="${e(rev.role || '')}"
                         data-photo="${e(rev.photo || '')}"
                         data-photo-title="${e(rev.photo_title || rev.name || '')}"
                         data-rating="${Number(rev.rating) || 5}"
                         data-date="${e(rev.date || '')}"
                         data-verified="${rev.verified ? '1' : '0'}"
                         tabindex="0"
                         role="button"
                         aria-label="Ver reseña de ${e(rev.name || '')}"
                         style="display: ${isVisible ? 'flex' : 'none'};">
                    <div class="review-photo-wrapper" data-src="${e(rev.photo)}" data-title="${e(rev.photo_title || rev.name)}">
                        <img src="${e(rev.photo)}" alt="${e(rev.name)}" loading="lazy" class="review-photo-img" onerror="this.src='photos/orpianesi1.webp'">
                        <div class="review-photo-badge">📸 ${e(rev.photo_badge || 'Foto de Lector')}</div>
                        <div class="review-photo-overlay">
                            <span>🔍 Clic para ampliar</span>
                        </div>
                    </div>
                    <div class="review-content">
                        <div class="review-stars">${stars}</div>
                        <p class="review-caption review-text-clamped">"${e(rev.text)}"</p>
                        <div class="review-read-more-wrapper">
                            <button type="button" class="review-read-more-btn">Ver más →</button>
                        </div>
                        <div class="review-author">
                            <strong>${e(rev.name)}</strong>
                            <span>${e(rev.role)}</span>
                        </div>
                    </div>
                    <div class="review-full-text" style="display: none;">${e(rev.text)}</div>
                </article>`;
    } else {
        const avatarHtml = rev.photo 
            ? `<div class="review-avatar-photo"><img src="${e(rev.photo)}" alt="${e(rev.name)}" onerror="this.parentElement.className='review-avatar-text'; this.parentElement.innerText='${e((rev.name || '').substring(0, 2).toUpperCase())}';"></div>`
            : `<div class="review-avatar-text">${e((rev.name || '').substring(0, 2).toUpperCase())}</div>`;
        const verifiedHtml = rev.verified ? `<div class="review-tag-badge">✓ Compra Verificada</div>` : '';

        return `                <!-- Tarjeta de Reseña de Texto -->
                <article class="review-card review-card-text" 
                         data-id="${e(rev.id || '')}"
                         data-type="text" 
                         data-name="${e(rev.name || '')}"
                         data-role="${e(rev.role || '')}"
                         data-photo="${e(rev.photo || '')}"
                         data-rating="${Number(rev.rating) || 5}"
                         data-date="${e(rev.date || '')}"
                         data-verified="${rev.verified ? '1' : '0'}"
                         tabindex="0"
                         role="button"
                         aria-label="Ver reseña de ${e(rev.name || '')}"
                         style="display: ${isVisible ? 'flex' : 'none'};">
                    <div class="review-quote-mark">“</div>
                    <div class="review-card-text-inner">
                        <div class="review-stars">${stars}</div>
                        <blockquote class="review-body review-text-clamped">
                            "${e(rev.text)}"
                        </blockquote>
                        <div class="review-read-more-wrapper">
                            <button type="button" class="review-read-more-btn">Ver más →</button>
                        </div>
                    </div>
                    <div class="review-footer">
                        ${avatarHtml}
                        <div class="review-author">
                            <strong>${e(rev.name)}</strong>
                            <span>${e(rev.role)}</span>
                        </div>
                    </div>
                    ${verifiedHtml}
                    <div class="review-full-text" style="display: none;">${e(rev.text)}</div>
                </article>`;
    }
}).join('\n');

const opinionesHtml = `    <!-- Sección de Opiniones y Testimonios de Lectores -->
    <section class="section reviews-section" id="opiniones" aria-label="Opiniones de Lectores">
        <div class="container">
            <div class="section-header center fade-in">
                <span class="section-subtitle">Testimonios y comunidad</span>
                <h2 class="section-title">Opiniones de nuestros lectores</h2>
                <p class="section-desc">Experiencias, valoraciones y fotografías de nuestros seguidores apasionados por la cultura samurái.</p>
            </div>

            <!-- Filtros de Opiniones -->
            <div class="reviews-filter-wrapper fade-in">
                <button class="review-filter-btn ${defaultReviewFilter === 'all' ? 'active' : ''}" data-filter="all">Todas las Opiniones</button>
                <button class="review-filter-btn ${defaultReviewFilter === 'photo' ? 'active' : ''}" data-filter="photo">📸 Con Foto / Captura</button>
                <button class="review-filter-btn ${defaultReviewFilter === 'text' ? 'active' : ''}" data-filter="text">✍️ Reseñas Escritas</button>
            </div>

            <!-- Grid de Opiniones Mixtas -->
            <div class="reviews-grid fade-in" id="reviews-grid" data-per-page="${perPageReviews}">
${opinionsHtml}
            </div>

            <!-- Paginación de Opiniones Dinámica -->
            <nav class="reviews-pagination blog-pagination" id="reviews-pagination" aria-label="Paginación de opiniones"></nav>

            <!-- Botón para enviar testimonio por WhatsApp -->
            <div class="reviews-cta-box center fade-in">
                <p class="reviews-cta-title">¿Ya leíste el libro o recibiste tu ejemplar?</p>
                <p class="reviews-cta-desc">Envíanos tu foto o testimonio para publicarlo en la web oficial y redes sociales.</p>
                <a href="https://wa.me/5493513886443?text=Hola%20Jorge,%20te%20env%C3%ADo%20mi%20opini%C3%B3n/foto%20sobre%20el%20libro%20de%20El%20Camino%20del%20Samur%C3%A1i" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-whatsapp-cta">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.178.181-.077.355.101.173.449.741.964 1.2.662.591 1.221.774 1.394.861.173.087.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
                    <span>Compartir mi Opinión por WhatsApp</span>
                </a>
            </div>
        </div>

        <!-- Modal Elegante para Ampliar la Opinión Completa -->
        <div class="review-modal" id="review-modal" aria-hidden="true" role="dialog" aria-modal="true">
            <div class="review-modal-backdrop" id="review-modal-backdrop"></div>
            <div class="review-modal-card">
                <button type="button" class="review-modal-close" id="review-modal-close" aria-label="Cerrar reseña">&times;</button>
                
                <div class="review-modal-media" id="review-modal-media" style="display: none;">
                    <img src="" alt="Foto de lector" id="review-modal-img">
                    <span class="review-modal-badge" id="review-modal-badge">📸 Foto de Lector</span>
                </div>

                <div class="review-modal-content">
                    <div class="review-modal-header">
                        <div class="review-stars" id="review-modal-stars">★★★★★</div>
                        <div class="review-tag-badge" id="review-modal-verified" style="display: none;">✓ Compra Verificada</div>
                    </div>
                    
                    <div class="review-modal-quote-mark">“</div>
                    <blockquote class="review-modal-body" id="review-modal-body">
                        <!-- Texto completo de la opinión inyectado por JS -->
                    </blockquote>

                    <div class="review-modal-footer">
                        <div class="review-modal-avatar" id="review-modal-avatar"></div>
                        <div class="review-author">
                            <strong id="review-modal-author"></strong>
                            <span id="review-modal-role"></span>
                        </div>
                        <span class="review-modal-date" id="review-modal-date"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

// 4. Redes Section
const redesHtml = `    <!-- Sección Redes Sociales y Comunidad Oficial -->
    <section class="section social-section" id="redes" aria-label="Redes Sociales y Comunidad Oficial">
        <div class="container text-center">
            <div class="section-header fade-in">
                <span class="section-subtitle">Comunidad y generación de contenido</span>
                <h2 class="section-title">Sigue La Ruta del Samurái a través de nuestras redes</h2>
                <p class="section-desc">Acompáñanos en nuestras publicaciones sobre historia y cultura japonesa, con videos y miles de fotografías que harán de tus libros una verdadera experiencia interactiva.</p>
            </div>

            <div class="social-macro-grid fade-in">
                <!-- Tarjeta YouTube -->
                <a href="${e(social.youtube?.url || 'https://www.youtube.com/@larutadelsamurai')}" target="_blank" rel="noopener noreferrer" class="social-macro-card youtube-macro-card" aria-label="Canal Oficial de YouTube">
                    <div class="social-macro-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </div>
                    <div class="social-macro-content">
                        <span class="social-macro-platform">Canal oficial Youtube</span>
                        <h3 class="social-macro-title">“La Ruta del Samurái”</h3>
                        <p class="social-macro-desc">Videos sobre lugares visitados por el autor, consejos de viajes, entrevistas, presentaciones de libros, comentarios sobre las obras y también sobre cine y TV siempre relacionado con la historia samurái.</p>
                        <span class="social-macro-btn">Ver Videos y Suscribirse &rarr;</span>
                    </div>
                </a>

                <!-- Tarjeta Instagram -->
                <a href="${e(social.instagram?.url || 'https://www.instagram.com/la.ruta.del.samurai/')}" target="_blank" rel="noopener noreferrer" class="social-macro-card instagram-macro-card" aria-label="Instagram Oficial">
                    <div class="social-macro-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </div>
                    <div class="social-macro-content">
                        <span class="social-macro-platform">Instagram</span>
                        <h3 class="social-macro-title social-macro-handle">@la.ruta.del.samurai</h3>
                        <p class="social-macro-desc">Fotografías, reels, e historias sobre lugares de Japón y publicaciones sobre diversos temas relacionados con ese país</p>
                        <span class="social-macro-btn">Seguir en Instagram &rarr;</span>
                    </div>
                </a>

                <!-- Tarjeta Facebook -->
                <a href="${e(social.facebook?.url || 'https://www.facebook.com/jorgeorpianesi')}" target="_blank" rel="noopener noreferrer" class="social-macro-card facebook-macro-card" aria-label="Página de Facebook Oficial">
                    <div class="social-macro-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </div>
                    <div class="social-macro-content">
                        <span class="social-macro-platform">Facebook</span>
                        <h3 class="social-macro-title" style="font-size: 1.15rem;">La Ruta del Samurái, Japón para Budokas by Jorge Orpianesi</h3>
                        <p class="social-macro-desc">Página destinada a la comunidad de seguidores y lectores que disfrutan de publicaciones históricas y novedades sobre Japón.</p>
                        <span class="social-macro-btn">Unirse a la Comunidad &rarr;</span>
                    </div>
                </a>
            </div>
        </div>
    </section>`;

// 5. Ediciones Section
const edicionesHtml = `    <!-- Sección de Las Obras del Autor y Ediciones -->
    <section class="section chapters-section" id="ediciones">
        <div class="container grid-2">
            <div class="chapters-content fade-in">
                <span class="section-subtitle">Contenido exclusivo</span>
                <h2 class="section-title">Las obras del autor</h2>
                <p class="section-desc">Libros excepcionales que plasman los viajes del autor por todo el territorio japonés en busca de aquellos lugares donde se sucedieron los hechos históricos.</p>
                
                <div class="chapters-list">
                    <div class="chapter-item">
                        <div class="chapter-num">1</div>
                        <div class="chapter-info">
                            <h3>La Ruta del Samurái</h3>
                            <p>Un recorrido geográfico por los lugares más famosos relacionados con los samuráis siguiendo los pasos del famoso duelista Miyamoto Musashi mientras el lector descubre las maravillas de Japón.</p>
                        </div>
                    </div>
                    
                    <div class="chapter-item">
                        <div class="chapter-num">2</div>
                        <div class="chapter-info">
                            <h3>El Paso de las Luciérnagas</h3>
                            <p>La segunda expedición del autor por tierras japonesas buscando los antiguos caminos que recorrían los samuráis durante el período Edo. Jorge Orpianesi emula los recorridos hechos por el artista Utagawa Hiroshige en el siglo XIX a través de la ruta Tokaido uniendo la antigua Edo con Kioto y el regreso por la ruta Nakasendo mientras hace una comparativa entre las imágenes que va tomando en su camino con las pinturas que realizó Hiroshige en la época de los samuráis.</p>
                        </div>
                    </div>

                    <div class="chapter-item">
                        <div class="chapter-num">3</div>
                        <div class="chapter-info">
                            <h3>Along the Samurai´s Route</h3>
                            <p>A geographical journey through the most famous places related to the samurai, following in the footsteps of the famous duelist Miyamoto Musashi, while the reader discovers the wonders of Japan.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="editions-wrapper fade-in">
                <span class="section-subtitle text-center block">ELIGE TU FORMATO</span>
                <h2 class="section-title text-center">Ediciones Disponibles</h2>
                
                <div class="editions-cards">
                    <!-- a) Amazon Global -->
                    <div class="edition-card">
                        <div class="edition-badge">AMAZON GLOBAL</div>
                        <h3 class="edition-title">Desde el exterior</h3>
                        <p class="edition-format">Todos los títulos – Envíos internacionales</p>
                        <div class="edition-price">INTERNACIONAL</div>
                        <ul class="edition-benefits">
                            <li>Disponible en formatos e-book Kindle para descarga inmediata</li>
                            <li>Edicion impresa en tapa blanda</li>
                            <li>Envíos a todo el mundo con la garantía de Amazon</li>
                            <li>Acceso completo a los mapas, fotografías y dibujos de todas las obras</li>
                        </ul>
                        <a href="${e(settings.amazon_url || 'https://www.amazon.com/stores/Jorge-Orpianesi/author/B0BWNTWK7B')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center">Ver Títulos en Amazon Global</a>
                    </div>
                    
                    <!-- b) Envios nacionales -->
                    <div class="edition-card premium">
                        <div class="edition-badge gold">ARGENTINA</div>
                        <h3 class="edition-title">Envios nacionales</h3>
                        <p class="edition-format">Tienda Oficial Budokan & Ejemplar Dedicado</p>
                        <div class="edition-price" style="font-size: 1.1rem; line-height: 1.3;">Envíos a todas las provincias de la República Argentina</div>
                        <ul class="edition-benefits">
                            <li>Papel ahuesado premium con cientos de fotografías a color, mapas y dibujos históricos</li>
                            <li>Se puede solicitar el ejemplar firmado por el autor</li>
                        </ul>
                        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                            <a href="${e(settings.budokan_tomo1_url || settings.budokan_url || '#')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center">Comprar Tomo 1 (Budokan Web)</a>
                            <a href="${e(settings.budokan_tomo2_url || '#')}" target="_blank" rel="noopener noreferrer" class="btn btn-blue block text-center">Comprar Tomo 2 (Budokan Web)</a>
                            <a href="https://wa.me/5493513886443?text=Hola%20Jorge,%20quiero%20adquirir%20el%20libro%20f%C3%ADsico%20firmado%20en%20Argentina" target="_blank" rel="noopener noreferrer" class="btn btn-secondary block text-center">Pedir firmado por WhatsApp</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

// 6. Autor Section
const autorHtml = `    <!-- Sección del Autor -->
    <section class="section author-section" id="autor">
        <div class="container grid-2 align-center">
            <div class="author-details fade-in">
                <span class="section-subtitle">El autor</span>
                <h2 class="section-title">Conoce a Jorge Orpianesi</h2>
                <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-primary); margin-bottom: 1.5rem;">
                    Nacido en 1969 en la ciudad de Córdoba, en la República Argentina Jorge Orpianesi practica Karate Do desde 1982, Kobudo okinawense desde 1986, Aikido desde 1997 y Iaido desde 2008. Es un estudioso de todas las artes marciales japonesas y de las filosofías en las que se encuentran arraigadas. Participó de numerosos congresos y seminarios de las más variadas disciplinas de combate. En el año 2013 asistió al Primer Seminario Mundial de Karate y Kobudo Tradicional que se llevó a cabo en la isla de Okinawa (Japón) donde tuvo oportunidad de recibir enseñanzas de los más grandes maestros del mundo. Su carrera como competidor se desarrolló entre 1988 y 1996. Fue capitán de equipo de kata y se desempeñó como juez y árbitro en Karate deportivo. Comenzó su actividad docente en 1989 y al día de hoy sigue brindando sus enseñanzas a través de seminarios y distintos medios de difusión. Durante 1991 y 1992 tuvo su propio micro radial y más acá en el tiempo se convirtió en columnista de renombradas revistas internacionales como Bugeisha (USA) y Ganbatte (México) así como también de sitios de cultura asiática como por ejemplo Reporte Asia que brinda nexos comerciales y culturales entre los países del lejano oriente y Latinoamérica. En 2021 escribió su primer libro llamado “La Ruta del Samurái, Japón para Budokas” que fue un éxito en todos los países de habla hispana. Al año siguiente se editó la versión en inglés y en 2025 salió su segundo trabajo llamado “El paso de las Luciérnagas, La Ruta del Samurái 2”. En ambas obras el autor relata sus experiencias vividas durante sus viajes por todo Japón. Viajes que seguirán brindando material para futuros libros…
                </p>
                <div class="author-signature">
                    <img src="assets/kanji_stamp.webp" alt="Sello Kanji Jorge Orpianesi" class="author-signature-stamp" loading="lazy" decoding="async">
                    <div class="signature-name">
                        <strong>Jorge Orpianesi</strong>
                        <span>Artista Marcial, Escritor & Divulgador</span>
                    </div>
                </div>
            </div>
            
            <div class="author-visual fade-in">
                <div class="image-wrapper author-image-card">
                    <img src="photos/orpianesi1.webp" alt="Jorge Orpianesi - Autor de La Ruta del Samurái" class="author-img" loading="lazy" decoding="async">
                    <div class="glow-effect"></div>
                </div>
            </div>
        </div>
    </section>`;

// 7. Galería Section (17 fotos + Paginación Dinámica)
const perPageGallery = 3;
const totalFotos = galeria.length;
let galleryCardsHtml = galeria.map((item, index) => {
    const isVisible = (index < perPageGallery);
    return `                <div class="gallery-card" 
                     data-gallery-index="${index}"
                     data-src="${e(item.image)}" 
                     data-title="${e(item.title)}" 
                     data-tag="${e(item.tag || 'Fotografía')}"
                     style="display: ${isVisible ? 'flex' : 'none'};">
                    <div class="gallery-thumb-wrapper">
                        <img src="${e(item.image)}" 
                             alt="${e(item.title)}" 
                             loading="lazy" 
                             onerror="this.src='photos/castillo_sengoku.webp'">
                        <div class="gallery-overlay">
                            ${item.tag ? `<span class="gallery-tag">${e(item.tag)}</span>` : ''}
                            <h4 class="gallery-card-title">${e(item.title)}</h4>
                            <span class="gallery-zoom-icon">🔍 Ampliar foto</span>
                        </div>
                    </div>
                </div>`;
}).join('\n');

const galeriaHtml = `    <!-- Sección Galería Fotográfica de Japón -->
    <section class="section gallery-section" id="galeria">
        <div class="container">
            <div class="section-header text-center fade-in">
                <span class="section-subtitle">Expediciones y fotografía</span>
                <h2 class="section-title">Galería de las travesías</h2>
                <p class="section-desc">Un recorrido visual por los lugares sagrados de la historia samurái con fotografías tomadas por el autor en sus viajes</p>
            </div>

            <!-- Barra de Controles de la Galería -->
            <div class="gallery-controls-bar fade-in">
                <div class="gallery-counter-tag" id="gallery-counter-tag">
                    <span>📸 Mostrando fotos 1-${Math.min(perPageGallery, totalFotos)} de ${totalFotos}</span>
                </div>

                <div class="gallery-nav-buttons">
                    <button type="button" class="gallery-nav-btn" id="gallery-scroll-prev" aria-label="Página anterior" title="Ver fotos anteriores">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    <button type="button" class="gallery-nav-btn" id="gallery-scroll-next" aria-label="Página siguiente" title="Ver siguientes fotos">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Cuadrícula de Galería (Tarjetas Grandes y Proporcionales) -->
            <div class="gallery-grid fade-in" id="gallery-posts-grid" data-per-page="${perPageGallery}">
${galleryCardsHtml}
            </div>

            <!-- Controles de Paginación Numérica de la Galería -->
            <nav class="gallery-pagination blog-pagination fade-in" id="gallery-pagination" aria-label="Paginación de la galería de fotos" style="margin-bottom: 2.5rem;"></nav>

            <!-- Pie de Galería con Botón para Abrir Visor Completo -->
            <div class="gallery-footer-actions text-center fade-in">
                <button type="button" class="btn btn-secondary" id="btn-open-gallery-lightbox">
                    🖼️ Explorar Galería en Pantalla Completa
                </button>
            </div>
        </div>
    </section>`;

// 8. Blog Section (Tarjetas compactas + Paginación)
const perPageBlog = 3;
let blogCardsHtml = blog.map((post, index) => {
    const isVisible = (index < perPageBlog);
    const cover = post.cover_image || 'photos/castillo_sengoku.webp';
    const plainContent = (post.content || '').replace(/<[^>]*>?/gm, '');
    const wordCount = plainContent.trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 180));
    const excerpt = post.excerpt || plainContent.substring(0, 120) + '...';

    return `                <article class="blog-compact-card blog-home-card" style="display: ${isVisible ? 'flex' : 'none'};">
                    <a href="#blog" class="blog-compact-thumb">
                        <img src="${e(cover)}" alt="${e(post.title)}" loading="lazy" decoding="async" onerror="this.src='photos/castillo_sengoku.webp'">
                        <span class="blog-compact-date">${formatDate(post.created_at)}</span>
                    </a>
                    <div class="blog-compact-body">
                        <div class="blog-compact-meta">
                            <span>⏱️ ${readTime} min de lectura</span>
                            <span>•</span>
                            <span>${e(post.author || 'Jorge Orpianesi')}</span>
                        </div>
                        <h3 class="blog-compact-title">
                            <a href="#blog">${e(post.title)}</a>
                        </h3>
                        <p class="blog-compact-excerpt">
                            ${e(excerpt)}
                        </p>
                        <div class="blog-compact-footer">
                            <a href="#blog" class="blog-compact-link">
                                Leer artículo completo <span>→</span>
                            </a>
                        </div>
                    </div>
                </article>`;
}).join('\n');

const blogHtml = `    <!-- Sección Blog Samurai -->
    <section class="section blog-section" id="blog">
        <div class="container">
            <div class="section-header text-center fade-in">
                <span class="section-subtitle">Artículos y Reflexiones</span>
                <h2 class="section-title">Blog Samurái</h2>
                <p class="section-desc">Artículos, recuerdos, anécdotas y entrevistas escritas por Jorge Orpianesi</p>
            </div>

            <div id="home-blog-posts-grid" class="blog-compact-grid fade-in" data-per-page="${perPageBlog}" style="margin-top: 2rem; margin-bottom: 2.5rem;">
${blogCardsHtml}
            </div>

            <!-- Controles de Paginación Dinámica del Blog en Home -->
            <nav class="home-blog-pagination blog-pagination" id="home-blog-pagination" aria-label="Paginación de artículos del blog" style="margin-bottom: 2.5rem;"></nav>

            <div class="text-center" style="margin-top: 1rem;">
                <a href="#blog" class="btn btn-secondary">Ver Todos los Artículos</a>
            </div>
        </div>
    </section>`;

// 9. Contacto Section
const contactoHtml = `    <!-- Sección de Contacto Oficial -->
    <section class="section contact-section" id="contacto" aria-label="Contacto Oficial y Redes">
        <div class="container">
            <div class="section-header text-center fade-in">
                <span class="section-subtitle">CANALES DIRECTOS</span>
                <h2 class="section-title">Contacto Oficial</h2>
                <p class="section-desc">Ponte en contacto directo con Jorge Orpianesi para pedidos de libros dedicados en Argentina, consultas sobre seminarios y presentaciones.</p>
            </div>

            <div class="contact-cards-grid fade-in">
                <!-- Tarjeta 1: WhatsApp -->
                <div class="contact-card highlight-card">
                    <div class="contact-icon whatsapp-icon">
                        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.178.181-.077.355.101.173.449.741.964 1.2.662.591 1.221.774 1.394.861.173.087.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
                        </svg>
                    </div>
                    <h3>WhatsApp Directo</h3>
                    <p class="contact-highlight">${e(settings.whatsapp || '+549 351 3886443')}</p>
                    <p class="contact-desc">Atención rápida para consultas, pedidos de libros dedicados y envíos en toda Argentina.</p>
                    <a href="${e(settings.whatsapp_url || 'https://wa.me/5493513886443?text=Hola%20Jorge,%20me%20comunico%20desde%20la%20web%20de%20El%20Camino%20del%20Samur%C3%A1i')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center">Enviar WhatsApp</a>
                </div>

                <!-- Tarjeta 2: Dirección Física -->
                <div class="contact-card">
                    <div class="contact-icon location-icon">
                        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </div>
                    <h3>Dirección</h3>
                    <p class="contact-highlight">Budokan Argentina</p>
                    <p class="contact-desc">${e(settings.address || 'Sarmiento 375, Córdoba, República Argentina. CP: 5000')}</p>
                    <a href="https://maps.google.com/?q=${encodeURIComponent(settings.address || 'Sarmiento 375, Córdoba, Argentina')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary block text-center">Ver en Google Maps</a>
                </div>

                <!-- Tarjeta 3: Correo Electrónico -->
                <div class="contact-card">
                    <div class="contact-icon email-icon">
                        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>
                    <h3>Correo Electrónico</h3>
                    <p class="contact-highlight">${e(settings.email || 'jorgeorpianesi@hotmail.com')}</p>
                    <p class="contact-desc">Para correspondencia oficial, prensa, invitaciones a seminarios y eventos internacionales.</p>
                    <a href="mailto:${e(settings.email || 'jorgeorpianesi@hotmail.com')}" class="btn btn-secondary block text-center">Enviar Correo</a>
                </div>
            </div>

            <!-- Repetir Redes Sociales en Contacto -->
            <div class="contact-social-repeater center fade-in">
                <h4 class="social-repeater-title">Nuestras Redes Sociales</h4>
                <div class="social-repeater-links">
                    <a href="https://www.youtube.com/@larutadelsamurai" target="_blank" rel="noopener noreferrer" class="social-pill-btn youtube-pill">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        <span>YouTube Oficial</span>
                    </a>
                    <a href="https://www.instagram.com/la.ruta.del.samurai/" target="_blank" rel="noopener noreferrer" class="social-pill-btn instagram-pill">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        <span>Instagram Oficial</span>
                    </a>
                    <a href="https://www.facebook.com/jorgeorpianesi" target="_blank" rel="noopener noreferrer" class="social-pill-btn facebook-pill">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        <span>Facebook Oficial</span>
                    </a>
                </div>
            </div>
        </div>
    </section>`;

// 10. Footer Section
const footerHtml = `    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="#inicio" class="footer-logo">
                        <img src="assets/kanji_stamp.webp" alt="Sello Kanji La Ruta del Samurái" class="footer-logo-stamp">
                        <span>La Ruta del Samurái</span>
                    </a>
                    <p>Viajes históricos y crónicas por la senda de los guerreros budoka de Japón.</p>
                    <div class="footer-social-icons">
                        <a href="https://www.instagram.com/la.ruta.del.samurai/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@larutadelsamurai" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="YouTube">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/jorgeorpianesi" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#sinopsis">El Libro</a></li>
                        <li><a href="#opiniones">Opiniones</a></li>
                        <li><a href="#redes">Redes Sociales</a></li>
                        <li><a href="#ediciones">Ediciones</a></li>
                        <li><a href="#autor">Autor</a></li>
                        <li><a href="#galeria">Galería</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Contacto</h4>
                    <ul>
                        <li><a href="https://wa.me/5493513886443" target="_blank" rel="noopener">WhatsApp: +549 351 3886443</a></li>
                        <li><a href="mailto:jorgeorpianesi@hotmail.com">jorgeorpianesi@hotmail.com</a></li>
                        <li><span>Budokan: Sarmiento 375, Córdoba</span></li>
                        <li><span>República Argentina · CP: 5000</span></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 La Ruta del Samurái. Todos los derechos reservados. Libros oficiales de Jorge Orpianesi.</p>
            </div>
        </div>
    </footer>

    <!-- Lightbox Modal para la Galería con Controles de Desplazamiento -->
    <div class="gallery-lightbox" id="gallery-lightbox" aria-hidden="true" role="dialog">
        <div class="lightbox-backdrop" id="lightbox-backdrop"></div>
        <div class="lightbox-container">
            <button class="lightbox-close" id="lightbox-close" aria-label="Cerrar vista">&times;</button>
            <span class="lightbox-counter" id="lightbox-counter">1 / 1</span>
            
            <button class="lightbox-nav-btn lightbox-prev" id="lightbox-prev" aria-label="Foto anterior" title="Foto anterior (Flecha izquierda)">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            </button>
            <button class="lightbox-nav-btn lightbox-next" id="lightbox-next" aria-label="Foto siguiente" title="Foto siguiente (Flecha derecha)">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>

            <div class="lightbox-media-wrapper">
                <img src="" alt="Vista ampliada" id="lightbox-img">
            </div>

            <div class="lightbox-info">
                <span class="lightbox-tag" id="lightbox-tag"></span>
                <h3 class="lightbox-title" id="lightbox-title"></h3>
            </div>
        </div>
    </div>

    <!-- Botón Flotante Scroll to Top -->
    <button id="scroll-top" aria-label="Volver arriba">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    </button>`;

// Documento HTML Completo Unificado
const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#07080a">
    <title>${e(pageTitle)}</title>
    <meta name="description" content="${e(pageDesc)}">
    <meta name="keywords" content="samurai, bushido, libro, jorge orpianesi, la ruta del samurai, el paso de las luciernagas, japon para budokas, artes marciales, japon, miyamoto musashi">
    <meta name="author" content="Jorge Orpianesi">
    <link rel="canonical" href="https://larutadelsamurai.com/">
    <link rel="icon" type="image/webp" href="assets/kanji_stamp.webp">
    <link rel="shortcut icon" href="assets/kanji_stamp.webp">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Redes Sociales -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${e(pageTitle)}">
    <meta property="og:description" content="${e(pageDesc)}">
    <meta property="og:image" content="https://larutadelsamurai.com/assets/logo_typography_dark.webp">
    <meta property="og:url" content="https://larutadelsamurai.com/">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${e(pageTitle)}">
    <meta name="twitter:description" content="${e(pageDesc)}">
    <meta name="twitter:image" content="https://larutadelsamurai.com/assets/logo_typography_dark.webp">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Hojas de Estilo Oficiales -->
    <link rel="stylesheet" href="styles.css">
</head>
<body data-theme-default="day" data-reviews-filter="${e(defaultReviewFilter)}">

    <!-- Canvas para pétalos de sakura -->
    <canvas id="sakura-canvas"></canvas>

    <!-- Header / Navbar -->
    <header class="navbar" id="navbar" role="banner">
        <div class="nav-container">
            <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="nav-menu" id="nav-menu" role="navigation" aria-label="Menú principal">
                <ul>
${navItemsHtml}
                </ul>
            </nav>
        </div>
    </header>

    <main id="main">
${heroHtml}

${sinopsisHtml}

${opinionesHtml}

${redesHtml}

${edicionesHtml}

${autorHtml}

${galeriaHtml}

${blogHtml}

${contactoHtml}
    </main>

${footerHtml}

    <!-- Motor JavaScript Principal Unificado -->
    <script type="module" src="script.js"></script>
</body>
</html>
`;

// Escribir index.html
fs.writeFileSync(path.join(rootDir, 'index.html'), fullHtml, 'utf-8');
console.log('✅ index.html sincronizado con éxito!');

// Sincronizar styles.css desde css/styles.css
fs.copyFileSync(path.join(rootDir, 'css', 'styles.css'), path.join(rootDir, 'styles.css'));
console.log('✅ styles.css sincronizado desde css/styles.css!');

// Sincronizar script.js desde js/main.js
fs.copyFileSync(path.join(rootDir, 'js', 'main.js'), path.join(rootDir, 'script.js'));
console.log('✅ script.js sincronizado desde js/main.js!');
