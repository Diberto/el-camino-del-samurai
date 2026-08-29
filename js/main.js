/**
 * ============================================================================
 * LA RUTA DEL SAMURÁI - MASTER INTERACTIVE ENGINE (PHP SSR NATIVE VERSION)
 * ============================================================================
 * Incluye:
 * 1. Selector de Tema Día / Noche (Theme Cycle + Kanji Indicators)
 * 2. Motor Parallax Multicapa 3D (SVG Layers 1-8 + Mouse & Scroll Tracking)
 * 3. Motor de Nubes Volumétricas (Dual Layer Canvas Engine)
 * 4. Motor de Campo Estelar y Estrellas Fugaces (Starfield Canvas Engine)
 * 5. Motor de Pétalos de Sakura Flotantes (Cherry Blossom Particles)
 * 6. Visor de Libros 3D Interactivo (Perspective Drag & Flip System)
 * 7. Filtro de Opiniones de Lectores (All / Photo / Text)
 * 8. Lightbox Modal de Alta Resolución para Galería y Opiniones
 * 9. Navegación Activa y Scroll Reveal Observer (.fade-in con Fallback)
 * 10. Botón Scroll to Top & Menú Móvil
 */

document.addEventListener('DOMContentLoaded', () => {

    const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isAppTabVisible = !document.hidden;
    let isHeroVisible = true;
    let isBookVisible = true;

    document.addEventListener('visibilitychange', () => {
        isAppTabVisible = !document.hidden;
    });

    // =========================================================================
    // 1. SELECTOR DE TEMA DÍA / NOCHE (DAY / NIGHT THEME SYSTEM)
    // =========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const heroLogoImg = document.getElementById('hero-logo-main');
    const savedTheme = localStorage.getItem('theme_mode');
    const defaultThemeConfig = document.body.getAttribute('data-theme-default') || 'day';
    
    let initialNightMode = false;
    if (savedTheme) {
        initialNightMode = (savedTheme === 'night');
    } else {
        if (defaultThemeConfig === 'night') {
            initialNightMode = true;
        } else if (defaultThemeConfig === 'time') {
            const hour = new Date().getHours();
            initialNightMode = (hour < 6 || hour >= 19);
        } else if (defaultThemeConfig === 'device') {
            initialNightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            // 'day' o por defecto
            initialNightMode = false;
        }
    }
    
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
    // 2. MENÚ MÓVIL HAMBURGUESA & NAVEGACIÓN ACTIVA
    // =========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

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

    // Manejo inteligente de anclas con scroll suave y compensación del navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 70;
                const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // Desplazamiento automático si se llega con hash desde otra página (ej: index.php#sinopsis)
    if (window.location.hash) {
        setTimeout(() => {
            try {
                const targetEl = document.querySelector(window.location.hash);
                if (targetEl) {
                    const navHeight = navbar ? navbar.offsetHeight : 70;
                    const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            } catch (err) {}
        }, 120);
    }

    // Scroll Navbar Effect & Active Section Tracker
    function handleScrollEffects() {
        const scrollY = window.scrollY;
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        const sections = document.querySelectorAll('section[id]');
        const allNavLinks = document.querySelectorAll('#nav-menu a');
        let currentSectionId = '';

        sections.forEach(current => {
            if (current.style.display === 'none') return;
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentSectionId && (href === `#${currentSectionId}` || href === `index.php#${currentSectionId}`)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    handleScrollEffects();

    // =========================================================================
    // 3. PARALLAX MULTICAPA 3D (MOUSE & SCROLL TRACKING ENGINE)
    // =========================================================================
    const layerSvg1 = document.querySelector('.layer-svg-1');
    const layerCloudsFg = document.querySelector('.layer-clouds-fg');
    const layerSvg2 = document.querySelector('.layer-svg-2');
    const layerSvg3 = document.querySelector('.layer-svg-3');
    const layerSvg4 = document.querySelector('.layer-svg-4');
    const layerSvg5 = document.querySelector('.layer-svg-5');
    const layerSvg6 = document.querySelector('.layer-svg-6');
    const layerSvg7 = document.querySelector('.layer-svg-7');
    const layerSvg8 = document.querySelector('.layer-svg-8');
    const layerText = document.querySelector('.hero-content');

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    const lerpFactor = 0.08;

    if (!isMobileDevice && !prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        }, { passive: true });

        function animateParallax() {
            if (isAppTabVisible && isHeroVisible) {
                mouseX += (targetMouseX - mouseX) * lerpFactor;
                mouseY += (targetMouseY - mouseY) * lerpFactor;

                const scrollY = window.scrollY;
                if (scrollY < window.innerHeight) {
                    const mSvg1X = mouseX * -22, mSvg1Y = mouseY * -14;
                    const mCloudsFgX = mouseX * -18, mCloudsFgY = mouseY * -11;
                    const mSvg2X = mouseX * -16, mSvg2Y = mouseY * -10;
                    const mSvg3X = mouseX * -10, mSvg3Y = mouseY * -6;
                    const mSvg4X = mouseX * -5, mSvg4Y = mouseY * -3;
                    const mSvg5X = mouseX * 8, mSvg5Y = mouseY * 5;
                    const mSvg6X = mouseX * 16, mSvg6Y = mouseY * 10;
                    const mSvg7X = mouseX * 24, mSvg7Y = mouseY * 15;
                    const mTextX = mouseX * 8, mTextY = mouseY * 4;

                    const sSvg1Y = scrollY * 0.38;
                    const sCloudsFgY = scrollY * 0.34;
                    const sSvg2Y = scrollY * 0.30;
                    const sSvg3Y = scrollY * 0.22;
                    const sSvg4Y = scrollY * 0.16;
                    const sSvg5Y = scrollY * 0.10;
                    const sSvg6Y = scrollY * 0.06;
                    const sSvg7Y = scrollY * 0.02;
                    const sTextY = scrollY * 0.18;

                    if (layerSvg1) layerSvg1.style.transform = `translate3d(${mSvg1X}px, ${sSvg1Y + mSvg1Y}px, 0) scale(1.05)`;
                    if (layerCloudsFg) layerCloudsFg.style.transform = `translate3d(${mCloudsFgX}px, ${sCloudsFgY + mCloudsFgY}px, 0) scale(1.04)`;
                    if (layerSvg2) layerSvg2.style.transform = `translate3d(${mSvg2X}px, ${sSvg2Y + mSvg2Y}px, 0) scale(1.04)`;
                    if (layerSvg3) layerSvg3.style.transform = `translate3d(${mSvg3X}px, ${sSvg3Y + mSvg3Y}px, 0) scale(1.03)`;
                    if (layerSvg4) layerSvg4.style.transform = `translate3d(${mSvg4X}px, ${sSvg4Y + mSvg4Y}px, 0) scale(1.02)`;
                    if (layerSvg5) layerSvg5.style.transform = `translate3d(${mSvg5X}px, ${sSvg5Y + mSvg5Y}px, 0) scale(1.02)`;
                    if (layerSvg6) layerSvg6.style.transform = `translate3d(${mSvg6X}px, ${sSvg6Y + mSvg6Y}px, 0) scale(1.01)`;
                    if (layerSvg7) layerSvg7.style.transform = `translate3d(${mSvg7X}px, ${sSvg7Y + mSvg7Y}px, 0) scale(1.01)`;
                    if (layerSvg8) layerSvg8.style.transform = `translate3d(${mSvg7X * 1.2}px, ${sSvg7Y + mSvg7Y * 1.2}px, 0) scale(1.01)`;
                    if (layerText) layerText.style.transform = `translate3d(${mTextX}px, ${sTextY + mTextY}px, 0)`;
                }
            }
            requestAnimationFrame(animateParallax);
        }
        animateParallax();
    }

    // =========================================================================
    // 4. MOTOR DE NUBES VOLUMÉTRICAS (DUAL CANVAS CLOUDS ENGINE)
    // =========================================================================
    function initVolumetricClouds() {
        const bgCanvas = document.getElementById('clouds-bg-canvas');
        const fgCanvas = document.getElementById('clouds-fg-canvas');
        if (!bgCanvas && !fgCanvas) return;
        if (isMobileDevice) return;

        let bgCtx = bgCanvas ? bgCanvas.getContext('2d', { alpha: true }) : null;
        let fgCtx = fgCanvas ? fgCanvas.getContext('2d', { alpha: true }) : null;
        if (!bgCtx && !fgCtx) return;

        let width = Math.ceil(window.innerWidth * 1.3);
        let height = Math.ceil(window.innerHeight * 1.3);
        if (bgCanvas) { bgCanvas.width = width; bgCanvas.height = height; }
        if (fgCanvas) { fgCanvas.width = width; fgCanvas.height = height; }

        window.addEventListener('resize', () => {
            width = Math.ceil(window.innerWidth * 1.3);
            height = Math.ceil(window.innerHeight * 1.3);
            if (bgCanvas) { bgCanvas.width = width; bgCanvas.height = height; }
            if (fgCanvas) { fgCanvas.width = width; fgCanvas.height = height; }
        }, { passive: true });

        const textures = [];
        const textureUrls = [
            'assets/cloud_texture_1.webp',
            'assets/cloud_texture_2.webp',
            'assets/cloud_texture_3.webp'
        ];

        let loadedCount = 0;
        let isStarted = false;

        function startClouds() {
            if (isStarted) return;
            isStarted = true;
            setupCloudParticles();
            requestAnimationFrame(animateClouds);
        }

        textureUrls.forEach(url => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount >= 1) startClouds();
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount >= 1) startClouds();
            };
            img.src = url;
            textures.push(img);
        });

        setTimeout(startClouds, 400);

        const bgClouds = [];
        const fgClouds = [];

        function setupCloudParticles() {
            const activeTextures = textures.filter(t => t.complete && t.naturalWidth > 0);
            const pool = activeTextures.length > 0 ? activeTextures : textures;

            for (let i = 0; i < 12; i++) {
                bgClouds.push({
                    x: Math.random() * (width + 600) - 300,
                    y: Math.random() * (height * 0.48) - 40,
                    texture: pool[Math.floor(Math.random() * pool.length)],
                    scaleX: Math.random() * 0.7 + 0.8,
                    scaleY: Math.random() * 0.5 + 0.6,
                    speedX: Math.random() * 0.35 + 0.15,
                    opacity: Math.random() * 0.28 + 0.22,
                    swayOffset: Math.random() * Math.PI * 2,
                    swaySpeed: Math.random() * 0.008 + 0.003
                });
            }

            for (let i = 0; i < 8; i++) {
                fgClouds.push({
                    x: Math.random() * (width + 800) - 400,
                    y: Math.random() * (height * 0.40) + 10,
                    texture: pool[Math.floor(Math.random() * pool.length)],
                    scaleX: Math.random() * 0.8 + 0.7,
                    scaleY: Math.random() * 0.4 + 0.5,
                    speedX: Math.random() * 0.6 + 0.3,
                    opacity: Math.random() * 0.32 + 0.25,
                    swayOffset: Math.random() * Math.PI * 2,
                    swaySpeed: Math.random() * 0.012 + 0.004
                });
            }
        }

        let time = 0;
        function animateClouds() {
            if (isAppTabVisible && isHeroVisible && !prefersReducedMotion) {
                time += 0.016;

                if (bgCtx) {
                    bgCtx.clearRect(0, 0, width, height);
                    for (let i = 0; i < bgClouds.length; i++) {
                        const c = bgClouds[i];
                        c.x += c.speedX;
                        const swayY = Math.sin(time * c.swaySpeed + c.swayOffset) * 8;
                        if (c.x > width + 400) {
                            c.x = -500;
                            c.y = Math.random() * (height * 0.48) - 40;
                        }
                        if (c.texture && c.texture.complete && c.texture.naturalWidth > 0) {
                            bgCtx.save();
                            bgCtx.globalAlpha = c.opacity;
                            bgCtx.translate(c.x, c.y + swayY);
                            bgCtx.scale(c.scaleX, c.scaleY);
                            bgCtx.drawImage(c.texture, -c.texture.width / 2, -c.texture.height / 2);
                            bgCtx.restore();
                        }
                    }
                }

                if (fgCtx) {
                    fgCtx.clearRect(0, 0, width, height);
                    for (let i = 0; i < fgClouds.length; i++) {
                        const c = fgClouds[i];
                        c.x += c.speedX;
                        const swayY = Math.sin(time * c.swaySpeed + c.swayOffset) * 12;
                        if (c.x > width + 500) {
                            c.x = -600;
                            c.y = Math.random() * (height * 0.40) + 10;
                        }
                        if (c.texture && c.texture.complete && c.texture.naturalWidth > 0) {
                            fgCtx.save();
                            fgCtx.globalAlpha = c.opacity;
                            fgCtx.translate(c.x, c.y + swayY);
                            fgCtx.scale(c.scaleX, c.scaleY);
                            fgCtx.drawImage(c.texture, -c.texture.width / 2, -c.texture.height / 2);
                            fgCtx.restore();
                        }
                    }
                }
            }
            requestAnimationFrame(animateClouds);
        }
    }
    initVolumetricClouds();

    // =========================================================================
    // 5. MOTOR DE CAMPO ESTELAR (STARFIELD & SHOOTING STARS)
    // =========================================================================
    function initStarfield() {
        const canvas = document.getElementById('starfield-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createStars();
        }, { passive: true });

        let stars = [];
        function createStars() {
            stars = [];
            const numStars = isMobileDevice ? 30 : 100;
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * (height * 0.75),
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random(),
                    speed: Math.random() * 0.02 + 0.005,
                    direction: Math.random() > 0.5 ? 1 : -1
                });
            }
        }
        createStars();

        let shootingStar = null;
        function spawnShootingStar() {
            shootingStar = {
                x: Math.random() * width * 0.8,
                y: Math.random() * height * 0.3,
                length: Math.random() * 80 + 40,
                speed: Math.random() * 10 + 12,
                angle: Math.PI / 4,
                alpha: 1
            };
        }

        setInterval(() => {
            if (document.body.classList.contains('theme-night') && !shootingStar && Math.random() > 0.4) {
                spawnShootingStar();
            }
        }, 6000);

        function animateStars() {
            if (isAppTabVisible && isHeroVisible) {
                ctx.clearRect(0, 0, width, height);

                if (document.body.classList.contains('theme-night')) {
                    for (let i = 0; i < stars.length; i++) {
                        const star = stars[i];
                        star.alpha += star.speed * star.direction;
                        if (star.alpha >= 1 || star.alpha <= 0.1) star.direction *= -1;

                        ctx.beginPath();
                        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(225, 235, 255, ${star.alpha})`;
                        ctx.fill();
                    }

                    if (shootingStar) {
                        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
                        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
                        shootingStar.alpha -= 0.015;

                        ctx.beginPath();
                        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
                        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

                        const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
                        grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
                        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 2;
                        ctx.moveTo(shootingStar.x, shootingStar.y);
                        ctx.lineTo(tailX, tailY);
                        ctx.stroke();

                        if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
                            shootingStar = null;
                        }
                    }
                }
            }
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }
    initStarfield();

    // =========================================================================
    // 6. MOTOR DE PÉTALOS DE SAKURA (CHERRY BLOSSOM PARTICLES)
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

        const petalCount = window.innerWidth < 768 ? 14 : 28;
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
            if (isAppTabVisible) {
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

                    ctx.beginPath();
                    ctx.fillStyle = '#ffb7c5';
                    ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
                    ctx.fill();

                            ctx.restore();
                }
            }
            requestAnimationFrame(renderSakura);
        }
        renderSakura();
    }

    // =========================================================================
    // 7. MOTOR INTERACTIVO DEL LIBRO 3D (3D DYNAMIC BOOK SHOWCASE)
    // =========================================================================
    const tomoTabs = document.querySelectorAll('.tomo-tab');
    const tomoStages = document.querySelectorAll('.tomo-stage');
    const bookCards = document.querySelectorAll('.book-3d-card');
    const btnFlip = document.getElementById('btn-flip-single');
    const btnFlipText = document.getElementById('btn-flip-text');

    let activeTomoIdx = 1;
    let isFlipped = false;

    tomoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tomoTabs.forEach(t => {
                t.classList.remove('active', 'btn-primary');
                t.classList.add('btn-secondary');
            });
            tab.classList.add('active', 'btn-primary');
            tab.classList.remove('btn-secondary');

            activeTomoIdx = parseInt(tab.getAttribute('data-tomo') || '1');
            tomoStages.forEach((stage, idx) => {
                if (idx + 1 === activeTomoIdx) {
                    stage.style.display = 'flex';
                    stage.classList.add('active');
                } else {
                    stage.style.display = 'none';
                    stage.classList.remove('active');
                }
            });
            resetBookRotation();
        });
    });

    function resetBookRotation() {
        isFlipped = false;
        if (btnFlipText) btnFlipText.textContent = 'Girar a Contraportada';
        bookCards.forEach(card => {
            if (card) {
                card.style.transform = 'rotateY(0deg) rotateX(0deg)';
                card.setAttribute('data-rotated', 'false');
            }
        });
    }

    if (btnFlip) {
        btnFlip.addEventListener('click', () => {
            const currentCard = document.getElementById(`book-card-${activeTomoIdx}`);
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

    bookCards.forEach(card => {
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
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
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
    // 8. FILTROS DE OPINIONES DE LECTORES (REVIEWS FILTER)
    // =========================================================================
    const filterBtns = document.querySelectorAll('.review-filter-btn');
    const reviewCards = document.querySelectorAll('.review-card');

    function applyReviewFilter(filter) {
        filterBtns.forEach(b => {
            if (b.getAttribute('data-filter') === filter) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        reviewCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            if (filter === 'all' || cardType === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter') || 'all';
            applyReviewFilter(filter);
        });
    });

    const defaultReviewFilter = document.body.getAttribute('data-reviews-filter') || 'text';
    if (filterBtns.length > 0 && reviewCards.length > 0) {
        applyReviewFilter(defaultReviewFilter);
    }

    // =========================================================================
    // 9. LIGHTBOX MODAL PARA GALERÍA Y OPINIONES
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
    // 10. SCROLL REVEAL & FADE-IN ANIMATION SYSTEM (INTERSECTION OBSERVER)
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

    // Safety fallback: Asegurar visibilidad inmediata para navegadores antiguos
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('appear'));
    }, 300);

    // =========================================================================
    // 11. BOTÓN VOLVER ARRIBA (SCROLL TO TOP)
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
});
