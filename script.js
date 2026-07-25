/* ==========================================================================
   EL CAMINO DEL SAMURAI - INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 0. DAY/NIGHT THEME CONTROLLER
    function initDayNightCycle() {
        const toggleBtn = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('theme_mode');
        
        // Auto-detect local time if no saved preference (Day: 6AM - 7PM)
        const hour = new Date().getHours();
        const isNightTime = hour < 6 || hour >= 19;
        
        const initialNightMode = savedTheme === 'night' || (!savedTheme && isNightTime);
        
        if (initialNightMode) {
            document.body.classList.add('theme-night');
        } else {
            document.body.classList.remove('theme-night');
        }
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('theme-night');
                const isNight = document.body.classList.contains('theme-night');
                localStorage.setItem('theme_mode', isNight ? 'night' : 'day');
            });
        }
    }
    
    initDayNightCycle();

    // 0.1 STARFIELD CANVAS ANIMATION (NIGHT MODE - GPU ACCELERATED WITH FALLBACK)
    function initStarfield() {
        const canvas = document.getElementById('starfield-canvas');
        if (!canvas) return;
        
        let ctx = null;
        try {
            // Attempt hardware-accelerated 2D context
            ctx = canvas.getContext('2d', { alpha: true, desynchronized: true, willReadFrequently: false });
        } catch (err) {
            ctx = canvas.getContext('2d');
        }
        
        if (!ctx) return; // Fallback if Canvas context is unsupported
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createStars();
        });
        
        let stars = [];
        const numStars = 130;
        
        function createStars() {
            stars = [];
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
        }, 5000);
        
        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            
            if (document.body.classList.contains('theme-night')) {
                // Draw Stars
                for (let i = 0; i < stars.length; i++) {
                    const star = stars[i];
                    star.alpha += star.speed * star.direction;
                    if (star.alpha >= 1 || star.alpha <= 0.1) {
                        star.direction *= -1;
                    }
                    
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(225, 235, 255, ${star.alpha})`;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = '#ffffff';
                    ctx.fill();
                }
                
                // Draw Shooting Star
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
            
            requestAnimationFrame(animateStars);
        }
        
        animateStars();
    }
    
    initStarfield();

    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. NAVBAR SCROLL EFFECT & ACTIVE STATE
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');

    function handleScrollEffects() {
        const scrollY = window.scrollY;

        // Navbar class change
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScrollEffects);
    handleScrollEffects(); // Trigger once on load

    // 3. SVG MULTI-LAYER PARALLAX (MOUSE + SCROLL - GPU ACCELERATED)
    const hero = document.getElementById('inicio');
    const layerSvg1 = document.querySelector('.layer-svg-1');
    const layerSvg2 = document.querySelector('.layer-svg-2');
    const layerSvg3 = document.querySelector('.layer-svg-3');
    const layerSvg4 = document.querySelector('.layer-svg-4');
    const layerSvg5 = document.querySelector('.layer-svg-5');
    const layerSvg6 = document.querySelector('.layer-svg-6');
    const layerSvg7 = document.querySelector('.layer-svg-7');
    const layerSvg8 = document.querySelector('.layer-svg-8');
    const layerText = document.querySelector('.hero-content');

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const lerpFactor = 0.08;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    }, { passive: true });

    function animateParallax() {
        mouseX += (targetMouseX - mouseX) * lerpFactor;
        mouseY += (targetMouseY - mouseY) * lerpFactor;

        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight) {
            // Mouse multipliers (layered depth)
            const mSvg1X = mouseX * -22; // Monte Fuji
            const mSvg1Y = mouseY * -14;

            const mSvg2X = mouseX * -16; // Río / Camino
            const mSvg2Y = mouseY * -10;

            const mSvg3X = mouseX * -10; // Terreno rocoso
            const mSvg3Y = mouseY * -6;

            const mSvg4X = mouseX * -5;  // Samurái en acantilado
            const mSvg4Y = mouseY * -3;

            const mSvg5X = mouseX * 8;   // Anillo Enso
            const mSvg5Y = mouseY * 5;

            const mSvg6X = mouseX * 16;  // Rama de Sakura
            const mSvg6Y = mouseY * 10;

            const mSvg7X = mouseX * 24;  // Pétalos flotantes
            const mSvg7Y = mouseY * 15;

            const mTextX = mouseX * 8;
            const mTextY = mouseY * 4;

            // Scroll position multipliers
            const sSvg1Y = scrollY * 0.38;
            const sSvg2Y = scrollY * 0.30;
            const sSvg3Y = scrollY * 0.22;
            const sSvg4Y = scrollY * 0.16;
            const sSvg5Y = scrollY * 0.10;
            const sSvg6Y = scrollY * 0.06;
            const sSvg7Y = scrollY * 0.02;
            const sTextY = scrollY * 0.18;

            if (layerSvg1) layerSvg1.style.transform = `translate3d(${mSvg1X}px, ${sSvg1Y + mSvg1Y}px, 0) scale(1.05)`;
            if (layerSvg2) layerSvg2.style.transform = `translate3d(${mSvg2X}px, ${sSvg2Y + mSvg2Y}px, 0) scale(1.04)`;
            if (layerSvg3) layerSvg3.style.transform = `translate3d(${mSvg3X}px, ${sSvg3Y + mSvg3Y}px, 0) scale(1.03)`;
            if (layerSvg4) layerSvg4.style.transform = `translate3d(${mSvg4X}px, ${sSvg4Y + mSvg4Y}px, 0) scale(1.02)`;
            if (layerSvg5) layerSvg5.style.transform = `translate3d(${mSvg5X}px, ${sSvg5Y + mSvg5Y}px, 0) scale(1.02)`;
            if (layerSvg6) layerSvg6.style.transform = `translate3d(${mSvg6X}px, ${sSvg6Y + mSvg6Y}px, 0) scale(1.01)`;
            if (layerSvg7) layerSvg7.style.transform = `translate3d(${mSvg7X}px, ${sSvg7Y + mSvg7Y}px, 0) scale(1.01)`;
            if (layerSvg8) layerSvg8.style.transform = `translate3d(${mSvg7X * 1.2}px, ${sSvg7Y + mSvg7Y * 1.2}px, 0) scale(1.01)`;
            if (layerText) layerText.style.transform = `translate3d(${mTextX}px, ${sTextY + mTextY}px, 0)`;
        }

        requestAnimationFrame(animateParallax);
    }

    animateParallax();

    // 4. INTERACTIVE SAKURA PETALS (HTML5 CANVAS)
    const canvas = document.getElementById('sakura-canvas');
    const ctx = canvas.getContext('2d');

    let petals = [];
    const maxPetals = 50;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    let width = canvas.width / dpr;
    let height = canvas.height / dpr;

    let mousePos = { x: -1000, y: -1000 };
    let prevMousePos = { x: -1000, y: -1000 };
    let mouseVelX = 0;
    let mouseVelY = 0;

    let lastScrollY = window.scrollY;
    let scrollVelY = 0;
    let scrollBurst = 0;

    const windTrails = [];

    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        scrollVelY = sy - lastScrollY;
        lastScrollY = sy;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth * dpr;
        height = canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        width = canvas.width / dpr;
        height = canvas.height / dpr;
    });

    window.addEventListener('mousemove', (e) => {
        prevMousePos.x = mousePos.x;
        prevMousePos.y = mousePos.y;
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        mouseVelX = mousePos.x - prevMousePos.x;
        mouseVelY = mousePos.y - prevMousePos.y;

        const speed = Math.sqrt(mouseVelX * mouseVelX + mouseVelY * mouseVelY);
        if (speed > 3) {
            for (let i = 0; i < 3; i++) {
                windTrails.push({
                    x: mousePos.x + (Math.random() - 0.5) * 20,
                    y: mousePos.y + (Math.random() - 0.5) * 20,
                    alpha: 0.5,
                    size: Math.random() * 4 + 2,
                });
            }
        }
    });

    class SakuraPetal {
        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * (width + 100);
            this.y = -20;
            this.size = Math.random() * 7 + 4;
            this._baseSpeedX = Math.random() * -0.8 - 0.3;
            this._baseSpeedY = Math.random() * 0.6 + 0.4;
            this.speedX = this._baseSpeedX;
            this.speedY = this._baseSpeedY;
            this.alpha = Math.random() * 0.5 + 0.3;
            this.angle = Math.random() * Math.PI;
            this.spinSpeed = Math.random() * 0.02 - 0.01;
            this.swing = Math.random() * 0.04;
            this.swingStep = Math.random() * 100;
        }

        update() {
            this.swingStep += this.swing;
            this.x += this.speedX + Math.sin(this.swingStep) * 0.3;
            this.y += this.speedY;
            this.angle += this.spinSpeed;

            const dx = this.x - mousePos.x;
            const dy = this.y - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const windRadius = 350;

            if (distance < windRadius && (Math.abs(mouseVelX) > 0.3 || Math.abs(mouseVelY) > 0.3)) {
                const force = (windRadius - distance) / windRadius;
                const windStrength = Math.min(Math.sqrt(mouseVelX * mouseVelX + mouseVelY * mouseVelY) * 0.2, 8);
                const effectiveForce = force * windStrength;
                this.speedX += mouseVelX * 0.012 * effectiveForce;
                this.speedY += mouseVelY * 0.012 * effectiveForce;
                const maxV = 10;
                this.speedX = Math.max(-maxV, Math.min(maxV, this.speedX));
                this.speedY = Math.max(-maxV, Math.min(maxV, this.speedY));
                this.spinSpeed += (Math.random() - 0.5) * effectiveForce * 0.01;
            }

            // Scroll wind: petals pushed in scroll direction
            if (Math.abs(scrollVelY) > 1) {
                const scrollForce = Math.min(Math.abs(scrollVelY) * 0.03, 4);
                this.speedY += Math.sign(scrollVelY) * scrollForce * 0.02;
                this.spinSpeed += (Math.random() - 0.5) * scrollForce * 0.002;
            }

            // Scroll-to-top burst
            if (scrollBurst > 0) {
                const burstForce = Math.min(scrollBurst, 3);
                this.speedY -= burstForce * 0.04;
                this.speedX += (Math.random() - 0.5) * burstForce * 0.02;
                this.spinSpeed += (Math.random() - 0.5) * burstForce * 0.005;
            }

            this.speedX += (this._baseSpeedX - this.speedX) * 0.003;
            this.speedY += (this._baseSpeedY - this.speedY) * 0.003;
            this.spinSpeed *= 0.995;

            if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 57, 70, ${this.alpha})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(230, 57, 70, 0.3)';
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < maxPetals; i++) {
        petals.push(new SakuraPetal());
    }

    function animatePetals() {
        ctx.clearRect(0, 0, width, height);

        scrollVelY *= 0.85;
        if (scrollBurst > 0) scrollBurst -= 0.03;

        for (let i = windTrails.length - 1; i >= 0; i--) {
            const t = windTrails[i];
            t.alpha -= 0.02;
            t.x += mouseVelX * 0.1;
            t.y += mouseVelY * 0.1;
            if (t.alpha <= 0) {
                windTrails.splice(i, 1);
                continue;
            }
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 200, 210, ${t.alpha * 0.5})`;
            ctx.fill();
        }

        if (windTrails.length > 80) windTrails.splice(0, windTrails.length - 80);

        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animatePetals);
    }

    animatePetals();

    // 5. INTERACTIVE ORACLE (BUSHIDO CARDS)
    const oracleCards = document.querySelectorAll('.oracle-card');
    const slashOverlay = document.getElementById('slash-overlay');
    const btnResetOracle = document.getElementById('btn-reset-oracle');
    let hasSelected = false;

    oracleCards.forEach(card => {
        card.addEventListener('click', () => {
            if (hasSelected) return; // Allow only one choice per meditation
            
            hasSelected = true;

            // 1. Sword Slash Effect
            slashOverlay.classList.add('slash-animation');
            
            // 2. Reveal and flip card halfway through the slash
            setTimeout(() => {
                card.classList.add('flipped');
            }, 180);

            // 3. Show Reset button and dim non-selected cards
            setTimeout(() => {
                oracleCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.style.opacity = '0.35';
                        otherCard.style.filter = 'blur(1.5px)';
                        otherCard.style.pointerEvents = 'none';
                    }
                });
                btnResetOracle.classList.add('show');
            }, 600);

            // Cleanup slash class after animation completes
            setTimeout(() => {
                slashOverlay.classList.remove('slash-animation');
            }, 400);
        });
    });

    btnResetOracle.addEventListener('click', () => {
        // Reset all cards
        oracleCards.forEach(card => {
            card.classList.remove('flipped');
            card.style.opacity = '1';
            card.style.filter = 'none';
            card.style.pointerEvents = 'auto';
        });

        // Hide reset button
        btnResetOracle.classList.remove('show');
        
        // Reset choice state
        hasSelected = false;
    });

    // 6. SCROLL FADE-IN ANIMATION (INTERSECTION OBSERVER)
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // relative to viewport
        threshold: 0.1, // trigger when 10% is visible
        rootMargin: "0px 0px -80px 0px" // trigger slightly before entering screen
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it appears
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 7. FORM SUBMIT MOCKUP
    const signupForm = document.getElementById('signup-form');
    const formMessage = document.getElementById('form-message');

    if (signupForm && formMessage) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('signup-email');
            
            if (emailInput && emailInput.value) {
                formMessage.textContent = 'Procesando tu suscripción a la senda...';
                formMessage.className = 'form-message';

                setTimeout(() => {
                    formMessage.textContent = '¡Suscripción exitosa! Tu primer capítulo ha sido enviado a ' + emailInput.value;
                    formMessage.className = 'form-message success';
                    emailInput.value = '';
                }, 1200);
            }
        });
    }

    // 8. ENTRANCE ANIMATION WITH ZEN BELL
    function playZenChime() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Master gain
            const masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
            masterGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);
            masterGain.connect(audioCtx.destination);

            // Bell-like tones with gentle inharmonicity
            const frequencies = [220, 277.18, 329.63, 440];
            
            frequencies.forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = 'sine';
                osc.frequency.value = freq;
                
                gain.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.04);
                gain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + i * 0.04 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2);
                
                osc.connect(gain);
                gain.connect(masterGain);
                
                osc.start(audioCtx.currentTime + i * 0.04);
                osc.stop(audioCtx.currentTime + 2.5);
            });
        } catch (e) {
            // AudioContext not available
        }
    }

    // Play chime after a short delay when page loads
    setTimeout(playZenChime, 600);

    // 9. SCROLL TO TOP BUTTON
    const scrollBtn = document.getElementById('scroll-top');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            scrollBurst = 3;
            for (let i = 0; i < 30; i++) {
                windTrails.push({
                    x: Math.random() * width,
                    y: height - Math.random() * 200,
                    alpha: 0.6,
                    size: Math.random() * 6 + 3,
                });
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 10. INTERACTIVE 3D BOOK CONTROLLER
    const tomoTabs = document.querySelectorAll('.tomo-tab');
    const stageTomo1 = document.getElementById('stage-tomo-1');
    const stageTomo2 = document.getElementById('stage-tomo-2');
    const card1 = document.getElementById('book-card-1');
    const card2 = document.getElementById('book-card-2');
    const btnFlip3d = document.getElementById('btn-flip-3d');
    const btnReset3d = document.getElementById('btn-reset-3d');

    let activeCard = card1;
    let currentRotY = 0;
    let currentRotX = 0;

    // Tab Switcher
    if (tomoTabs.length) {
        tomoTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tomoTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tomo = tab.getAttribute('data-tomo');
                if (tomo === '1') {
                    if (stageTomo1) stageTomo1.style.display = 'flex';
                    if (stageTomo2) stageTomo2.style.display = 'none';
                    activeCard = card1;
                } else {
                    if (stageTomo1) stageTomo1.style.display = 'none';
                    if (stageTomo2) stageTomo2.style.display = 'flex';
                    activeCard = card2;
                }
                resetCardView(activeCard);
            });
        });
    }

    function updateBookTransform(card, rx, ry) {
        if (!card) return;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        
        const shadow = card.querySelector('.book-3d-shadow');
        if (shadow) {
            const shadowX = ry * 0.7;
            shadow.style.transform = `rotateX(90deg) translateZ(-40px) translateX(${shadowX}px)`;
        }
    }

    function resetCardView(card) {
        currentRotX = 0;
        currentRotY = 0;
        if (card) {
            card.setAttribute('data-rotated', 'false');
            updateBookTransform(card, 0, 0);
        }
        if (btnFlip3d) {
            const label = btnFlip3d.querySelector('span');
            if (label) label.textContent = 'Girar 180° (Ver Contraportada)';
        }
    }

    function setup3DCardInteractions(card) {
        if (!card) return;

        let isDragging = false;
        let startX = 0;
        let startY = 0;

        card.addEventListener('mousemove', (e) => {
            if (isDragging) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const baseRotY = card.getAttribute('data-rotated') === 'true' ? 180 : 0;
            const tiltX = -(y / rect.height) * 20;
            const tiltY = baseRotY + (x / rect.width) * 25;

            updateBookTransform(card, tiltX, tiltY);
        });

        card.addEventListener('mouseleave', () => {
            if (isDragging) return;
            const baseRotY = card.getAttribute('data-rotated') === 'true' ? 180 : 0;
            updateBookTransform(card, 0, baseRotY);
        });

        card.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            card.style.transition = 'none';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            currentRotY += deltaX * 0.5;
            currentRotX -= deltaY * 0.5;

            startX = e.clientX;
            startY = e.clientY;

            updateBookTransform(card, currentRotX, currentRotY);
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                card.style.transition = 'none';
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;

            currentRotY += deltaX * 0.6;
            currentRotX -= deltaY * 0.6;

            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;

            updateBookTransform(card, currentRotX, currentRotY);
        });

        window.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    }

    setup3DCardInteractions(card1);
    setup3DCardInteractions(card2);

    if (btnFlip3d) {
        btnFlip3d.addEventListener('click', () => {
            if (!activeCard) return;
            const isFlipped = activeCard.getAttribute('data-rotated') === 'true';
            
            if (!isFlipped) {
                activeCard.setAttribute('data-rotated', 'true');
                currentRotY = 180;
                currentRotX = 0;
                updateBookTransform(activeCard, 0, 180);
                const label = btnFlip3d.querySelector('span');
                if (label) label.textContent = 'Girar a Portada Frontal';
            } else {
                activeCard.setAttribute('data-rotated', 'false');
                currentRotY = 0;
                currentRotX = 0;
                updateBookTransform(activeCard, 0, 0);
                const label = btnFlip3d.querySelector('span');
                if (label) label.textContent = 'Girar 180° (Ver Contraportada)';
            }
        });
    }

    if (btnReset3d) {
        btnReset3d.addEventListener('click', () => {
            resetCardView(activeCard);
        });
    }
});
