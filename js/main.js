/**
 * LA RUTA DEL SAMURÁI - INTERACTIVE EXPERIENCE ENGINE (PHP NATIVE VERSION)
 * Motor interactivo completo con efectos 3D, pétalos sakura, selector Día/Noche y filtros.
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. SELECTOR DE TEMA DÍA / NOCHE (DAY / NIGHT THEME SYSTEM)
    // =========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const heroLogoImg = document.getElementById('hero-logo-main');
    const savedTheme = localStorage.getItem('theme_mode');
    
    // Si no hay preferencia guardada, verificar hora local (Noche: antes de 6am o después de 7pm)
    const hour = new Date().getHours();
    const isNightTime = hour < 6 || hour >= 19;
    const initialNightMode = savedTheme === 'night' || (!savedTheme && isNightTime);
    
    if (initialNightMode) {
        document.body.classList.add('theme-night');
    } else {
        document.body.classList.remove('theme-night');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-night');
            const isNight = document.body.classList.contains('theme-night');
            localStorage.setItem('theme_mode', isNight ? 'night' : 'day');
        });
    }

    // =========================================================================
    // 2. MENÚ MÓVIL HAMBURGUESA
    // =========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // =========================================================================
    // 3. MOTOR INTERACTIVO DEL LIBRO 3D (3D INTERACTIVE BOOK ENGINE)
    // =========================================================================
    const tomoTabs = document.querySelectorAll('.tomo-tab');
    const stage1 = document.getElementById('stage-tomo-1');
    const stage2 = document.getElementById('stage-tomo-2');
    const card1 = document.getElementById('book-card-1');
    const card2 = document.getElementById('book-card-2');
    const btnFlip = document.getElementById('btn-flip-single');
    const btnFlipText = document.getElementById('btn-flip-text');

    let activeTomo = 1;
    let isFlipped = false;

    // Cambio de Tomo I y Tomo II
    tomoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tomoTabs.forEach(t => {
                t.classList.remove('active', 'btn-primary');
                t.classList.add('btn-secondary');
            });
            tab.classList.add('active', 'btn-primary');
            tab.classList.remove('btn-secondary');

            activeTomo = parseInt(tab.getAttribute('data-tomo') || '1');
            if (activeTomo === 1) {
                if (stage1) stage1.style.display = 'block';
                if (stage2) stage2.style.display = 'none';
            } else {
                if (stage1) stage1.style.display = 'none';
                if (stage2) stage2.style.display = 'block';
            }
            resetBookRotation();
        });
    });

    function resetBookRotation() {
        isFlipped = false;
        if (btnFlipText) btnFlipText.textContent = 'Girar a Contraportada';
        [card1, card2].forEach(card => {
            if (card) {
                card.style.transform = 'rotateY(0deg) rotateX(0deg)';
                card.setAttribute('data-rotated', 'false');
            }
        });
    }

    // Botón de rotación 180° frontal / contraportada
    if (btnFlip) {
        btnFlip.addEventListener('click', () => {
            const currentCard = activeTomo === 1 ? card1 : card2;
            if (!currentCard) return;

            isFlipped = !isFlipped;
            if (isFlipped) {
                currentCard.style.transform = 'rotateY(180deg) rotateX(0deg)';
                currentCard.setAttribute('data-rotated', 'true');
                if (btnFlipText) btnFlipText.textContent = 'Girar a Portada';
            } else {
                currentCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
                currentCard.setAttribute('data-rotated', 'false');
                if (btnFlipText) btnFlipText.textContent = 'Girar a Contraportada';
            }
        });
    }

    // Rotación 3D táctil y con cursor (Drag rotation)
    [card1, card2].forEach(card => {
        if (!card) return;
        let isDragging = false;
        let startX = 0, startY = 0;
        let currentRotY = 0, currentRotX = 0;

        function startDrag(e) {
            isDragging = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            startX = clientX;
            startY = clientY;
            card.style.transition = 'none';
        }

        function moveDrag(e) {
            if (!isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            currentRotY = (deltaX * 0.4) + (isFlipped ? 180 : 0);
            currentRotX = -deltaY * 0.25;

            card.style.transform = `rotateY(${currentRotY}deg) rotateX(${currentRotX}deg)`;
        }

        function stopDrag() {
            if (!isDragging) return;
            isDragging = false;
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            if (Math.abs(currentRotY) > 90 && !isFlipped) {
                isFlipped = true;
                card.style.transform = 'rotateY(180deg) rotateX(0deg)';
                if (btnFlipText) btnFlipText.textContent = 'Girar a Portada';
            } else if (Math.abs(currentRotY) < 90 && isFlipped) {
                isFlipped = false;
                card.style.transform = 'rotateY(0deg) rotateX(0deg)';
                if (btnFlipText) btnFlipText.textContent = 'Girar a Contraportada';
            } else {
                card.style.transform = isFlipped ? 'rotateY(180deg) rotateX(0deg)' : 'rotateY(0deg) rotateX(0deg)';
            }
        }

        card.addEventListener('mousedown', startDrag);
        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('mouseup', stopDrag);

        card.addEventListener('touchstart', startDrag, { passive: true });
        window.addEventListener('touchmove', moveDrag, { passive: true });
        window.addEventListener('touchend', stopDrag);
    });

    // =========================================================================
    // 4. FILTROS DE OPINIONES DE LECTORES (REVIEWS FILTER)
    // =========================================================================
    const filterBtns = document.querySelectorAll('.review-filter-btn');
    const reviewCards = document.querySelectorAll('.review-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter') || 'all';
            reviewCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (filter === 'all' || cardType === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // =========================================================================
    // 5. LIGHTBOX MODAL PARA GALERÍA Y FOTOS DE LECTORES
    // =========================================================================
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');

    function openLightbox(src, title, tag) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title || '';
        if (lightboxTag) {
            lightboxTag.textContent = tag || '';
            lightboxTag.style.display = tag ? 'inline-block' : 'none';
        }
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

    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-src') || card.querySelector('img')?.src;
            const title = card.getAttribute('data-title') || card.querySelector('.gallery-card-title')?.textContent;
            const tag = card.getAttribute('data-tag') || card.querySelector('.gallery-tag')?.textContent;
            if (src) openLightbox(src, title, tag);
        });
    });

    document.querySelectorAll('.review-photo-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const src = wrapper.getAttribute('data-src') || wrapper.querySelector('img')?.src;
            const title = wrapper.getAttribute('data-title') || 'Lector con el libro';
            if (src) openLightbox(src, title, '📸 Testimonio');
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // =========================================================================
    // 6. BOTÓN VOLVER ARRIBA (SCROLL TO TOP)
    // =========================================================================
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================================================
    // 7. MOTOR DE PÉTALOS DE SAKURA EN CANVAS 2D (CHERRY BLOSSOM PARTICLES)
    // =========================================================================
    const sakuraCanvas = document.getElementById('sakura-canvas');
    if (sakuraCanvas) {
        const ctx = sakuraCanvas.getContext('2d');
        let width = sakuraCanvas.width = window.innerWidth;
        let height = sakuraCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = sakuraCanvas.width = window.innerWidth;
            height = sakuraCanvas.height = window.innerHeight;
        }, { passive: true });

        const petalCount = window.innerWidth < 768 ? 15 : 30;
        const petals = [];

        for (let i = 0; i < petalCount; i++) {
            petals.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 8 + 6,
                speedX: Math.random() * 1.5 - 0.5,
                speedY: Math.random() * 1.2 + 0.8,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.03,
                opacity: Math.random() * 0.5 + 0.35,
                swayOffset: Math.random() * Math.PI * 2
            });
        }

        let time = 0;
        function renderSakura() {
            ctx.clearRect(0, 0, width, height);
            time += 0.02;

            for (let i = 0; i < petals.length; i++) {
                const p = petals[i];
                p.x += p.speedX + Math.sin(time + p.swayOffset) * 0.6;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                if (p.y > height + 20) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }
                if (p.x > width + 20) p.x = -20;
                if (p.x < -20) p.x = width + 20;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = p.opacity;

                // Dibujar forma de pétalo orgánico sakura
                ctx.beginPath();
                ctx.fillStyle = '#ffb7c5';
                ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
            requestAnimationFrame(renderSakura);
        }
        renderSakura();
    }

    // =========================================================================
    // 8. SCROLL REVEAL & FADE-IN ANIMATION SYSTEM (INTERSECTION OBSERVER)
    // =========================================================================
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            threshold: 0.02,
            rootMargin: "0px 0px 100px 0px"
        };

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => fadeObserver.observe(el));
    } else {
        fadeElements.forEach(el => el.classList.add('appear'));
    }

    // Fallback de seguridad inmediato para garantizar que ninguna sección quede oculta
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('appear'));
    }, 300);
});
