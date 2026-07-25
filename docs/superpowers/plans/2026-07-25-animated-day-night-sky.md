# Animated Day/Night Sky & Landscape Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive, multi-layered Day/Night sky system with animated drifting clouds, a real-time twinkling starfield canvas, and a 1.8s smooth transition over the Mount Fuji landscape.

**Architecture:** HTML5 semantic layers (`.sky-container`, `.sky-day`, `.sky-night`, `#starfield-canvas`), CSS3 hardware-accelerated keyframe animations (`@keyframes driftClouds`), and a JavaScript Theme Controller (`initDayNightCycle`, `initStarfield`) with `localStorage` persistence and local-time auto-detection.

**Tech Stack:** HTML5, Vanilla CSS3, JavaScript (ES6+), Canvas 2D API, Vite.

## Global Constraints
- Target workspace: `d:\Documentos\Work\hummus\samurai\el-camino-del-samurai`
- Zero external CSS/JS frameworks (Vanilla JS/CSS only)
- Production build verification via `cmd /c "npm run build"`

---

### Task 1: HTML Markup for Sky Container & Theme Toggle Button

**Files:**
- Modify: `d:\Documentos\Work\hummus\samurai\el-camino-del-samurai\index.html:125-165`

**Interfaces:**
- Consumes: Existing `#inicio` hero section and header navbar.
- Produces: `.sky-container` HTML elements and `.theme-toggle-btn` in header.

- [ ] **Step 1: Inspect index.html around navbar and hero section**

Verify the location of `<header class="navbar">` and `<section class="hero-parallax">`.

- [ ] **Step 2: Add theme toggle button to navbar container in index.html**

Add the toggle button to `.nav-container`:
```html
<button class="theme-toggle-btn" id="theme-toggle" aria-label="Cambiar modo día/noche" title="Modo Día / Noche">
    <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
</button>
```

- [ ] **Step 3: Insert Sky Container inside section.hero-parallax in index.html**

Insert `.sky-container` as the first layer inside `#inicio`:
```html
        <!-- Capa de Cielos Animados (Día & Noche) -->
        <div class="sky-container" id="sky-container">
            <!-- Cielo de Día (Atardecer Dorado & Nubes) -->
            <div class="sky-layer sky-day">
                <div class="sun-glow"></div>
                <div class="cloud-layer cloud-layer-1"></div>
                <div class="cloud-layer cloud-layer-2"></div>
            </div>
            <!-- Cielo de Noche (Estrellas & Aura Índigo) -->
            <div class="sky-layer sky-night">
                <canvas id="starfield-canvas"></canvas>
                <div class="moon-aura"></div>
            </div>
        </div>
```

- [ ] **Step 4: Verify build syntax with Vite**

Run: `cmd /c "npm run build"`
Expected: Build passes clean in < 1s.

- [ ] **Step 5: Commit changes**

```bash
git add index.html
git commit -m "feat(html): add sky container markup and theme toggle button"
```

---

### Task 2: CSS Styles for Sky Gradients, Cloud Drifting & Day/Night Transition

**Files:**
- Modify: `d:\Documentos\Work\hummus\samurai\el-camino-del-samurai\styles.css:220-380`

**Interfaces:**
- Consumes: `.sky-container`, `.sky-day`, `.sky-night`, `.cloud-layer`, `.theme-toggle-btn`, `body.theme-night`
- Produces: Complete hardware-accelerated Day/Night animation and transition system.

- [ ] **Step 1: Add CSS rules for .sky-container, .sky-day, and .sky-night**

```css
/* SKY CONTAINER & DAY/NIGHT SYSTEM */
.sky-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
}

.sky-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1), filter 1.8s ease;
}

/* DAY SKY */
.sky-day {
    background: linear-gradient(180deg, #1f1d2b 0%, #d94e34 35%, #f4a261 70%, #07080a 100%);
    opacity: 1;
    z-index: 1;
}

.sun-glow {
    position: absolute;
    top: 25%;
    right: 25%;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 200, 120, 0.6) 0%, rgba(217, 4, 41, 0.3) 50%, transparent 75%);
    filter: blur(20px);
    animation: sunPulse 6s ease-in-out infinite alternate;
}

@keyframes sunPulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.12); opacity: 1; }
}

/* CLOUDS DRIFTING */
.cloud-layer {
    position: absolute;
    top: 10%;
    left: 0;
    width: 200%;
    height: 35%;
    background-repeat: repeat-x;
    background-size: 800px auto;
    opacity: 0.25;
    pointer-events: none;
}

.cloud-layer-1 {
    background-image: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 60%);
    animation: driftClouds 55s linear infinite;
}

.cloud-layer-2 {
    top: 18%;
    opacity: 0.15;
    animation: driftClouds 85s linear infinite reverse;
}

@keyframes driftClouds {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

/* NIGHT SKY */
.sky-night {
    background: linear-gradient(180deg, #050811 0%, #0b1326 40%, #151a2e 75%, #07080a 100%);
    opacity: 0;
    z-index: 2;
}

#starfield-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.moon-aura {
    position: absolute;
    top: 20%;
    right: 28%;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(160, 190, 255, 0.25) 0%, rgba(217, 4, 41, 0.15) 55%, transparent 75%);
    filter: blur(35px);
}

/* NIGHT THEME TOGGLE ACTIVE STATES */
body.theme-night .sky-day {
    opacity: 0;
}

body.theme-night .sky-night {
    opacity: 1;
}

body.theme-night .layer-bg {
    filter: brightness(0.65) contrast(1.15);
}

/* TOGGLE BUTTON STYLES */
.theme-toggle-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 1rem;
    color: #f4a261;
    transition: all 0.3s ease;
}

.theme-toggle-btn:hover {
    background: rgba(217, 4, 41, 0.2);
    border-color: rgba(217, 4, 41, 0.5);
    transform: scale(1.08);
}

.theme-toggle-btn .icon-sun,
.theme-toggle-btn .icon-moon {
    width: 20px;
    height: 20px;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.theme-toggle-btn .icon-moon {
    display: none;
    color: #a0c4ff;
}

body.theme-night .theme-toggle-btn .icon-sun {
    display: none;
}

body.theme-night .theme-toggle-btn .icon-moon {
    display: block;
}
```

- [ ] **Step 2: Verify production build with Vite**

Run: `cmd /c "npm run build"`
Expected: PASS clean build in < 1s.

- [ ] **Step 3: Commit changes**

```bash
git add styles.css
git commit -m "feat(css): add styles for Day/Night skies, clouds drifting, and theme toggle"
```

---

### Task 3: JavaScript Theme Controller & Starfield Canvas Animation

**Files:**
- Modify: `d:\Documentos\Work\hummus\samurai\el-camino-del-samurai\script.js:1-50`

**Interfaces:**
- Consumes: `#theme-toggle`, `#starfield-canvas`, `body.theme-night`
- Produces: `initDayNightCycle()`, `initStarfield()`

- [ ] **Step 1: Add Day/Night cycle controller to script.js**

```javascript
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
```

- [ ] **Step 2: Add Starfield Canvas animation to script.js**

```javascript
    // 0.1 STARFIELD CANVAS ANIMATION (NIGHT MODE)
    function initStarfield() {
        const canvas = document.getElementById('starfield-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
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
```

- [ ] **Step 3: Run Vite build verification**

Run: `cmd /c "npm run build"`
Expected: PASS clean build in < 1s.

- [ ] **Step 4: Commit changes**

```bash
git add script.js
git commit -m "feat(js): add Day/Night theme manager and animated starfield canvas"
```

---

### Task 4: Final Verification & Production Build Audit

**Files:**
- Modify: None

- [ ] **Step 1: Execute production build**

Run: `cmd /c "npm run build"`
Expected: Clean build output with zero errors.

- [ ] **Step 2: Commit plan completion**

```bash
git commit -m "chore: complete Day/Night sky system implementation"
```
