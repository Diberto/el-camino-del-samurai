/* ==========================================================================
   EL CAMINO DEL SAMURAI - INTERACTIVE SCRIPTS
   ========================================================================== */

import * as THREE from 'three';

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

    // 4. 3D SAKURA PETALS WITH THREE.JS & WIND INTERACTION
    const petalCanvas = document.getElementById('sakura-canvas');

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 4, 42);
    camera.lookAt(0, -3, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: petalCanvas,
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function createPetalTexture() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(255, 210, 218, 1)');
        g.addColorStop(0.3, 'rgba(235, 80, 95, 0.9)');
        g.addColorStop(0.65, 'rgba(200, 50, 60, 0.4)');
        g.addColorStop(1, 'rgba(180, 30, 40, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(32, 32, 22, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        const tex = new THREE.CanvasTexture(c);
        tex.needsUpdate = true;
        return tex;
    }

    const petalTexture = createPetalTexture();
    const petalGeo = new THREE.PlaneGeometry(1.6, 1.1);
    const NUM_PETALS = 90;
    const petals3D = [];

    // Mouse tracking
    const mouse3D = new THREE.Vector3(0, 0, 0);
    let mouseSX = -1000, mouseSY = -1000;
    let prevMouseSX = -1000, prevMouseSY = -1000;
    let mouseVelX = 0, mouseVelY = 0;

    const raycaster = new THREE.Raycaster();
    const intersecPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    window.addEventListener('mousemove', (e) => {
        prevMouseSX = mouseSX;
        prevMouseSY = mouseSY;
        mouseSX = e.clientX;
        mouseSY = e.clientY;
        mouseVelX = mouseSX - prevMouseSX;
        mouseVelY = mouseSY - prevMouseSY;
    });

    // Wind trail particles
    const trailGeo = new THREE.BufferGeometry();
    const trailCount = 20;
    const trailPos = new Float32Array(trailCount * 3);
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    const trailMat = new THREE.PointsMaterial({
        color: 0xffa0b0,
        size: 0.6,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const trailPoints = new THREE.Points(trailGeo, trailMat);
    scene.add(trailPoints);
    let trailIdx = 0;

    for (let i = 0; i < NUM_PETALS; i++) {
        const mat = new THREE.MeshBasicMaterial({
            map: petalTexture,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            opacity: 0.35 + Math.random() * 0.45,
        });
        const mesh = new THREE.Mesh(petalGeo, mat);
        const spread = 24;
        mesh.position.set(
            (Math.random() - 0.5) * spread * 2,
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * 14
        );
        const s = 0.5 + Math.random() * 1.2;
        mesh.scale.set(s, s, 1);

        const p = {
            mesh,
            vel: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                -(0.25 + Math.random() * 0.5),
                (Math.random() - 0.5) * 0.02
            ),
            rotV: new THREE.Vector3(
                (Math.random() - 0.5) * 0.03,
                (Math.random() - 0.5) * 0.015,
                (Math.random() - 0.5) * 0.04
            ),
            swingOff: Math.random() * 100,
            baseVelY: -(0.25 + Math.random() * 0.5),
        };

        scene.add(mesh);
        petals3D.push(p);
    }

    function updateMouse3D() {
        const ndc = new THREE.Vector2(
            (mouseSX / window.innerWidth) * 2 - 1,
            -(mouseSY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(ndc, camera);
        const pt = new THREE.Vector3();
        raycaster.ray.intersectPlane(intersecPlane, pt);
        mouse3D.copy(pt);
    }

    function animatePetals3D() {
        requestAnimationFrame(animatePetals3D);
        updateMouse3D();

        const windSpeed = Math.sqrt(mouseVelX * mouseVelX + mouseVelY * mouseVelY);
        const windR = 10;
        const petalPositions = trailPoints.geometry.attributes.position.array;

        // If mouse is moving, add trail particles
        if (windSpeed > 2 && mouseSX > -500) {
            for (let i = 0; i < 3; i++) {
                const idx = (trailIdx + i) % trailCount;
                petalPositions[idx * 3] = mouse3D.x + (Math.random() - 0.5) * 2;
                petalPositions[idx * 3 + 1] = mouse3D.y + (Math.random() - 0.5) * 2;
                petalPositions[idx * 3 + 2] = mouse3D.z + (Math.random() - 0.5) * 2;
            }
            trailIdx = (trailIdx + 3) % trailCount;
            trailPoints.geometry.attributes.position.needsUpdate = true;
            trailMat.opacity = Math.min(windSpeed * 0.1, 0.8);
        } else {
            trailMat.opacity *= 0.95;
        }

        petals3D.forEach((p) => {
            const mesh = p.mesh;

            // Gravity
            p.vel.y -= 0.003;

            // Sway
            p.swingOff += 0.015;
            p.vel.x += Math.sin(p.swingOff) * 0.004;

            // Wind from mouse
            if (windSpeed > 0.5) {
                const dx = mesh.position.x - mouse3D.x;
                const dy = mesh.position.y - mouse3D.y;
                const dz = mesh.position.z - mouse3D.z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < windR) {
                    const force = 1 - dist / windR;
                    const push = force * Math.min(windSpeed * 0.2, 5);

                    const wdx = mouseVelX / windSpeed;
                    const wdy = mouseVelY / windSpeed;

                    p.vel.x += wdx * push * 0.04;
                    p.vel.y += wdy * push * 0.04;
                    p.vel.z += (Math.random() - 0.5) * push * 0.08;

                    // Tumble faster in wind
                    p.rotV.x += (Math.random() - 0.5) * push * 0.006;
                    p.rotV.z += (Math.random() - 0.5) * push * 0.006;

                    const maxV = 2.5;
                    p.vel.x = Math.max(-maxV, Math.min(maxV, p.vel.x));
                    p.vel.y = Math.max(-maxV, Math.min(maxV, p.vel.y));
                    p.vel.z = Math.max(-maxV, Math.min(maxV, p.vel.z));

                    // Brighten petal when caught in wind
                    mesh.material.opacity = Math.min(mesh.material.opacity + 0.02, 0.9);
                }
            }

            // Return to natural opacity
            if (mesh.material.opacity > 0.4) {
                mesh.material.opacity -= 0.001;
            }

            // Drag
            p.vel.x *= 0.995;
            p.vel.z *= 0.995;
            p.rotV.x *= 0.998;
            p.rotV.z *= 0.998;

            // Apply
            mesh.position.x += p.vel.x;
            mesh.position.y += p.vel.y;
            mesh.position.z += p.vel.z;
            mesh.rotation.x += p.rotV.x;
            mesh.rotation.y += p.rotV.y;
            mesh.rotation.z += p.rotV.z;

            // Reset
            if (mesh.position.y < -18 || mesh.position.x < -30 || mesh.position.x > 30) {
                mesh.position.set(
                    (Math.random() - 0.5) * 40,
                    18 + Math.random() * 5,
                    (Math.random() - 0.5) * 14
                );
                p.vel.set(
                    (Math.random() - 0.5) * 0.02,
                    p.baseVelY,
                    (Math.random() - 0.5) * 0.02
                );
                p.rotV.set(
                    (Math.random() - 0.5) * 0.03,
                    (Math.random() - 0.5) * 0.015,
                    (Math.random() - 0.5) * 0.04
                );
                mesh.material.opacity = 0.35 + Math.random() * 0.45;
            }
        });

        renderer.render(scene, camera);
    }

    animatePetals3D();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

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
