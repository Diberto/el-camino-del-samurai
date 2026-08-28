/**
 * EL CAMINO DEL SAMURÁI - JAVASCRIPT NATIVO LIGERO
 * Ultra-compatible con Samsung Galaxy, iPhone y todos los navegadores modernos.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Móvil Hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. Selector de Tomos y Volteo de Portadas (El Libro / Sinopsis)
    const tomoTabs = document.querySelectorAll('.tomo-tab');
    const tomo1Display = document.getElementById('display-tomo-1');
    const tomo2Display = document.getElementById('display-tomo-2');

    tomoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tomoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tomoNum = tab.getAttribute('data-tomo');
            if (tomoNum === '1') {
                if (tomo1Display) tomo1Display.style.display = 'block';
                if (tomo2Display) tomo2Display.style.display = 'none';
            } else {
                if (tomo1Display) tomo1Display.style.display = 'none';
                if (tomo2Display) tomo2Display.style.display = 'block';
            }
        });
    });

    // Botones de volteo de portadas
    const flipButtons = document.querySelectorAll('.btn-flip-cover');
    flipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const frontSrc = btn.getAttribute('data-front');
            const backSrc = btn.getAttribute('data-back');
            const imgEl = document.getElementById(targetId);

            if (imgEl) {
                const currentSrc = imgEl.getAttribute('src');
                if (currentSrc.includes('front')) {
                    imgEl.src = backSrc;
                    btn.textContent = '🔄 Ver Portada Frontal';
                } else {
                    imgEl.src = frontSrc;
                    btn.textContent = '🔄 Ver Contraportada';
                }
            }
        });
    });

    // 3. Filtro de Opiniones de Lectores
    const filterButtons = document.querySelectorAll('.btn-filter');
    const reviewCards = document.querySelectorAll('.review-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterType = btn.getAttribute('data-filter');
            reviewCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (filterType === 'all' || cardType === filterType) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Lightbox Modal para Fotos de Lectores y Galería
    const lightbox = document.getElementById('samurai-lightbox');
    const lightboxImg = document.getElementById('lightbox-zoom-img');
    const lightboxTitle = document.getElementById('lightbox-zoom-title');
    const lightboxTag = document.getElementById('lightbox-zoom-tag');
    const lightboxClose = document.getElementById('lightbox-close-btn');

    function openLightbox(src, title, tag) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title || 'Fotografía de la Expedición';
        if (lightboxTag) lightboxTag.textContent = tag || '📸 Fotografía';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Abrir desde opiniones con fotos
    document.querySelectorAll('.review-photo-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const src = wrapper.getAttribute('data-src');
            const title = wrapper.getAttribute('data-title');
            if (src) openLightbox(src, title, '📸 Lector Verificado');
        });
    });

    // Abrir desde galería de fotos
    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-src');
            const title = card.getAttribute('data-title');
            const tag = card.getAttribute('data-tag');
            if (src) openLightbox(src, title, tag);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        const backdrop = lightbox.querySelector('.lightbox-backdrop');
        if (backdrop) backdrop.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 5. Botón Volver Arriba (Scroll to Top)
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
