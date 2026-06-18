/* ==========================================================================
   EL CAMINO DEL SAMURAI - INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

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

    // 3. MULTI-LAYER PARALLAX (MOUSE + SCROLL)
    const hero = document.getElementById('inicio');
    const layerBg = document.querySelector('.parallax-bg');
    const layerMid = document.querySelector('.parallax-mid');
    const layerText = document.querySelector('.hero-content');
    const layerFg = document.querySelector('.parallax-fg');

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const lerpFactor = 0.08; // Smoothness factor

    // Track mouse position relative to center of screen
    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    });

    // Main animation loop for Parallax (combining scroll and smooth mouse movements)
    function animateParallax() {
        // Interpolate mouse coordinates for fluid animation
        mouseX += (targetMouseX - mouseX) * lerpFactor;
        mouseY += (targetMouseY - mouseY) * lerpFactor;

        const scrollY = window.scrollY;

        // Ensure we only calculate parallax when hero is visible
        if (scrollY < window.innerHeight) {
            // Mouse movement depth multipliers
            const mouseBgX = mouseX * -25;
            const mouseBgY = mouseY * -15;

            const mouseMidX = mouseX * -12;
            const mouseMidY = mouseY * -8;

            const mouseTextX = mouseX * 10;
            const mouseTextY = mouseY * 5;

            const mouseFgX = mouseX * 20;
            const mouseFgY = mouseY * 10;

            // Scroll position multipliers
            const scrollBgY = scrollY * 0.45;
            const scrollMidY = scrollY * 0.28;
            const scrollTextY = scrollY * 0.18;
            const scrollFgY = scrollY * 0.06;

            // Apply style transforms
            if (layerBg) layerBg.style.transform = `translate3d(${mouseBgX}px, ${scrollBgY + mouseBgY}px, 0) scale(1.05)`;
            if (layerMid) layerMid.style.transform = `translate3d(${mouseMidX}px, ${scrollMidY + mouseMidY}px, 0) scale(1.03)`;
            if (layerText) layerText.style.transform = `translate3d(${mouseTextX}px, ${scrollTextY + mouseTextY}px, 0)`;
            if (layerFg) layerFg.style.transform = `translate3d(${mouseFgX}px, ${scrollFgY + mouseFgY}px, 0) scale(1.02)`;
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

    const windTrails = [];

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

    // 9. BACKGROUND MUSIC TOGGLE
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.setAttribute('aria-label', 'Activar música de fondo');
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    musicToggle.setAttribute('aria-label', 'Pausar música de fondo');
                    isPlaying = true;
                }).catch(() => {
                    // Autoplay blocked by browser
                });
            }
        });
    }
});
